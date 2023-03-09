package config

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob/blobservice"
)

var (
	GlobalServerConfig ServerConfig
	GlobalNacosConfig  NacosConfig

	BlobClient blobservice.Client
)
