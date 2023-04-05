package middleware

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/api/config"
	"github.com/CyanAsterisk/FreeCar/server/shared/middleware"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/hertz-contrib/gzip"
	"github.com/hertz-contrib/limiter"
)

func CommonMW() []app.HandlerFunc {
	return []app.HandlerFunc{
		// use jwt mw
		middleware.JWTAuth(config.GlobalServerConfig.JWTInfo.SigningKey),
		// use recovery mw
		middleware.Recovery(),
		// use gzip mw
		gzip.Gzip(gzip.DefaultCompression, gzip.WithExcludedExtensions([]string{".jpg", ".mp4", ".png"})),
		// use limiter mw
		limiter.AdaptiveLimit(limiter.WithCPUThreshold(900)),
	}
}

func CommonWithoutJWT() []app.HandlerFunc {
	return []app.HandlerFunc{
		// use recovery mw
		middleware.Recovery(),
		// use gzip mw
		gzip.Gzip(gzip.DefaultCompression, gzip.WithExcludedExtensions([]string{".jpg", ".mp4", ".png"})),
		// use limiter mw
		limiter.AdaptiveLimit(limiter.WithCPUThreshold(900)),
	}
}
