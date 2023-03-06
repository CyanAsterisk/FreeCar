package initialize

import (
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/config"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/mq/amqpclt"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/streadway/amqp"
)

// InitMq to init rabbitMQ
func InitMq() {
	c := config.GlobalServerConfig.RabbitMqInfo
	amqpConn, err := amqp.Dial(fmt.Sprintf(consts.RabbitMqURI, c.User, c.Password, c.Host, c.Port))
	if err != nil {
		klog.Fatal("cannot dial amqp", err)
	}
	config.Publisher, err = amqpclt.NewPublisher(amqpConn, c.Exchange)
	if err != nil {
		klog.Fatal("cannot create publisher", err)
	}

	config.Subscriber, err = amqpclt.NewSubscriber(amqpConn, c.Exchange)
	if err != nil {
		klog.Fatal("cannot create subscriber", err.Error())
	}
}
