package config

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile/profileservice"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	DB                 *mongo.Collection
	GlobalServerConfig ServerConfig
	GlobalNacosConfig  NacosConfig

	CarClient     carservice.Client
	ProfileClient profileservice.Client
)
