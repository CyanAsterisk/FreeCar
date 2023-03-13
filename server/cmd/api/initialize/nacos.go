package initialize

import (
	"net"
	"strconv"

	"github.com/CyanAsterisk/FreeCar/server/cmd/api/config"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"
	"github.com/bwmarrin/snowflake"
	"github.com/bytedance/sonic"
	"github.com/cloudwego/hertz/pkg/app/server/registry"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/hertz/pkg/common/utils"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/hertz-contrib/registry/nacos"
	"github.com/nacos-group/nacos-sdk-go/clients"
	"github.com/nacos-group/nacos-sdk-go/common/constant"
	"github.com/nacos-group/nacos-sdk-go/vo"
	"github.com/spf13/viper"
)

// InitNacos to init nacos
func InitNacos() (registry.Registry, *registry.Info) {
	v := viper.New()
	v.SetConfigFile(consts.ApiConfigPath)
	if err := v.ReadInConfig(); err != nil {
		hlog.Fatalf("read viper config failed: %s", err.Error())
	}
	if err := v.Unmarshal(&config.GlobalNacosConfig); err != nil {
		hlog.Fatalf("unmarshal err failed: %s", err.Error())
	}
	hlog.Infof("Config Info: %v", config.GlobalNacosConfig)

	// Read configuration information from nacos
	sc := []constant.ServerConfig{
		{
			IpAddr: config.GlobalNacosConfig.Host,
			Port:   config.GlobalNacosConfig.Port,
		},
	}

	cc := constant.ClientConfig{
		NamespaceId:         config.GlobalNacosConfig.Namespace,
		TimeoutMs:           5000,
		NotLoadCacheAtStart: true,
		LogDir:              consts.NacosLogDir,
		CacheDir:            consts.NacosCacheDir,
		LogLevel:            consts.NacosLogLevel,
	}

	configClient, err := clients.CreateConfigClient(map[string]interface{}{
		"serverConfigs": sc,
		"clientConfig":  cc,
	})
	if err != nil {
		hlog.Fatalf("create config client failed: %s", err.Error())
	}

	content, err := configClient.GetConfig(vo.ConfigParam{
		DataId: config.GlobalNacosConfig.DataId,
		Group:  config.GlobalNacosConfig.Group,
	})
	if err != nil {
		hlog.Fatalf("get config failed: %s", err.Error())
	}

	err = sonic.Unmarshal([]byte(content), &config.GlobalServerConfig)
	if err != nil {
		hlog.Fatalf("nacos config failed: %s", err.Error())
	}

	if config.GlobalServerConfig.Host == "" {
		config.GlobalServerConfig.Host, err = tools.GetLocalIPv4Address()
		if err != nil {
			hlog.Fatalf("get localIpv4Addr failed:%s", err.Error())
		}
	}

	registryClient, err := clients.NewNamingClient(
		vo.NacosClientParam{
			ClientConfig:  &cc,
			ServerConfigs: sc,
		},
	)
	if err != nil {
		klog.Fatalf("new naming client failed: %s", err.Error())
	}

	r := nacos.NewNacosRegistry(registryClient, nacos.WithRegistryGroup(consts.ApiGroup))

	sf, err := snowflake.NewNode(consts.NacosSnowflakeNode)
	if err != nil {
		hlog.Fatalf("generate service name failed: %s", err.Error())
	}
	info := &registry.Info{
		ServiceName: config.GlobalServerConfig.Name,
		Addr: utils.NewNetAddr(consts.TCP, net.JoinHostPort(config.GlobalServerConfig.Host,
			strconv.Itoa(config.GlobalServerConfig.Port))),
		Tags: map[string]string{
			"ID": sf.Generate().Base36(),
		},
		Weight: registry.DefaultWeight,
	}

	return r, info
}
