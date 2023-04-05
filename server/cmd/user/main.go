package main

import (
	"context"
	"net"
	"strconv"

	"github.com/CyanAsterisk/FreeCar/server/cmd/user/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/user/initialize"
	"github.com/CyanAsterisk/FreeCar/server/cmd/user/pkg/jwt"
	"github.com/CyanAsterisk/FreeCar/server/cmd/user/pkg/md5"
	"github.com/CyanAsterisk/FreeCar/server/cmd/user/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/cmd/user/pkg/wechat"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/user/userservice"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/cloudwego/kitex/pkg/limit"
	"github.com/cloudwego/kitex/pkg/rpcinfo"
	"github.com/cloudwego/kitex/pkg/utils"
	"github.com/cloudwego/kitex/server"
	"github.com/kitex-contrib/obs-opentelemetry/provider"
	"github.com/kitex-contrib/obs-opentelemetry/tracing"
)

func main() {
	// initialization
	initialize.InitLogger()
	initialize.InitConfig()
	IP, Port := initialize.InitFlag()
	r, info := initialize.InitRegistry(Port)
	db := initialize.InitDB()
	p := provider.NewOpenTelemetryProvider(
		provider.WithServiceName(config.GlobalServerConfig.Name),
		provider.WithExportEndpoint(config.GlobalServerConfig.OtelInfo.EndPoint),
		provider.WithInsecure(),
	)
	defer p.Shutdown(context.Background())
	blobClient := initialize.InitBlob()

	// Create new server.
	srv := userservice.NewServer(&UserServiceImpl{
		OpenIDResolver: &wechat.AuthServiceImpl{
			AppID:     config.GlobalServerConfig.WXInfo.AppId,
			AppSecret: config.GlobalServerConfig.WXInfo.AppSecret,
		},
		EncryptManager:    &md5.EncryptManager{Salt: config.GlobalServerConfig.MysqlInfo.Salt},
		UserMysqlManager:  mysql.NewUserManager(db, config.GlobalServerConfig.MysqlInfo.Salt),
		AdminMysqlManager: mysql.NewAdminManager(db, config.GlobalServerConfig.MysqlInfo.Salt),
		BlobManager:       blobClient,
		TokenGenerator:    jwt.NewTokenGenerator(config.GlobalServerConfig.JWTInfo.SigningKey),
	},
		server.WithServiceAddr(utils.NewNetAddr(consts.TCP, net.JoinHostPort(IP, strconv.Itoa(Port)))),
		server.WithRegistry(r),
		server.WithRegistryInfo(info),
		server.WithLimit(&limit.Option{MaxConnections: 2000, MaxQPS: 500}),
		server.WithSuite(tracing.NewServerSuite()),
		server.WithServerBasicInfo(&rpcinfo.EndpointBasicInfo{ServiceName: config.GlobalServerConfig.Name}),
	)

	err := srv.Run()
	if err != nil {
		klog.Fatal(err)
	}
}
