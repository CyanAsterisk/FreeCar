namespace java org.lanlance.freecartrade.rpc.thrift_gen.user

struct BaseResponse {
    1: i64 status_code,   // Status code, 0-success, other values-failure
    2: string status_msg, // Return status description
}

struct NilResponse {}

struct UpdateUserRequest {
    1:  string account_id
    2:  string username
    3:  string phone_number
    4:  string avatar_url
}

struct UpdateUserResponse {
    1:  BaseResponse base_resp
}

service UserService {
    UpdateUserResponse UpdateUser(1: UpdateUserRequest req)
}