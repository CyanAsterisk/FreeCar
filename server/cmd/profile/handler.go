package main

import (
	"context"
	"math"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/pkg/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
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
	UpdateProfile(c context.Context, aid id.AccountID, prevState profile.IdentityStatus, p *profile.Profile) error
	UpdateProfilePhoto(c context.Context, aid id.AccountID, bid id.BlobID) error
}

// RedisManager defines the redis server
type RedisManager interface {
	GetProfile(context.Context, id.AccountID) (*profile.Profile, error)
	RemoveProfile(context.Context, id.AccountID) error
	InsertProfile(context.Context, id.AccountID, *profile.Profile) error
}

// BlobManager defines the Anti Corruption Layer
// for get blob logic.
type BlobManager interface {
	GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest, callOptions ...callopt.Option) (*blob.GetBlobURLResponse, error)
	CreateBlob(ctx context.Context, req *blob.CreateBlobRequest, callOptions ...callopt.Option) (*blob.CreateBlobResponse, error)
}

// LicenseManager gets license info by Baidu OCR Api.
type LicenseManager interface {
	GetLicenseInfo(url string) (*profile.Identity, error)
}

// GetProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfile(ctx context.Context, req *profile.GetProfileRequest) (resp *profile.GetProfileResponse, err error) {
	resp = new(profile.GetProfileResponse)
	aid := id.AccountID(req.AccountId)
	pv, err := s.RedisManager.GetProfile(ctx, aid)
	if err == nil {
		resp.Profile = pv
		return resp, nil
	}
	if err != errno.RecordNotFound {
		klog.Error("get profile cache error", err)
	}
	pr, err := s.MongoManager.GetProfile(ctx, aid)
	if err != nil {
		if err == errno.RecordNotFound {
			return nil, errno.RecordNotFound
		}
		klog.Error("get profile error", err)
		return nil, errno.ProfileSrvErr.WithMessage("get profile error")
	}
	go func() {
		if err = s.RedisManager.InsertProfile(context.Background(), id.AccountID(pr.AccountID), pr.Profile); err != nil {
			klog.Error("get profile error", err)
		}
	}()

	resp.Profile = pr.Profile
	return resp, nil
}

// SubmitProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) SubmitProfile(ctx context.Context, req *profile.SubmitProfileRequest) (resp *profile.SubmitProfileResponse, err error) {
	resp = new(profile.SubmitProfileResponse)
	aid := id.AccountID(req.AccountId)
	if err = s.RedisManager.RemoveProfile(ctx, aid); err != nil {
		klog.Error("cannot remove profile in redis", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear cache error")
	}
	p := &profile.Profile{
		Identity:       req.Identity,
		IdentityStatus: profile.IdentityStatus_PENDING,
	}
	err = s.MongoManager.UpdateProfile(ctx, aid, profile.IdentityStatus_UNSUBMITTED, p)
	if err != nil {
		if err == errno.RecordAlreadyExist {
			return nil, errno.RecordAlreadyExist
		}
		klog.Error("cannot update profile", err)
		return nil, errno.ProfileSrvErr.WithMessage("submit profile error")
	}
	resp.Profile = p
	return resp, nil
}

// ClearProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfile(ctx context.Context, req *profile.ClearProfileRequest) (resp *profile.ClearProfileResponse, err error) {
	resp = new(profile.ClearProfileResponse)
	aid := id.AccountID(req.AccountId)
	p := &profile.Profile{}
	err = s.RedisManager.RemoveProfile(ctx, aid)
	if err != nil {
		klog.Error("cannot remove profile in redis", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear cache error")
	}
	err = s.MongoManager.UpdateProfile(ctx, aid, profile.IdentityStatus_VERIFIED, p)
	if err != nil {
		klog.Error("cannot update profile", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear profile error")
	}
	resp.Profile = p
	return resp, nil
}

// GetProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfilePhoto(ctx context.Context, req *profile.GetProfilePhotoRequest) (resp *profile.GetProfilePhotoResponse, err error) {
	aid := id.AccountID(req.AccountId)
	pr, err := s.MongoManager.GetProfile(ctx, aid)
	if err != nil {
		if err == errno.RecordNotFound {
			return nil, errno.RecordNotFound
		}
		return nil, errno.ProfileSrvErr.WithMessage("get profile photo error")
	}

	if pr.PhotoBlobID == 0 {
		klog.Warn("photo blob id = 0")
		return nil, errno.RecordNotFound.WithMessage("no profile photo")
	}

	br, err := s.BlobManager.GetBlobURL(ctx, &blob.GetBlobURLRequest{
		Id:         pr.PhotoBlobID,
		TimeoutSec: int32(5 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot get blob", err)
		return nil, errno.ProfileSrvErr.WithMessage("get profile photo error")
	}

	return &profile.GetProfilePhotoResponse{
		Url: br.Url,
	}, nil
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

	return &profile.CreateProfilePhotoResponse{
		UploadUrl: br.UploadUrl,
	}, nil
}

// CompleteProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CompleteProfilePhoto(ctx context.Context, req *profile.CompleteProfilePhotoRequest) (resp *profile.CompleteProfilePhotoResponse, err error) {
	aid := id.AccountID(req.AccountId)
	pr, err := s.MongoManager.GetProfile(ctx, aid)
	if err != nil {
		klog.Error("get profile error", err)
		return nil, errno.ProfileSrvErr.WithMessage("complete profile photo error")
	}

	if pr.PhotoBlobID == 0 {
		klog.Warn("photo blob id = 0")
		return nil, errno.ProfileSrvErr.WithMessage("complete profile photo error")
	}

	br, err := s.BlobManager.GetBlobURL(ctx, &blob.GetBlobURLRequest{
		Id:         pr.PhotoBlobID,
		TimeoutSec: int32(5 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot get blob", err)
		return nil, errno.ProfileSrvErr.WithMessage("complete profile photo error")
	}
	info, err := s.LicenseManager.GetLicenseInfo(br.Url)
	if err != nil {
		klog.Error("cannot get license info", err)
		return nil, errno.ProfileSrvErr.WithMessage("complete profile photo error")
	}

	resp.Identity = info
	return resp, nil
}

// ClearProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfilePhoto(ctx context.Context, req *profile.ClearProfilePhotoRequest) (resp *profile.ClearProfilePhotoResponse, err error) {
	aid := id.AccountID(req.AccountId)
	if err = s.RedisManager.RemoveProfile(ctx, aid); err != nil {
		klog.Error("cannot remove profile in redis", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear profile error")
	}
	err = s.MongoManager.UpdateProfilePhoto(ctx, aid, 0)
	if err != nil {
		klog.Error("cannot clear profile photo", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear profile photo error")
	}
	return &profile.ClearProfilePhotoResponse{}, nil
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
		resp.Profile = append(resp.Profile, &profile.ProfileRecord{
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
	prs, err := s.MongoManager.GetProfiles(ctx, 20)
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
		resp.Profile = append(resp.Profile, &profile.ProfileRecord{
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
	pf := new(profile.Profile)
	if req.Accept {
		pf.IdentityStatus = profile.IdentityStatus_VERIFIED
	} else {
		pf.IdentityStatus = profile.IdentityStatus_AUDITFAILED
	}
	err = s.MongoManager.UpdateProfile(ctx, id.AccountID(req.AccountId), profile.IdentityStatus_PENDING, &profile.Profile{
		IdentityStatus: profile.IdentityStatus_AUDITFAILED,
	})
	if err != nil {
		klog.Error("update profile err", err)
		resp.BaseResp = tools.BuildBaseResp(errno.ProfileSrvErr)
		return resp, nil
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}

// DeleteProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) DeleteProfile(ctx context.Context, req *profile.DeleteProfileRequest) (resp *profile.DeleteProfileResponse, err error) {
	resp = new(profile.DeleteProfileResponse)
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
		resp.Profile = append(resp.Profile, &profile.ProfileRecord{
			AccountId:   pr.AccountID,
			PhotoBlobId: pr.PhotoBlobID,
			Profile:     pr.Profile,
		})
	}
	resp.BaseResp = tools.BuildBaseResp(nil)
	return resp, nil
}
