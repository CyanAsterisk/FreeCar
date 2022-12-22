package main

import (
	"context"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/initialize"
	trip "github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip/tripservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/tool/car"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/tool/poi"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/tool/profile"
	"github.com/CyanAsterisk/FreeCar/shared/middleware"
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
	initialize.InitConfig()
	initialize.InitDB()
	r, info := initialize.InitRegistry(Port)
	p := provider.NewOpenTelemetryProvider(
		provider.WithServiceName(global.ServerConfig.Name),
		provider.WithExportEndpoint(global.ServerConfig.OtelInfo.EndPoint),
		provider.WithInsecure(),
	)
	defer p.Shutdown(context.Background())
	initialize.InitCar()
	initialize.InitProfile()

	impl := new(TripServiceImpl)
	impl.CarManager = &car.Manager{
		CarService: global.CarClient,
	}
	impl.ProfileManager = &profile.Manager{
		ProfileService: global.ProfileClient,
	}
	impl.POIManager = &poi.Manager{}
	// Create new server.
	srv := trip.NewServer(impl,
		server.WithServiceAddr(utils.NewNetAddr("tcp", fmt.Sprintf("%s:%d", IP, Port))),
		server.WithRegistry(r),
		server.WithRegistryInfo(info),
		server.WithLimit(&limit.Option{MaxConnections: 2000, MaxQPS: 500}),
		server.WithMiddleware(middleware.CommonMiddleware),
		server.WithMiddleware(middleware.ServerMiddleware),
		server.WithSuite(tracing.NewServerSuite()),
		server.WithServerBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: global.ServerConfig.Name}),
	)

	err := srv.Run()
	if err != nil {
		klog.Fatal(err)
	}
}
