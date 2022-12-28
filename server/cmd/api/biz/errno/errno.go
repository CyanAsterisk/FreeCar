package errno

import (
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/errno/kitex_gen/errno"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
)

type ErrNo struct {
	ErrCode int64
	ErrMsg  string
}

type Response struct {
	Code    int64       `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func (e ErrNo) Error() string {
	return fmt.Sprintf("err_code=%d, err_msg=%s", e.ErrCode, e.ErrMsg)
}

// NewErrNo return ErrNo
func NewErrNo(code int64, msg string) ErrNo {
	return ErrNo{
		ErrCode: code,
		ErrMsg:  msg,
	}
}

func (e ErrNo) WithMessage(msg string) ErrNo {
	e.ErrMsg = msg
	return e
}

var (
	Success             = NewErrNo(int64(errno.Err_Success), "Success")
	BadRequest          = NewErrNo(int64(errno.Err_BadRequest), "Request Failed")
	GenerateTokenFail   = NewErrNo(int64(errno.Err_GenerateTokenFail), "Generate token failed")
	RequestServerFail   = NewErrNo(int64(errno.Err_RequestServerFail), "Request server failed")
	BindAndValidateFail = NewErrNo(int64(errno.Err_BindAndValidateFail), "Bind and validate failed")
	ParamErr            = NewErrNo(int64(errno.Err_ParamErr), "Param error")
	AuthorizeFail       = NewErrNo(int64(errno.Err_AuthorizeFail), "Authorize failed")
)

// SendResponse pack response
func SendResponse(c *app.RequestContext, err ErrNo, data interface{}) {
	c.JSON(consts.StatusOK, Response{
		Code:    err.ErrCode,
		Message: err.ErrMsg,
		Data:    data,
	})
}
