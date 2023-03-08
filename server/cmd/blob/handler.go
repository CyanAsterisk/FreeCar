package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/minio"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/redis"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

// BlobServiceImpl implements the last service interface defined in the IDL.
type BlobServiceImpl struct {
	minioManager *minio.Manager
	mysqlManager *mysql.Manager
	redisManager *redis.Manager
}

// CreateBlob implements the BlobServiceImpl interface.
func (s *BlobServiceImpl) CreateBlob(ctx context.Context, req *blob.CreateBlobRequest) (*blob.CreateBlobResponse, error) {
	var br mysql.BlobRecord
	br.AccountId = req.AccountId

	sf, err := snowflake.NewNode(3)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	br.Path = fmt.Sprintf("%d/%d", req.AccountId, sf.Generate().Int64())

	err = s.mysqlManager.CreateBlobRecord(&br)
	if err != nil {
		return nil, status.Errorf(codes.Internal, err.Error())
	}
	url, err := s.minioManager.PutObjectURL(ctx, http.MethodPut, br.Path, time.Duration(req.UploadUrlTimeoutSec)*time.Second)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot sign url: %v", err)
	}
	return &blob.CreateBlobResponse{
		Id:        br.ID,
		UploadUrl: url,
	}, nil
}

// GetBlobURL implements the BlobServiceImpl interface.
func (s *BlobServiceImpl) GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest) (*blob.GetBlobURLResponse, error) {
	br, err := s.mysqlManager.GetBlobRecord(req.Id)
	if err != nil {
		return nil, err
	}
	url, err := s.minioManager.GetObjectURL(ctx, http.MethodGet, br.Path, time.Duration(req.TimeoutSec)*time.Second)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot sigh url: %v", err)
	}

	return &blob.GetBlobURLResponse{Url: url}, nil
}
