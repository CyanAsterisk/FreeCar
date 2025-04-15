package main

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/minio"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
)

// BlobServiceImpl implements the last service interface defined in the IDL.
type BlobServiceImpl struct {
	minioManager *minio.Manager
	mysqlManager *mysql.Manager
}

// CreateBlob implements the BlobServiceImpl interface.
func (s *BlobServiceImpl) CreateBlob(ctx context.Context, req *blob.CreateBlobRequest) (*blob.CreateBlobResponse, error) {
	var br mysql.BlobRecord
	br.AccountId = req.AccountId

	sf, err := snowflake.NewNode(consts.BlobSnowflakeNode)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	br.Path = fmt.Sprintf("%s/%s", req.AccountId, sf.Generate().String())

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
	br, err := s.mysqlManager.GetBlobRecord(req.Id)
	if errors.Is(err, errno.RecordNotFound) {
		return nil, errno.RecordNotFound
	}
	if err != nil {
		klog.Error("get blob record err", err)
		return nil, errno.BlobSrvErr.WithMessage("get blob record err")
	}

	url, err := s.minioManager.GetObjectURL(ctx, br.Path, time.Duration(req.TimeoutSec)*time.Second)
	if err != nil {
		klog.Error("cannot get object url", err)
		return nil, errno.BlobSrvErr
	}

	return &blob.GetBlobURLResponse{Url: url}, nil
}
