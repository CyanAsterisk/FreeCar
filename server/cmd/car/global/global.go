package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/trip/tripservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/mq"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	Col          *mongo.Collection
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig
	Publisher    mq.Publisher
	Subscriber   mq.Subscriber

	TripClient tripservice.Client
	CarClient  carservice.Client
)
