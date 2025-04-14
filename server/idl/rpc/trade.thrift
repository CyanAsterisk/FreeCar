namespace go trade

struct BaseResponse {
    1: i64 status_code,   // Status code, 0-success, other values-failure
    2: string status_msg, // Return status description
}

struct NilResponse {}

struct PayRequest {
    1:  string account_id,
    2:  i32 fee_cent,
}

struct PayResponse {
    1:  BaseResponse base_resp,
}

service TradeService {
    PayResponse pay(1: PayRequest request),
}