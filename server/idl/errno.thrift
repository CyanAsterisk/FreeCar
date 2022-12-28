namespace go errno

enum Err
{
    Success               = 10000,
    BadRequest            = 10001,
	GenerateTokenFail     = 10002,
	RequestServerFail     = 10003,
	BindAndValidateFail   = 10004,
	ParamErr              = 10005,
	AuthorizeFail         = 10006,
}
