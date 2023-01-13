package profile

import (
	"context"
	"encoding/base64"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/profile"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/profile/profileservice"
	"github.com/CyanAsterisk/FreeCar/shared/id"
	"github.com/bytedance/sonic"
)

// Manager defines a profile manager.
type Manager struct {
	ProfileService profileservice.Client
}

// Verify verifies account identity.
func (m *Manager) Verify(c context.Context, aid id.AccountID) (id.IdentityID, error) {
	nilID := id.IdentityID("")
	p, err := m.ProfileService.GetProfile(c, &profile.GetProfileRequest{AccountId: int64(aid)})
	if err != nil {
		return nilID, fmt.Errorf("cannot get profile: %v", err)
	}
	if p.IdentityStatus != profile.IdentityStatus_VERIFIED {
		return nilID, fmt.Errorf("invalid identity status")
	}

	b, err := sonic.Marshal(p.Identity)
	if err != nil {
		return nilID, fmt.Errorf("cannot marshal identity:%v", err)
	}
	return id.IdentityID(base64.StdEncoding.EncodeToString(b)), nil
}
