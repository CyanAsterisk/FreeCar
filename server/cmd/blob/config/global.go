package config

import (
	"github.com/tencentyun/cos-go-sdk-v5"
	"gorm.io/gorm"
)

var (
	DB                 *gorm.DB
	CosClient          *cos.Client
	GlobalServerConfig ServerConfig
	GlobalNacosConfig  NacosConfig
)
