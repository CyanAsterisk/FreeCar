package main

import (
	"context"
	"net"
	"strconv"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/initialize"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/car"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/mongo"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/mq/amqpclt"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/poi"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/profile"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip/tripservice"
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
	initialize.InitConfig()
	IP, Port := initialize.InitFlag()
	r, info := initialize.InitRegistry(Port)
	db := initialize.InitDB()
	amqpC := initialize.InitMq()
	p := provider.NewOpenTelemetryProvider(
		provider.WithServiceName(config.GlobalServerConfig.Name),
		provider.WithExportEndpoint(config.GlobalServerConfig.OtelInfo.EndPoint),
		provider.WithInsecure(),
	)
	defer p.Shutdown(context.Background())
	initialize.InitCar()
	initialize.InitProfile()

	mqInfo := config.GlobalServerConfig.RabbitMqInfo
	publisher, err := amqpclt.NewPublisher(amqpC, mqInfo.Exchange, amqpclt.PublisherConfig{
		MaxRetries: 3,
		RetryDelay: 500 * time.Millisecond,
	})
	if err != nil {
		klog.Fatal("cannot create publisher")
	}

	// Create new server.
	srv := tripservice.NewServer(&TripServiceImpl{
		ProfileManager: &profile.Manager{ProfileService: config.ProfileClient},
		CarManager:     &car.Manager{CarService: config.CarClient},
		POIManager:     &poi.Manager{},
		MongoManager:   mongo.NewManager(db),
		Publisher:      publisher,
	},
		server.WithServiceAddr(utils.NewNetAddr(consts.TCP, net.JoinHostPort(IP, strconv.Itoa(Port)))),
		server.WithRegistry(r),
		server.WithRegistryInfo(info),
		server.WithLimit(&limit.Option{MaxConnections: 2000, MaxQPS: 500}),
		server.WithSuite(tracing.NewServerSuite()),
		server.WithServerBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: config.GlobalServerConfig.Name}),
	)

	err = srv.Run()
	if err != nil {
		klog.Fatal(err)
	}
}
