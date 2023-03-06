package initialize

import (
	"net/http"
	"net/url"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/config"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/tencentyun/cos-go-sdk-v5"
)

// InitCos to init TencentCloud COS
func InitCos() {
	u, err := url.Parse(config.GlobalServerConfig.CosConfig.Addr)
	if err != nil {
		klog.Fatalf("[cos] cannot parse addr: %s", err.Error())
	}
	b := &cos.BaseURL{BucketURL: u}

	config.CosClient = cos.NewClient(b,
		&http.Client{
			Transport: &cos.AuthorizationTransport{
				SecretID:  config.GlobalServerConfig.CosConfig.SecId,
				SecretKey: config.GlobalServerConfig.CosConfig.SecKey,
			},
		},
	)
}
