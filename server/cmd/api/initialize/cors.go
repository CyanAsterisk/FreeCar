package initialize

import (
	"time"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/hertz-contrib/cors"
)

// InitCors return cors.Config.
func InitCors() cors.Config {
	return cors.Config{
		AllowOrigins:     []string{consts.CorsAddress},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization", "Token", "Accept"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
}
