// Code generated by Kitex v0.4.4. DO NOT EDIT.

package profileservice

import (
	"context"
	profile "github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	client "github.com/cloudwego/kitex/client"
	kitex "github.com/cloudwego/kitex/pkg/serviceinfo"
)

func serviceInfo() *kitex.ServiceInfo {
	return profileServiceServiceInfo
}

var profileServiceServiceInfo = NewServiceInfo()

func NewServiceInfo() *kitex.ServiceInfo {
	serviceName := "ProfileService"
	handlerType := (*profile.ProfileService)(nil)
	methods := map[string]kitex.MethodInfo{
		"GetProfile":           kitex.NewMethodInfo(getProfileHandler, newProfileServiceGetProfileArgs, newProfileServiceGetProfileResult, false),
		"SubmitProfile":        kitex.NewMethodInfo(submitProfileHandler, newProfileServiceSubmitProfileArgs, newProfileServiceSubmitProfileResult, false),
		"ClearProfile":         kitex.NewMethodInfo(clearProfileHandler, newProfileServiceClearProfileArgs, newProfileServiceClearProfileResult, false),
		"GetAllProfile":        kitex.NewMethodInfo(getAllProfileHandler, newProfileServiceGetAllProfileArgs, newProfileServiceGetAllProfileResult, false),
		"GetSomeProfile":       kitex.NewMethodInfo(getSomeProfileHandler, newProfileServiceGetSomeProfileArgs, newProfileServiceGetSomeProfileResult, false),
		"GetPendingProfile":    kitex.NewMethodInfo(getPendingProfileHandler, newProfileServiceGetPendingProfileArgs, newProfileServiceGetPendingProfileResult, false),
		"UpdateProfile":        kitex.NewMethodInfo(updateProfileHandler, newProfileServiceUpdateProfileArgs, newProfileServiceUpdateProfileResult, false),
		"DeleteProfile":        kitex.NewMethodInfo(deleteProfileHandler, newProfileServiceDeleteProfileArgs, newProfileServiceDeleteProfileResult, false),
		"GetProfilePhoto":      kitex.NewMethodInfo(getProfilePhotoHandler, newProfileServiceGetProfilePhotoArgs, newProfileServiceGetProfilePhotoResult, false),
		"CreateProfilePhoto":   kitex.NewMethodInfo(createProfilePhotoHandler, newProfileServiceCreateProfilePhotoArgs, newProfileServiceCreateProfilePhotoResult, false),
		"CompleteProfilePhoto": kitex.NewMethodInfo(completeProfilePhotoHandler, newProfileServiceCompleteProfilePhotoArgs, newProfileServiceCompleteProfilePhotoResult, false),
		"ClearProfilePhoto":    kitex.NewMethodInfo(clearProfilePhotoHandler, newProfileServiceClearProfilePhotoArgs, newProfileServiceClearProfilePhotoResult, false),
	}
	extra := map[string]interface{}{
		"PackageName": "profile",
	}
	svcInfo := &kitex.ServiceInfo{
		ServiceName:     serviceName,
		HandlerType:     handlerType,
		Methods:         methods,
		PayloadCodec:    kitex.Thrift,
		KiteXGenVersion: "v0.4.4",
		Extra:           extra,
	}
	return svcInfo
}

func getProfileHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceGetProfileArgs)
	realResult := result.(*profile.ProfileServiceGetProfileResult)
	success, err := handler.(profile.ProfileService).GetProfile(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceGetProfileArgs() interface{} {
	return profile.NewProfileServiceGetProfileArgs()
}

func newProfileServiceGetProfileResult() interface{} {
	return profile.NewProfileServiceGetProfileResult()
}

func submitProfileHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceSubmitProfileArgs)
	realResult := result.(*profile.ProfileServiceSubmitProfileResult)
	success, err := handler.(profile.ProfileService).SubmitProfile(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceSubmitProfileArgs() interface{} {
	return profile.NewProfileServiceSubmitProfileArgs()
}

func newProfileServiceSubmitProfileResult() interface{} {
	return profile.NewProfileServiceSubmitProfileResult()
}

func clearProfileHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceClearProfileArgs)
	realResult := result.(*profile.ProfileServiceClearProfileResult)
	success, err := handler.(profile.ProfileService).ClearProfile(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceClearProfileArgs() interface{} {
	return profile.NewProfileServiceClearProfileArgs()
}

func newProfileServiceClearProfileResult() interface{} {
	return profile.NewProfileServiceClearProfileResult()
}

func getAllProfileHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceGetAllProfileArgs)
	realResult := result.(*profile.ProfileServiceGetAllProfileResult)
	success, err := handler.(profile.ProfileService).GetAllProfile(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceGetAllProfileArgs() interface{} {
	return profile.NewProfileServiceGetAllProfileArgs()
}

func newProfileServiceGetAllProfileResult() interface{} {
	return profile.NewProfileServiceGetAllProfileResult()
}

func getSomeProfileHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceGetSomeProfileArgs)
	realResult := result.(*profile.ProfileServiceGetSomeProfileResult)
	success, err := handler.(profile.ProfileService).GetSomeProfile(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceGetSomeProfileArgs() interface{} {
	return profile.NewProfileServiceGetSomeProfileArgs()
}

func newProfileServiceGetSomeProfileResult() interface{} {
	return profile.NewProfileServiceGetSomeProfileResult()
}

func getPendingProfileHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceGetPendingProfileArgs)
	realResult := result.(*profile.ProfileServiceGetPendingProfileResult)
	success, err := handler.(profile.ProfileService).GetPendingProfile(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceGetPendingProfileArgs() interface{} {
	return profile.NewProfileServiceGetPendingProfileArgs()
}

func newProfileServiceGetPendingProfileResult() interface{} {
	return profile.NewProfileServiceGetPendingProfileResult()
}

func updateProfileHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceUpdateProfileArgs)
	realResult := result.(*profile.ProfileServiceUpdateProfileResult)
	success, err := handler.(profile.ProfileService).UpdateProfile(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceUpdateProfileArgs() interface{} {
	return profile.NewProfileServiceUpdateProfileArgs()
}

func newProfileServiceUpdateProfileResult() interface{} {
	return profile.NewProfileServiceUpdateProfileResult()
}

func deleteProfileHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceDeleteProfileArgs)
	realResult := result.(*profile.ProfileServiceDeleteProfileResult)
	success, err := handler.(profile.ProfileService).DeleteProfile(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceDeleteProfileArgs() interface{} {
	return profile.NewProfileServiceDeleteProfileArgs()
}

func newProfileServiceDeleteProfileResult() interface{} {
	return profile.NewProfileServiceDeleteProfileResult()
}

func getProfilePhotoHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceGetProfilePhotoArgs)
	realResult := result.(*profile.ProfileServiceGetProfilePhotoResult)
	success, err := handler.(profile.ProfileService).GetProfilePhoto(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceGetProfilePhotoArgs() interface{} {
	return profile.NewProfileServiceGetProfilePhotoArgs()
}

func newProfileServiceGetProfilePhotoResult() interface{} {
	return profile.NewProfileServiceGetProfilePhotoResult()
}

func createProfilePhotoHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceCreateProfilePhotoArgs)
	realResult := result.(*profile.ProfileServiceCreateProfilePhotoResult)
	success, err := handler.(profile.ProfileService).CreateProfilePhoto(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceCreateProfilePhotoArgs() interface{} {
	return profile.NewProfileServiceCreateProfilePhotoArgs()
}

func newProfileServiceCreateProfilePhotoResult() interface{} {
	return profile.NewProfileServiceCreateProfilePhotoResult()
}

func completeProfilePhotoHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceCompleteProfilePhotoArgs)
	realResult := result.(*profile.ProfileServiceCompleteProfilePhotoResult)
	success, err := handler.(profile.ProfileService).CompleteProfilePhoto(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceCompleteProfilePhotoArgs() interface{} {
	return profile.NewProfileServiceCompleteProfilePhotoArgs()
}

func newProfileServiceCompleteProfilePhotoResult() interface{} {
	return profile.NewProfileServiceCompleteProfilePhotoResult()
}

func clearProfilePhotoHandler(ctx context.Context, handler interface{}, arg, result interface{}) error {
	realArg := arg.(*profile.ProfileServiceClearProfilePhotoArgs)
	realResult := result.(*profile.ProfileServiceClearProfilePhotoResult)
	success, err := handler.(profile.ProfileService).ClearProfilePhoto(ctx, realArg.Req)
	if err != nil {
		return err
	}
	realResult.Success = success
	return nil
}
func newProfileServiceClearProfilePhotoArgs() interface{} {
	return profile.NewProfileServiceClearProfilePhotoArgs()
}

func newProfileServiceClearProfilePhotoResult() interface{} {
	return profile.NewProfileServiceClearProfilePhotoResult()
}

type kClient struct {
	c client.Client
}

func newServiceClient(c client.Client) *kClient {
	return &kClient{
		c: c,
	}
}

func (p *kClient) GetProfile(ctx context.Context, req *profile.GetProfileRequest) (r *profile.GetProfileResponse, err error) {
	var _args profile.ProfileServiceGetProfileArgs
	_args.Req = req
	var _result profile.ProfileServiceGetProfileResult
	if err = p.c.Call(ctx, "GetProfile", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) SubmitProfile(ctx context.Context, req *profile.SubmitProfileRequest) (r *profile.SubmitProfileResponse, err error) {
	var _args profile.ProfileServiceSubmitProfileArgs
	_args.Req = req
	var _result profile.ProfileServiceSubmitProfileResult
	if err = p.c.Call(ctx, "SubmitProfile", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) ClearProfile(ctx context.Context, req *profile.ClearProfileRequest) (r *profile.ClearProfileResponse, err error) {
	var _args profile.ProfileServiceClearProfileArgs
	_args.Req = req
	var _result profile.ProfileServiceClearProfileResult
	if err = p.c.Call(ctx, "ClearProfile", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) GetAllProfile(ctx context.Context, req *profile.GetAllProfileRequest) (r *profile.GetAllProfileResponse, err error) {
	var _args profile.ProfileServiceGetAllProfileArgs
	_args.Req = req
	var _result profile.ProfileServiceGetAllProfileResult
	if err = p.c.Call(ctx, "GetAllProfile", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) GetSomeProfile(ctx context.Context, req *profile.GetSomeProfileRequest) (r *profile.GetSomeProfileResponse, err error) {
	var _args profile.ProfileServiceGetSomeProfileArgs
	_args.Req = req
	var _result profile.ProfileServiceGetSomeProfileResult
	if err = p.c.Call(ctx, "GetSomeProfile", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) GetPendingProfile(ctx context.Context, req *profile.GetPendingProfileRequest) (r *profile.GetPendingProfileResponse, err error) {
	var _args profile.ProfileServiceGetPendingProfileArgs
	_args.Req = req
	var _result profile.ProfileServiceGetPendingProfileResult
	if err = p.c.Call(ctx, "GetPendingProfile", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) UpdateProfile(ctx context.Context, req *profile.UpdateProfileRequest) (r *profile.UpdateProfileResponse, err error) {
	var _args profile.ProfileServiceUpdateProfileArgs
	_args.Req = req
	var _result profile.ProfileServiceUpdateProfileResult
	if err = p.c.Call(ctx, "UpdateProfile", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) DeleteProfile(ctx context.Context, req *profile.DeleteProfileRequest) (r *profile.DeleteProfileResponse, err error) {
	var _args profile.ProfileServiceDeleteProfileArgs
	_args.Req = req
	var _result profile.ProfileServiceDeleteProfileResult
	if err = p.c.Call(ctx, "DeleteProfile", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) GetProfilePhoto(ctx context.Context, req *profile.GetProfilePhotoRequest) (r *profile.GetProfilePhotoResponse, err error) {
	var _args profile.ProfileServiceGetProfilePhotoArgs
	_args.Req = req
	var _result profile.ProfileServiceGetProfilePhotoResult
	if err = p.c.Call(ctx, "GetProfilePhoto", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) CreateProfilePhoto(ctx context.Context, req *profile.CreateProfilePhotoRequest) (r *profile.CreateProfilePhotoResponse, err error) {
	var _args profile.ProfileServiceCreateProfilePhotoArgs
	_args.Req = req
	var _result profile.ProfileServiceCreateProfilePhotoResult
	if err = p.c.Call(ctx, "CreateProfilePhoto", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) CompleteProfilePhoto(ctx context.Context, req *profile.CompleteProfilePhotoRequest) (r *profile.CompleteProfilePhotoResponse, err error) {
	var _args profile.ProfileServiceCompleteProfilePhotoArgs
	_args.Req = req
	var _result profile.ProfileServiceCompleteProfilePhotoResult
	if err = p.c.Call(ctx, "CompleteProfilePhoto", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}

func (p *kClient) ClearProfilePhoto(ctx context.Context, req *profile.ClearProfilePhotoRequest) (r *profile.ClearProfilePhotoResponse, err error) {
	var _args profile.ProfileServiceClearProfilePhotoArgs
	_args.Req = req
	var _result profile.ProfileServiceClearProfilePhotoResult
	if err = p.c.Call(ctx, "ClearProfilePhoto", &_args, &_result); err != nil {
		return
	}
	return _result.GetSuccess(), nil
}
