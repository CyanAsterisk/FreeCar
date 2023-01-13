package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/profile/profileservice"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	DB           *mongo.Collection
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig

	CarClient     carservice.Client
	ProfileClient profileservice.Client
)
