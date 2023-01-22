namespace go auth

struct LoginRequest {
    1: string code
}

struct LoginResponse {
    1: i64 account_id
}

struct UserInfo{
    1: i64 account_id;
    2: string username;
    3: string phone_number;
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

struct UpdateUserRequest{
    1: i64 account_id;
    2: string username;
    3: string phone_number;
    4: string avatar_url
}

struct UpdateUserResponse{}

service AuthService {
    LoginResponse Login(1: LoginRequest req)
    UploadAvatarResponse UploadAvatar(1: UploadAvatarRequset req)
    UpdateUserResponse UpdateUser (1:UpdateUserRequest req)
    UserInfo GetUser (1:GetUserRequest req)
}