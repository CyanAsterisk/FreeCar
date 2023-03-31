package initialize

import "github.com/hertz-contrib/cors"

// InitCors return cors.Config.
func InitCors() cors.Config {
	return cors.Config{
		AllowAllOrigins:        true,
		AllowMethods:           []string{"PUT", "GET", "POST", "DELETE"},
		AllowHeaders:           []string{"Origin", "Content-Length", "Content-Type", "authorization"},
		AllowBrowserExtensions: true,
	}
}
