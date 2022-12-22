package initialize

import (
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/api/global"
	"github.com/bwmarrin/snowflake"
	"github.com/cloudwego/hertz/pkg/app/server/registry"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/hertz/pkg/common/utils"
	"github.com/hashicorp/consul/api"
	"github.com/hertz-contrib/registry/consul"
)

func InitRegistry() (registry.Registry, *registry.Info) {
	// build a consul client
	config := api.DefaultConfig()
	config.Address = fmt.Sprintf("%s:%d",
		global.ServerConfig.ConsulInfo.Host,
		global.ServerConfig.ConsulInfo.Port)
	consulClient, err := api.NewClient(config)
	if err != nil {
		hlog.Fatalf("new consul client failed: %s", err.Error())
	}

	r := consul.NewConsulRegister(consulClient,
		consul.WithCheck(&api.AgentServiceCheck{
			Interval:                       "7s",
			Timeout:                        "5s",
			DeregisterCriticalServiceAfter: "15s",
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
		Addr: utils.NewNetAddr("tcp", fmt.Sprintf("%s:%d", global.ServerConfig.Host,
			global.ServerConfig.Port)),
		Tags: map[string]string{
			"ID": sf.Generate().Base36(),
		},
		Weight: registry.DefaultWeight,
	}
	return r, info
}
