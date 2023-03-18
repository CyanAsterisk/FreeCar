namespace go auth

struct LoginRequest {
    1: string code
}

struct LoginResponse {
    1: i64 account_id
}

struct AdminLoginRequest {
    1: string username
    2: string password
}

struct AdminLoginResponse {
    1: i64 account_id
}

struct ChangeAdminPasswordRequest {
    1: i64 account_id
    2: string old_password
    3: string new_password
}

struct ChangeAdminPasswordResponse {}

struct UserInfo{
    1: i64 account_id;
    2: string username;
    3: i64 phone_number;
    4: string avatar_url;
}

struct GetUserRequest{
    1: i64 accont_id;
}

struct UploadAvatarRequset{
    1: i64 account_id;
}

struct UploadAvatarResponse{
    1: string upload_url;
}

struct AddUserRequest{
    1: i64 account_id;
    2: string username;
    3: i64 phone_number;
    4: string avatar_url
}

struct AddUserResponse{}

struct DeleteUserRequest{
    1: i64 account_id;
}

struct DeleteUserResponse{}

struct UpdateUserRequest{
    1: i64 account_id;
    2: string username;
    3: i64 phone_number;
    4: string avatar_url
}

struct UpdateUserResponse{}

struct GetUsersRequest{
    1: i64 pn;
    2: i64 psize;
}

struct GetUsersResponse{
    1: list<UserInfo> users;
}

service AuthService {
    LoginResponse Login(1: LoginRequest req)
    AdminLoginResponse AdminLogin(1: AdminLoginRequest req)
    ChangeAdminPasswordResponse ChangeAdminPassword(1: ChangeAdminPasswordRequest req)
    UploadAvatarResponse UploadAvatar(1: UploadAvatarRequset req)
    UserInfo GetUser (1: GetUserRequest req)

    AddUserResponse AddUser (1: AddUserRequest req)
    DeleteUserResponse DeleteUser (1: DeleteUserRequest req)
    UpdateUserResponse UpdateUser (1: UpdateUserRequest req)
    GetUsersResponse GetUsers (1:GetUsersRequest req)
}