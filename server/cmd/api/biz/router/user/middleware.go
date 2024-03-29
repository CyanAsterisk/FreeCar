// Code generated by hertz generator.

package user

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/router/common"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/cloudwego/hertz/pkg/app"
)

func rootMw() []app.HandlerFunc {
	return common.CommonMW()
}

func _adminMw() []app.HandlerFunc {
	return []app.HandlerFunc{
		common.PasetoAuth(consts.Admin),
	}
}

func _userMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _loginMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _login0Mw() []app.HandlerFunc {
	// your code...
	return nil
}

func _getuserinfoMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _passwordMw() []app.HandlerFunc {
	return []app.HandlerFunc{
		common.PasetoAuth(consts.Admin),
	}
}

func _user0Mw() []app.HandlerFunc {
	return []app.HandlerFunc{
		common.PasetoAuth(consts.User),
	}
}

func _updateuserinfoMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _adminadduserMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _admingetallusersMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _admingetsomeusersMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _admindeleteuserMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _adminupdateuserMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _adminloginMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _adminchangepasswordMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _uploadavatarMw() []app.HandlerFunc {
	// your code...
	return nil
}
