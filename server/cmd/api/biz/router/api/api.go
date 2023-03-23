// Code generated by hertz generator. DO NOT EDIT.

package Api

import (
	api "github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/handler/api"
	"github.com/cloudwego/hertz/pkg/app/server"
)

/*
 This file will register all the routes of the services in the master idl.
 And it will update automatically when you use the "update" command for the idl.
 So don't modify the contents of the file, or your code will be deleted when it is updated.
*/

// Register register routes based on the IDL 'api.${HTTP Method}' annotation.
func Register(r *server.Hertz) {

	root := r.Group("/", rootMw()...)
	root.GET("/car", append(_getcarMw(), api.GetCar)...)
	root.DELETE("/car", append(_deletecarMw(), api.DeleteCar)...)
	root.GET("/cars", append(_getcarsMw(), api.GetCars)...)
	root.DELETE("/profile", append(_clearprofileMw(), api.ClearProfile)...)
	root.POST("/profile", append(_submitprofileMw(), api.SubmitProfile)...)
	root.GET("/trips", append(_gettripsMw(), api.GetTrips)...)
	root.DELETE("/user", append(_deleteuserMw(), api.DeleteUser)...)
	{
		_admin := root.Group("/admin", _adminMw()...)
		_admin.POST("/login", append(__dminloginMw(), api.AdminLogin)...)
		_admin.POST("/password", append(_change_dminpasswordMw(), api.ChangeAdminPassword)...)
	}
	root.POST("/car", append(_carMw(), api.CreateCar)...)
	_car := root.Group("/car", _carMw()...)
	_car.POST("/update", append(_updatecarMw(), api.UpdateCar)...)
	{
		_cars := root.Group("/cars", _carsMw()...)
		_cars.GET("/all", append(_get_llcarsMw(), api.GetAllCars)...)
		_cars.GET("/some", append(_getsomecarsMw(), api.GetSomeCars)...)
	}
	root.GET("/profile", append(_profileMw(), api.GetProfile)...)
	_profile := root.Group("/profile", _profileMw()...)
	_profile.POST("/photo", append(_createprofilephotoMw(), api.CreateProfilePhoto)...)
	_profile.DELETE("/photo", append(_clearprofilephotoMw(), api.ClearProfilePhoto)...)
	_profile.GET("/photo", append(_photoMw(), api.GetProfilePhoto)...)
	_photo := _profile.Group("/photo", _photoMw()...)
	_photo.POST("/complete", append(_completeprofilephotoMw(), api.CompleteProfilePhoto)...)
	root.POST("/trip", append(_tripMw(), api.CreateTrip)...)
	_trip := root.Group("/trip", _tripMw()...)
	_trip.GET("/:id", append(_gettripMw(), api.GetTrip)...)
	_trip.PUT("/:id", append(_updatetripMw(), api.UpdateTrip)...)
	root.POST("/user", append(_userMw(), api.AddUser)...)
	_user := root.Group("/user", _userMw()...)
	_user.GET("/all", append(_get_llusersMw(), api.GetAllUsers)...)
	_user.GET("/some", append(_getsomeusersMw(), api.GetSomeUsers)...)
	{
		_user0 := root.Group("/user", _user0Mw()...)
		_user0.POST("/avatar", append(_upload_vatarMw(), api.UploadAvatar)...)
		_user0.GET("/info", append(_getuserinfoMw(), api.GetUserInfo)...)
		_user0.POST("/info", append(_updateuserinfoMw(), api.UpdateUserInfo)...)
		_user0.POST("/login", append(_loginMw(), api.Login)...)
	}
}
