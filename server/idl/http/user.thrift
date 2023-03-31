namespace go user

include "../base/common.thrift"
include "../base/user.thrift"

struct AdminLoginRequest {
    1: required string username (api.raw = "username" api.vd = "len($) > 0 && len($) < 33>"),
    2: required string password (api.raw = "password" api.vd = "len($) > 0 && len($) < 33>"),
}

struct AdminLoginResponse {
    1: required common.BaseResponse base_resp,
    2: required string token,
}

struct AdminChangePasswordRequest {
    1: required string old_password (api.raw = "old_password" api.vd = "len($) > 0 && len($) < 33>"),
    2: required string new_password (api.raw = "new_password" api.vd = "len($) > 0 && len($) < 33>"),
}

struct AdminChangePasswordResponse {
    1: required common.BaseResponse base_resp,
}

struct AddUserRequest {
    1: required i64 account_id (api.raw = "account_id"),
    2: required string username (api.raw = "username" api.vd = "len($) > 0 && len($) < 33>"),
    3: required i64 phone_number (api.raw = "phone_number"),
    4: required i64 avatar_blob_id (api.raw = "avatar_blob_id"),
    5: required string open_id (api.raw = "open_id"),
}

struct AddUserResponse {
    1: required common.BaseResponse base_resp,
}

struct DeleteUserRequest {
    1: required i64 account_id (api.raw = "account_id"),
}

struct DeleteUserResponse {
    1: required common.BaseResponse base_resp,
}

struct UpdateUserRequest {
    1: required i64 account_id (api.raw = "account_id"),
    2: required string username (api.raw = "username" api.vd = "len($) > 0 && len($) < 33>"),
    3: required i64 phone_number (api.raw = "phone_number"),
    4: required string avatar_url (api.raw = "avatar_url"),
}

struct UpdateUserResponse {
    1: required common.BaseResponse base_resp,
}

struct GetSomeUsersRequest {
}

struct GetSomeUsersResponse {
    1: required common.BaseResponse base_resp,
    2: required list<user.User> users,
}

struct GetAllUsersRequest {
}

struct GetAllUsersResponse {
    1: required common.BaseResponse base_resp,
    2: required list<user.User> users,
}

struct LoginRequest {
    1: required string code (api.raw = "code"),
}

struct LoginResponse {
    1: required common.BaseResponse base_resp,
    2: required i64 account_id,
}

struct UploadAvatarRequest {
}

struct UploadAvatarResponse {
    1: required common.BaseResponse base_resp,
    2: required string upload_url,
}

struct GetUserInfoRequest {
}

struct GetUserInfoResponse {
    1: required common.BaseResponse base_resp,
    2: required user.UserInfo user_info,
}

service UserService {
    LoginResponse Login(1: LoginRequest req) (api.post = "/login/user"),
    AdminLoginResponse AdminLogin(1: AdminLoginRequest req) (api.post = "/login/admin"),
    AdminChangePasswordResponse AdminChangePassword(1: AdminChangePasswordRequest req) (api.post = "/password/admin"),

    // for back-stage management
    AddUserResponse AdminAddUser(1: AddUserRequest req) (api.post = "/admin/user"),
    DeleteUserResponse AdminDeleteUser(1: DeleteUserRequest req) (api.delete = "/admin/user"),
    UpdateUserResponse AdminUpdateUser(1: UpdateUserRequest req) (api.put = "/admin/user"),
    GetSomeUsersResponse AdminGetSomeUsers(1: GetSomeUsersRequest req) (api.get = "/admin/user/some"),
    GetAllUsersResponse AdminGetAllUsers(1: GetAllUsersRequest req) (api.get = "/admin/user/all"),

    // for mini-program
    UploadAvatarResponse UploadAvatar(1: UploadAvatarRequest req) (api.post = "/user/avatar"),
    GetUserInfoResponse GetUserInfo(1: GetUserInfoRequest req) (api.get = "/user/info"),
}