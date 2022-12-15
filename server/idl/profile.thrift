namespace go profile

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
  1: string account_id
}

struct SubmitProfileRequest {
  1: string account_id
  2: Identity identity
}

struct ClearProfileRequest {
  1: string account_id
}

struct GetProfilePhotoRequest {
  1: string account_id
}
struct GetProfilePhotoResponse {
  1: string url
}

struct CreateProfilePhotoRequest {
  1: string account_id
}
struct CreateProfilePhotoResponse {
  1: string upload_url
}

struct CompleteProfilePhotoRequest {
  1: string account_id
}
struct ClearProfilePhotoRequest {
  1: string account_id
}
struct ClearProfilePhotoResponse {}

service ProfileService {
  Profile GetProfile(1: GetProfileRequest req) (api.get="/v1/profile")
  Profile SubmitProfile(1: SubmitProfileRequest req) (api.post="/v1/profile")
  Profile ClearProfile(1: ClearProfileRequest req) (api.delete="/v1/profile")

  GetProfilePhotoResponse GetProfilePhoto(1: GetProfilePhotoRequest req) (api.get="/v1/profile/photo")
  CreateProfilePhotoResponse CreateProfilePhoto(1: CreateProfilePhotoRequest req) (api.post="/v1/profile/photo")
  Identity CompleteProfilePhoto(1: CompleteProfilePhotoRequest req) (api.post="/v1/profile/photo/complete")
  ClearProfilePhotoResponse ClearProfilePhoto(1: ClearProfilePhotoRequest req) (api.delete="/v1/profile/photo")
}
