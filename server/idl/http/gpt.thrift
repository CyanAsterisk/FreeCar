namespace go gpt

include "../base/common.thrift"

struct ChatRequest {
    1: string content
}

struct ChatResponse {
    1:  common.BaseResponse base_resp
    2:  string content
}

service GptService {
    ChatResponse Chat(1: ChatRequest req) (api.post = "/chat"),
}