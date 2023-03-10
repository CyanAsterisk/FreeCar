package config

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile/profileservice"
)

var (
	GlobalServerConfig ServerConfig
	GlobalNacosConfig  NacosConfig

	CarClient     carservice.Client
	ProfileClient profileservice.Client
)
