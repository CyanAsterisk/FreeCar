namespace go profile
include "../rpc/profile.thrift"


service ProfileService{

  // for back-stage management
  profile.GetAllProfileResponse GetAllProfile(1: profile.GetAllProfileRequest req)
  profile.GetSomeProfileResponse GetSomeProfile(1: profile.GetSomeProfileRequest req)
  profile.GetPendingProfileResponse GetPendingProfile(1: profile.GetPendingProfileRequest req)
  profile.CheckProfileResponse CheckProfile(1: profile.CheckProfileRequest req)
  profile.DeleteProfileResponse DeleteProfile(1: profile.DeleteProfileRequest req)

   profile.GetProfilePhotoResponse GetProfilePhoto(1: profile.GetProfilePhotoRequest req)
   profile.CreateProfilePhotoResponse CreateProfilePhoto(1: profile.CreateProfilePhotoRequest req)
   profile.CompleteProfilePhotoResponse CompleteProfilePhoto(1: profile.CompleteProfilePhotoRequest req)
   profile.ClearProfilePhotoResponse ClearProfilePhoto(1: profile.ClearProfilePhotoRequest req)

  // for mini-program
  profile.GetProfileResponse GetProfile(1: profile.GetProfileRequest req)
  profile.SubmitProfileResponse SubmitProfile(1: profile.SubmitProfileRequest req)
  profile.ClearProfileResponse ClearProfile(1: profile.ClearProfileRequest req)
}