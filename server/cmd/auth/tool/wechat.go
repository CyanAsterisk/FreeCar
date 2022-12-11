package tool

// Resolve resolves authorization code to WeChat open id.
// TODO By @Claud_Zq
func Resolve(code string) string {
	resp := "openid" + code
	return resp
}
