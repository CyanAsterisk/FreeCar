package initialize

import (
	"flag"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/tool"
	"github.com/cloudwego/kitex/pkg/klog"
)

func InitFlag() (string, int) {
	IP := flag.String("ip", "0.0.0.0", "address")
	Port := flag.Int("port", 0, "post")
	// Parsing flags and if Port is 0 , then will automatically get an empty Port.
	flag.Parse()
	if *Port == 0 {
		*Port, _ = tool.GetFreePort()
	}
	klog.Info("ip: ", *IP)
	klog.Info("port: ", *Port)
	return *IP, *Port
}
