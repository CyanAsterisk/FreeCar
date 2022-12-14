package initialize

import (
	"fmt"

	"github.com/CyanAsterisk/FreeCar/shared/consts"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/global"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/registry"
	"github.com/cloudwego/kitex/pkg/utils"
	"github.com/hashicorp/consul/api"
	consul "github.com/kitex-contrib/registry-consul"
)

// InitRegistry to init consul
func InitRegistry(Port int) (registry.Registry, *registry.Info) {
	r, err := consul.NewConsulRegister(fmt.Sprintf("%s:%d",
		global.ServerConfig.ConsulInfo.Host,
		global.ServerConfig.ConsulInfo.Port),
		consul.WithCheck(&api.AgentServiceCheck{
			Interval:                       consts.ConsulCheckInterval,
			Timeout:                        consts.ConsulCheckTimeout,
			DeregisterCriticalServiceAfter: consts.ConsulCheckDeregisterCriticalServiceAfter,
		}))
	if err != nil {
		klog.Fatalf("new consul register failed: %s", err.Error())
	}

	// Using snowflake to generate service name.
	sf, err := snowflake.NewNode(4)
	if err != nil {
		klog.Fatalf("generate service name failed: %s", err.Error())
	}
	info := &registry.Info{
		ServiceName: global.ServerConfig.Name,
		Addr:        utils.NewNetAddr(consts.TCP, fmt.Sprintf("%s:%d", global.ServerConfig.Host, Port)),
		Tags: map[string]string{
			"ID": sf.Generate().Base36(),
		},
	}
	return r, info
}
