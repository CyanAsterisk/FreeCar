package model

import "github.com/CyanAsterisk/FreeCar/server/cmd/profile/kitex_gen/profile"

// ProfileRecord defines the profile record in db.
type ProfileRecord struct {
	AccountID   string           `bson:"accountid"`
	Profile     *profile.Profile `bson:"profile"`
	PhotoBlobID string           `bson:"photoblobid"`
}
