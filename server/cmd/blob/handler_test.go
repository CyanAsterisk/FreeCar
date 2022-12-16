package main

import (
	"context"
	"fmt"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/cmd/blob/kitex_gen/blob/blobservice"
	"github.com/CyanAsterisk/FreeCar/shared/middleware"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/kitex/client"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/retry"
	"github.com/kitex-contrib/registry-consul"
	internalOpentracing "github.com/kitex-contrib/tracer-opentracing"
	"testing"
	"time"
)

var blobClient blobservice.Client

func initClient() {
	// init resolver
	r, err := consul.NewConsulResolver(fmt.Sprintf("%s:%d", "127.0.0.1", 8500))
	if err != nil {
		hlog.Fatalf("new consul client failed: %s", err.Error())
	}

	// create a new client
	c, err := blobservice.NewClient(
		"blob_srv",
		client.WithResolver(r),
		client.WithMuxConnection(1),
		client.WithRPCTimeout(3*time.Second),
		client.WithFailureRetry(retry.NewFailurePolicy()),
		client.WithMiddleware(middleware.CommonMiddleware),
		client.WithInstanceMW(middleware.ClientMiddleware),
		client.WithSuite(internalOpentracing.NewDefaultClientSuite()),
	)
	if err != nil {
		klog.Fatalf("ERROR: cannot init client: %v\n", err)
	}
	blobClient = c
}

func TestBlobServiceImpl_CreateBlob(t *testing.T) {
	initClient()
	ctx := context.Background()

	resp, err := blobClient.CreateBlob(ctx, &blob.CreateBlobRequest{
		AccountId:           101,
		UploadUrlTimeoutSec: int32(time.Now().Unix() + 1200),
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("[CreateBlob resp]: ID = %d URL = %s", resp.Id, resp.UploadUrl)
}

func TestBlobServiceImpl_GetBlob(t *testing.T) {
	initClient()
	ctx := context.Background()

	resp, err := blobClient.GetBlob(ctx, &blob.GetBlobRequest{Id: 1602933715128823808})

	if err != nil {
		panic(err)
	}

	fmt.Printf("[GetBlob resp]: %+v", resp.Data)

}

func TestBlobServiceImpl_GetBlobURL(t *testing.T) {
	initClient()
	ctx := context.Background()

	resp, err := blobClient.GetBlobURL(ctx, &blob.GetBlobURLRequest{
		Id:         1602933715128823808,
		TimeoutSec: int32(time.Now().Unix() + 1200),
	})

	if err != nil {
		panic(err)
	}

	fmt.Printf("[GetBlobURL resp]: %+v", resp.Url)

}
