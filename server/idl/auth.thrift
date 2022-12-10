namespace go auth

struct LoginRequest {
    1: string code
}

struct LoginResponse {
    1: i64 accountID
}

service AuthService {
    LoginResponse Login(1: LoginRequest req) (api.post="/v1/auth/login")
}