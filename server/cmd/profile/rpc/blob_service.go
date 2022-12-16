package rpc

import (
	"context"
	"fmt"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/kitex_gen/blob"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/kitex_gen/blob/blobservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/global"
	"github.com/CyanAsterisk/FreeCar/shared/middleware"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/kitex/client"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/retry"
	"github.com/cloudwego/kitex/pkg/rpcinfo"
	consul "github.com/kitex-contrib/registry-consul"
	internalOpentracing "github.com/kitex-contrib/tracer-opentracing"
	"github.com/opentracing/opentracing-go"
	jaegerCfg "github.com/uber/jaeger-client-go/config"
)

var blobClient blobservice.Client

func initBlob() {
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
		ServiceName: global.ServerConfig.BlobSrvInfo.Name,
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
	c, err := blobservice.NewClient(
		global.ServerConfig.BlobSrvInfo.Name,
		client.WithResolver(r),
		client.WithMuxConnection(1),
		client.WithRPCTimeout(3*time.Second),
		client.WithConnectTimeout(50*time.Millisecond),
		client.WithFailureRetry(retry.NewFailurePolicy()),
		client.WithMiddleware(middleware.CommonMiddleware),
		client.WithInstanceMW(middleware.ClientMiddleware),
		client.WithSuite(internalOpentracing.NewDefaultClientSuite()),
		client.WithClientBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: global.ServerConfig.BlobSrvInfo.Name}),
	)
	if err != nil {
		klog.Fatalf("ERROR: cannot init client: %v\n", err)
	}
	blobClient = c
}

func CreateBlob(ctx context.Context, req *blob.CreateBlobRequest) (resp *blob.CreateBlobResponse, err error) {
	resp, err = blobClient.CreateBlob(ctx, req)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

func GetBlob(ctx context.Context, req *blob.GetBlobRequest) (resp *blob.GetBlobResponse, err error) {
	resp, err = blobClient.GetBlob(ctx, req)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

func GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest) (resp *blob.GetBlobURLResponse, err error) {
	resp, err = blobClient.GetBlobURL(ctx, req)
	if err != nil {
		return nil, err
	}
	return resp, nil
}
