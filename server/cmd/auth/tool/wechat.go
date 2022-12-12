package tool

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/global"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/medivhzhan/weapp/v2"
)

type AuthServiceImpl struct {
}

// Resolve resolves authorization code to WeChat open id,return empty string if an Error occurs.
func (s *AuthServiceImpl) Resolve(code string) string {
	resp, err := weapp.Login(global.ServerConfig.WXInfo.AppId, global.ServerConfig.WXInfo.AppSecret, code)

	if err != nil {
		klog.Errorf("WeApp.Login Err: %v code:%s", err, code)
		return ""
	}
	if err := resp.GetResponseError(); err != nil {
		klog.Errorf("WeApp.Login resp Err: %v code:%s", err, code)
		return ""
	}
	return resp.OpenID
}
