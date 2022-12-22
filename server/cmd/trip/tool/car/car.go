package car

import (
	"context"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip"
	"github.com/CyanAsterisk/FreeCar/shared/id"
)

// Manager defines a car manager.
type Manager struct {
	CarService carservice.Client
}

// Verify verifies car status.
func (m *Manager) Verify(c context.Context, cid id.CarID, aid id.AccountID, _ *trip.Location) error {
	carClient, err := m.CarService.GetCar(c, &car.GetCarRequest{
		Id:        cid.String(),
		AccountId: int64(aid),
	})
	if err != nil {
		return fmt.Errorf("cannot get car: %v", err)
	}
	if carClient.Status != car.CarStatus_LOCKED {
		return fmt.Errorf("cannot unlock;car status is %v", carClient.Status)
	}
	return nil
}

// Unlock unlocks a car.
func (m *Manager) Unlock(c context.Context, cid id.CarID, aid id.AccountID, tid id.TripID, avatarURL string) error {
	_, err := m.CarService.UnlockCar(c, &car.UnlockCarRequest{
		Id: cid.String(),
		Driver: &car.Driver{
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
