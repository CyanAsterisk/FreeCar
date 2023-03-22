namespace go profile
include "base.thrift"

// Profile Service
enum Gender {
  G_NOT_SPECIFIED = 0,
  MALE = 1,
  FEMALE = 2,
}

enum IdentityStatus {
  UNSUBMITTED = 0,
  PENDING = 1,
  VERIFIED = 2,
}

struct ProfileRecord {
    1: i64 account_id
    2: i64 photo_blob_id
    3: Profile profile
}

struct Profile {
  1: Identity identity
  2: IdentityStatus identity_status
}

struct Identity {
  1: string lic_number
  2: string name
  3: Gender gender
  4: i64 birth_date_millis
}

struct GetProfileRequest {
  1: i64 account_id
}

struct GetProfileResponse{
    1: base.BaseResponse base_resp
    2: Profile profile
}

struct GetAllProfileRequest {}

struct GetAllProfileResponse{
    1: base.BaseResponse base_resp
    2: list<ProfileRecord> profile
}

struct GetSomeProfileRequest {}

struct GetSomeProfileResponse{
    1: base.BaseResponse base_resp
    2: list<ProfileRecord> profile
}

struct GetPendingProfileRequest {}

struct GetPendingProfileResponse{
    1: base.BaseResponse base_resp
    2: list<ProfileRecord> profile
}

struct UpdateProfileRequest {
  1: i64 account_id
  2: Profile profile
}

struct UpdateProfileResponse{
    1: base.BaseResponse base_resp
}

struct DeleteProfileRequest {
  1: i64 account_id
}

struct DeleteProfileResponse{
    1: base.BaseResponse base_resp
}

struct SubmitProfileRequest {
  1: i64 account_id
  2: Identity identity
}

struct SubmitProfileResponse{
    1: base.BaseResponse base_resp
    2: Profile profile
}

struct ClearProfileRequest {
  1: i64 account_id
}

struct ClearProfileResponse{
    1: base.BaseResponse base_resp
    2: Profile profile
}

struct GetProfilePhotoRequest {
  1: i64 account_id
}

struct GetProfilePhotoResponse {
  1: base.BaseResponse base_resp
  2: string url
}

struct CreateProfilePhotoRequest {
  1: i64 account_id
}
struct CreateProfilePhotoResponse {
  1: base.BaseResponse base_resp
  2: string upload_url
}

struct CompleteProfilePhotoRequest {
  1: i64 account_id
}

struct CompleteProfilePhotoResponse{
     1: base.BaseResponse base_resp
     2: Identity identity
}

struct ClearProfilePhotoRequest {
  1: i64 account_id
}

struct ClearProfilePhotoResponse {
     1: base.BaseResponse base_resp
}

service ProfileService {
  GetProfileResponse GetProfile(1: GetProfileRequest req)
  SubmitProfileResponse SubmitProfile(1: SubmitProfileRequest req)
  ClearProfileResponse ClearProfile(1: ClearProfileRequest req)

  GetAllProfileResponse GetAllProfile(1: GetAllProfileRequest req)
  GetSomeProfileResponse GetSomeProfile(1: GetSomeProfileRequest req)
  GetPendingProfileResponse GetPendingProfile(1: GetPendingProfileRequest req)
  UpdateProfileResponse UpdateProfile(1: UpdateProfileRequest req)
  DeleteProfileResponse DeleteProfile(1: DeleteProfileRequest req)

  GetProfilePhotoResponse GetProfilePhoto(1: GetProfilePhotoRequest req)
  CreateProfilePhotoResponse CreateProfilePhoto(1: CreateProfilePhotoRequest req)
  CompleteProfilePhotoResponse CompleteProfilePhoto(1: CompleteProfilePhotoRequest req)
  ClearProfilePhotoResponse ClearProfilePhoto(1: ClearProfilePhotoRequest req)
}
