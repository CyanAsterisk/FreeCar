namespace go blob

include "../base/common.thrift"

struct CreateBlobRequest {
    1:  i64 account_id,
    2:  i32 upload_url_timeout_sec,
}

struct CreateBlobResponse {
    1:  common.BaseResponse base_resp,
    2:  i64 id,
    3:  string upload_url,
}

struct GetBlobURLRequest {
    1:  i64 id,
    2:  i32 timeout_sec,
}

struct GetBlobURLResponse {
    1:  common.BaseResponse base_resp,
    2:  string url,
}

service BlobService {
    CreateBlobResponse CreateBlob(1: CreateBlobRequest req),
    GetBlobURLResponse GetBlobURL(1: GetBlobURLRequest req),
}