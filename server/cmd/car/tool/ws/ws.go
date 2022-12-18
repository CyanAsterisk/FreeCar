package ws

import (
	"context"
	"net/http"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/mq"
	"github.com/cloudwego/kitex/pkg/klog"
	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

// Handler creates a websocket http handler.
func Handler(u *websocket.Upgrader, sub mq.Subscriber) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		c, err := u.Upgrade(w, r, nil)
		if err != nil {
			klog.Warn("cannot upgrade", zap.Error(err))
			return
		}
		defer c.Close()

		msgs, cleanUp, err := sub.Subscribe(context.Background())
		defer cleanUp()
		if err != nil {
			klog.Error("cannot subscribe", zap.Error(err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		done := make(chan struct{})
		go func() {
			for {
				_, _, err := c.ReadMessage()
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
				err := c.WriteJSON(msg)
				if err != nil {
					klog.Warn("cannot write JSON", zap.Error(err))
				}
			case <-done:
				return
			}
		}
	}
}
