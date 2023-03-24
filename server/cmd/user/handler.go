package main

import (
	"context"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/user/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/user"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"
	"github.com/cloudwego/kitex/client/callopt"
	"github.com/cloudwego/kitex/pkg/klog"
)

// UserServiceImpl implements the last service interface defined in the IDL.
type UserServiceImpl struct {
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

// Login implements the UserServiceImpl interface.
func (s *UserServiceImpl) Login(_ context.Context, req *user.LoginRequest) (resp *user.LoginResponse, err error) {
	resp = new(user.LoginResponse)
	// Resolve code to openID.
	openID := s.OpenIDResolver.Resolve(req.Code)
	if openID == "" {
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("bad open id"))
		return resp, nil
	}

	user, err := s.UserMysqlManager.GetUserByOpenId(openID)
	if err != nil {
		if err != errno.RecordNotFound {
			klog.Error("get user by open id err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr)
			return resp, nil
		}
		user, err = s.UserMysqlManager.CreateUser(&mysql.User{OpenID: openID})
		if err != nil {
			klog.Error("create user err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr)
			return resp, nil
		}
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.AccountId = user.ID
	return resp, nil
}

// AdminLogin implements the UserServiceImpl interface.
func (s *UserServiceImpl) AdminLogin(_ context.Context, req *user.AdminLoginRequest) (resp *user.AdminLoginResponse, err error) {
	resp = new(user.AdminLoginResponse)
	admin, err := s.AdminMysqlManager.GetAdminByName(req.Username)
	if err != nil {
		klog.Error("get password by name err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("login error"))
		return resp, nil
	}
	cryPassword := s.EncryptPassword(req.Password)
	if admin.Password != cryPassword {
		klog.Infof("%s login err", req.Username)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("wrong username or password"))
		return resp, nil
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.AccountId = admin.ID
	return resp, nil
}

// ChangeAdminPassword implements the UserServiceImpl interface.
func (s *UserServiceImpl) ChangeAdminPassword(_ context.Context, req *user.ChangeAdminPasswordRequest) (resp *user.ChangeAdminPasswordResponse, err error) {
	resp = new(user.ChangeAdminPasswordResponse)
	admin, err := s.AdminMysqlManager.GetAdminByAccountId(req.AccountId)
	if err != nil {
		klog.Error("get password by aid err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("change password error"))
		return resp, nil
	}
	cryPassword := s.EncryptManager.EncryptPassword(req.OldPassword)
	if admin.Password != cryPassword {
		klog.Infof("%s change password err", admin.Username)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("wrong password"))
		return resp, nil
	}
	err = s.UpdateAdminPassword(req.AccountId, req.NewPassword_)
	if err != nil {
		klog.Error("update password err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("change password error"))
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// UploadAvatar implements the UserServiceImpl interface.
func (s *UserServiceImpl) UploadAvatar(ctx context.Context, req *user.UploadAvatarRequset) (resp *user.UploadAvatarResponse, err error) {
	resp = new(user.UploadAvatarResponse)
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
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("upload avatar error\""))
		return resp, nil
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.UploadUrl = br.UploadUrl
	return resp, nil
}

// UpdateUser implements the UserServiceImpl interface.
func (s *UserServiceImpl) UpdateUser(_ context.Context, req *user.UpdateUserRequest) (resp *user.UpdateUserResponse, err error) {
	resp = new(user.UpdateUserResponse)
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
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr)
		return resp, nil
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetUser implements the UserServiceImpl interface.
func (s *UserServiceImpl) GetUser(ctx context.Context, req *user.GetUserRequest) (resp *user.GetUserInfoResponse, err error) {
	resp = new(user.GetUserInfoResponse)
	u, err := s.UserMysqlManager.GetUserByAccountId(req.AccontId)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
			return resp, nil
		}
		klog.Error("get user by accountId err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr)
		return resp, nil
	}
	resp.UserInfo = &user.UserInfo{
		AccountId:   u.ID,
		Username:    u.Username,
		PhoneNumber: u.PhoneNumber,
		AvatarUrl:   "",
	}
	if u.AvatarBlobId != 0 {
		res, err := s.BlobManager.GetBlobURL(ctx, &blob.GetBlobURLRequest{
			Id:         u.AvatarBlobId,
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

// AddUser implements the UserServiceImpl interface.
func (s *UserServiceImpl) AddUser(ctx context.Context, req *user.AddUserRequest) (resp *user.AddUserResponse, err error) {
	resp = new(user.AddUserResponse)
	_, err = s.UserMysqlManager.CreateUser(&mysql.User{
		ID:           req.AccountId,
		PhoneNumber:  req.PhoneNumber,
		AvatarBlobId: req.AvatarBlobId,
		Username:     req.Username,
		OpenID:       req.OpenId,
	})
	if err != nil {
		if err == errno.RecordAlreadyExist {
			klog.Error("add user error", err)
			resp.BaseResp = tools.BuildBaseResp(errno.RecordAlreadyExist)
			return resp, nil
		}
		klog.Error("add user error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr)
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// DeleteUser implements the UserServiceImpl interface.
func (s *UserServiceImpl) DeleteUser(ctx context.Context, req *user.DeleteUserRequest) (resp *user.DeleteUserResponse, err error) {
	resp = new(user.DeleteUserResponse)
	err = s.UserMysqlManager.DeleteUser(req.AccountId)
	if err != nil {
		klog.Error("delete user error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("delete user err"))
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetSomeUsers implements the UserServiceImpl interface.
func (s *UserServiceImpl) GetSomeUsers(ctx context.Context, req *user.GetSomeUsersRequest) (resp *user.GetSomeUsersResponse, err error) {
	resp = new(user.GetSomeUsersResponse)
	users, err := s.UserMysqlManager.GetSomeUsers()
	if err != nil {
		klog.Error("get users error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr)
		return resp, nil
	}
	var uInfos []*user.User
	for _, u := range users {
		var uInfo user.User
		uInfo.Username = u.Username
		uInfo.AccountId = u.ID
		uInfo.PhoneNumber = u.PhoneNumber
		uInfo.AvatarBlobId = u.AvatarBlobId
		uInfo.OpenId = u.OpenID
		uInfos = append(uInfos, &uInfo)
	}

	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.Users = uInfos
	return resp, nil
}

// GetAllUsers implements the UserServiceImpl interface.
func (s *UserServiceImpl) GetAllUsers(ctx context.Context, req *user.GetAllUsersRequest) (resp *user.GetAllUsersResponse, err error) {
	resp = new(user.GetAllUsersResponse)
	users, err := s.UserMysqlManager.GetAllUsers()
	if err != nil {
		klog.Error("get users error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.UserSrvErr.WithMessage("get users error"))
		return resp, nil
	}
	var uInfos []*user.User
	for _, u := range users {
		var uInfo user.User
		uInfo.Username = u.Username
		uInfo.AccountId = u.ID
		uInfo.PhoneNumber = u.PhoneNumber
		uInfo.AvatarBlobId = u.AvatarBlobId
		uInfo.OpenId = u.OpenID
		uInfos = append(uInfos, &uInfo)
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	resp.Users = uInfos
	return resp, nil
}
