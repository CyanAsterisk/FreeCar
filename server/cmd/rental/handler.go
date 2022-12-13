package main

import (
	"context"
	rental "github.com/CyanAsterisk/FreeCar/server/cmd/rental/kitex_gen/rental"
)

// ProfileServiceImpl implements the last service interface defined in the IDL.
type ProfileServiceImpl struct{}

// GetProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfile(ctx context.Context, req *rental.GetProfileRequest) (resp *rental.Profile, err error) {
	// TODO: Your code here...
	return
}

// SubmitProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) SubmitProfile(ctx context.Context, req *rental.Identity) (resp *rental.Profile, err error) {
	// TODO: Your code here...
	return
}

// ClearProfile implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfile(ctx context.Context, req *rental.ClearProfileRequest) (resp *rental.Profile, err error) {
	// TODO: Your code here...
	return
}

// GetProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) GetProfilePhoto(ctx context.Context, req *rental.GetProfilePhotoRequest) (resp *rental.GetProfilePhotoResponse, err error) {
	// TODO: Your code here...
	return
}

// CreateProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CreateProfilePhoto(ctx context.Context, req *rental.CreateProfilePhotoRequest) (resp *rental.CreateProfilePhotoResponse, err error) {
	// TODO: Your code here...
	return
}

// CompleteProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) CompleteProfilePhoto(ctx context.Context, req *rental.CompleteProfilePhotoRequest) (resp *rental.Identity, err error) {
	// TODO: Your code here...
	return
}

// ClearProfilePhoto implements the ProfileServiceImpl interface.
func (s *ProfileServiceImpl) ClearProfilePhoto(ctx context.Context, req *rental.ClearProfilePhotoRequest) (resp *rental.ClearProfilePhotoResponse, err error) {
	// TODO: Your code here...
	return
}
