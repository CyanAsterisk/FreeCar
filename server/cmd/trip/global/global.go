package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/kitex_gen/profile/profileservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/config"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	DB           *mongo.Collection
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig

	CarClient     carservice.Client
	ProfileClient profileservice.Client
)
