package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/CyanAsterisk/FreeCar/pkg/middleware"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/initialize"
	auth "github.com/CyanAsterisk/FreeCar/server/cmd/auth/kitex_gen/auth/authservice"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/limit"
	"github.com/cloudwego/kitex/pkg/rpcinfo"
	"github.com/cloudwego/kitex/pkg/utils"
	"github.com/cloudwego/kitex/server"
)

func main() {
	// initialization
	initialize.InitLogger()
	IP, Port := initialize.InitFlag()
	initialize.InitConfig()
	initialize.InitDB()
	r, info := initialize.InitRegistry(Port)
	tracerSuite, closer := initialize.InitTracer()
	defer closer.Close()

	svr := auth.NewServer(new(AuthServiceImpl),
		server.WithServiceAddr(utils.NewNetAddr("tcp", fmt.Sprintf("%s:%d", IP, Port))),
		server.WithRegistry(r),
		server.WithRegistryInfo(info),
		server.WithLimit(&limit.Option{MaxConnections: 2000, MaxQPS: 500}),
		server.WithMiddleware(middleware.CommonMiddleware),
		server.WithMiddleware(middleware.ServerMiddleware),
		server.WithSuite(tracerSuite),
		server.WithServerBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: global.ServerConfig.Name}),
	)

	go func() {
		err := svr.Run()
		if err != nil {
			klog.Fatal(err)
		}
	}()

	// receive termination signal
	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	if err := r.Deregister(info); err != nil {
		klog.Info("sign out failed")
	} else {
		klog.Info("sign out success")
	}
}
