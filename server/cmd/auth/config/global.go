package config

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob/blobservice"
	"gorm.io/gorm"
)

var (
	DB                 *gorm.DB
	GlobalServerConfig ServerConfig
	GlobalNacosConfig  NacosConfig

	BlobClient blobservice.Client
)
