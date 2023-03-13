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

type MysqlConfig struct {
	Host     string `mapstructure:"host" json:"host"`
	Port     int    `mapstructure:"port" json:"port"`
	Name     string `mapstructure:"db" json:"db"`
	User     string `mapstructure:"user" json:"user"`
	Password string `mapstructure:"password" json:"password"`
	Salt     string `mapstructure:"salt" json:"salt"`
}

type ConsulConfig struct {
	Host string `mapstructure:"host" json:"host"`
	Port int    `mapstructure:"port" json:"port"`
}

type RedisConfig struct {
	Host     string `mapstructure:"host" json:"host"`
	Port     int    `mapstructure:"port" json:"port"`
	Password string `mapstructure:"password" json:"password"`
}

type OtelConfig struct {
	EndPoint string `mapstructure:"endpoint" json:"endpoint"`
}

type MinioConfig struct {
	Endpoint        string `mapstructure:"endpoint" json:"endpoint"`
	AccessKeyID     string `mapstructure:"access_key_id" json:"access_key_id"`
	SecretAccessKey string `mapstructure:"secret_access_key" json:"secret_access_key"`
	Bucket          string `mapstructure:"bucket" json:"bucket"`
}

type ServerConfig struct {
	Name       string       `mapstructure:"name" json:"name"`
	Host       string       `mapstructure:"host" json:"host"`
	MysqlInfo  MysqlConfig  `mapstructure:"mysql" json:"mysql"`
	ConsulInfo ConsulConfig `mapstructure:"consul" json:"consul"`
	RedisInfo  RedisConfig  `mapstructure:"redis" json:"redis"`
	OtelInfo   OtelConfig   `mapstructure:"otel" json:"otel"`
	MinioInfo  MinioConfig  `mapstructure:"minio" json:"minio"`
}
