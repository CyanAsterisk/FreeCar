package main

import (
	"context"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/model"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/tool"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

// BlobServiceImpl implements the last service interface defined in the IDL.
type BlobServiceImpl struct{}

// CreateBlob implements the BlobServiceImpl interface.
func (s *BlobServiceImpl) CreateBlob(ctx context.Context, req *blob.CreateBlobRequest) (*blob.CreateBlobResponse, error) {

	var br model.BlobRecord
	result := global.DB.Where(&model.BlobRecord{AccountId: req.AccountId}).First(&br)

	// Add new blobRecord to database.
	if result.RowsAffected == 0 {
		br.AccountId = req.AccountId
		result = global.DB.Create(&br)
		if result.Error != nil {
			return nil, status.Errorf(codes.Internal, result.Error.Error())
		}
	}

	url, err := tool.SignURL(ctx, http.MethodPut, br.Path, time.Duration(req.UploadUrlTimeoutSec)*time.Second)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot sign url: %v", err)
	}

	return &blob.CreateBlobResponse{
		Id:        br.ID,
		UploadUrl: url,
	}, nil
}

// GetBlob implements the BlobServiceImpl interface.
func (s *BlobServiceImpl) GetBlob(ctx context.Context, req *blob.GetBlobRequest) (*blob.GetBlobResponse, error) {

	var br model.BlobRecord
	result := global.DB.Where(&model.BlobRecord{ID: req.Id}).First(&br)

	if result.RowsAffected == 0 {
		return nil, status.Errorf(codes.NotFound, "")
	}

	r, err := tool.CosGet(ctx, br.Path)
	if r != nil {
		defer r.Close()
	}

	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot get storage: %v", err)
	}

	data, err := ioutil.ReadAll(r)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot read from response: %v", err)
	}

	return &blob.GetBlobResponse{Data: data}, nil
}

// GetBlobURL implements the BlobServiceImpl interface.
func (s *BlobServiceImpl) GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest) (*blob.GetBlobURLResponse, error) {
	var br model.BlobRecord

	result := global.DB.Where(&model.BlobRecord{ID: req.Id}).First(&br)
	if result.RowsAffected == 0 {
		return nil, status.Errorf(codes.NotFound, "")
	}

	url, err := tool.SignURL(ctx, http.MethodGet, br.Path, time.Duration(req.TimeoutSec)*time.Second)
	if err != nil {
		return nil, status.Errorf(codes.Aborted, "cannot sigh url: %v", err)
	}

	return &blob.GetBlobURLResponse{Url: url}, nil
}
