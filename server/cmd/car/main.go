package main

import (
	"context"
	mongoPkg "github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/mongo"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/mq/amqpclt"
	"net"
	"strconv"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/initialize"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/sim"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/trip"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/ws"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/middleware"
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
	r, info := initialize.InitNacos(Port)
	col := initialize.InitDB()
	amqpC := initialize.InitMq()
	tripClient := initialize.InitTrip()
	carClient := initialize.InitCar()
	p := provider.NewOpenTelemetryProvider(
		provider.WithServiceName(config.GlobalServerConfig.Name),
		provider.WithExportEndpoint(config.GlobalServerConfig.OtelInfo.EndPoint),
		provider.WithInsecure(),
	)
	defer p.Shutdown(context.Background())

	mqInfo := config.GlobalServerConfig.RabbitMqInfo
	publisher, err := amqpclt.NewPublisher(amqpC, mqInfo.Exchange)
	if err != nil {
		klog.Fatal("cannot create publisher")
	}

	subscriber, err := amqpclt.NewSubscriber(amqpC, mqInfo.Exchange)
	if err != nil {
		klog.Fatal("cannot create subscriber")
	}

	// Create new server.
	srv := carservice.NewServer(&CarServiceImpl{
		pub:   publisher,
		mongo: mongoPkg.NewManager(col),
	},
		server.WithServiceAddr(utils.NewNetAddr(consts.TCP, net.JoinHostPort(IP, strconv.Itoa(Port)))),
		server.WithRegistry(r),
		server.WithRegistryInfo(info),
		server.WithLimit(&limit.Option{MaxConnections: 2000, MaxQPS: 500}),
		server.WithMiddleware(middleware.CommonMiddleware),
		server.WithMiddleware(middleware.ServerMiddleware),
		server.WithSuite(tracing.NewServerSuite()),
		server.WithServerBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: config.GlobalServerConfig.Name}),
	)

	h := hzserver.Default(hzserver.WithHostPorts(config.GlobalServerConfig.WsAddr))
	h.GET("/ws", ws.Handler(subscriber))
	h.NoHijackConnPool = true
	go func() {
		klog.Infof("HTTP server started. addr: %s", config.GlobalServerConfig.WsAddr)
		h.Spin()
	}()

	go trip.RunUpdater(subscriber, *tripClient)

	simController := sim.Controller{
		CarService: *carClient,
		Subscriber: subscriber,
	}
	go simController.RunSimulations(context.Background())

	err = srv.Run()
	if err != nil {
		klog.Fatal(err)
	}
}
