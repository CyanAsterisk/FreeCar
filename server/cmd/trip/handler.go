package main

import (
	"context"
	"math/rand"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/dao"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip"
	"github.com/CyanAsterisk/FreeCar/shared/id"
	"github.com/CyanAsterisk/FreeCar/shared/mongo/objid"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

// TripServiceImpl implements the last service interface defined in the IDL.
type TripServiceImpl struct {
	ProfileManager ProfileManager
	CarManager     CarManager
	POIManager     POIManager
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
	Resolve(*trip.Location) (string, error)
}

// CreateTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) CreateTrip(ctx context.Context, req *trip.CreateTripRequest) (resp *trip.TripEntity, err error) {
	aid := id.AccountID(req.AccountId)
	if req.CarId == "" || req.Start == nil {
		return nil, status.Err(codes.InvalidArgument, "")
	}
	// Verify driver's identity.
	iID, err := s.ProfileManager.Verify(ctx, aid)
	if err != nil {
		return nil, status.Err(codes.FailedPrecondition, err.Error())
	}
	// Check vehicle status.
	carID := id.CarID(req.CarId)
	err = s.CarManager.Verify(ctx, carID, aid)
	if err != nil {
		return nil, status.Err(codes.FailedPrecondition, err.Error())
	}

	ls := s.calcCurrentStatus(&trip.LocationStatus{
		Location:     req.Start,
		TimestampSec: nowFunc(),
	}, req.Start)

	tr, err := dao.CreateTrip(ctx, &trip.Trip{
		AccountId:  aid.Int64(),
		CarId:      carID.String(),
		IdentityId: iID.String(),
		Status:     trip.TripStatus_IN_PROGRESS,
		Start:      ls,
		Current:    ls,
	})
	if err != nil {
		klog.Warn("cannot create trip", err)
		return nil, status.Err(codes.AlreadyExists, "")
	}

	// vehicle unlock
	go func() {
		err := s.CarManager.Unlock(context.Background(), carID, aid, objid.ToTripID(tr.ID), req.AvatarUrl)
		if err != nil {
			klog.Error("cannot unlock car", err)
		}
	}()

	return &trip.TripEntity{
		Id:   tr.ID.Hex(),
		Trip: tr.Trip,
	}, nil
}

// GetTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) GetTrip(ctx context.Context, req *trip.GetTripRequest) (resp *trip.Trip, err error) {
	aid := id.AccountID(req.AccountId)
	tr, err := dao.GetTrip(ctx, id.TripID(req.Id), aid)
	if err != nil {
		return nil, status.Err(codes.NotFound, "")
	}
	return tr.Trip, nil
}

// GetTrips implements the TripServiceImpl interface.
func (s *TripServiceImpl) GetTrips(ctx context.Context, req *trip.GetTripsRequest) (resp *trip.GetTripsResponse, err error) {
	aid := id.AccountID(req.AccountId)
	trips, err := dao.GetTrips(ctx, aid, req.Status)
	if err != nil {
		klog.Error("cannot get trips", err)
		return nil, status.Err(codes.Internal, "")
	}
	res := &trip.GetTripsResponse{}
	for _, tr := range trips {
		res.Trips = append(res.Trips, &trip.TripEntity{
			Id:   tr.ID.Hex(),
			Trip: tr.Trip,
		})
	}
	return res, nil
}

// UpdateTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) UpdateTrip(ctx context.Context, req *trip.UpdateTripRequest) (resp *trip.Trip, err error) {
	aid := id.AccountID(req.AccountId)
	tid := id.TripID(req.Id)
	tr, err := dao.GetTrip(ctx, tid, aid)
	if err != nil {
		return nil, status.Err(codes.NotFound, "")
	}

	if tr.Trip.Status == trip.TripStatus_FINISHED {
		return nil, status.Err(codes.FailedPrecondition, "cannot update a finished trip")
	}

	if tr.Trip.Current == nil {
		klog.Error("trip without current set", "id", tid.String())
		return nil, status.Err(codes.Internal, "")
	}

	cur := tr.Trip.Current.Location
	if req.Current != nil {
		cur = req.Current
	}

	tr.Trip.Current = s.calcCurrentStatus(tr.Trip.Current, cur)

	if req.EndTrip {
		tr.Trip.End = tr.Trip.Current
		tr.Trip.Status = trip.TripStatus_FINISHED
		err = s.CarManager.Lock(ctx, id.CarID(tr.Trip.CarId), aid)
		if err != nil {
			return nil, status.Errorf(codes.FailedPrecondition, "cannot lock car: %v", err)
		}

	}
	err = dao.UpdateTrip(ctx, tid, aid, tr.UpdatedAt, tr.Trip)
	if err != nil {
		return nil, status.Err(codes.Aborted, "")
	}
	return tr.Trip, nil
}

var nowFunc = func() int64 {
	return time.Now().Unix()
}

const (
	centsPerSec = 0.7
	kmPerSec    = 0.02
)

func (s *TripServiceImpl) calcCurrentStatus(last *trip.LocationStatus, cur *trip.Location) *trip.LocationStatus {
	now := nowFunc()
	elapsedSec := float64(now - last.TimestampSec)
	// get start position
	poi, err := s.POIManager.Resolve(cur)
	if err != nil {
		klog.Info("cannot resolve poi", "location", cur, err)
	}
	return &trip.LocationStatus{
		Location:     cur,
		FeeCent:      last.FeeCent + int32(centsPerSec*elapsedSec*2*rand.Float64()),
		KmDriven:     last.KmDriven + kmPerSec*elapsedSec*2*rand.Float64(),
		TimestampSec: now,
		PoiName:      poi,
	}
}
