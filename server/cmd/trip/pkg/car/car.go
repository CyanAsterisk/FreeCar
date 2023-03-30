package car

import (
	"context"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
)

// Manager defines a car manager.
type Manager struct {
	CarService carservice.Client
}

// Verify verifies car status.
func (m *Manager) Verify(c context.Context, cid id.CarID, aid id.AccountID) error {
	resp, err := m.CarService.GetCar(c, &car.GetCarRequest{
		Id:        cid.String(),
		AccountId: int64(aid),
	})
	if err != nil {
		return fmt.Errorf("cannot get car: %v", err)
	}
	if resp.Car.Status != base.CarStatus_LOCKED {
		return fmt.Errorf("cannot unlock;car status is %v", resp.Car.Status)
	}
	return nil
}

// Unlock unlocks a car.
func (m *Manager) Unlock(c context.Context, cid id.CarID, aid id.AccountID, tid id.TripID, avatarURL string) error {
	_, err := m.CarService.UnlockCar(c, &car.UnlockCarRequest{
		Id: cid.String(),
		Driver: &base.Driver{
			Id:        aid.Int64(),
			AvatarUrl: avatarURL,
		},
		TripId: tid.String(),
	})
	if err != nil {
		return fmt.Errorf("cannot unlock: %v", err)
	}
	return nil
}

// Lock locks a car.
func (m *Manager) Lock(c context.Context, cid id.CarID, aid id.AccountID) error {
	_, err := m.CarService.LockCar(c, &car.LockCarRequest{
		AccountId: int64(aid),
		Id:        cid.String(),
	})
	if err != nil {
		return fmt.Errorf("cannot lock: %v", err)
	}
	return nil
}
