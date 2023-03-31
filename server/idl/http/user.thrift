namespace go user

include "../base/common.thrift"
include "../base/user.thrift"

struct AdminLoginRequest {
    1:  string username (api.raw = "username" api.vd = "len($) > 0 && len($) < 33>")
    2:  string password (api.raw = "password" api.vd = "len($) > 0 && len($) < 33>")
}

struct AdminChangePasswordRequest {
    1:  string old_password (api.raw = "old_password" api.vd = "len($) > 0 && len($) < 33>")
    2:  string new_password (api.raw = "new_password" api.vd = "len($) > 0 && len($) < 33>")
}

struct AddUserRequest {
    1:  i64 account_id (api.raw = "account_id")
    2:  string username (api.raw = "username" api.vd = "len($) > 0 && len($) < 33>")
    3:  i64 phone_number (api.raw = "phone_number")
    4:  i64 avatar_blob_id (api.raw = "avatar_blob_id")
    5:  string open_id (api.raw = "open_id")
}

struct DeleteUserRequest {
    1:  i64 account_id (api.raw = "account_id")
}

struct UpdateUserRequest {
    1:  i64 account_id (api.raw = "account_id")
    2:  string username (api.raw = "username" api.vd = "len($) > 0 && len($) < 33>")
    3:  i64 phone_number (api.raw = "phone_number")
    4:  string avatar_url (api.raw = "avatar_url")
}

struct GetSomeUsersRequest {
}

struct GetAllUsersRequest {
}

struct LoginRequest {
    1:  string code (api.raw = "code")
}

struct UploadAvatarRequest {}

struct GetUserInfoRequest {
}

service UserService {
    common.NilResponse Login(1: LoginRequest req) (api.post = "/login/user")
    common.NilResponse AdminLogin(1: AdminLoginRequest req) (api.post = "/login/admin")
    common.NilResponse AdminChangePassword(1: AdminChangePasswordRequest req) (api.post = "/password/admin")

    // for back-stage management
    common.NilResponse AdminAddUser(1: AddUserRequest req) (api.post = "/admin/user")
    common.NilResponse AdminDeleteUser(1: DeleteUserRequest req) (api.delete = "/admin/user")
    common.NilResponse AdminUpdateUser(1: UpdateUserRequest req) (api.put = "/admin/user")
    common.NilResponse AdminGetSomeUsers(1: GetSomeUsersRequest req) (api.get = "/admin/user/some")
    common.NilResponse AdminGetAllUsers(1: GetAllUsersRequest req) (api.get = "/admin/user/all")

    // for mini-program
    common.NilResponse UploadAvatar(1: UploadAvatarRequest req) (api.post = "/user/avatar")
    common.NilResponse GetUserInfo(1: GetUserInfoRequest req) (api.get = "/user/info")
}