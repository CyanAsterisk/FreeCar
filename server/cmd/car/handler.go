package main

import (
	"context"
	mongoPkg "github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

// CarServiceImpl implements the last service interface defined in the IDL.
type CarServiceImpl struct {
	MongoManager
	Publisher
	RedisManager
}

// Publisher defines the publishing interface.
type Publisher interface {
	Publish(context.Context, *car.CarEntity) error
}

// RedisManager defines the redis server.
type RedisManager interface {
	GetCar(c context.Context, cid id.CarID) (*car.CarEntity, error)
	GetCars(c context.Context) ([]*car.CarEntity, error)
	InsertCar(c context.Context, cid id.CarID, cr car.Car) error
	RemoveCar(c context.Context, cid id.CarID) error
}

// MongoManager defines the mongoDB server
type MongoManager interface {
	CreateCar(c context.Context, plateNum string) (*mongoPkg.CarRecord, error)
	GetCar(c context.Context, id id.CarID) (*mongoPkg.CarRecord, error)
	GetCars(c context.Context) ([]*mongoPkg.CarRecord, error)
	UpdateCar(c context.Context, id id.CarID, status car.CarStatus, update *mongoPkg.CarUpdate) (*mongoPkg.CarRecord, error)
}

// CreateCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) CreateCar(ctx context.Context, req *car.CreateCarRequest) (*car.CarEntity, error) {
	cr, err := s.MongoManager.CreateCar(ctx, req.PlateNum)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}
	return &car.CarEntity{
		Id:  cr.ID.Hex(),
		Car: cr.Car,
	}, nil
}

// GetCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) GetCar(ctx context.Context, req *car.GetCarRequest) (*car.Car, error) {
	cr, err := s.MongoManager.GetCar(ctx, id.CarID(req.Id))
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "")
	}
	return cr.Car, nil
}

// GetCars implements the CarServiceImpl interface.
func (s *CarServiceImpl) GetCars(ctx context.Context, _ *car.GetCarsRequest) (*car.GetCarsResponse, error) {
	cars, err := s.MongoManager.GetCars(ctx)
	if err != nil {
		klog.Errorf("cannot get cars: %s", err.Error())
		return nil, status.Errorf(codes.Internal, "")
	}

	res := &car.GetCarsResponse{}
	for _, cr := range cars {
		res.Cars = append(res.Cars, &car.CarEntity{
			Id:  cr.ID.Hex(),
			Car: cr.Car,
		})
	}
	return res, nil
}

// LockCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) LockCar(ctx context.Context, req *car.LockCarRequest) (resp *car.LockCarResponse, err error) {
	if err = s.RedisManager.RemoveCar(ctx, id.CarID(req.Id)); err != nil {
		return nil, errno.CarSrvErr.WithMessage("remove cache error")
	}
	c, err := s.MongoManager.UpdateCar(ctx, id.CarID(req.Id), car.CarStatus_UNLOCKED, &mongoPkg.CarUpdate{
		Status: car.CarStatus_LOCKING,
	})
	if err != nil {
		klog.Errorf("update car error", err)
		return nil, errno.CarSrvErr.WithMessage("update car error")
	}
	s.publish(ctx, c)
	return
}

// UnlockCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) UnlockCar(ctx context.Context, req *car.UnlockCarRequest) (resp *car.UnlockCarResponse, err error) {
	if err = s.RedisManager.RemoveCar(ctx, id.CarID(req.Id)); err != nil {
		return nil, errno.CarSrvErr.WithMessage("remove cache error")
	}
	cr, err := s.MongoManager.UpdateCar(ctx, id.CarID(req.Id), car.CarStatus_LOCKED, &mongoPkg.CarUpdate{
		Status:       car.CarStatus_UNLOCKING,
		Driver:       req.Driver,
		UpdateTripID: true,
		TripID:       id.TripID(req.TripId),
	})
	if err != nil {
		klog.Errorf("update car error", err)
		return nil, errno.CarSrvErr.WithMessage("update car error")
	}
	s.publish(ctx, cr)
	return
}

// UpdateCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) UpdateCar(ctx context.Context, req *car.UpdateCarRequest) (resp *car.UpdateCarResponse, err error) {
	if err = s.RedisManager.RemoveCar(ctx, id.CarID(req.Id)); err != nil {
		return nil, errno.CarSrvErr.WithMessage("remove cache error")
	}
	update := &mongoPkg.CarUpdate{
		Status:   req.Status,
		Position: req.Position,
		Power:    req.Power,
	}
	if req.Status == car.CarStatus_LOCKED {
		update.Driver = &car.Driver{}
		update.UpdateTripID = true
		update.TripID = ""
	}
	cr, err := s.MongoManager.UpdateCar(ctx, id.CarID(req.Id), car.CarStatus_CS_NOT_SPECIFIED, update)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}
	s.publish(ctx, cr)
	return
}

func (s *CarServiceImpl) publish(c context.Context, cr *mongoPkg.CarRecord) {
	err := s.Publisher.Publish(c, &car.CarEntity{
		Id:  cr.ID.Hex(),
		Car: cr.Car,
	})
	if err != nil {
		klog.Warn("cannot publish", err.Error())
	}
}
