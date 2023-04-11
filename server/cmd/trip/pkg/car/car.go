package car

import (
	"context"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"
)

// Manager defines a car manager.
type Manager struct {
	CarService carservice.Client
}

// Verify verifies car status.
func (m *Manager) Verify(c context.Context, cid id.CarID, aid id.AccountID) error {
	resp, err := m.CarService.GetCar(c, &car.GetCarRequest{
		Id:        cid.String(),
		AccountId: aid.String(),
	})
	if err != nil {
		return errno.RPCCarSrvErr
	}
	if err = tools.ParseBaseResp(resp.BaseResp); err != nil {
		return err
	}
	if resp.Car.Status != base.CarStatus_LOCKED {
		return errno.BadRequest.WithMessage(fmt.Sprintf("cannot unlock;car status is %v", resp.Car.Status))
	}
	return nil
}

// Unlock unlocks a car.
func (m *Manager) Unlock(c context.Context, cid id.CarID, aid id.AccountID, tid id.TripID, avatarURL string) error {
	resp, err := m.CarService.UnlockCar(c, &car.UnlockCarRequest{
		Id:        cid.String(),
		AccountId: aid.String(),
		Driver: &base.Driver{
			Id:        aid.String(),
			AvatarUrl: avatarURL,
		},
		TripId: tid.String(),
	})
	if err != nil {
		return errno.RPCCarSrvErr
	}
	return tools.ParseBaseResp(resp.BaseResp)
}

// Lock locks a car.
func (m *Manager) Lock(c context.Context, cid id.CarID, aid id.AccountID) error {
	resp, err := m.CarService.LockCar(c, &car.LockCarRequest{
		AccountId: aid.String(),
		Id:        cid.String(),
	})
	if err != nil {
		return errno.RPCCarSrvErr
	}
	return tools.ParseBaseResp(resp.BaseResp)
}
