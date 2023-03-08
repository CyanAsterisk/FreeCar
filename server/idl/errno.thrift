namespace go errno

enum Err {
    Success            = 0,
    BadRequest         = 10000,
    ParamsErr          = 10001,
    AuthorizeFail      = 10002,
    RPCAuthSrvErr      = 20000,
    AuthSrvErr         = 20001,
    RPCBlobSrvErr      = 30000,
    BlobSrvErr         = 30001,
    RPCCarSrvErr       = 40000,
    CarSrvErr          = 40001,
    RPCProfileSrvErr   = 50000,
    ProfileSrvErr      = 50001,
    RPCTripSrvErr      = 60000,
    TripSrvErr         = 60001,
    RecordNotFound     = 70000,
    RecordAlreadyExist = 70001,
    DirtyData          = 70003,
}