package tool

type AuthServiceImpl struct{}

// Resolve resolves authorization code to WeChat open id.
// TODO By @Claud_Zq
func (s *AuthServiceImpl) Resolve(code string) string {
	resp := "this_is_openid" + code
	return resp
}
