package config

import (
	"github.com/minio/minio-go/v7"
	"gorm.io/gorm"
)

var (
	DB                 *gorm.DB
	minioClient        *minio.Client
	GlobalServerConfig ServerConfig
	GlobalNacosConfig  NacosConfig
)
