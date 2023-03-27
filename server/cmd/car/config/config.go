package config

type MongoDBConfig struct {
	Host       string `mapstructure:"host" json:"host"`
	Port       int    `mapstructure:"port" json:"port"`
	Name       string `mapstructure:"db" json:"db"`
	User       string `mapstructure:"user" json:"user"`
	Password   string `mapstructure:"password" json:"password"`
	Collection string `mapstructure:"collection" json:"collection"`
}

type RedisConfig struct {
	Host     string `mapstructure:"host" json:"host"`
	Port     int    `mapstructure:"port" json:"port"`
	Password string `mapstructure:"password" json:"password"`
}

type RabbitMqConfig struct {
	Host     string `mapstructure:"host" json:"host"`
	Port     int    `mapstructure:"port" json:"port"`
	Exchange string `mapstructure:"exchange" json:"exchange"`
	User     string `mapstructure:"user" json:"user"`
	Password string `mapstructure:"password" json:"password"`
}

type ConsulConfig struct {
	Host  string `mapstructure:"host" json:"host"`
	Port  int    `mapstructure:"port" json:"port"`
	Key   string `mapstructure:"key" json:"key"`
	Token string `mapstructure:"token" json:"token"`
}

type OtelConfig struct {
	EndPoint string `mapstructure:"endpoint" json:"endpoint"`
}

type ServerConfig struct {
	Name         string         `mapstructure:"name" json:"name"`
	Host         string         `mapstructure:"host" json:"host"`
	WsAddr       string         `mapstructure:"wsAddr" json:"wsAddr"`
	MongoDBInfo  MongoDBConfig  `mapstructure:"mongodb" json:"mongodb"`
	RedisInfo    RedisConfig    `mapstructure:"redis" json:"redis"`
	RabbitMqInfo RabbitMqConfig `mapstructure:"rabbitmq" json:"rabbitmq"`
	OtelInfo     OtelConfig     `mapstructure:"otel" json:"otel"`
	TripSrvInfo  TripSrvConfig  `mapstructure:"trip_srv" json:"trip_srv"`
}

type TripSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
