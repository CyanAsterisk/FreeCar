package main

import (
	"context"

	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/kitex_gen/auth"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/model"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/tool"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

// AuthServiceImpl implements the last service interface defined in the IDL.
type AuthServiceImpl struct{}

// Login implements the AuthServiceImpl interface.
func (s *AuthServiceImpl) Login(_ context.Context, req *auth.LoginRequest) (resp *auth.LoginResponse, err error) {
	// Resolve code to openID.
	openID := tool.Resolve(req.Code)
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
		return &auth.LoginResponse{AccountID: user.ID}, nil
	}
	if result.Error != nil {
		return nil, result.Error
	}

	return &auth.LoginResponse{AccountID: user.ID}, nil
}
