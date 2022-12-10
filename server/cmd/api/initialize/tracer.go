package initialize

import (
	"fmt"
	"io"

	"github.com/CyanAsterisk/FreeCar/server/cmd/api/global"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/opentracing/opentracing-go"
	jaegerCfg "github.com/uber/jaeger-client-go/config"
)

func InitTracer() (opentracing.Tracer, io.Closer) {
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
		hlog.Fatalf("ERROR: cannot init Jaeger: %v\n", err)
	}
	opentracing.InitGlobalTracer(tracer)
	return tracer, closer
}
