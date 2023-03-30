package mq

import (
	"context"

	car "github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
)

// Publisher defines the publish interface.
type Publisher interface {
	Publish(context.Context, *car.CarEntity) error
}

// Subscriber defines a car update subscriber.
type Subscriber interface {
	Subscribe(context.Context) (ch chan *car.CarEntity, cleanUp func(), err error)
}
