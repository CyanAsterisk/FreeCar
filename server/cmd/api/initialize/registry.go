package initialize

import (
	"net"
	"strconv"

	"github.com/CyanAsterisk/FreeCar/server/cmd/api/global"
	"github.com/CyanAsterisk/FreeCar/shared/consts"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/hertz/pkg/app/server/registry"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/hertz/pkg/common/utils"
	"github.com/hashicorp/consul/api"
	"github.com/hertz-contrib/registry/consul"
)

// InitRegistry to init consul
func InitRegistry() (registry.Registry, *registry.Info) {
	// build a consul client
	config := api.DefaultConfig()
	config.Address = net.JoinHostPort(
		global.ServerConfig.ConsulInfo.Host,
		strconv.Itoa(global.ServerConfig.ConsulInfo.Port))
	consulClient, err := api.NewClient(config)
	if err != nil {
		hlog.Fatalf("new consul client failed: %s", err.Error())
	}

	r := consul.NewConsulRegister(consulClient,
		consul.WithCheck(&api.AgentServiceCheck{
			Interval:                       consts.ConsulCheckInterval,
			Timeout:                        consts.ConsulCheckTimeout,
			DeregisterCriticalServiceAfter: consts.ConsulCheckDeregisterCriticalServiceAfter,
		}))
	if err != nil {
		hlog.Fatalf("new consul register failed: %s", err.Error())
	}

	// Using snowflake to generate service name.
	sf, err := snowflake.NewNode(2)
	if err != nil {
		hlog.Fatalf("generate service name failed: %s", err.Error())
	}
	info := &registry.Info{
		ServiceName: global.ServerConfig.Name,
		Addr: utils.NewNetAddr(consts.TCP, net.JoinHostPort(global.ServerConfig.Host,
			strconv.Itoa(global.ServerConfig.Port))),
		Tags: map[string]string{
			"ID": sf.Generate().Base36(),
		},
		Weight: registry.DefaultWeight,
	}
	return r, info
}
