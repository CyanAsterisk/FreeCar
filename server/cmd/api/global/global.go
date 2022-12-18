package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/api/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/kitex_gen/auth/authservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/kitex_gen/profile/profileservice"
)

var (
	ServerConfig = &config.ServerConfig{}
	NacosConfig  = &config.NacosConfig{}

	AuthClient    authservice.Client
	CarClient     carservice.Client
	ProfileClient profileservice.Client
)
