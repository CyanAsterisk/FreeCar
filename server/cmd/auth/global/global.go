package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/config"
	"gorm.io/gorm"
)

var (
	DB           *gorm.DB
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig
)
