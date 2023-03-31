namespace go user

include "../base/common.thrift"
include "../base/user.thrift"

struct LoginRequest {
    1:  string code
}

struct LoginResponse {
    1:  common.BaseResponse base_resp
    2:  i64 account_id
}

struct AdminLoginRequest {
    1:  string username
    2:  string password
}

struct AdminLoginResponse {
    1:  common.BaseResponse base_resp
    2:  i64 account_id
}

struct ChangeAdminPasswordRequest {
    1:  i64 account_id
    2:  string old_password
    3:  string new_password
}

struct ChangeAdminPasswordResponse {
    1:  common.BaseResponse base_resp
}

struct GetUserInfoResponse {
    1:  common.BaseResponse base_resp
    2:  user.UserInfo user_info
}

struct GetUserRequest {
    1:  i64 accont_id
}

struct UploadAvatarRequset {
    1:  i64 account_id
}

struct UploadAvatarResponse {
    1:  common.BaseResponse base_resp
    2:  string upload_url
}

struct AddUserRequest {
    1:  i64 account_id
    2:  string username
    3:  i64 phone_number
    4:  i64 avatar_blob_id
    5:  string open_id
}

struct AddUserResponse {
    1:  common.BaseResponse base_resp
}

struct DeleteUserRequest {
    1:  i64 account_id
}

struct DeleteUserResponse {
    1:  common.BaseResponse base_resp
}

struct UpdateUserRequest {
    1:  i64 account_id
    2:  string username
    3:  i64 phone_number
    4:  string avatar_url
}

struct UpdateUserResponse {
    1:  common.BaseResponse base_resp
}

struct GetSomeUsersRequest {
}

struct GetSomeUsersResponse {
    1:  common.BaseResponse base_resp
    2:  list<user.User> users
}

struct GetAllUsersRequest {
}

struct GetAllUsersResponse {
    1:  common.BaseResponse base_resp
    2:  list<user.User> users
}

service UserService {
    LoginResponse Login(1: LoginRequest req)
    AdminLoginResponse AdminLogin(1: AdminLoginRequest req)
    ChangeAdminPasswordResponse ChangeAdminPassword(1: ChangeAdminPasswordRequest req)
    UploadAvatarResponse UploadAvatar(1: UploadAvatarRequset req)
    GetUserInfoResponse GetUser(1: GetUserRequest req)
    AddUserResponse AddUser(1: AddUserRequest req)
    DeleteUserResponse DeleteUser(1: DeleteUserRequest req)
    UpdateUserResponse UpdateUser(1: UpdateUserRequest req)
    GetSomeUsersResponse GetSomeUsers(1: GetSomeUsersRequest req)
    GetAllUsersResponse GetAllUsers(1: GetAllUsersRequest req)
}