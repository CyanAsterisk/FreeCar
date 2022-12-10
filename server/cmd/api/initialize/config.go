package initialize

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/api/global"
	"github.com/bytedance/sonic"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/nacos-group/nacos-sdk-go/clients"
	"github.com/nacos-group/nacos-sdk-go/common/constant"
	"github.com/nacos-group/nacos-sdk-go/vo"
	"github.com/spf13/viper"
)

func InitConfig() {
	configFileName := "./server/cmd/api/config.yaml"

	v := viper.New()
	v.SetConfigFile(configFileName)
	if err := v.ReadInConfig(); err != nil {
		hlog.Fatalf("read viper config failed: %s", err.Error())
	}
	if err := v.Unmarshal(&global.NacosConfig); err != nil {
		hlog.Fatalf("unmarshal err failed: %s", err.Error())
	}
	hlog.Infof("Config Info: %v", global.NacosConfig)

	// Read configuration information from nacos
	sc := []constant.ServerConfig{
		{
			IpAddr: global.NacosConfig.Host,
			Port:   global.NacosConfig.Port,
		},
	}

	cc := constant.ClientConfig{
		NamespaceId:         global.NacosConfig.Namespace,
		TimeoutMs:           5000,
		NotLoadCacheAtStart: true,
		LogDir:              "tmp/nacos/log",
		CacheDir:            "tmp/nacos/cache",
		LogLevel:            "debug",
	}

	configClient, err := clients.CreateConfigClient(map[string]interface{}{
		"serverConfigs": sc,
		"clientConfig":  cc,
	})
	if err != nil {
		hlog.Fatalf("create config client failed: %s", err.Error())
	}

	content, err := configClient.GetConfig(vo.ConfigParam{
		DataId: global.NacosConfig.DataId,
		Group:  global.NacosConfig.Group,
	})
	if err != nil {
		hlog.Fatalf("get config failed: %s", err.Error())
	}

	err = sonic.Unmarshal([]byte(content), &global.ServerConfig)
	if err != nil {
		hlog.Fatalf("nacos config failed: %s", err.Error())
	}
}
