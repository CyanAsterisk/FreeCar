package pkg

import (
	"context"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	"github.com/bytedance/sonic"
	"github.com/go-redis/redis/v8"
)

type RedisManager struct {
	RedisClient *redis.Client
}

func NewRedisManager(client *redis.Client) *RedisManager {
	return &RedisManager{RedisClient: client}
}

func (r *RedisManager) GetProfile(c context.Context, aid id.AccountID) (*profile.Profile, error) {
	if p, err := r.RedisClient.Get(c, aid.String()).Result(); err != nil {
		return nil, err
	} else {
		var pv *profile.Profile
		if err = sonic.UnmarshalString(p, pv); err != nil {
			return nil, err
		}
		return pv, nil
	}
}

func (r *RedisManager) InsertProfile(c context.Context, aid id.AccountID, p *profile.Profile) error {
	pv, err := sonic.Marshal(p)
	if err != nil {
		return err
	}
	if err = r.RedisClient.Set(c, aid.String(), pv, 168*time.Hour).Err(); err != nil {
		return err
	}
	return nil
}

func (r *RedisManager) RemoveProfile(c context.Context, aid id.AccountID) error {
	if err := r.RedisClient.Del(c, aid.String()).Err(); err != nil {
		return err
	}
	return nil
}
