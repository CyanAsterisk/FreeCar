package main

import (
	"context"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/initialize"
	car "github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/sim"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/trip"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/ws"
	"github.com/CyanAsterisk/FreeCar/shared/middleware"
	hzserver "github.com/cloudwego/hertz/pkg/app/server"
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
	initialize.InitMq()
	initialize.InitTrip()
	initialize.InitCar()

	r, info := initialize.InitRegistry(Port)
	p := provider.NewOpenTelemetryProvider(
		provider.WithServiceName(global.ServerConfig.Name),
		provider.WithExportEndpoint(global.ServerConfig.OtelInfo.EndPoint),
		provider.WithInsecure(),
	)
	defer p.Shutdown(context.Background())

	// Create new server.
	srv := car.NewServer(new(CarServiceImpl),
		server.WithServiceAddr(utils.NewNetAddr("tcp", fmt.Sprintf("%s:%d", IP, Port))),
		server.WithRegistry(r),
		server.WithRegistryInfo(info),
		server.WithLimit(&limit.Option{MaxConnections: 2000, MaxQPS: 500}),
		server.WithMiddleware(middleware.CommonMiddleware),
		server.WithMiddleware(middleware.ServerMiddleware),
		server.WithSuite(tracing.NewServerSuite()),
		server.WithServerBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: global.ServerConfig.Name}),
	)

	// Use goroutine to listen for signal.
	go func() {
		err := srv.Run()
		if err != nil {
			klog.Fatal(err)
		}
	}()

	h := hzserver.Default(hzserver.WithHostPorts(global.ServerConfig.WsAddr))
	h.GET("/ws", ws.Handler(global.Subscriber))
	h.NoHijackConnPool = true
	go func() {
		klog.Infof("HTTP server started. addr: %s", global.ServerConfig.WsAddr)
		h.Spin()
	}()

	go trip.RunUpdater(global.Subscriber, global.TripClient)

	simController := sim.Controller{
		CarService: global.CarClient,
		Subscriber: global.Subscriber,
	}
	go simController.RunSimulations(context.Background())
}
