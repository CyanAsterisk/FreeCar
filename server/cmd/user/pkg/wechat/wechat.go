package wechat

type AuthServiceImpl struct {
	AppID     string
	AppSecret string
}

// Resolve resolves authorization code to WeChat open id,return empty string if an Error occurs.
func (s *AuthServiceImpl) Resolve(code string) string {

	return code
}
