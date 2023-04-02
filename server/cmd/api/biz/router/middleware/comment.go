package middleware

import (
	"context"

	"github.com/CyanAsterisk/FreeCar/server/cmd/api/config"
	"github.com/CyanAsterisk/FreeCar/server/shared/middleware"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/hertz-contrib/gzip"
	"github.com/hertz-contrib/limiter"
	"github.com/hertz-contrib/requestid"
	"go.opentelemetry.io/otel/trace"
)

// CommonMW
func CommonMW() []app.HandlerFunc {
	return []app.HandlerFunc{
		// use cors mw
		middleware.Cors(),
		// use jwt mw
		middleware.JWTAuth(config.GlobalServerConfig.JWTInfo.SigningKey),
		// use recovery mw
		middleware.Recovery(),
		// use gzip mw
		gzip.Gzip(gzip.DefaultCompression, gzip.WithExcludedExtensions([]string{".jpg", ".mp4", ".png"})),
		// use limiter mw
		limiter.AdaptiveLimit(limiter.WithCPUThreshold(900)),
		// use requestId mw & bind with traceId
		requestid.New(
			requestid.WithGenerator(func(ctx context.Context, c *app.RequestContext) string {
				traceID := trace.SpanFromContext(ctx).SpanContext().TraceID().String()
				return traceID
			}),
		),
	}
}

func CommonWithoutJWT() []app.HandlerFunc {
	return []app.HandlerFunc{
		// use cors mw
		middleware.Cors(),
		// use recovery mw
		middleware.Recovery(),
		// use gzip mw
		gzip.Gzip(gzip.DefaultCompression, gzip.WithExcludedExtensions([]string{".jpg", ".mp4", ".png"})),
		// use limiter mw
		limiter.AdaptiveLimit(limiter.WithCPUThreshold(900)),
		// use requestId mw & bind with traceId
		requestid.New(
			requestid.WithGenerator(func(ctx context.Context, c *app.RequestContext) string {
				traceID := trace.SpanFromContext(ctx).SpanContext().TraceID().String()
				return traceID
			}),
		),
	}
}
