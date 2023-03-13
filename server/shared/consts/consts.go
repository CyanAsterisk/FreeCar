package consts

const (
	FreeCar    = "FreeCar"
	JWTIssuer  = "FreeCar"
	ThirtyDays = 60 * 60 * 24 * 30
	AccountID  = "accountID"
	ID         = "id"

	ApiConfigPath     = "./server/cmd/api/config.yaml"
	AuthConfigPath    = "./server/cmd/auth/config.yaml"
	BlobConfigPath    = "./server/cmd/blob/config.yaml"
	CarConfigPath     = "./server/cmd/car/config.yaml"
	ProfileConfigPath = "./server/cmd/profile/config.yaml"
	TripConfigPath    = "./server/cmd/trip/config.yaml"

	ApiGroup    = "API_GROUP"
	AuthGroup   = "AUTH_GROUP"
	BlobGroup   = "BLOB_GROUP"
	CarGroup    = "CAR_GROUP"
	RentalGroup = "RENTAL_GROUP"

	NacosLogDir   = "tmp/nacos/log"
	NacosCacheDir = "tmp/nacos/cache"
	NacosLogLevel = "debug"

	HlogFilePath = "./tmp/hlog/logs/"
	KlogFilePath = "./tmp/klog/logs/"

	MySqlDSN    = "%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local"
	MongoURI    = "mongodb://%s:%s@%s:%d"
	RabbitMqURI = "amqp://%s:%s@%s:%d/"

	IPFlagName  = "ip"
	IPFlagValue = "0.0.0.0"
	IPFlagUsage = "address"

	PortFlagName  = "port"
	PortFlagUsage = "port"

	TCP = "tcp"

	FreePortAddress = "localhost:0"

	ConsulCheckInterval                       = "7s"
	ConsulCheckTimeout                        = "5s"
	ConsulCheckDeregisterCriticalServiceAfter = "15s"

	DefaultLicNumber = "100000000001"
	DefaultName      = "FreeCar"
	DefaultGender    = 1
	DefaultBirth     = 631152000000

	RedisImage         = "redis:latest"
	RedisContainerPort = "6379/tcp"
	RedisContainerIP   = "127.0.0.1"
	RedisPort          = "0"

	MySQLImage         = "mysql:latest"
	MySQLContainerPort = "3306/tcp"
	MySQLContainerIP   = "127.0.0.1"
	MySQLPort          = "0"
	MySQLAdmin         = "root"
	DockerTestMySQLPwd = "123456"

	MongoImage         = "mongo:latest"
	MongoContainerPort = "27017/tcp"
	MongoContainerIP   = "127.0.0.1"
	MongoPort          = "0"

	CarCollection     = "car"
	ProfileCollection = "profile"
	TripCollection    = "trip"

	RedisProfileClientDB = 1
	RedisBlobClientDB    = 2
	RedisCarClientDB     = 3

	NacosSnowflakeNode = 1
	UserSnowflakeNode  = 2
	BlobSnowflakeNode  = 3
)
