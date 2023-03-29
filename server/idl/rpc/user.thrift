namespace go user

include "../base/common.thrift"
include "../base/user.thrift"

struct LoginRequest {
    1: required string code,
}

struct LoginResponse {
    1: required common.BaseResponse base_resp,
    2: required i64 account_id,
}

struct AdminLoginRequest {
    1: required string username,
    2: required string password,
}

struct AdminLoginResponse {
    1: required common.BaseResponse base_resp,
    2: required i64 account_id,
}

struct ChangeAdminPasswordRequest {
    1: required i64 account_id,
    2: required string old_password,
    3: required string new_password,
}

struct ChangeAdminPasswordResponse {
    1: required common.BaseResponse base_resp,
}

struct GetUserInfoResponse {
    1: required common.BaseResponse base_resp,
    2: required user.UserInfo user_info,
}

struct GetUserRequest {
    1: required i64 accont_id,
}

struct UploadAvatarRequset {
    1: required i64 account_id,
}

struct UploadAvatarResponse {
    1: required common.BaseResponse base_resp,
    2: required string upload_url,
}

struct AddUserRequest {
    1: required i64 account_id,
    2: required string username,
    3: required i64 phone_number,
    4: required i64 avatar_blob_id,
    5: required string open_id,
}

struct AddUserResponse {
    1: required common.BaseResponse base_resp,
}

struct DeleteUserRequest {
    1: required i64 account_id,
}

struct DeleteUserResponse {
    1: required common.BaseResponse base_resp,
}

struct UpdateUserRequest {
    1: required i64 account_id,
    2: required string username,
    3: required i64 phone_number,
    4: required string avatar_url,
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

service UserService {
    LoginResponse Login(1: LoginRequest req),
    AdminLoginResponse AdminLogin(1: AdminLoginRequest req),
    ChangeAdminPasswordResponse ChangeAdminPassword(1: ChangeAdminPasswordRequest req),
    UploadAvatarResponse UploadAvatar(1: UploadAvatarRequset req),
    GetUserInfoResponse GetUser(1: GetUserRequest req),
    AddUserResponse AddUser(1: AddUserRequest req),
    DeleteUserResponse DeleteUser(1: DeleteUserRequest req),
    UpdateUserResponse UpdateUser(1: UpdateUserRequest req),
    GetSomeUsersResponse GetSomeUsers(1: GetSomeUsersRequest req),
    GetAllUsersResponse GetAllUsers(1: GetAllUsersRequest req),
}