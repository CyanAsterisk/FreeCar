package config

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile/profileservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip/tripservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/user/userservice"
)

var (
	GlobalServerConfig ServerConfig
	GlobalConsulConfig ConsulConfig

	GlobalUserClient    userservice.Client
	GlobalCarClient     carservice.Client
	GlobalProfileClient profileservice.Client
	GlobalTripClient    tripservice.Client
)
