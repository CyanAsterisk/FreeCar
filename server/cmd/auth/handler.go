package main

import (
	"context"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/auth"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"
	"github.com/cloudwego/kitex/client/callopt"
	"github.com/cloudwego/kitex/pkg/klog"
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
	resp = new(auth.LoginResponse)
	// Resolve code to openID.
	openID := s.OpenIDResolver.Resolve(req.Code)
	if openID == "" {
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("bad open id"))
		return resp, nil
	}

	user, err := s.UserMysqlManager.GetUserByOpenId(openID)
	if err != nil {
		if err != errno.RecordNotFound {
			klog.Error("get user by open id err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr)
			return resp, nil
		}
		user, err = s.UserMysqlManager.CreateUser(&mysql.User{OpenID: openID})
		if err != nil {
			klog.Error("create user err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr)
			return resp, nil
		}
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.AccountId = user.ID
	return resp, nil
}

// AdminLogin implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) AdminLogin(_ context.Context, req *auth.AdminLoginRequest) (resp *auth.AdminLoginResponse, err error) {
	resp = new(auth.AdminLoginResponse)
	admin, err := s.AdminMysqlManager.GetAdminByName(req.Username)
	if err != nil {
		klog.Error("get password by name err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("login error"))
		return resp, nil
	}
	cryPassword := s.EncryptPassword(req.Password)
	if admin.Password != cryPassword {
		klog.Infof("%s login err", req.Username)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("wrong username or password"))
		return resp, nil
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.AccountId = admin.ID
	return resp, nil
}

// ChangeAdminPassword implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) ChangeAdminPassword(_ context.Context, req *auth.ChangeAdminPasswordRequest) (resp *auth.ChangeAdminPasswordResponse, err error) {
	resp = new(auth.ChangeAdminPasswordResponse)
	admin, err := s.AdminMysqlManager.GetAdminByAccountId(req.AccountId)
	if err != nil {
		klog.Error("get password by aid err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("change password error"))
		return resp, nil
	}
	cryPassword := s.EncryptManager.EncryptPassword(req.OldPassword)
	if admin.Password != cryPassword {
		klog.Infof("%s change password err", admin.Username)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("wrong password"))
		return resp, nil
	}
	err = s.UpdateAdminPassword(req.AccountId, req.NewPassword_)
	if err != nil {
		klog.Error("update password err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("change password error"))
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// UploadAvatar implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) UploadAvatar(ctx context.Context, req *auth.UploadAvatarRequset) (resp *auth.UploadAvatarResponse, err error) {
	resp = new(auth.UploadAvatarResponse)
	aid := req.AccountId
	br, err := s.BlobManager.CreateBlob(ctx, &blob.CreateBlobRequest{
		AccountId:           aid,
		UploadUrlTimeoutSec: int32(10 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot create blob", err)
		resp.BaseResp = tools.BuildBaseResp(errno.BlobSrvErr)
		return resp, nil
	}

	if err = s.UserMysqlManager.UpdateUser(&mysql.User{
		ID:           req.AccountId,
		AvatarBlobId: br.Id,
	}); err != nil {
		if err == errno.RecordNotFound {
			return nil, errno.RecordNotFound
		}
		klog.Error("update user blob id error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("upload avatar error\""))
		return resp, nil
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.UploadUrl = br.UploadUrl
	return resp, nil
}

// UpdateUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) UpdateUser(_ context.Context, req *auth.UpdateUserRequest) (resp *auth.UpdateUserResponse, err error) {
	resp = new(auth.UpdateUserResponse)
	err = s.UserMysqlManager.UpdateUser(&mysql.User{
		ID:          req.AccountId,
		PhoneNumber: req.PhoneNumber,
		Username:    req.Username,
	})
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
			return resp, nil
		}
		klog.Error("update user error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr)
		return resp, nil
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) GetUser(ctx context.Context, req *auth.GetUserRequest) (resp *auth.GetUserInfoResponse, err error) {
	resp = new(auth.GetUserInfoResponse)
	user, err := s.UserMysqlManager.GetUserByAccountId(req.AccontId)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
			return resp, nil
		}
		klog.Error("get user by accountId err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr)
		return resp, nil
	}
	resp.UserInfo = &auth.UserInfo{
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
			klog.Error("get blob url err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.BlobSrvErr)
			return resp, nil
		}
		resp.UserInfo.AvatarUrl = res.Url
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
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
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
			return resp, nil
		}
		klog.Error("update user error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr)
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// DeleteUser implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) DeleteUser(ctx context.Context, req *auth.DeleteUserRequest) (resp *auth.DeleteUserResponse, err error) {
	resp = new(auth.DeleteUserResponse)
	err = s.UserMysqlManager.DeleteUser(req.AccountId)
	if err != nil {
		klog.Error("delete user error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("delete user err"))
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetSomeUsers implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) GetSomeUsers(ctx context.Context, req *auth.GetSomeUsersRequest) (resp *auth.GetSomeUsersResponse, err error) {
	resp = new(auth.GetSomeUsersResponse)
	users, err := s.UserMysqlManager.GetSomeUsers()
	if err != nil {
		klog.Error("get users error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr)
		return resp, nil
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

	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.Users = uInfos
	return resp, nil
}

// GetAllUsers implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) GetAllUsers(ctx context.Context, req *auth.GetAllUsersRequest) (resp *auth.GetAllUsersResponse, err error) {
	resp = new(auth.GetAllUsersResponse)
	users, err := s.UserMysqlManager.GetAllUsers()
	if err != nil {
		klog.Error("get users error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.AuthSrvErr.WithMessage("get users error"))
		return resp, nil
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
	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.Users = uInfos
	return resp, nil
}
