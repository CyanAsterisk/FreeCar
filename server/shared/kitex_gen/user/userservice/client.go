// Code generated by Kitex v0.4.4. DO NOT EDIT.

package userservice

import (
	"context"
	user "github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/user"
	client "github.com/cloudwego/kitex/client"
	callopt "github.com/cloudwego/kitex/client/callopt"
)

// Client is designed to provide IDL-compatible methods with call-option parameter for kitex framework.
type Client interface {
	Login(ctx context.Context, req *user.LoginRequest, callOptions ...callopt.Option) (r *user.LoginResponse, err error)
	AdminLogin(ctx context.Context, req *user.AdminLoginRequest, callOptions ...callopt.Option) (r *user.AdminLoginResponse, err error)
	ChangeAdminPassword(ctx context.Context, req *user.ChangeAdminPasswordRequest, callOptions ...callopt.Option) (r *user.ChangeAdminPasswordResponse, err error)
	UploadAvatar(ctx context.Context, req *user.UploadAvatarRequset, callOptions ...callopt.Option) (r *user.UploadAvatarResponse, err error)
	GetUser(ctx context.Context, req *user.GetUserRequest, callOptions ...callopt.Option) (r *user.GetUserInfoResponse, err error)
	AddUser(ctx context.Context, req *user.AddUserRequest, callOptions ...callopt.Option) (r *user.AddUserResponse, err error)
	DeleteUser(ctx context.Context, req *user.DeleteUserRequest, callOptions ...callopt.Option) (r *user.DeleteUserResponse, err error)
	UpdateUser(ctx context.Context, req *user.UpdateUserRequest, callOptions ...callopt.Option) (r *user.UpdateUserResponse, err error)
	Pay(ctx context.Context, req *user.PayRequest, callOptions ...callopt.Option) (r *user.PayResponse, err error)
	GetSomeUsers(ctx context.Context, req *user.GetSomeUsersRequest, callOptions ...callopt.Option) (r *user.GetSomeUsersResponse, err error)
	GetAllUsers(ctx context.Context, req *user.GetAllUsersRequest, callOptions ...callopt.Option) (r *user.GetAllUsersResponse, err error)
}

// NewClient creates a client for the service defined in IDL.
func NewClient(destService string, opts ...client.Option) (Client, error) {
	var options []client.Option
	options = append(options, client.WithDestService(destService))

	options = append(options, opts...)

	kc, err := client.NewClient(serviceInfo(), options...)
	if err != nil {
		return nil, err
	}
	return &kUserServiceClient{
		kClient: newServiceClient(kc),
	}, nil
}

// MustNewClient creates a client for the service defined in IDL. It panics if any error occurs.
func MustNewClient(destService string, opts ...client.Option) Client {
	kc, err := NewClient(destService, opts...)
	if err != nil {
		panic(err)
	}
	return kc
}

type kUserServiceClient struct {
	*kClient
}

func (p *kUserServiceClient) Login(ctx context.Context, req *user.LoginRequest, callOptions ...callopt.Option) (r *user.LoginResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.Login(ctx, req)
}

func (p *kUserServiceClient) AdminLogin(ctx context.Context, req *user.AdminLoginRequest, callOptions ...callopt.Option) (r *user.AdminLoginResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.AdminLogin(ctx, req)
}

func (p *kUserServiceClient) ChangeAdminPassword(ctx context.Context, req *user.ChangeAdminPasswordRequest, callOptions ...callopt.Option) (r *user.ChangeAdminPasswordResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.ChangeAdminPassword(ctx, req)
}

func (p *kUserServiceClient) UploadAvatar(ctx context.Context, req *user.UploadAvatarRequset, callOptions ...callopt.Option) (r *user.UploadAvatarResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.UploadAvatar(ctx, req)
}

func (p *kUserServiceClient) GetUser(ctx context.Context, req *user.GetUserRequest, callOptions ...callopt.Option) (r *user.GetUserInfoResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetUser(ctx, req)
}

func (p *kUserServiceClient) AddUser(ctx context.Context, req *user.AddUserRequest, callOptions ...callopt.Option) (r *user.AddUserResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.AddUser(ctx, req)
}

func (p *kUserServiceClient) DeleteUser(ctx context.Context, req *user.DeleteUserRequest, callOptions ...callopt.Option) (r *user.DeleteUserResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.DeleteUser(ctx, req)
}

func (p *kUserServiceClient) UpdateUser(ctx context.Context, req *user.UpdateUserRequest, callOptions ...callopt.Option) (r *user.UpdateUserResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.UpdateUser(ctx, req)
}

func (p *kUserServiceClient) Pay(ctx context.Context, req *user.PayRequest, callOptions ...callopt.Option) (r *user.PayResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.Pay(ctx, req)
}

func (p *kUserServiceClient) GetSomeUsers(ctx context.Context, req *user.GetSomeUsersRequest, callOptions ...callopt.Option) (r *user.GetSomeUsersResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetSomeUsers(ctx, req)
}

func (p *kUserServiceClient) GetAllUsers(ctx context.Context, req *user.GetAllUsersRequest, callOptions ...callopt.Option) (r *user.GetAllUsersResponse, err error) {
	ctx = client.NewCtxWithCallOptions(ctx, callOptions)
	return p.kClient.GetAllUsers(ctx, req)
}
