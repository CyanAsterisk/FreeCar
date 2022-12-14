package global

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/config"
	"github.com/tencentyun/cos-go-sdk-v5"
	"gorm.io/gorm"
)

var (
	DB           *gorm.DB
	CosClient    *cos.Client
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig
)
