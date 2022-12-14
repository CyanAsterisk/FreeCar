// Code generated by Kitex v0.4.3. DO NOT EDIT.

package authservice

import (
	"context"
	auth "github.com/CyanAsterisk/FreeCar/server/cmd/auth/kitex_gen/auth"
	client "github.com/cloudwego/kitex/client"
	kitex "github.com/cloudwego/kitex/pkg/serviceinfo"
)

func serviceInfo() *kitex.ServiceInfo {
	return authServiceServiceInfo
}

var authServiceServiceInfo = NewServiceInfo()

func NewServiceInfo() *kitex.ServiceInfo {
	serviceName := "AuthService"
	handlerType := (*auth.AuthService)(nil)
	methods := map[string]kitex.MethodInfo{
		"Login": kitex.NewMethodInfo(loginHandler, newAuthServiceLoginArgs, newAuthServiceLoginResult, false),
	}
	extra := map[string]interface{}{
		"PackageName": "auth",
	}
	svcInfo := &kitex.ServiceInfo{
		ServiceName:     serviceName,
		HandlerType:     handlerType,
		Methods:         methods,
		PayloadCodec:    kitex.Thrift,
		KiteXGenVersion: "v0.4.3",
		Extra:           extra,
	}
	return svcInfo
}

func loginHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*auth.AuthServiceLoginArgs)
	realResult := result.(*auth.AuthServiceLoginResult)
	success, err := handler.(auth.AuthService).Login(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newAuthServiceLoginArgs() interface{} {
	return auth.NewAuthServiceLoginArgs()
}

func newAuthServiceLoginResult() interface{} {
	return auth.NewAuthServiceLoginResult()
}

type kClient struct {
	c client.Client
}

func newServiceClient(c client.Client) *kClient {
	return &kClient{
		c: c,
	}
}

func (p *kClient) Login(ctx context.Context, req *auth.LoginRequest) (r *auth.LoginResponse, err error) {
	var _args auth.AuthServiceLoginArgs
	_args.Req = req
	var _result auth.AuthServiceLoginResult
	if err = p.c.Call(ctx, "Login", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}
