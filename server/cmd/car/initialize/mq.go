package initialize

import (
	"fmt"

	"github.com/cloudwego/kitex/pkg/klog"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/mq/amqpclt"
	"github.com/streadway/amqp"
)

func InitMq() {
	c := global.ServerConfig.RabbitMqInfo
	amqpConn, err := amqp.Dial(fmt.Sprintf("amqp://%s:%s@%s:%d/", c.User, c.Password, c.Host, c.Port))
	if err != nil {
		klog.Fatal("cannot dial amqp", err)
	}
	global.Publisher, err = amqpclt.NewPublisher(amqpConn, c.Exchange)
	if err != nil {
		klog.Fatal("cannot create publisher", err)
	}

	global.Subscriber, err = amqpclt.NewSubscriber(amqpConn, c.Exchange)
	if err != nil {
		klog.Fatal("cannot create subscriber", err.Error())
	}
}
