package middleware

import (
	"context"

	"github.com/cloudwego/kitex/pkg/endpoint"
)

var _ endpoint.Middleware = ClientMiddleware

// ClientMiddleware client middleware print server address 、rpc timeout and connection timeout
func ClientMiddleware(next endpoint.Endpoint) endpoint.Endpoint {
	return func(ctx context.Context, req, resp interface{}) (err error) {
		//ri := rpcinfo.GetRPCInfo(ctx)
		// get server information
		//klog.Infof("server address: %v, rpc timeout: %v, readwrite timeout: %v\n", ri.To().Address(), ri.Config().RPCTimeout(), ri.Config().ConnectTimeout())
		if err = next(ctx, req, resp); err != nil {
			return err
		}
		return nil
	}
}
