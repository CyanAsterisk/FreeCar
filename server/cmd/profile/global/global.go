package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/config"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob/blobservice"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	DB           *mongo.Collection
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig

	BlobClient blobservice.Client
)
