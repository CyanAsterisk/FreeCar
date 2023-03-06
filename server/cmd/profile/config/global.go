package config

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob/blobservice"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	DB                 *mongo.Collection
	GlobalServerConfig ServerConfig
	GlobalNacosConfig  NacosConfig

	BlobClient blobservice.Client
)
