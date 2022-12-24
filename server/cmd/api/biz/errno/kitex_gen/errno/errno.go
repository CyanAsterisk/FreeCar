// Code generated by thriftgo (0.2.4). DO NOT EDIT.

package errno

import (
	"database/sql"
	"database/sql/driver"
	"fmt"
)

type Err int64

const (
	Err_Success             Err = 10000
	Err_BadRequest          Err = 10001
	Err_GenerateTokenFail   Err = 10002
	Err_RequestServerFail   Err = 10003
	Err_BindAndValidateFail Err = 10004
	Err_ParamErr            Err = 10005
)

func (p Err) String() string {
	switch p {
	case Err_Success:
		return "Success"
	case Err_BadRequest:
		return "BadRequest"
	case Err_GenerateTokenFail:
		return "GenerateTokenFail"
	case Err_RequestServerFail:
		return "RequestServerFail"
	case Err_BindAndValidateFail:
		return "BindAndValidateFail"
	case Err_ParamErr:
		return "ParamErr"
	}
	return "<UNSET>"
}

func ErrFromString(s string) (Err, error) {
	switch s {
	case "Success":
		return Err_Success, nil
	case "BadRequest":
		return Err_BadRequest, nil
	case "GenerateTokenFail":
		return Err_GenerateTokenFail, nil
	case "RequestServerFail":
		return Err_RequestServerFail, nil
	case "BindAndValidateFail":
		return Err_BindAndValidateFail, nil
	case "ParamErr":
		return Err_ParamErr, nil
	}
	return Err(0), fmt.Errorf("not a valid Err string")
}

func ErrPtr(v Err) *Err { return &v }
func (p *Err) Scan(value interface{}) (err error) {
	var result sql.NullInt64
	err = result.Scan(value)
	*p = Err(result.Int64)
	return
}

func (p *Err) Value() (driver.Value, error) {
	if p == nil {
		return nil, nil
	}
	return int64(*p), nil
}