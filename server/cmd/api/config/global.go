package config

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/auth/authservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile/profileservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip/tripservice"
)

var (
	GlobalServerConfig = &ServerConfig{}
	GlobalNacosConfig  = &NacosConfig{}

	GlobalAuthClient    authservice.Client
	GlobalCarClient     carservice.Client
	GlobalProfileClient profileservice.Client
	GlobalTripClient    tripservice.Client
)
