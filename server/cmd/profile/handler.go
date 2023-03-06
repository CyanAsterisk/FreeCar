package main

import (
	"context"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/dao"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
	"go.mongodb.org/mongo-driver/mongo"
)

// ProfileServiceImpl implements the last service interface defined in the IDL.
type ProfileServiceImpl struct{}

// GetProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfile(ctx context.Context, req *profile.GetProfileRequest) (resp *profile.Profile, err error) {
	aid := id.AccountID(req.AccountId)
	pr, err := dao.GetProfile(ctx, aid)
	if err != nil {
		code := s.logAndConvertProfileErr(err)
		if code == codes.NotFound {
			return &profile.Profile{}, nil
		}
		return nil, status.Err(code, "")
	}
	if pr.Profile == nil {
		return &profile.Profile{}, nil
	}
	return pr.Profile, nil
}

// SubmitProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) SubmitProfile(ctx context.Context, req *profile.SubmitProfileRequest) (resp *profile.Profile, err error) {
	aid := id.AccountID(req.AccountId)
	p := &profile.Profile{
		Identity:       req.Identity,
		IdentityStatus: profile.IdentityStatus_PENDING,
	}
	err = dao.UpdateProfile(ctx, aid, profile.IdentityStatus_UNSUBMITTED, p)
	if err != nil {
		klog.Error("cannot update profile", err)
		return nil, status.Err(codes.Internal, "")
	}
	go func() {
		time.Sleep(3 * time.Second)
		err := dao.UpdateProfile(context.Background(), aid,
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
	err = dao.UpdateProfile(ctx, aid, profile.IdentityStatus_VERIFIED, p)
	if err != nil {
		klog.Error("cannot update profile", err)
		return nil, status.Err(codes.Internal, "")
	}
	return p, nil
}

// GetProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfilePhoto(ctx context.Context, req *profile.GetProfilePhotoRequest) (resp *profile.GetProfilePhotoResponse, err error) {
	aid := id.AccountID(req.AccountId)
	pr, err := dao.GetProfile(ctx, aid)
	if err != nil {
		return nil, status.Err(s.logAndConvertProfileErr(err), "")
	}

	if pr.PhotoBlobID == 0 {
		return nil, status.Err(codes.NotFound, "")
	}

	br, err := config.BlobClient.GetBlobURL(ctx, &blob.GetBlobURLRequest{
		Id:         pr.PhotoBlobID,
		TimeoutSec: int32(5 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot get blob", err)
		return nil, status.Err(codes.Internal, "")
	}

	return &profile.GetProfilePhotoResponse{
		Url: br.Url,
	}, nil
}

// CreateProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CreateProfilePhoto(ctx context.Context, req *profile.CreateProfilePhotoRequest) (resp *profile.CreateProfilePhotoResponse, err error) {
	aid := req.AccountId
	br, err := config.BlobClient.CreateBlob(ctx, &blob.CreateBlobRequest{
		AccountId:           aid,
		UploadUrlTimeoutSec: int32(10 * time.Second.Seconds()),
	})
	if err != nil {
		klog.Error("cannot create blob", err)
		return nil, status.Err(codes.Aborted, "")
	}

	err = dao.UpdateProfilePhoto(ctx, id.AccountID(req.AccountId), id.BlobID(br.Id))
	if err != nil {
		klog.Error("cannot update profile photo", err)
		return nil, status.Err(codes.Aborted, "")
	}

	return &profile.CreateProfilePhotoResponse{
		UploadUrl: br.UploadUrl,
	}, nil
}

// CompleteProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CompleteProfilePhoto(ctx context.Context, req *profile.CompleteProfilePhotoRequest) (resp *profile.Identity, err error) {
	aid := id.AccountID(req.AccountId)
	pr, err := dao.GetProfile(ctx, aid)
	if err != nil {
		return nil, status.Err(s.logAndConvertProfileErr(err), "")
	}

	if pr.PhotoBlobID == 0 {
		return nil, status.Err(codes.NotFound, "")
	}

	// br, err := global.BlobClient.GetBlob(ctx, &blob.GetBlobRequest{
	// 	Id: pr.PhotoBlobID,
	// })
	if err != nil {
		klog.Error("cannot get blob", err)
		return nil, status.Err(codes.Aborted, "")
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
	err = dao.UpdateProfilePhoto(ctx, aid, 0)
	if err != nil {
		klog.Error("cannot clear profile photo", err)
		return nil, status.Err(codes.Internal, "")
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
