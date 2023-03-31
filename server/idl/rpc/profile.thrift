namespace go profile

include "../base/common.thrift"
include "../base/profile.thrift"

struct GetProfileRequest {
    1:  i64 account_id,
}

struct GetProfileResponse {
    1:  common.BaseResponse base_resp,
    2:  profile.Profile profile,
}

struct GetAllProfileRequest {
}

struct GetAllProfileResponse {
    1:  common.BaseResponse base_resp,
    2:  list<profile.ProfileRecord> profile,
}

struct GetSomeProfileRequest {
}

struct GetSomeProfileResponse {
    1:  common.BaseResponse base_resp,
    2:  list<profile.ProfileRecord> profile,
}

struct GetPendingProfileRequest {
}

struct GetPendingProfileResponse {
    1:  common.BaseResponse base_resp,
    2:  list<profile.ProfileRecord> profile,
}

struct CheckProfileRequest {
    1:  i64 account_id,
    2:  bool accept,
}

struct CheckProfileResponse {
    1:  common.BaseResponse base_resp,
}

struct DeleteProfileRequest {
    1:  i64 account_id,
}

struct DeleteProfileResponse {
    1:  common.BaseResponse base_resp,
}

struct SubmitProfileRequest {
    1:  i64 account_id,
    2:  profile.Identity identity,
}

struct SubmitProfileResponse {
    1:  common.BaseResponse base_resp,
    2:  profile.Profile profile,
}

struct ClearProfileRequest {
    1:  i64 account_id,
}

struct ClearProfileResponse {
    1:  common.BaseResponse base_resp,
    2:  profile.Profile profile,
}

struct GetProfilePhotoRequest {
    1:  i64 account_id,
}

struct GetProfilePhotoResponse {
    1:  common.BaseResponse base_resp,
    2:  string url,
}

struct CreateProfilePhotoRequest {
    1:  i64 account_id,
}

struct CreateProfilePhotoResponse {
    1:  common.BaseResponse base_resp,
    2:  string upload_url,
}

struct CompleteProfilePhotoRequest {
    1:  i64 account_id,
}

struct CompleteProfilePhotoResponse {
    1:  common.BaseResponse base_resp,
    2:  profile.Identity identity,
}

struct ClearProfilePhotoRequest {
    1:  i64 account_id,
}

struct ClearProfilePhotoResponse {
    1:  common.BaseResponse base_resp,
}

service ProfileService {
    GetProfileResponse GetProfile(1: GetProfileRequest req),
    SubmitProfileResponse SubmitProfile(1: SubmitProfileRequest req),
    ClearProfileResponse ClearProfile(1: ClearProfileRequest req),
    GetAllProfileResponse GetAllProfile(1: GetAllProfileRequest req),
    GetSomeProfileResponse GetSomeProfile(1: GetSomeProfileRequest req),
    GetPendingProfileResponse GetPendingProfile(1: GetPendingProfileRequest req),
    CheckProfileResponse CheckProfile(1: CheckProfileRequest req),
    DeleteProfileResponse DeleteProfile(1: DeleteProfileRequest req),
    GetProfilePhotoResponse GetProfilePhoto(1: GetProfilePhotoRequest req),
    CreateProfilePhotoResponse CreateProfilePhoto(1: CreateProfilePhotoRequest req),
    CompleteProfilePhotoResponse CompleteProfilePhoto(1: CompleteProfilePhotoRequest req),
    ClearProfilePhotoResponse ClearProfilePhoto(1: ClearProfilePhotoRequest req),
}