package mq

import (
	"context"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/mq/model"
)

// Publisher defines the publishing interface.
type Publisher interface {
	Publish(context.Context, *model.PayInfo) error
}
