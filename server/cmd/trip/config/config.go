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

type ServerConfig struct {
	Name           string           `mapstructure:"name" json:"name"`
	Host           string           `mapstructure:"host" json:"host"`
	MongoDBInfo    MongoDBConfig    `mapstructure:"mongodb" json:"mongodb"`
	OtelInfo       OtelConfig       `mapstructure:"otel" json:"otel"`
	CarSrvInfo     CarSrvConfig     `mapstructure:"car_srv" json:"car_srv"`
	ProfileSrvInfo ProfileSrvConfig `mapstructure:"profile_srv" json:"profile_srv"`
	UserSrvInfo    UserSrvConfig    `mapstructure:"user_srv" json:"user_srv"`
}

type CarSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}

type ProfileSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}

type UserSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
