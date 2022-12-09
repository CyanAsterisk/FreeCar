package initialize

import (
	"log"
	"os"
	"path"
	"time"

	"github.com/cloudwego/kitex/pkg/klog"
	kitexzap "github.com/kitex-contrib/obs-opentelemetry/logging/zap"
)

func InitLogger() {
	var logFilePath string
	dir := "./tmp/klog"
	logFilePath = dir + "/logs/"
	if err := os.MkdirAll(logFilePath, 0o777); err != nil {
		panic(err)
	}

	// Set filename to date
	logFileName := time.Now().Format("2006-01-02") + ".log"
	fileName := path.Join(logFilePath, logFileName)
	if _, err := os.Stat(fileName); err != nil {
		if _, err := os.Create(fileName); err != nil {
			log.Println(err.Error())
			return
		}
	}

	logger := kitexzap.NewLogger()
	klog.SetLogger(logger)
}
