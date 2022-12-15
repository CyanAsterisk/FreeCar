package main

import (
	"context"

	profile "github.com/CyanAsterisk/FreeCar/server/cmd/profile/kitex_gen/profile"
)

// ProfileServiceImpl implements the last service interface defined in the IDL.
type ProfileServiceImpl struct{}

// GetProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfile(ctx context.Context, req *profile.GetProfileRequest) (resp *profile.Profile, err error) {
	// TODO: Your code here...
	return
}

// SubmitProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) SubmitProfile(ctx context.Context, req *profile.SubmitProfileRequest) (resp *profile.Profile, err error) {
	// TODO: Your code here...
	return
}

// ClearProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfile(ctx context.Context, req *profile.ClearProfileRequest) (resp *profile.Profile, err error) {
	// TODO: Your code here...
	return
}

// GetProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfilePhoto(ctx context.Context, req *profile.GetProfilePhotoRequest) (resp *profile.GetProfilePhotoResponse, err error) {
	// TODO: Your code here...
	return
}

// CreateProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CreateProfilePhoto(ctx context.Context, req *profile.CreateProfilePhotoRequest) (resp *profile.CreateProfilePhotoResponse, err error) {
	// TODO: Your code here...
	return
}

// CompleteProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CompleteProfilePhoto(ctx context.Context, req *profile.CompleteProfilePhotoRequest) (resp *profile.Identity, err error) {
	// TODO: Your code here...
	return
}

// ClearProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfilePhoto(ctx context.Context, req *profile.ClearProfilePhotoRequest) (resp *profile.ClearProfilePhotoResponse, err error) {
	// TODO: Your code here...
	return
}
