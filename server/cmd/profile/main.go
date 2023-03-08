package main

import (
	"context"
	"net"
	"strconv"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/initialize"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile/profileservice"
	middleware "github.com/CyanAsterisk/FreeCar/server/shared/middleware"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/limit"
	"github.com/cloudwego/kitex/pkg/rpcinfo"
	"github.com/cloudwego/kitex/pkg/utils"
	"github.com/cloudwego/kitex/server"
	"github.com/kitex-contrib/obs-opentelemetry/provider"
	"github.com/kitex-contrib/obs-opentelemetry/tracing"
)

func main() {
	// initialization
	initialize.InitLogger()
	IP, Port := initialize.InitFlag()
	r, info := initialize.InitNacos(Port)
	initialize.InitDB()
	initialize.InitRedis()
	p := provider.NewOpenTelemetryProvider(
		provider.WithServiceName(config.GlobalServerConfig.Name),
		provider.WithExportEndpoint(config.GlobalServerConfig.OtelInfo.EndPoint),
		provider.WithInsecure(),
	)
	defer p.Shutdown(context.Background())
	initialize.InitBlob()

	// Create new server.
	srv := profileservice.NewServer(new(ProfileServiceImpl),
		server.WithServiceAddr(utils.NewNetAddr(consts.TCP, net.JoinHostPort(IP, strconv.Itoa(Port)))),
		server.WithRegistry(r),
		server.WithRegistryInfo(info),
		server.WithLimit(&limit.Option{MaxConnections: 2000, MaxQPS: 500}),
		server.WithMiddleware(middleware.CommonMiddleware),
		server.WithMiddleware(middleware.ServerMiddleware),
		server.WithSuite(tracing.NewServerSuite()),
		server.WithServerBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: config.GlobalServerConfig.Name}),
	)

	err := srv.Run()
	if err != nil {
		klog.Fatal(err)
	}
}
