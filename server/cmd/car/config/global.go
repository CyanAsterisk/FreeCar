package config

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/mq"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip/tripservice"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	Col                *mongo.Collection
	GlobalServerConfig ServerConfig
	GlobalNacosConfig  NacosConfig
	Publisher          mq.Publisher
	Subscriber         mq.Subscriber

	TripClient tripservice.Client
	CarClient  carservice.Client
)
