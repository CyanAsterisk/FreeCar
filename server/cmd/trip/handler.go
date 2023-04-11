package main

import (
	"context"
	"math"
	"math/rand"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip"
	"github.com/CyanAsterisk/FreeCar/server/shared/mongo/objid"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"
	"github.com/cloudwego/kitex/pkg/klog"
)

// TripServiceImpl implements the last service interface defined in the IDL.
type TripServiceImpl struct {
	ProfileManager ProfileManager
	CarManager     CarManager
	POIManager     POIManager
	MongoManager   MongoManager
}

// ProfileManager defines the ACL(Anti Corruption Layer)
// for profile verification logic.
type ProfileManager interface {
	Verify(context.Context, id.AccountID) (id.IdentityID, error)
}

// CarManager defines the ACL for car management.
type CarManager interface {
	Verify(c context.Context, cid id.CarID, aid id.AccountID) error
	Unlock(c context.Context, cid id.CarID, aid id.AccountID, tid id.TripID, avatarURL string) error
	Lock(c context.Context, cid id.CarID, aid id.AccountID) error
}

// POIManager resolves POI(Point Of Interest).
type POIManager interface {
	Resolve(*base.Location) (string, error)
}

// MongoManager defines the mongoDB server
type MongoManager interface {
	CreateTrip(c context.Context, trip *base.Trip) (*mongo.TripRecord, error)
	GetTrip(c context.Context, id id.TripID, accountID id.AccountID) (*mongo.TripRecord, error)
	GetTrips(c context.Context, accountID id.AccountID, status base.TripStatus) ([]*mongo.TripRecord, error)
	GetTripsByLimit(c context.Context, limit int64) ([]*mongo.TripRecord, error)
	DeleteTrip(c context.Context, id id.TripID) error
	UpdateTrip(c context.Context, tid id.TripID, aid id.AccountID, updatedAt int64, trip *base.Trip) error
}

// CreateTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) CreateTrip(ctx context.Context, req *trip.CreateTripRequest) (resp *trip.CreateTripResponse, err error) {
	resp = new(trip.CreateTripResponse)
	aid := id.AccountID(req.AccountId)

	// Verify driver's identity.
	iID, err := s.ProfileManager.Verify(ctx, aid)
	if err != nil {
		klog.Error("verify profile err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage(err.Error()))
		return resp, nil
	}

	// Check vehicle status.
	carID := id.CarID(req.CarId)
	if err = s.CarManager.Verify(ctx, carID, aid); err != nil {
		klog.Error("verify car err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.CarSrvErr.WithMessage(err.Error()))
		return resp, nil
	}

	ls := s.calcCurrentStatus(&base.LocationStatus{
		Location:     req.Start,
		TimestampSec: nowFunc(),
	}, req.Start)

	tr, err := s.MongoManager.CreateTrip(ctx, &base.Trip{
		AccountId:  aid.String(),
		CarId:      req.CarId,
		Status:     base.TripStatus_IN_PROGRESS,
		Start:      ls,
		Current:    ls,
		IdentityId: iID.String(),
	})
	if err != nil {
		klog.Error("cannot create trip", err)
		resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr.WithMessage("create trip error"))
		return resp, nil
	}

	// vehicle unlock
	go func() {
		err := s.CarManager.Unlock(context.Background(), id.CarID(req.CarId), aid, objid.ToTripID(tr.ID), req.AvatarUrl)
		if err != nil {
			klog.Error("cannot unlock car", err)
		}
	}()

	resp.TripEntity = &base.TripEntity{
		Id:   tr.ID.Hex(),
		Trip: tr.Trip,
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) GetTrip(ctx context.Context, req *trip.GetTripRequest) (resp *trip.GetTripResponse, err error) {
	resp = new(trip.GetTripResponse)
	aid := id.AccountID(req.AccountId)
	tr, err := s.MongoManager.GetTrip(ctx, id.TripID(req.Id), aid)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
		} else {
			klog.Error("get trip err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr.WithMessage("get trips err"))
		}
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.Trip = tr.Trip
	return resp, nil
}

// GetTrips implements the TripServiceImpl interface.
func (s *TripServiceImpl) GetTrips(ctx context.Context, req *trip.GetTripsRequest) (resp *trip.GetTripsResponse, err error) {
	resp = new(trip.GetTripsResponse)
	aid := id.AccountID(req.AccountId)
	trips, err := s.MongoManager.GetTrips(ctx, aid, req.Status)
	if err != nil {
		klog.Error("cannot get trips", err)
		resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr.WithMessage("get trips err"))
		return resp, nil
	}
	var res []*base.TripEntity
	for _, tr := range trips {
		res = append(res, &base.TripEntity{
			Id:   tr.ID.Hex(),
			Trip: tr.Trip,
		})
	}
	resp.Trips = res
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// UpdateTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) UpdateTrip(ctx context.Context, req *trip.UpdateTripRequest) (resp *trip.UpdateTripResponse, err error) {
	resp = new(trip.UpdateTripResponse)
	aid := id.AccountID(req.AccountId)
	tid := id.TripID(req.Id)
	tr, err := s.MongoManager.GetTrip(ctx, tid, aid)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
		} else {
			klog.Error("get trip err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr.WithMessage("get trip err"))
		}
		return resp, nil
	}

	if tr.Trip.Status == base.TripStatus_FINISHED {
		resp.BaseResp = tools.BuildBaseResp(errno.BadRequest.WithMessage("cannot update a finished trip"))
		return resp, nil
	}

	if tr.Trip.Current == nil {
		klog.Error("trip without current set", "id", tid.String())
		resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr)
		return resp, nil
	}

	cur := tr.Trip.Current.Location
	if req.Current != nil {
		cur = req.Current
	}

	tr.Trip.Current = s.calcCurrentStatus(tr.Trip.Current, cur)

	if req.EndTrip {
		tr.Trip.End = tr.Trip.Current
		tr.Trip.Status = base.TripStatus_FINISHED
		err = s.CarManager.Lock(ctx, id.CarID(tr.Trip.CarId), aid)
		if err != nil {
			klog.Error("lock car err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.CarSrvErr.WithMessage("lock car err"))
			return resp, nil
		}
	}
	err = s.MongoManager.UpdateTrip(ctx, tid, aid, tr.UpdatedAt, tr.Trip)
	if err != nil {
		klog.Error("update trip err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr.WithMessage("update trip err"))
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.Trip = tr.Trip
	return resp, nil
}

// GetAllTrips implements the TripServiceImpl interface.
func (s *TripServiceImpl) GetAllTrips(ctx context.Context, req *trip.GetAllTripsRequest) (resp *trip.GetAllTripsResponse, err error) {
	resp = new(trip.GetAllTripsResponse)
	trips, err := s.MongoManager.GetTripsByLimit(ctx, math.MaxInt64)
	if err != nil {
		klog.Error("cannot get trips", err)
		resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr.WithMessage("get trips err"))
		return resp, nil
	}
	var res []*base.TripEntity
	for _, tr := range trips {
		res = append(res, &base.TripEntity{
			Id:   tr.ID.Hex(),
			Trip: tr.Trip,
		})
	}
	resp.Trips = res
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetSomeTrips implements the TripServiceImpl interface.
func (s *TripServiceImpl) GetSomeTrips(ctx context.Context, req *trip.GetSomeTripsRequest) (resp *trip.GetSomeTripsResponse, err error) {
	resp = new(trip.GetSomeTripsResponse)
	trips, err := s.MongoManager.GetTripsByLimit(ctx, 20)
	if err != nil {
		klog.Error("cannot get trips", err)
		resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr.WithMessage("get trips err"))
		return resp, nil
	}
	var res []*base.TripEntity
	for _, tr := range trips {
		res = append(res, &base.TripEntity{
			Id:   tr.ID.Hex(),
			Trip: tr.Trip,
		})
	}
	resp.Trips = res
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// DeleteTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) DeleteTrip(ctx context.Context, req *trip.DeleteTripRequest) (resp *trip.DeleteTripResponse, err error) {
	resp = new(trip.DeleteTripResponse)
	err = s.MongoManager.DeleteTrip(ctx, id.TripID(req.Id))
	if err != nil {
		klog.Error("cannot delete trip", err)
		resp.BaseResp = tools.BuildBaseResp(errno.TripSrvErr.WithMessage("delete trip err"))
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

var nowFunc = func() int64 {
	return time.Now().Unix()
}

const (
	centsPerSec = 0.7
	kmPerSec    = 0.02
)

func (s *TripServiceImpl) calcCurrentStatus(last *base.LocationStatus, cur *base.Location) *base.LocationStatus {
	now := nowFunc()
	elapsedSec := float64(now - last.TimestampSec)
	// get start position
	poi, err := s.POIManager.Resolve(cur)
	if err != nil {
		klog.Info("cannot resolve poi", "location", cur, err)
	}
	return &base.LocationStatus{
		Location:     cur,
		FeeCent:      last.FeeCent + int32(centsPerSec*elapsedSec*2*rand.Float64()),
		KmDriven:     last.KmDriven + kmPerSec*elapsedSec*2*rand.Float64(),
		TimestampSec: now,
		PoiName:      poi,
	}
}
