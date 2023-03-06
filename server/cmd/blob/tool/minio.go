package tool

import (
	"context"
	"github.com/minio/minio-go/v7"
	"time"
)

type Storage struct {
	client minio.Client
}

func NewStorage(client minio.Client) *Storage {
	return &Storage{client}
}

func (s *Storage) GetObjectURL(ctx context.Context, buckName string, objectName string, timeOut time.Duration) (string, error) {
	url, err := s.client.PresignedGetObject(ctx, buckName, objectName, timeOut, nil)
	if err != nil {
		return "", err
	}
	return url.Path, err
}

func (s *Storage) PutObjectURL(ctx context.Context, buckName string, objectName string, timeOut time.Duration) (string, error) {
	url, err := s.client.PresignedPutObject(ctx, buckName, objectName, timeOut)
	if err != nil {
		return "", err
	}
	return url.Path, nil
}
