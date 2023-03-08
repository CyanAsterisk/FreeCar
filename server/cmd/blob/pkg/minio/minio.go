package minio

import (
	"context"
	"time"

	"github.com/minio/minio-go/v7"
)

type Manager struct {
	client minio.Client
}

func NewStorage(client minio.Client) *Manager {
	return &Manager{client}
}

func (s *Manager) GetObjectURL(ctx context.Context, buckName, objectName string, timeOut time.Duration) (string, error) {
	url, err := s.client.PresignedGetObject(ctx, buckName, objectName, timeOut, nil)
	if err != nil {
		return "", err
	}
	return url.Path, err
}

func (s *Manager) PutObjectURL(ctx context.Context, buckName, objectName string, timeOut time.Duration) (string, error) {
	url, err := s.client.PresignedPutObject(ctx, buckName, objectName, timeOut)
	if err != nil {
		return "", err
	}
	return url.Path, nil
}
