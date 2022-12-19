package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/dao"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/mq"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip/tripservice"
)

var (
	DB           *dao.Mongo
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig
	Publisher    mq.Publisher
	Subscriber   mq.Subscriber
	TripClient   tripservice.Client
)
