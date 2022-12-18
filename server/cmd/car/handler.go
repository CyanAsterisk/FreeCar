package main

import (
	"context"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/dao"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
	"go.mongodb.org/mongo-driver/mongo"
	"strconv"
)

// CarServiceImpl implements the last service interface defined in the IDL.
type CarServiceImpl struct {
}

// CreateCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) CreateCar(ctx context.Context, _ *car.CreateCarRequest) (res *car.CarEntity, err error) {
	cr, err := global.DB.CreateCar(ctx)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	res.Id, err = strconv.ParseInt(cr.ID.Hex(), 16, 64)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	res.Car = cr.Car
	return
}

// GetCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) GetCar(ctx context.Context, req *car.GetCarRequest) (*car.Car, error) {
	cr, err := global.DB.GetCar(ctx, req.Id)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "")
	}
	return cr.Car, nil
}

// GetCars implements the CarServiceImpl interface.
func (s *CarServiceImpl) GetCars(ctx context.Context, _ *car.GetCarsRequest) (resp *car.GetCarsResponse, err error) {
	cars, err := global.DB.GetCars(ctx)
	if err != nil {
		klog.Errorf("cannot get cars", err.Error())
		return nil, status.Errorf(codes.Internal, "")
	}

	res := &car.GetCarsResponse{}
	for _, cr := range cars {
		id, err := strconv.ParseInt(cr.ID.Hex(), 16, 64)
		if err != nil {
			return nil, status.Errorf(codes.Internal, err.Error())
		}

		res.Cars = append(res.Cars, &car.CarEntity{
			Id:  id,
			Car: cr.Car,
		})
	}
	return
}

// LockCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) LockCar(ctx context.Context, req *car.LockCarRequest) (resp *car.LockCarResponse, err error) {
	c, err := global.DB.UpdateCar(ctx, req.Id, car.CarStatus_UNLOCKED, &dao.CarUpdate{
		Status: car.CarStatus_LOCKING,
	})
	if err != nil {
		code := codes.Internal
		if err == mongo.ErrNoDocuments {
			code = codes.NotFound
		}
		return nil, status.Errorf(code, "cannot update: %v", err)
	}
	s.publish(ctx, c)
	return
}

// UnlockCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) UnlockCar(ctx context.Context, req *car.UnlockCarRequest) (resp *car.UnlockCarResponse, err error) {
	car, err := global.DB.UpdateCar(ctx, req.Id, car.CarStatus_LOCKED, &dao.CarUpdate{
		Status:       car.CarStatus_UNLOCKING,
		Driver:       req.Driver,
		UpdateTripID: true,
		TripID:       req.TripId,
	})
	if err != nil {
		code := codes.Internal
		if err == mongo.ErrNoDocuments {
			code = codes.NotFound
		}
		return nil, status.Errorf(code, "cannot update: %v", err)
	}
	s.publish(ctx, car)
	return
}

// UpdateCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) UpdateCar(ctx context.Context, req *car.UpdateCarRequest) (resp *car.UpdateCarResponse, err error) {
	update := &dao.CarUpdate{
		Status:   req.Status,
		Position: req.Position,
	}
	if req.Status == car.CarStatus_LOCKED {
		update.Driver = &car.Driver{}
		update.UpdateTripID = true
		update.TripID = 0
	}
	cr, err := global.DB.UpdateCar(ctx, req.Id, car.CarStatus_CS_NOT_SPECIFIED, update)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}
	s.publish(ctx, cr)
	return
}

func (s *CarServiceImpl) publish(c context.Context, cr *dao.CarRecord) {

	id, err := strconv.ParseInt(cr.ID.Hex(), 16, 64)
	if err != nil {
		klog.Warn("cannot pare carID", err.Error())
	}

	err = global.Publisher.Publish(c, &car.CarEntity{
		Id:  id,
		Car: cr.Car,
	})

	if err != nil {
		klog.Warn("cannot publish", err.Error())
	}
}
