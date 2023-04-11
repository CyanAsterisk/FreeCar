namespace go profile

include "../base/common.thrift"
include "../base/profile.thrift"

struct GetProfileRequest {}

struct GetAllProfileRequest {}

struct GetSomeProfileRequest {}

struct GetPendingProfileRequest {}


struct CheckProfileRequest {
    1:  string account_id (api.raw = "account_id"),
    2:  bool accept,
}

struct DeleteProfileRequest {
    1:  string account_id (api.raw = "account_id"),
}

struct SubmitProfileRequest {
    1:  profile.Identity identity (api.raw = "identity"),
}

struct ClearProfileRequest {}

struct GetProfilePhotoRequest {}

struct CreateProfilePhotoRequest {}

struct CompleteProfilePhotoRequest {}

struct ClearProfilePhotoRequest {}

struct ClearProfilePhotoResponse {
    1:  common.BaseResponse base_resp,
}

service ProfileService {
    // for back-stage management
    common.NilResponse DeleteProfile(1: DeleteProfileRequest req) (api.delete = "/admin/profile"),
    common.NilResponse CheckProfile(1: CheckProfileRequest req) (api.post = "/admin/profile/check"),
    common.NilResponse GetAllProfile(1: GetAllProfileRequest req) (api.get = "/admin/profile/all"),
    common.NilResponse GetSomeProfile(1: GetSomeProfileRequest req) (api.get = "/admin/profile/some"),
    common.NilResponse GetPendingProfile(1: GetPendingProfileRequest req) (api.get = "/admin/profile/pending"),

    // for mini-program
    common.NilResponse GetProfile(1: GetProfileRequest req) (api.get = "/profile"),
    common.NilResponse SubmitProfile(1: SubmitProfileRequest req) (api.post = "/profile"),
    common.NilResponse ClearProfile(1: ClearProfileRequest req) (api.delete = "/profile"),
    common.NilResponse CreateProfilePhoto(1: CreateProfilePhotoRequest req) (api.post = "/profile/photo"),
    common.NilResponse ClearProfilePhoto(1: ClearProfilePhotoRequest req) (api.delete = "/profile/photo"),
    common.NilResponse GetProfilePhoto(1: GetProfilePhotoRequest req) (api.get = "/profile/photo"),
    common.NilResponse CompleteProfilePhoto(1: CompleteProfilePhotoRequest req) (api.get = "/profile/complete"),
}