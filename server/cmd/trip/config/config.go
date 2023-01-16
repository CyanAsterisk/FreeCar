package config

type NacosConfig struct {
	Host      string `mapstructure:"host"`
	Port      uint64 `mapstructure:"port"`
	Namespace string `mapstructure:"namespace"`
	User      string `mapstructure:"user"`
	Password  string `mapstructure:"password"`
	DataId    string `mapstructure:"dataid"`
	Group     string `mapstructure:"group"`
}

type MongoDBConfig struct {
	Host       string `mapstructure:"host" json:"host"`
	Port       int    `mapstructure:"port" json:"port"`
	Name       string `mapstructure:"db" json:"db"`
	User       string `mapstructure:"user" json:"user"`
	Password   string `mapstructure:"password" json:"password"`
	Collection string `mapstructure:"collection" json:"collection"`
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
}

type CarSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}

type ProfileSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
