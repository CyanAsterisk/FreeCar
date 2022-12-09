package main

import (
	"context"

	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/kitex_gen/auth"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/model"
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
	openID := s.OpenIDResolver.Resolve(req.Code)

	var user model.User
	result := global.DB.Where(&model.User{OpenID: openID}).First(&user)

	if result.RowsAffected == 0 {
		return nil, status.Errorf(codes.NotFound, "User doesn't exist.")
	}
	if result.Error != nil {
		return nil, result.Error
	}

	return &auth.LoginResponse{AccountID: user.ID}, nil
}
