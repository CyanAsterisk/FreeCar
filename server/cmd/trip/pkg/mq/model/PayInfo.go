package model

import "github.com/CyanAsterisk/FreeCar/server/shared/id"

type PayInfo struct {
	AccountId id.AccountID `json:"account_id"`
	TripId    id.TripID    `json:"trip_id"`
	FeeCent   int32        `json:"fee_cent"`
}
