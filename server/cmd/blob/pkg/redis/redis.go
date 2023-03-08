package redis

import "github.com/go-redis/redis/v8"

type Manager struct {
	client *redis.Client
}

// NewManager creates a new redis manager.
func NewManager(client *redis.Client) *Manager {
	return &Manager{client: client}
}
