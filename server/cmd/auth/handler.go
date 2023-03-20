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
	EncryptManager
	AdminMysqlManager
	UserMysqlManager
	BlobManager
}

// OpenIDResolver resolves an authorization code
// to an open id.
type OpenIDResolver interface {
	Resolve(code string) string
}

type EncryptManager interface {
	EncryptPassword(code string) string
}

type UserMysqlManager interface {
	CreateUser(user *mysql.User) (*mysql.User, error)
	GetUserByOpenId(openId string) (*mysql.User, error)
	GetUserByAccountId(aid int64) (*mysql.User, error)
	GetSomeUsers() ([]*mysql.User, error)
	GetAllUsers() ([]*mysql.User, error)
	UpdateUser(user *mysql.User) error
	DeleteUser(aid int64) error
}

type AdminMysqlManager interface {
	GetAdminByAccountId(aid int64) (*mysql.Admin, error)
	GetAdminByName(name string) (*mysql.Admin, error)
	UpdateAdminPassword(aid int64, password string) error
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

	user, err := s.UserMysqlManager.GetUserByOpenId(openID)
	if err != nil {
		if err != errno.RecordNotFound {
			klog.Error("get user by open id err", err)
			return nil, errno.AuthSrvErr.WithMessage("")
		}
		user, err = s.UserMysqlManager.CreateUser(&mysql.User{OpenID: openID})
		if err != nil {
			klog.Error("create user err", err)
			return nil, errno.AuthSrvErr
		}
	}
	return &auth.LoginResponse{AccountId: user.ID}, nil
}

// AdminLogin implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) AdminLogin(_ context.Context, req *auth.AdminLoginRequest) (resp *auth.AdminLoginResponse, err error) {
	admin, err := s.AdminMysqlManager.GetAdminByName(req.Username)
	if err != nil {
		klog.Error("get password by name err", err)
		return nil, errno.AuthSrvErr.WithMessage("login error")
	}
	cryPassword := s.EncryptPassword(req.Password)
	if admin.Password != cryPassword {
		klog.Infof("%s login err", req.Username)
		return nil, errno.AuthSrvErr.WithMessage("wrong username or password")
	}
	return &auth.AdminLoginResponse{AccountId: admin.ID}, nil
}

// ChangeAdminPassword implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) ChangeAdminPassword(_ context.Context, req *auth.ChangeAdminPasswordRequest) (resp *auth.ChangeAdminPasswordResponse, err error) {
	admin, err := s.AdminMysqlManager.GetAdminByAccountId(req.AccountId)
	if err != nil {
		klog.Error("get password by aid err", err)
		return nil, errno.AuthSrvErr.WithMessage("change password error")
	}
	cryPassword := s.EncryptManager.EncryptPassword(req.OldPassword)
	if admin.Password != cryPassword {
		klog.Infof("%s change password err", admin.Username)
		return nil, errno.AuthSrvErr.WithMessage("wrong password")
	}
	err = s.UpdateAdminPassword(req.AccountId, req.NewPassword_)
	if err != nil {
		klog.Error("update password err", err)
		return nil, errno.AuthSrvErr.WithMessage("change password error")
	}
	return &auth.ChangeAdminPasswordResponse{}, nil
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

	if err = s.UserMysqlManager.UpdateUser(&mysql.User{
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
	err = s.UserMysqlManager.UpdateUser(&mysql.User{
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
	user, err := s.UserMysqlManager.GetUserByAccountId(req.AccontId)
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

// AddUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) AddUser(ctx context.Context, req *auth.AddUserRequest) (resp *auth.AddUserResponse, err error) {
	_, err = s.UserMysqlManager.CreateUser(&mysql.User{
		ID:           req.AccountId,
		PhoneNumber:  req.PhoneNumber,
		AvatarBlobId: req.AvatarBlobId,
		Username:     req.Username,
		OpenID:       req.OpenId,
	})
	if err != nil {
		if err == errno.RecordNotFound {
			return nil, nil
		}
		klog.Error("update user error", err)
		return nil, errno.AuthSrvErr.WithMessage("add user error")
	}
	return
}

// DeleteUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) DeleteUser(ctx context.Context, req *auth.DeleteUserRequest) (resp *auth.DeleteUserResponse, err error) {
	err = s.UserMysqlManager.DeleteUser(req.AccountId)
	if err != nil {
		klog.Error("delete user error", err)
		return nil, errno.AuthSrvErr.WithMessage("delete user error")
	}
	return
}

// GetSomeUsers implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) GetSomeUsers(ctx context.Context, req *auth.GetSomeUsersRequest) (resp *auth.GetSomeUsersResponse, err error) {
	users, err := s.UserMysqlManager.GetSomeUsers()
	if err != nil {
		klog.Error("get users error", err)
		return nil, errno.AuthSrvErr.WithMessage("get users error")
	}
	var uInfos []*auth.User
	for _, user := range users {
		var uInfo auth.User
		uInfo.Username = user.Username
		uInfo.AccountId = user.ID
		uInfo.PhoneNumber = user.PhoneNumber
		uInfo.AvatarBlobId = user.AvatarBlobId
		uInfo.OpenId = user.OpenID
		uInfos = append(uInfos, &uInfo)
	}
	return &auth.GetSomeUsersResponse{Users: uInfos}, nil
}

// GetAllUsers implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) GetAllUsers(ctx context.Context, req *auth.GetAllUsersRequest) (resp *auth.GetAllUsersResponse, err error) {
	users, err := s.UserMysqlManager.GetAllUsers()
	if err != nil {
		klog.Error("get users error", err)
		return nil, errno.AuthSrvErr.WithMessage("get users error")
	}
	var uInfos []*auth.User
	for _, user := range users {
		var uInfo auth.User
		uInfo.Username = user.Username
		uInfo.AccountId = user.ID
		uInfo.PhoneNumber = user.PhoneNumber
		uInfo.AvatarBlobId = user.AvatarBlobId
		uInfo.OpenId = user.OpenID
		uInfos = append(uInfos, &uInfo)
	}
	return &auth.GetAllUsersResponse{Users: uInfos}, nil
}
