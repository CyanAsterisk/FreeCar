package config

type MongoDBConfig struct {
	Host       string `mapstructure:"host" json:"host"`
	Port       int    `mapstructure:"port" json:"port"`
	Name       string `mapstructure:"db" json:"db"`
	User       string `mapstructure:"user" json:"user"`
	Password   string `mapstructure:"password" json:"password"`
	Collection string `mapstructure:"collection" json:"collection"`
}

type ConsulConfig struct {
	Host string `mapstructure:"host" json:"host"`
	Port int    `mapstructure:"port" json:"port"`
	Key  string `mapstructure:"key" json:"key"`
}

type OtelConfig struct {
	EndPoint string `mapstructure:"endpoint" json:"endpoint"`
}

type RabbitMqConfig struct {
	Host     string `mapstructure:"host" json:"host"`
	Port     int    `mapstructure:"port" json:"port"`
	Exchange string `mapstructure:"exchange" json:"exchange"`
	User     string `mapstructure:"user" json:"user"`
	Password string `mapstructure:"password" json:"password"`
}

type ServerConfig struct {
	Name           string           `mapstructure:"name" json:"name"`
	Host           string           `mapstructure:"host" json:"host"`
	MongoDBInfo    MongoDBConfig    `mapstructure:"mongodb" json:"mongodb"`
	OtelInfo       OtelConfig       `mapstructure:"otel" json:"otel"`
	RabbitMqInfo   RabbitMqConfig   `mapstructure:"rabbitmq" json:"rabbitmq"`
	CarSrvInfo     CarSrvConfig     `mapstructure:"car_srv" json:"car_srv"`
	ProfileSrvInfo ProfileSrvConfig `mapstructure:"profile_srv" json:"profile_srv"`
}

type CarSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}

type ProfileSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
