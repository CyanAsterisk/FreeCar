package initialize

import (
	"crypto/tls"

	"github.com/cloudwego/hertz/pkg/common/hlog"
)

// InitTLS
func InitTLS() *tls.Config {
	cfg := &tls.Config{
		MinVersion:         tls.VersionTLS10,
		InsecureSkipVerify: true,
	}
	cert, err := tls.LoadX509KeyPair("server/cmd/api/cert/server.crt",
		"server/cmd/api/cert/server.key")
	if err != nil {
		hlog.Fatal("tls failed", err)
	}
	cfg.Certificates = append(cfg.Certificates, cert)
	return cfg
}
