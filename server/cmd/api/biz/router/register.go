// Code generated by hertz generator. DO NOT EDIT.

package router

import (
	api "github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/router/api"
	car "github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/router/car"
	user "github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/router/user"
	"github.com/cloudwego/hertz/pkg/app/server"
)

// GeneratedRegister registers routers generated by IDL.
func GeneratedRegister(r *server.Hertz) {
	//INSERT_POINT: DO NOT DELETE THIS LINE!
	car.Register(r)

	user.Register(r)

	api.Register(r)
}
