package config

type JWTConfig struct {
	SigningKey string `mapstructure:"key" json:"key"`
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
	Name           string       `mapstructure:"name" json:"name"`
	Host           string       `mapstructure:"host" json:"host"`
	Port           int          `mapstructure:"port" json:"port"`
	JWTInfo        JWTConfig    `mapstructure:"jwt" json:"jwt"`
	OtelInfo       OtelConfig   `mapstructure:"otel" json:"otel"`
	AuthSrvInfo    RPCSrvConfig `mapstructure:"auth_srv" json:"auth_srv"`
	CarSrvInfo     RPCSrvConfig `mapstructure:"car_srv" json:"car_srv"`
	ProfileSrvInfo RPCSrvConfig `mapstructure:"profile_srv" json:"profile_srv"`
	TripSrvInfo    RPCSrvConfig `mapstructure:"trip_srv" json:"trip_srv"`
}

type RPCSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
