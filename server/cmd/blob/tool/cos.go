package tool

import (
	"context"
	"fmt"
	"io"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/global"
)

// SignURL signs a url.
func SignURL(c context.Context, method, path string, timeout time.Duration) (string, error) {
	u, err := global.CosClient.Object.GetPresignedURL(
		c, method, path,
		global.ServerConfig.CosConfig.SecId,
		global.ServerConfig.CosConfig.SecKey,
		timeout, nil)
	if err != nil {
		return "", err
	}
	return u.String(), nil
}

// CosGet gets storage contents.
func CosGet(c context.Context, path string) (io.ReadCloser, error) {
	res, err := global.CosClient.Object.Get(c, path, nil)
	var b io.ReadCloser
	if res != nil {
		b = res.Body
	}
	if err != nil {
		return b, err
	}
	if res.StatusCode >= 400 {
		return b, fmt.Errorf("got err response: %+v", res)
	}
	return b, nil
}
