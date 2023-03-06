package pkg

import (
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/medivhzhan/weapp/v2"
)

type AuthServiceImpl struct {
	AppID     string
	AppSecret string
}

// Resolve resolves authorization code to WeChat open id,return empty string if an Error occurs.
func (s *AuthServiceImpl) Resolve(code string) string {
	resp, err := weapp.Login(s.AppID, s.AppSecret, code)
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
