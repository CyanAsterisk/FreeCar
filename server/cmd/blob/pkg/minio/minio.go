package minio

import (
	"context"
	"time"

	"github.com/minio/minio-go/v7"
)

type Manager struct {
	bucketName string
	client     *minio.Client
}

func NewManager(client *minio.Client, bucketName string) *Manager {
	return &Manager{bucketName: bucketName, client: client}
}

func (s *Manager) GetObjectURL(ctx context.Context, objectName string, timeOut time.Duration) (string, error) {
	url, err := s.client.PresignedGetObject(ctx, s.bucketName, objectName, timeOut, nil)
	if err != nil {
		return "", err
	}
	return url.String(), err
}

func (s *Manager) PutObjectURL(ctx context.Context, objectName string, timeOut time.Duration) (string, error) {
	url, err := s.client.PresignedPutObject(ctx, s.bucketName, objectName, timeOut)
	if err != nil {
		return "", err
	}
	return url.String(), nil
}
