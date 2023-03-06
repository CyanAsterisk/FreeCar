package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/model"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/pkg"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

// BlobServiceImpl implements the last service interface defined in the IDL.
type BlobServiceImpl struct {
	pkg.Storage
}

// CreateBlob implements the BlobServiceImpl interface.
func (s *BlobServiceImpl) CreateBlob(ctx context.Context, req *blob.CreateBlobRequest) (*blob.CreateBlobResponse, error) {
	var br model.BlobRecord
	br.AccountId = req.AccountId

	sf, err := snowflake.NewNode(3)
	if err != nil {
		klog.Fatalf("generate id failed: %s", err.Error())
	}
	br.Path = fmt.Sprintf("%d/%d", req.AccountId, sf.Generate().Int64())

	result := config.DB.Create(&br)
	if result.Error != nil {
		return nil, status.Errorf(codes.Internal, result.Error.Error())
	}
	url, err := s.Storage.PutObjectURL(ctx, http.MethodPut, br.Path, time.Duration(req.UploadUrlTimeoutSec)*time.Second)
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
	var br model.BlobRecord

	result := config.DB.Where(&model.BlobRecord{ID: req.Id}).First(&br)
	if result.RowsAffected == 0 {
		return nil, status.Errorf(codes.NotFound, "")
	}

	url, err := s.Storage.PutObjectURL(ctx, http.MethodGet, br.Path, time.Duration(req.TimeoutSec)*time.Second)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot sigh url: %v", err)
	}

	return &blob.GetBlobURLResponse{Url: url}, nil
}
