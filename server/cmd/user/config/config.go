package config

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
	Key  string `mapstructure:"key" json:"key"`
}

type OtelConfig struct {
	EndPoint string `mapstructure:"endpoint" json:"endpoint"`
}

type WXConfig struct {
	AppId     string `mapstructure:"app_id" json:"app_id"`
	AppSecret string `mapstructure:"app_secret" json:"app_secret"`
}

type ServerConfig struct {
	Name        string        `mapstructure:"name" json:"name"`
	Host        string        `mapstructure:"host" json:"host"`
	MysqlInfo   MysqlConfig   `mapstructure:"mysql" json:"mysql"`
	OtelInfo    OtelConfig    `mapstructure:"otel" json:"otel"`
	WXInfo      WXConfig      `mapstructure:"wx_config" json:"wx_config"`
	BlobSrvInfo BlobSrvConfig `mapstructure:"blob_srv" json:"blob_srv"`
}

type BlobSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
