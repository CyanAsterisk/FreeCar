package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/kitex_gen/blob/blobservice"
	"gorm.io/gorm"
)

var (
	DB           *gorm.DB
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig

	BlobClient blobservice.Client
)
