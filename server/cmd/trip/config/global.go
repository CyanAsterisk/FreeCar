package config

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile/profileservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/user/userservice"
)

var (
	GlobalServerConfig ServerConfig
	GlobalConsulConfig ConsulConfig

	CarClient     carservice.Client
	ProfileClient profileservice.Client
	UserClient    userservice.Client
)
