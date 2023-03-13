package initialize

import (
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	sentinel "github.com/alibaba/sentinel-golang/api"
	"github.com/alibaba/sentinel-golang/core/flow"
	"github.com/cloudwego/hertz/pkg/common/hlog"
)

func InitSentinel() {
	err := sentinel.InitDefault()
	if err != nil {
		hlog.Fatal("init sentinel failed", err)
	}
	_, err = flow.LoadRules([]*flow.Rule{
		{
			Resource:               consts.FreeCar,
			Threshold:              10,
			TokenCalculateStrategy: flow.WarmUp,
			ControlBehavior:        flow.Throttling,
			StatIntervalInMs:       1000,
		},
	})
	if err != nil {
		hlog.Fatal("load sentinel failed", err)
	}
}
