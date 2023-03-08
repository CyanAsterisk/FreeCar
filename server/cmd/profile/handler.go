package main

import (
	"context"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/pkg"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"go.mongodb.org/mongo-driver/mongo"
)

// ProfileServiceImpl implements the last service interface defined in the IDL.
type ProfileServiceImpl struct {
	BlobManager
	MongoManager
	RedisManager
}

// MongoManager defines the mongoDB server
type MongoManager interface {
	GetProfile(context.Context, id.AccountID) (*pkg.ProfileRecord, error)
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
	GetBlobURL(context.Context, *blob.GetBlobURLRequest) (*blob.GetBlobURLResponse, error)
	CreateBlob(ctx context.Context, request *blob.CreateBlobRequest) (*blob.CreateBlobResponse, error)
}

// GetProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfile(ctx context.Context, req *profile.GetProfileRequest) (resp *profile.Profile, err error) {
	aid := id.AccountID(req.AccountId)
	pv, err := s.RedisManager.GetProfile(ctx, aid)
	if err != nil {
		klog.Error("get profile error", err)
		return &profile.Profile{}, errno.ProfileSrvErr.WithMessage("get profile error")
	}
	if pv == nil {
		pr, err := s.MongoManager.GetProfile(ctx, aid)
		if err != nil {
			code := s.logAndConvertProfileErr(err)
			if code == codes.NotFound {
				return &profile.Profile{}, nil
			}
			klog.Error("get profile error", err)
			return nil, errno.ProfileSrvErr.WithMessage("get profile error")
		}
		if pr.Profile == nil {
			return &profile.Profile{}, nil
		}
		if err = s.RedisManager.InsertProfile(ctx, id.AccountID(pr.AccountID), pr.Profile); err != nil {
			klog.Error("get profile error", err)
			return &profile.Profile{}, errno.ProfileSrvErr.WithMessage("get profile error")
		}
		return pr.Profile, nil
	}
	return pv, nil
}

// SubmitProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) SubmitProfile(ctx context.Context, req *profile.SubmitProfileRequest) (resp *profile.Profile, err error) {
	aid := id.AccountID(req.AccountId)
	p := &profile.Profile{
		Identity:       req.Identity,
		IdentityStatus: profile.IdentityStatus_PENDING,
	}
	err = s.MongoManager.UpdateProfile(ctx, aid, profile.IdentityStatus_UNSUBMITTED, p)
	if err != nil {
		klog.Error("cannot update profile", err)
		return nil, errno.ProfileSrvErr.WithMessage("submit profile error")
	}
	go func() {
		time.Sleep(3 * time.Second)
		err := s.MongoManager.UpdateProfile(context.Background(), aid,
			profile.IdentityStatus_PENDING, &profile.Profile{
				Identity:       req.Identity,
				IdentityStatus: profile.IdentityStatus_VERIFIED,
			})
		if err != nil {
			klog.Error("cannot verify identity", err)
		}
	}()
	return p, nil
}

// ClearProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfile(ctx context.Context, req *profile.ClearProfileRequest) (resp *profile.Profile, err error) {
	aid := id.AccountID(req.AccountId)
	p := &profile.Profile{}
	err = s.MongoManager.UpdateProfile(ctx, aid, profile.IdentityStatus_VERIFIED, p)
	if err != nil {
		klog.Error("cannot update profile", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear profile error")
	}
	err = s.RedisManager.RemoveProfile(ctx, aid)
	if err != nil {
		klog.Error("cannot remove profile in redis", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear profile error")
	}
	return p, nil
}

// GetProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfilePhoto(ctx context.Context, req *profile.GetProfilePhotoRequest) (resp *profile.GetProfilePhotoResponse, err error) {
	aid := id.AccountID(req.AccountId)
	pr, err := s.MongoManager.GetProfile(ctx, aid)
	if err != nil {
		klog.Error("cannot get profile", err)
		return nil, errno.ProfileSrvErr.WithMessage("get profile photo error")
	}

	if pr.PhotoBlobID == 0 {
		klog.Warn("photo blob id = 0")
		return nil, errno.ProfileSrvErr.WithMessage("get profile photo error")
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
func (s *ProfileServiceImpl) CompleteProfilePhoto(ctx context.Context, req *profile.CompleteProfilePhotoRequest) (resp *profile.Identity, err error) {
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

	// br, err := global.BlobClient.GetBlob(ctx, &blob.GetBlobRequest{
	// 	Id: pr.PhotoBlobID,
	// })
	if err != nil {
		klog.Error("cannot get blob", err)
		return nil, errno.ProfileSrvErr.WithMessage("complete profile photo error")
	}
	// TODO: Auto get license info
	// klog.Info("got profile photo", "size", len(br.Data))
	return &profile.Identity{
		LicNumber:       consts.DefaultLicNumber,
		Name:            consts.DefaultName,
		Gender:          consts.DefaultGender,
		BirthDateMillis: consts.DefaultBirth,
	}, nil
}

// ClearProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfilePhoto(ctx context.Context, req *profile.ClearProfilePhotoRequest) (resp *profile.ClearProfilePhotoResponse, err error) {
	aid := id.AccountID(req.AccountId)
	err = s.MongoManager.UpdateProfilePhoto(ctx, aid, 0)
	if err != nil {
		klog.Error("cannot clear profile photo", err)
		return nil, errno.ProfileSrvErr.WithMessage("clear profile photo error")
	}
	return &profile.ClearProfilePhotoResponse{}, nil
}

func (s *ProfileServiceImpl) logAndConvertProfileErr(err error) codes.Code {
	if err == mongo.ErrNoDocuments {
		return codes.NotFound
	}
	klog.Error("cannot get profile", err)
	return codes.Internal
}
