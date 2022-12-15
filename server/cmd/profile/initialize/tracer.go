package initialize

import (
	"fmt"
	"io"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/global"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/server"
	internalOpentracing "github.com/kitex-contrib/tracer-opentracing"
	"github.com/opentracing/opentracing-go"
	jaegerCfg "github.com/uber/jaeger-client-go/config"
)

func InitTracer() (server.Suite, io.Closer) {
	reporterCfg := &jaegerCfg.ReporterConfig{
		LocalAgentHostPort: fmt.Sprintf("%s:%d", global.ServerConfig.JaegerInfo.Host,
			global.ServerConfig.JaegerInfo.Port),
	}
	samplerCfg := &jaegerCfg.SamplerConfig{
		Type:  "const",
		Param: 1,
	}
	cfg := jaegerCfg.Configuration{
		ServiceName: global.ServerConfig.Name,
		Sampler:     samplerCfg,
		Reporter:    reporterCfg,
	}

	tracer, closer, err := cfg.NewTracer()
	if err != nil {
		klog.Fatalf("ERROR: cannot init Jaeger: %v\n", err)
	}
	opentracing.InitGlobalTracer(tracer)
	return internalOpentracing.NewDefaultServerSuite(), closer
}
