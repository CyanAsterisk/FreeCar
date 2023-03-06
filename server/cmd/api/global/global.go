package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/api/config"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/auth/authservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile/profileservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip/tripservice"
)

var (
	ServerConfig = &config.ServerConfig{}
	NacosConfig  = &config.NacosConfig{}

	AuthClient    authservice.Client
	CarClient     carservice.Client
	ProfileClient profileservice.Client
	TripClient    tripservice.Client
)
