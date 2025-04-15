package amqpclt

import (
	"context"
	"fmt"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/mq/model"
	"github.com/bytedance/sonic"
	"github.com/streadway/amqp"
)

type PublisherConfig struct {
	MaxRetries int
	RetryDelay time.Duration
}

// Publisher implements an amqp publisher.
type Publisher struct {
	ch       *amqp.Channel
	exchange string
	confirm  chan amqp.Confirmation
	config   PublisherConfig
}

func NewPublisher(conn *amqp.Connection, exchange string, config PublisherConfig) (*Publisher, error) {
	ch, err := conn.Channel()
	if err != nil {
		return nil, fmt.Errorf("cannot allocate channel: %v", err)
	}

	if err := ch.Confirm(false); err != nil {
		return nil, fmt.Errorf("cannot put channel in confirm mode: %v", err)
	}

	confirm := ch.NotifyPublish(make(chan amqp.Confirmation, 1))

	if err = declareExchange(ch, exchange); err != nil {
		return nil, fmt.Errorf("cannot declare exchange: %v", err)
	}

	return &Publisher{
		ch:       ch,
		exchange: exchange,
		confirm:  confirm,
		config:   config,
	}, nil
}

func (p *Publisher) Publish(ctx context.Context, payInfo *model.PayInfo) error {
	body, err := sonic.Marshal(payInfo)
	if err != nil {
		return fmt.Errorf("cannot marshal: %v", err)
	}

	for i := 0; i <= p.config.MaxRetries; i++ {
		err = p.ch.Publish(p.exchange, "", false, false, amqp.Publishing{
			Body:         body,
			DeliveryMode: amqp.Persistent,
			ContentType:  "application/json",
		})
		if err != nil {
			if i == p.config.MaxRetries {
				return fmt.Errorf("failed to publish after %d retries: %v", p.config.MaxRetries, err)
			}
			time.Sleep(p.config.RetryDelay)
			continue
		}

		select {
		case confirm := <-p.confirm:
			if confirm.Ack {
				return nil
			}
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(5 * time.Second):
			return fmt.Errorf("publish confirmation timeout")
		}
	}
	return fmt.Errorf("unexpected publish error")
}

func declareExchange(ch *amqp.Channel, exchange string) error {
	return ch.ExchangeDeclare(exchange, "fanout", true, false, false, false, nil)
}
