namespace go base

struct BaseResponse {
    1: i64 status_code,   // Status code, 0-success, other values-failure
    2: string status_msg, // Return status description
}