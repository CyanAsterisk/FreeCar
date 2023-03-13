package redis

import (
	"context"
	"strconv"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/bytedance/sonic"
	"github.com/go-redis/redis/v8"
)

type Manager struct {
	client *redis.Client
}

// NewManager creates a new redis manager.
func NewManager(client *redis.Client) *Manager {
	return &Manager{client: client}
}

func (m *Manager) Insert(c context.Context, br *mysql.BlobRecord) error {
	bj, err := sonic.Marshal(*br)
	if err != nil {
		return err
	}
	return m.client.Set(c, strconv.FormatInt(br.ID, 10), bj, 168*time.Hour).Err()
}

func (m *Manager) Remove(c context.Context, bid id.BlobID) error {
	return m.client.Del(c, bid.String()).Err()
}

func (m *Manager) Get(c context.Context, bid id.BlobID) (*mysql.BlobRecord, error) {
	bj, err := m.client.Get(c, bid.String()).Result()
	if err != nil {
		if err == redis.Nil {
			return nil, errno.RecordNotFound
		}
		return nil, err
	}
	var br mysql.BlobRecord
	if err = sonic.UnmarshalString(bj, &br); err != nil {
		return nil, err
	}
	return &br, nil
}
