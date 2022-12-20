package ws

import (
	"context"
	"net/http"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/mq"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/hertz-contrib/websocket"
	"go.uber.org/zap"
)

var upgrader = websocket.HertzUpgrader{}

// Handler creates a websocket http handler.
func Handler(sub mq.Subscriber) app.HandlerFunc {
	return func(c context.Context, ctx *app.RequestContext) {
		err := upgrader.Upgrade(ctx, func(conn *websocket.Conn) {
			msgs, cleanUp, err := sub.Subscribe(context.Background())
			defer cleanUp()
			if err != nil {
				klog.Error("cannot subscribe", zap.Error(err))
				ctx.String(http.StatusInternalServerError, "")
				return
			}

			done := make(chan struct{})
			go func() {
				for {
					_, _, err := conn.ReadMessage()
					if err != nil {
						if !websocket.IsCloseError(err,
							websocket.CloseGoingAway,
							websocket.CloseNormalClosure) {
							klog.Warn("unexpected read error", zap.Error(err))
						}
						done <- struct{}{}
						break
					}
				}
			}()

			for {
				select {
				case msg := <-msgs:
					err := conn.WriteJSON(msg)
					if err != nil {
						klog.Warn("cannot write JSON %s", err.Error())
					}
				case <-done:
					return
				}
			}
		})

		if err != nil {
			klog.Warnf("Upgrade err: %s", err.Error())
		}
	}
}
