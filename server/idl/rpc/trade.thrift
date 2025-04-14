namespace go trade

include "../base/common.thrift"

struct PayRequest {
    1:  string account_id,
    2:  i32 fee_cent,
}

struct PayResponse {
    1:  common.BaseResponse base_resp,
}

service TradeService {
    PayResponse pay(1: PayRequest request),
}