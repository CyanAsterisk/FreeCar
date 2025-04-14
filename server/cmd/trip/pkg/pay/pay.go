package pay

import (
	"context"

	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trade"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trade/tradeservice"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"

	"github.com/CyanAsterisk/FreeCar/server/shared/id"
)

// Manager defines a car manager.
type Manager struct {
	TradeClient tradeservice.Client
}

// NewManager creates a new pay manager.
func NewManager(c tradeservice.Client) *Manager {
	return &Manager{
		TradeClient: c,
	}
}

// Pay pays for the trip.
func (m *Manager) Pay(ctx context.Context, aid id.AccountID, feeCent int32) error {
	resp, err := m.TradeClient.Pay(ctx, &trade.PayRequest{
		AccountId: aid.String(),
		FeeCent:   feeCent,
	})
	if err != nil {
		return errno.RPCUserSrvErr
	}
	return tools.ParseBaseResp(&base.BaseResponse{StatusCode: resp.BaseResp.StatusCode, StatusMsg: resp.BaseResp.StatusMsg})
}
