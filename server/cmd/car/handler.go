package main

import (
	"context"
	car "github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	"github.com/cloudwego/kitex/pkg/klog"
)

// CarServiceImpl implements the last service interface defined in the IDL.
type CarServiceImpl struct{}

// CreateCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) CreateCar(ctx context.Context, req *car.CreateCarRequest) (resp *car.CarEntity, err error) {
	// TODO: Your code here...
	klog.Info("CreateCar")
	return
}

// GetCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) GetCar(ctx context.Context, req *car.GetCarRequest) (resp *car.Car, err error) {
	// TODO: Your code here...
	klog.Info("GetCar")
	return
}

// GetCars implements the CarServiceImpl interface.
func (s *CarServiceImpl) GetCars(ctx context.Context, req *car.GetCarsRequest) (resp *car.GetCarsResponse, err error) {
	// TODO: Your code here...
	klog.Info("GetCars")
	return
}

// LockCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) LockCar(ctx context.Context, req *car.LockCarRequest) (resp *car.LockCarResponse, err error) {
	// TODO: Your code here...
	klog.Info("LockCar")
	return
}

// UnlockCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) UnlockCar(ctx context.Context, req *car.UnlockCarRequest) (resp *car.UnlockCarResponse, err error) {
	// TODO: Your code here...
	klog.Info("unlockCar")
	return
}

// UpdateCar implements the CarServiceImpl interface.
func (s *CarServiceImpl) UpdateCar(ctx context.Context, req *car.UpdateCarRequest) (resp *car.UnlockCarResponse, err error) {
	// TODO: Your code here...
	klog.Info("UpdateCar")
	return
}
