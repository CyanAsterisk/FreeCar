package pay

import (
	"context"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/user"
	"github.com/CyanAsterisk/FreeCar/server/shared/tools"

	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/user/userservice"
)

// Manager defines a car manager.
type Manager struct {
	UserClient userservice.Client
}

// NewManager creates a new pay manager.
func NewManager(c userservice.Client) *Manager {
	return &Manager{
		UserClient: c,
	}
}

// Pay pays for the trip.
func (m *Manager) Pay(ctx context.Context, aid id.AccountID, feeCent int32) error {
	resp, err := m.UserClient.Pay(ctx, &user.PayRequest{
		AccountId: aid.String(),
		FeeCent:   feeCent,
	})
	if err != nil {
		return errno.RPCUserSrvErr
	}
	return tools.ParseBaseResp(resp.BaseResp)
}
