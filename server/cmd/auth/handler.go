package main

import (
	"context"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/auth"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/cloudwego/kitex/client/callopt"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

// AuthServiceImpl implements the last service interface defined in the IDL.
type AuthServiceImpl struct {
	OpenIDResolver
	MysqlManager
	BlobManager
}

// OpenIDResolver resolves an authorization code
// to an open id.
type OpenIDResolver interface {
	Resolve(code string) string
}

type MysqlManager interface {
	CreateUser(openID string) (*mysql.User, error)
	GetUserByOpenId(openId string) (*mysql.User, error)
	GetUserByAccountId(aid int64) (*mysql.User, error)
	UpdateUser(user *mysql.User) error
}

// BlobManager defines the Anti Corruption Layer
// for get blob logic.
type BlobManager interface {
	GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest, callOptions ...callopt.Option) (*blob.GetBlobURLResponse, error)
	CreateBlob(ctx context.Context, req *blob.CreateBlobRequest, callOptions ...callopt.Option) (*blob.CreateBlobResponse, error)
}

// Login implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) Login(_ context.Context, req *auth.LoginRequest) (resp *auth.LoginResponse, err error) {
	// Resolve code to openID.
	openID := s.OpenIDResolver.Resolve(req.Code)
	if openID == "" {
		return nil, errno.AuthSrvErr.WithMessage("bad open id")
	}

	user, err := s.MysqlManager.GetUserByOpenId(openID)
	if err != nil {
		if err != errno.RecordNotFound {
			klog.Error("get user by open id err", err)
			return nil, errno.AuthSrvErr.WithMessage("")
		}
		user, err = s.MysqlManager.CreateUser(openID)
		if err != nil {
			klog.Error("create user err", err)
			return nil, errno.AuthSrvErr
		}
	}
	return &auth.LoginResponse{AccountId: user.ID}, nil
}

// UploadAvatar implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) UploadAvatar(ctx context.Context, req *auth.UploadAvatarRequset) (*auth.UploadAvatarResponse, error) {
	aid := req.AccountId
	br, err := s.BlobManager.CreateBlob(ctx, &blob.CreateBlobRequest{
		AccountId:           aid,
		UploadUrlTimeoutSec: int32(10 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot create blob", err)
		return nil, status.Err(codes.Aborted, "")
	}

	if err = s.MysqlManager.UpdateUser(&mysql.User{
		ID:           req.AccountId,
		AvatarBlobId: br.Id,
	}); err != nil {
		if err == errno.RecordNotFound {
			return nil, errno.RecordNotFound
		}
		klog.Error("update user blob id error", err)
		return nil, errno.AuthSrvErr.WithMessage("upload avatar error")
	}
	return &auth.UploadAvatarResponse{
		UploadUrl: br.UploadUrl,
	}, nil
}

// UpdateUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) UpdateUser(_ context.Context, req *auth.UpdateUserRequest) (resp *auth.UpdateUserResponse, err error) {
	err = s.MysqlManager.UpdateUser(&mysql.User{
		ID:          req.AccountId,
		PhoneNumber: req.PhoneNumber,
		Username:    req.Username,
	})
	if err != nil {
		if err == errno.RecordNotFound {
			return nil, errno.RecordNotFound
		}
		klog.Error("update user error", err)
		return nil, errno.AuthSrvErr.WithMessage("update user info error")
	}
	return
}

// GetUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) GetUser(ctx context.Context, req *auth.GetUserRequest) (resp *auth.UserInfo, err error) {
	user, err := s.MysqlManager.GetUserByAccountId(req.AccontId)
	if err != nil {
		if err == errno.RecordNotFound {
			return nil, errno.RecordNotFound
		}
		klog.Error("get user by accountId err", err)
		return nil, errno.AuthSrvErr.WithMessage("get user by accountId err")
	}
	resp = &auth.UserInfo{
		AccountId:   user.ID,
		Username:    user.Username,
		PhoneNumber: user.PhoneNumber,
		AvatarUrl:   "",
	}
	if user.AvatarBlobId != 0 {
		res, err := s.BlobManager.GetBlobURL(ctx, &blob.GetBlobURLRequest{
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
