package consts

const (
	JWTIssuer  = "FreeCar"
	ThirtyDays = 60 * 60 * 24 * 30
	AccountID  = "accountID"
	ID         = "id"

	ApiConfigPath = "./server/cmd/api/config.yaml"
	NacosLogDir   = "tmp/nacos/log"
	NacosCacheDir = "tmp/nacos/cache"
	NacosLogLevel = "debug"

	HlogFilePath = "./tmp/hlog/logs/"
	KlogFilePath = "./tmp/klog/logs/"

	ConsulCheckInterval                       = "7s"
	ConsulCheckTimeout                        = "5s"
	ConsulCheckDeregisterCriticalServiceAfter = "15s"

	MySqlDSN = "%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local"

	IPFlagName  = "ip"
	IPFlagValue = "0.0.0.0"
	IPFlagUsage = "address"

	PortFlagName  = "port"
	PortFlagUsage = "port"

	TCP = "tcp"
)
