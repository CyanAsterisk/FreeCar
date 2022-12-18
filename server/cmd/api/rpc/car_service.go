package rpc

import (
	"context"
	"fmt"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/api/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/shared/middleware"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/kitex/client"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/retry"
	"github.com/cloudwego/kitex/pkg/rpcinfo"
	"github.com/kitex-contrib/registry-consul"
	internalOpentracing "github.com/kitex-contrib/tracer-opentracing"
	"github.com/opentracing/opentracing-go"
	jaegerCfg "github.com/uber/jaeger-client-go/config"
)

var carClient carservice.Client

func initCar() {
	// init resolver
	r, err := consul.NewConsulResolver(fmt.Sprintf("%s:%d",
		global.ServerConfig.ConsulInfo.Host,
		global.ServerConfig.ConsulInfo.Port))
	if err != nil {
		hlog.Fatalf("new consul client failed: %s", err.Error())
	}
	// init tracer
	reporterCfg := &jaegerCfg.ReporterConfig{
		LocalAgentHostPort: fmt.Sprintf("%s:%d", global.ServerConfig.JaegerInfo.Host,
			global.ServerConfig.JaegerInfo.Port),
	}
	samplerCfg := &jaegerCfg.SamplerConfig{
		Type:  "const",
		Param: 1,
	}
	cfg := jaegerCfg.Configuration{
		ServiceName: global.ServerConfig.CarSrvInfo.Name,
		Sampler:     samplerCfg,
		Reporter:    reporterCfg,
	}
	tracer, closer, err := cfg.NewTracer()
	if err != nil {
		klog.Fatalf("ERROR: cannot init Jaeger: %v\n", err)
	}
	opentracing.InitGlobalTracer(tracer)
	defer closer.Close()
	// create a new client
	c, err := carservice.NewClient(
		global.ServerConfig.CarSrvInfo.Name,
		client.WithResolver(r),
		client.WithMuxConnection(1),
		client.WithRPCTimeout(3*time.Second),
		client.WithConnectTimeout(50*time.Millisecond),
		client.WithFailureRetry(retry.NewFailurePolicy()),
		client.WithMiddleware(middleware.CommonMiddleware),
		client.WithInstanceMW(middleware.ClientMiddleware),
		client.WithSuite(internalOpentracing.NewDefaultClientSuite()),
		client.WithClientBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: global.ServerConfig.CarSrvInfo.Name}),
	)
	if err != nil {
		klog.Fatalf("ERROR: cannot init client: %v\n", err)
	}
	carClient = c
}

func CreateCar(ctx context.Context, c *app.RequestContext) {
	var err error
	var req car.CreateCarRequest
	err = c.BindAndValidate(&req)
	if err != nil {
		c.String(400, err.Error())
		return
	}

	resp := new(car.CarEntity)

	c.JSON(200, resp)
}

func GetCar(ctx context.Context, c *app.RequestContext) {
	var err error
	var req car.GetCarRequest
	err = c.BindAndValidate(&req)
	if err != nil {
		c.String(400, err.Error())
		return
	}

	resp := new(car.Car)

	c.JSON(200, resp)
}
