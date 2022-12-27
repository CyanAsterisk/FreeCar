package initialize

import (
	"os"
	"path"
	"time"

	"github.com/cloudwego/hertz/pkg/common/hlog"
	hertzzap "github.com/hertz-contrib/logger/zap"
)

// InitLogger to init zap
func InitLogger() {
	// Customizable output directory.
	var logFilePath string
	dir := "./tmp/hlog"
	logFilePath = dir + "/logs/"
	if err := os.MkdirAll(logFilePath, 0o777); err != nil {
		panic(err)
	}

	// Set filename to date
	logFileName := time.Now().Format("2006-01-02") + ".log"
	fileName := path.Join(logFilePath, logFileName)
	if _, err := os.Stat(fileName); err != nil {
		if _, err := os.Create(fileName); err != nil {
			panic(err)
		}
	}

	logger := hertzzap.NewLogger()
	logger.SetLevel(hlog.LevelDebug)

	hlog.SetLogger(logger)
}
