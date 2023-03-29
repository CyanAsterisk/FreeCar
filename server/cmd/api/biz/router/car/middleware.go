// Code generated by hertz generator.

package Car

import (
	"context"
	"github.com/CyanAsterisk/FreeCar/server/shared/middleware"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/hertz-contrib/gzip"
	"github.com/hertz-contrib/limiter"
	"github.com/hertz-contrib/requestid"
	"go.opentelemetry.io/otel/trace"
)

func rootMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _adminMw() []app.HandlerFunc {
	return []app.HandlerFunc{
		middleware.JWTAuth(),
	}
}

func _carMw() []app.HandlerFunc {
	return []app.HandlerFunc{
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

func __dminget_llcarsMw() []app.HandlerFunc {
	// your code...
	return nil
}

func __dmincreatecarMw() []app.HandlerFunc {
	// your code...
	return nil
}

func __dmindeletecarMw() []app.HandlerFunc {
	// your code...
	return nil
}

func __dminupdatecarMw() []app.HandlerFunc {
	// your code...
	return nil
}

func __dmingetsomecarsMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _miniMw() []app.HandlerFunc {
	return []app.HandlerFunc{
		middleware.JWTAuth(),
	}
}

func _car0Mw() []app.HandlerFunc {
	// your code...
	return nil
}

func _getcarMw() []app.HandlerFunc {
	// your code...
	return nil
}

func _getcarsMw() []app.HandlerFunc {
	// your code...
	return nil
}
