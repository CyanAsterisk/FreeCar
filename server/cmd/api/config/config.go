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

type JWTConfig struct {
	SigningKey string `mapstructure:"key" json:"key"`
}

type ConsulConfig struct {
	Host string `mapstructure:"host" json:"host"`
	Port int    `mapstructure:"port" json:"port"`
}

type JaegerConfig struct {
	Host string `mapstructure:"host" json:"host"`
	Port int    `mapstructure:"port" json:"port"`
}

type ServerConfig struct {
	Name           string           `mapstructure:"name" json:"name"`
	Host           string           `mapstructure:"host" json:"host"`
	Port           int              `mapstructure:"port" json:"port"`
	JWTInfo        JWTConfig        `mapstructure:"jwt" json:"jwt"`
	ConsulInfo     ConsulConfig     `mapstructure:"consul" json:"consul"`
	JaegerInfo     JaegerConfig     `mapstructure:"jaeger" json:"jaeger"`
	AuthSrvInfo    AuthSrvConfig    `mapstructure:"auth_srv" json:"auth_srv"`
	CarSrvInfo     CarSrvConfig     `mapstructure:"car_srv" json:"car_srv"`
	ProfileSrvInfo ProfileSrvConfig `mapstructure:"profile_srv" json:"profile_srv"`
	TripSrvInfo    TripSrvConfig    `mapstructure:"trip_srv" json:"trip_srv"`
}

type AuthSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}

type CarSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}

type ProfileSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}

type TripSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
