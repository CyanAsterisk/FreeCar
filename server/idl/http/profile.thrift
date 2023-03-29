namespace go profile

include "../base/common.thrift"
include "../base/profile.thrift"

struct GetProfileRequest {
}

struct GetProfileResponse {
    1: required common.BaseResponse base_resp,
    2: required profile.Profile profile,
}

struct GetAllProfileRequest {
}

struct GetAllProfileResponse {
    1: required common.BaseResponse base_resp,
    2: required list<profile.ProfileRecord> profile,
}

struct GetSomeProfileRequest {
}

struct GetSomeProfileResponse {
    1: required common.BaseResponse base_resp,
    2: required list<profile.ProfileRecord> profile,
}

struct GetPendingProfileRequest {
}

struct GetPendingProfileResponse {
    1: required common.BaseResponse base_resp,
    2: required list<profile.ProfileRecord> profile,
}

struct CheckProfileRequest {
    1: required bool accept,
}

struct CheckProfileResponse {
    1: required common.BaseResponse base_resp,
}

struct DeleteProfileRequest {
    1: required i64 account_id (api.raw="account_id")
}

struct DeleteProfileResponse {
    1: required common.BaseResponse base_resp,
}

struct SubmitProfileRequest {
    1: required profile.Identity identity (api.raw="identity")
}

struct SubmitProfileResponse {
    1: required common.BaseResponse base_resp,
    2: required profile.Profile profile,
}

struct ClearProfileRequest {
}

struct ClearProfileResponse {
    1: required common.BaseResponse base_resp,
    2: required profile.Profile profile,
}

struct GetProfilePhotoRequest {
}

struct GetProfilePhotoResponse {
    1: required common.BaseResponse base_resp,
    2: required string url,
}

struct CreateProfilePhotoRequest {
}

struct CreateProfilePhotoResponse {
    1: required common.BaseResponse base_resp,
    2: required string upload_url,
}

struct CompleteProfilePhotoRequest {
}

struct CompleteProfilePhotoResponse {
    1: required common.BaseResponse base_resp,
    2: required profile.Identity identity,
}

struct ClearProfilePhotoRequest {
}

struct ClearProfilePhotoResponse {
    1: required common.BaseResponse base_resp,
}


service ProfileService{

  // for back-stage management
  DeleteProfileResponse DeleteProfile(1: DeleteProfileRequest req) (api.delete="/profile/admin/delete")
  CheckProfileResponse CheckProfile(1: CheckProfileRequest req) (api.post="/profile/admin/check")
   GetAllProfileResponse GetAllProfile(1:GetAllProfileRequest req) (api.get="/profile/admin/all")
   GetSomeProfileResponse GetSomeProfile(1: GetSomeProfileRequest req) (api.get="/profile/admin/some")
   GetPendingProfileResponse GetPendingProfile(1: GetPendingProfileRequest req) (api.get="/profile/admin/pending")

  // for mini-program
  GetProfileResponse GetProfile(1: GetProfileRequest req) (api.get="/profile/mini/profile")
  SubmitProfileResponse SubmitProfile(1: SubmitProfileRequest req) (api.post="/profile/mini/profile")
  ClearProfileResponse ClearProfile(1: ClearProfileRequest req) (api.delete="/profile/mini/profile")


  CreateProfilePhotoResponse CreateProfilePhoto(1: CreateProfilePhotoRequest req) (api.post="/profile/mini/photo")
  ClearProfilePhotoResponse ClearProfilePhoto(1: ClearProfilePhotoRequest req) (api.delete="/profile/mini/photo")
  GetProfilePhotoResponse GetProfilePhoto(1: GetProfilePhotoRequest req) (api.get="/profile/mini/photo")

  CompleteProfilePhotoResponse CompleteProfilePhoto(1: CompleteProfilePhotoRequest req) (api.get="/profile/mini/complete")
}