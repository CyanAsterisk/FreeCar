package main

import (
	"context"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/kitex_gen/auth"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/model"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/tool"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

// AuthServiceImpl implements the last service interface defined in the IDL.
type AuthServiceImpl struct {
	OpenIDResolver OpenIDResolver
}

// OpenIDResolver resolves an authorization code
// to an open id.
type OpenIDResolver interface {
	Resolve(code string) string
}

// Login implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) Login(_ context.Context, req *auth.LoginRequest) (resp *auth.LoginResponse, err error) {
	// Resolve code to openID.
	openID := s.OpenIDResolver.Resolve(req.Code)
	if openID == "" {
		return nil, status.Errorf(codes.Unavailable, "cannot resolve code{%s} to openid", req.Code)
	}
	var user model.User
	// Encrypt with md5.
	cryOpenID := tool.Md5Crypt(openID, global.ServerConfig.MysqlInfo.Salt)
	result := global.DB.Where(&model.User{OpenID: cryOpenID}).First(&user)
	// Add new user to database.
	if result.RowsAffected == 0 {
		user.OpenID = cryOpenID
		result = global.DB.Create(&user)
		if result.Error != nil {
			return nil, status.Errorf(codes.Internal, result.Error.Error())
		}
		return &auth.LoginResponse{AccountId: user.ID}, nil
	}
	if result.Error != nil {
		return nil, result.Error
	}

	return &auth.LoginResponse{AccountId: user.ID}, nil
}

// UploadAvatar implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) UploadAvatar(ctx context.Context, req *auth.UploadAvatarRequset) (*auth.UploadAvatarResponse, error) {
	aid := req.AccountId
	br, err := global.BlobClient.CreateBlob(ctx, &blob.CreateBlobRequest{
		AccountId:           aid,
		UploadUrlTimeoutSec: int32(10 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot create blob", err)
		return nil, status.Err(codes.Aborted, "")
	}

	var user model.User
	user.ID = req.AccountId
	global.DB.Model(&user).Update("avatar_blob_id", br.Id)

	return &auth.UploadAvatarResponse{
		UploadUrl: br.UploadUrl,
	}, nil
}

// UpdateUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) UpdateUser(_ context.Context, req *auth.UpdateUserRequest) (resp *auth.UpdateUserResponse, err error) {
	var user model.User
	user.ID = req.AccountId

	u := map[string]interface{}{}
	if req.Username != "" {
		u["username"] = req.Username
	}
	if req.PhoneNumber != 0 {
		u["phone_number"] = req.PhoneNumber
	}
	global.DB.Model(&user).Updates(u)
	return
}

// GetUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) GetUser(ctx context.Context, req *auth.GetUserRequest) (resp *auth.UserInfo, err error) {
	var user model.User
	result := global.DB.Where(&model.User{ID: req.AccontId}).First(&user)

	if result.RowsAffected == 0 {
		return nil, status.Errorf(codes.NotFound, result.Error.Error())
	}

	resp = &auth.UserInfo{
		AccountId:   user.ID,
		Username:    user.Username,
		PhoneNumber: user.PhoneNumber,
		AvatarUrl:   "",
	}

	if user.AvatarBlobId != 0 {
		res, err := global.BlobClient.GetBlobURL(ctx, &blob.GetBlobURLRequest{
			Id:         user.AvatarBlobId,
			TimeoutSec: int32(5 * time.Second.Seconds()),
		})
		if err != nil {
			return nil, status.Errorf(codes.Internal, err.Error())
		}
		resp.AvatarUrl = res.Url
	}
	return
}
