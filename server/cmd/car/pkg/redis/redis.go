package redis

import (
	"context"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	car "github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/bytedance/sonic"
	"github.com/go-redis/redis/v8"
)

type Manager struct {
	client *redis.Client
}

// NewManager creates a redis manager.
func NewManager(client *redis.Client) *Manager {
	return &Manager{client: client}
}

func (m *Manager) GetCar(c context.Context, cid id.CarID) (*car.CarEntity, error) {
	cj, err := m.client.Get(c, cid.String()).Result()
	if err != nil {
		if err == redis.Nil {
			return nil, errno.RecordNotFound
		}
		return nil, err
	}
	var cr car.Car
	if err = sonic.UnmarshalString(cj, &cr); err != nil {
		return nil, err
	}
	return &car.CarEntity{
		Id:  cid.String(),
		Car: &cr,
	}, nil
}

func (m *Manager) InsertCar(c context.Context, cid id.CarID, cr *car.Car) error {
	cj, err := sonic.Marshal(cr)
	if err != nil {
		return err
	}
	if err = m.client.Set(c, cid.String(), cj, 168*time.Hour).Err(); err != nil {
		return err
	}
	return nil
}

func (m *Manager) RemoveCar(c context.Context, cid id.CarID) error {
	return m.client.Del(c, cid.String()).Err()
}
