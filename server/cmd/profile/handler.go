package main

import (
	"context"
	"math"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/pkg/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"
	"github.com/cloudwego/kitex/client/callopt"
	"github.com/cloudwego/kitex/pkg/klog"
)

// ProfileServiceImpl implements the last service interface defined in the IDL.
type ProfileServiceImpl struct {
	BlobManager
	MongoManager
	RedisManager
	LicenseManager
}

// MongoManager defines the mongoDB server
type MongoManager interface {
	GetProfile(context.Context, id.AccountID) (*mongo.ProfileRecord, error)
	GetProfiles(c context.Context, limit int64) ([]*mongo.ProfileRecord, error)
	GetPendingProfiles(c context.Context) ([]*mongo.ProfileRecord, error)
	DeleteProfile(context.Context, id.AccountID) error
	UpdateProfile(c context.Context, aid id.AccountID, prevState base.IdentityStatus, p *base.Profile) error
	UpdateProfilePhoto(c context.Context, aid id.AccountID, bid id.BlobID) error
	UpdateProfileStatus(c context.Context, aid id.AccountID, status base.IdentityStatus) error
}

// RedisManager defines the redis server
type RedisManager interface {
	GetProfile(context.Context, id.AccountID) (*base.Profile, error)
	RemoveProfile(context.Context, id.AccountID) error
	InsertProfile(context.Context, id.AccountID, *base.Profile) error
}

// BlobManager defines the Anti Corruption Layer
// for get blob logic.
type BlobManager interface {
	GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest, callOptions ...callopt.Option) (*blob.GetBlobURLResponse, error)
	CreateBlob(ctx context.Context, req *blob.CreateBlobRequest, callOptions ...callopt.Option) (*blob.CreateBlobResponse, error)
}

// LicenseManager gets license info by Baidu OCR Api.
type LicenseManager interface {
	GetLicenseInfo(url string) (*base.Identity, error)
}

// GetProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfile(ctx context.Context, req *profile.GetProfileRequest) (resp *profile.GetProfileResponse, err error) {
	resp = new(profile.GetProfileResponse)
	aid := id.AccountID(req.AccountId)
	pv, err := s.RedisManager.GetProfile(ctx, aid)
	if err == nil {
		resp.Profile = pv
		resp.BaseResp = tools.BuildBaseResp(nil)
		return resp, nil
	}
	if err != errno.RecordNotFound {
		klog.Error("get profile cache error", err)
	}
	pr, err := s.MongoManager.GetProfile(ctx, aid)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
			return resp, nil
		}
		klog.Error("get profile error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("get profile error"))
		return resp, nil
	}
	go func() {
		if err = s.RedisManager.InsertProfile(context.Background(), id.AccountID(pr.AccountID), pr.Profile); err != nil {
			klog.Error("get profile error", err)
		}
	}()

	resp.Profile = pr.Profile
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// SubmitProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) SubmitProfile(ctx context.Context, req *profile.SubmitProfileRequest) (resp *profile.SubmitProfileResponse, err error) {
	resp = new(profile.SubmitProfileResponse)
	aid := id.AccountID(req.AccountId)
	if err = s.RedisManager.RemoveProfile(ctx, aid); err != nil {
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("clear cache error"))
		klog.Error("cannot remove profile in redis", err)
		return resp, nil
	}
	p := &base.Profile{
		Identity:       req.Identity,
		IdentityStatus: base.IdentityStatus_PENDING,
	}
	err = s.MongoManager.UpdateProfile(ctx, aid, base.IdentityStatus_UNSUBMITTED, p)
	if err != nil {
		if err == errno.RecordAlreadyExist {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordAlreadyExist)
		} else {
			klog.Error("cannot update profile", err)
			resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("submit profile error"))
		}
		return resp, nil
	}
	go func() {
		time.Sleep(2 * time.Second)
		if err = s.RedisManager.RemoveProfile(ctx, aid); err != nil {
			klog.Error("cannot remove profile in redis", err)
		}
	}()
	resp.Profile = p
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// ClearProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfile(ctx context.Context, req *profile.ClearProfileRequest) (resp *profile.ClearProfileResponse, err error) {
	resp = new(profile.ClearProfileResponse)
	aid := id.AccountID(req.AccountId)
	p := &base.Profile{}
	err = s.RedisManager.RemoveProfile(ctx, aid)
	if err != nil {
		klog.Error("cannot remove profile in redis", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("clear cache error"))
		return resp, nil
	}
	err = s.MongoManager.UpdateProfile(ctx, aid, base.IdentityStatus_VERIFIED, p)
	if err != nil {
		klog.Error("cannot update profile", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("clear profile error"))
		return resp, nil
	}
	go func() {
		time.Sleep(2 * time.Second)
		if err = s.RedisManager.RemoveProfile(ctx, aid); err != nil {
			klog.Error("cannot remove profile in redis", err)
		}
	}()
	resp.Profile = p
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfilePhoto(ctx context.Context, req *profile.GetProfilePhotoRequest) (resp *profile.GetProfilePhotoResponse, err error) {
	resp = new(profile.GetProfilePhotoResponse)
	aid := id.AccountID(req.AccountId)
	pr, err := s.MongoManager.GetProfile(ctx, aid)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
		} else {
			resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("get profile photo error"))
		}
		return resp, nil
	}

	if pr.PhotoBlobID == "" {
		klog.Warn("photo blob id = 0")
		resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound.WithMessage("no profile photo"))
		return resp, nil
	}

	br, err := s.BlobManager.GetBlobURL(ctx, &blob.GetBlobURLRequest{
		Id:         pr.PhotoBlobID,
		TimeoutSec: int32(5 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot get blob", err)
		resp.BaseResp = tools.BuildBaseResp(errno.BlobSrvErr.WithMessage("get profile photo error"))
		return resp, nil
	}

	resp.Url = br.Url
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// CreateProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CreateProfilePhoto(ctx context.Context, req *profile.CreateProfilePhotoRequest) (resp *profile.CreateProfilePhotoResponse, err error) {
	aid := req.AccountId
	err = s.RedisManager.RemoveProfile(ctx, id.AccountID(aid))
	if err != nil {
		klog.Error("cannot remove profile in redis", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear cache error")
	}
	br, err := s.BlobManager.CreateBlob(ctx, &blob.CreateBlobRequest{
		AccountId:           aid,
		UploadUrlTimeoutSec: int32(10 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot create blob", err)
		return nil, errno.ProfileSrvErr.WithMessage("create profile photo error")
	}

	err = s.MongoManager.UpdateProfilePhoto(ctx, id.AccountID(req.AccountId), id.BlobID(br.Id))
	if err != nil {
		klog.Error("cannot update profile photo", err)
		return nil, errno.ProfileSrvErr.WithMessage("create profile photo error")
	}
	go func() {
		time.Sleep(2 * time.Second)
		if err = s.RedisManager.RemoveProfile(ctx, id.AccountID(aid)); err != nil {
			klog.Error("cannot remove profile in redis", err)
		}
	}()
	return &profile.CreateProfilePhotoResponse{
		UploadUrl: br.UploadUrl,
	}, nil
}

// CompleteProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CompleteProfilePhoto(ctx context.Context, req *profile.CompleteProfilePhotoRequest) (resp *profile.CompleteProfilePhotoResponse, err error) {
	resp = new(profile.CompleteProfilePhotoResponse)
	aid := id.AccountID(req.AccountId)
	pr, err := s.MongoManager.GetProfile(ctx, aid)
	if err != nil {
		klog.Error("get profile error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("complete profile photo error"))
		return resp, nil
	}

	if pr.PhotoBlobID == "" {
		klog.Warn("photo blob id = 0")
		resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound.WithMessage("no profile photo"))
		return resp, nil
	}

	br, err := s.BlobManager.GetBlobURL(ctx, &blob.GetBlobURLRequest{
		Id:         pr.PhotoBlobID,
		TimeoutSec: int32(5 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot get blob", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("complete profile photo error"))
		return resp, nil
	}
	info, err := s.LicenseManager.GetLicenseInfo(br.Url)
	if err != nil {
		klog.Error("cannot get license info", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("complete profile photo error"))
		return resp, nil
	}

	resp.Identity = info
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// ClearProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfilePhoto(ctx context.Context, req *profile.ClearProfilePhotoRequest) (resp *profile.ClearProfilePhotoResponse, err error) {
	resp = new(profile.ClearProfilePhotoResponse)
	aid := id.AccountID(req.AccountId)
	if err = s.RedisManager.RemoveProfile(ctx, aid); err != nil {
		klog.Error("cannot remove profile in redis", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("clear profile error"))
		return resp, nil
	}
	err = s.MongoManager.UpdateProfilePhoto(ctx, aid, "")
	if err != nil {
		klog.Error("cannot clear profile photo", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("clear profile photo error"))
		return resp, nil
	}
	go func() {
		time.Sleep(2 * time.Second)
		if err = s.RedisManager.RemoveProfile(ctx, aid); err != nil {
			klog.Error("cannot remove profile in redis", err)
		}
	}()
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetAllProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetAllProfile(ctx context.Context, req *profile.GetAllProfileRequest) (resp *profile.GetAllProfileResponse, err error) {
	resp = new(profile.GetAllProfileResponse)
	prs, err := s.MongoManager.GetProfiles(ctx, math.MaxInt64)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
			return resp, nil
		}
		klog.Error("get profile error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("get profile error"))
		return resp, nil
	}
	for _, pr := range prs {
		resp.Profile = append(resp.Profile, &base.ProfileRecord{
			AccountId:   pr.AccountID,
			PhotoBlobId: pr.PhotoBlobID,
			Profile:     pr.Profile,
		})
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetSomeProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetSomeProfile(ctx context.Context, req *profile.GetSomeProfileRequest) (resp *profile.GetSomeProfileResponse, err error) {
	resp = new(profile.GetSomeProfileResponse)
	prs, err := s.MongoManager.GetProfiles(ctx, consts.LimitOfSomeProfiles)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
			return resp, nil
		}
		klog.Error("get profile error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("get profile error"))
		return resp, nil
	}
	for _, pr := range prs {
		resp.Profile = append(resp.Profile, &base.ProfileRecord{
			AccountId:   pr.AccountID,
			PhotoBlobId: pr.PhotoBlobID,
			Profile:     pr.Profile,
		})
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// CheckProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CheckProfile(ctx context.Context, req *profile.CheckProfileRequest) (resp *profile.CheckProfileResponse, err error) {
	resp = new(profile.CheckProfileResponse)
	err = s.RedisManager.RemoveProfile(ctx, id.AccountID(req.AccountId))
	if err != nil {
		klog.Error("remove cache err")
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("remove cache err"))
		return resp, nil
	}
	if req.Accept {
		err = s.MongoManager.UpdateProfileStatus(ctx, id.AccountID(req.AccountId), base.IdentityStatus_VERIFIED)
	} else {
		err = s.MongoManager.UpdateProfileStatus(ctx, id.AccountID(req.AccountId), base.IdentityStatus_AUDITFAILED)
	}
	if err != nil {
		klog.Error("update profile err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr)
		return resp, nil
	}
	go func() {
		time.Sleep(2 * time.Second)
		if err = s.RedisManager.RemoveProfile(ctx, id.AccountID(req.AccountId)); err != nil {
			klog.Error("cannot remove profile in redis", err)
		}
	}()
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// DeleteProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) DeleteProfile(ctx context.Context, req *profile.DeleteProfileRequest) (resp *profile.DeleteProfileResponse, err error) {
	resp = new(profile.DeleteProfileResponse)
	err = s.RedisManager.RemoveProfile(ctx, id.AccountID(req.AccountId))
	if err != nil {
		klog.Error("remove cache err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("remove cache err"))
		return resp, nil
	}

	err = s.MongoManager.DeleteProfile(ctx, id.AccountID(req.AccountId))
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
		} else {
			klog.Errorf("delete profile err", err)
			resp.BaseResp = tools.BuildBaseResp(errno.CarSrvErr.WithMessage("delete profile err"))
		}
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// GetPendingProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetPendingProfile(ctx context.Context, req *profile.GetPendingProfileRequest) (resp *profile.GetPendingProfileResponse, err error) {
	resp = new(profile.GetPendingProfileResponse)
	prs, err := s.MongoManager.GetPendingProfiles(ctx)
	if err != nil {
		if err == errno.RecordNotFound {
			resp.BaseResp = tools.BuildBaseResp(errno.RecordNotFound)
			return resp, nil
		}
		klog.Error("get profile error", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr.WithMessage("get profile error"))
		return resp, nil
	}
	for _, pr := range prs {
		resp.Profile = append(resp.Profile, &base.ProfileRecord{
			AccountId:   pr.AccountID,
			PhotoBlobId: pr.PhotoBlobID,
			Profile:     pr.Profile,
		})
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}
