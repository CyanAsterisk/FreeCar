package global

import (
	"github.com/CyanAsterisk/FreeCar/Server/cmd/profile/config"
	"gorm.io/gorm"
)

var (
	DB           *gorm.DB
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig
)
