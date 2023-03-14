package redis

import (
	"context"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	"github.com/bytedance/sonic"
	"github.com/go-redis/redis/v8"
)

type Manager struct {
	RedisClient *redis.Client
}

func NewManager(client *redis.Client) *Manager {
	return &Manager{RedisClient: client}
}

func (r *Manager) GetProfile(c context.Context, aid id.AccountID) (*profile.Profile, error) {
	p, err := r.RedisClient.Get(c, aid.String()).Result()
	if err != nil {
		if err == redis.Nil {
			return nil, errno.RecordNotFound
		}
		return nil, err
	}
	var pv profile.Profile
	if err = sonic.UnmarshalString(p, &pv); err != nil {
		return nil, err
	}
	return &pv, nil
}

func (r *Manager) InsertProfile(c context.Context, aid id.AccountID, p *profile.Profile) error {
	_, err := r.RedisClient.Get(c, aid.String()).Result()
	if err != redis.Nil {
		if err == nil {
			return errno.RecordAlreadyExist
		} else {
			return err
		}
	}
	pv, err := sonic.Marshal(p)
	if err != nil {
		return err
	}
	if err = r.RedisClient.Set(c, aid.String(), pv, 168*time.Hour).Err(); err != nil {
		return err
	}
	return nil
}

func (r *Manager) RemoveProfile(c context.Context, aid id.AccountID) error {
	if err := r.RedisClient.Del(c, aid.String()).Err(); err != nil {
		return err
	}
	return nil
}
