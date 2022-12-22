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

type ConsulConfig struct {
	Host string `mapstructure:"host" json:"host"`
	Port int    `mapstructure:"port" json:"port"`
}

type OtelConfig struct {
	EndPoint string `mapstructure:"endpoint" json:"endpoint"`
}

type ServerConfig struct {
	Name        string        `mapstructure:"name" json:"name"`
	Host        string        `mapstructure:"host" json:"host"`
	MongoDBInfo MongoDBConfig `mapstructure:"mongodb" json:"mongodb"`
	ConsulInfo  ConsulConfig  `mapstructure:"consul" json:"consul"`
	OtelInfo    OtelConfig    `mapstructure:"otel" json:"otel"`
	BlobSrvInfo BlobSrvConfig `mapstructure:"blob_srv" json:"blob_srv"`
}

type BlobSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
