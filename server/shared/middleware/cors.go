package middleware

import (
	"context"
	"net/http"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/cloudwego/hertz/pkg/app"
)

func Cors() app.HandlerFunc {
	return func(ctx context.Context, c *app.RequestContext) {
		method := c.Request.Method()

		c.Header("Access-Control-Allow-Origin", consts.CorsAddress)
		c.Header("Access-Control-Allow-Headers", "Content-Type, AccessToken, X-CSRF-Token, Authorization, Token")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		c.Header("Access-Control-Allow-Credentials", "true")

		if string(method) == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}

		c.Next(ctx)
	}
}
