package main

import (
	"context"
	"fmt"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/minio"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/redis"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
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

	sf, err := snowflake.NewNode(consts.BlobSnowflakeNode)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	br.Path = fmt.Sprintf("%d/%d", req.AccountId, sf.Generate().Int64())

	err = s.mysqlManager.CreateBlobRecord(&br)
	if err != nil {
		klog.Error("create blob record err", err)
		return nil, errno.BlobSrvErr
	}
	url, err := s.minioManager.PutObjectURL(ctx, br.Path, time.Duration(req.UploadUrlTimeoutSec)*time.Second)
	if err != nil {
		klog.Error("presigned put object url err", err)
		return nil, errno.BlobSrvErr
	}
	return &blob.CreateBlobResponse{
		Id:        br.ID,
		UploadUrl: url,
	}, nil
}

// GetBlobURL implements the BlobServiceImpl interface.
func (s *BlobServiceImpl) GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest) (*blob.GetBlobURLResponse, error) {
	br, err := s.redisManager.Get(ctx, id.BlobID(req.Id))
	if err != nil {
		klog.Error("get blob cache err", err)
		br, err = s.mysqlManager.GetBlobRecord(req.Id)
		if err == errno.RecordNotFound {
			return nil, errno.RecordNotFound
		}
		if err != nil {
			klog.Error("get blob record err", err)
			return nil, errno.BlobSrvErr.WithMessage("get blob record err")
		}
		go func() {
			if err := s.redisManager.Insert(context.Background(), br); err != nil {
				klog.Error("create cache record err", err)
			}
		}()
	}
	url, err := s.minioManager.GetObjectURL(ctx, br.Path, time.Duration(req.TimeoutSec)*time.Second)
	if err != nil {
		klog.Error("cannot get object url", err)
		return nil, errno.BlobSrvErr
	}

	return &blob.GetBlobURLResponse{Url: url}, nil
}
