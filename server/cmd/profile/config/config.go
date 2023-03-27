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
	Host  string `mapstructure:"host" json:"host"`
	Port  int    `mapstructure:"port" json:"port"`
	Key   string `mapstructure:"key" json:"key"`
	Token string `mapstructure:"token" json:"token"`
}

type RedisConfig struct {
	Host     string `mapstructure:"host" json:"host"`
	Port     int    `mapstructure:"port" json:"port"`
	Password string `mapstructure:"password" json:"password"`
}

type OtelConfig struct {
	EndPoint string `mapstructure:"endpoint" json:"endpoint"`
}

type OCRConfig struct {
	AccessToken string `mapstructure:"access_token" json:"access_token"`
}

type ServerConfig struct {
	Name        string        `mapstructure:"name" json:"name"`
	Host        string        `mapstructure:"host" json:"host"`
	MongoDBInfo MongoDBConfig `mapstructure:"mongodb" json:"mongodb"`
	RedisInfo   RedisConfig   `mapstructure:"redis" json:"redis"`
	OtelInfo    OtelConfig    `mapstructure:"otel" json:"otel"`
	OCRConfig   OCRConfig     `mapstructure:"ocr" json:"ocr"`
	BlobSrvInfo BlobSrvConfig `mapstructure:"blob_srv" json:"blob_srv"`
}

type BlobSrvConfig struct {
	Name string `mapstructure:"name" json:"name"`
}
