package dao

import (
	"context"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/kitex_gen/profile"
	"github.com/CyanAsterisk/FreeCar/shared/id"
	mgutil "github.com/CyanAsterisk/FreeCar/shared/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	accountIDField      = "accountid"
	profileField        = "profile"
	identityStatusField = profileField + ".identitystatus"
	photoBlobIDField    = "photoblobid"
)

// ProfileRecord defines the profile record in db.
type ProfileRecord struct {
	AccountID   int64            `bson:"accountid"`
	Profile     *profile.Profile `bson:"profile"`
	PhotoBlobID int64            `bson:"photoblobid"`
}

// GetProfile gets profile for an account.
func GetProfile(c context.Context, aid id.AccountID) (*ProfileRecord, error) {
	res := global.DB.FindOne(c, byAccountID(aid))
	if err := res.Err(); err != nil {
		return nil, err
	}
	var pr ProfileRecord
	err := res.Decode(&pr)
	if err != nil {
		return nil, fmt.Errorf("cannot decode profile record: %v", err)
	}
	return &pr, nil
}

// UpdateProfile updates profile for an account.
func UpdateProfile(c context.Context, aid id.AccountID, prevState profile.IdentityStatus, p *profile.Profile) error {
	filter := bson.M{
		identityStatusField: prevState,
	}
	if prevState == profile.IdentityStatus_UNSUBMITTED {
		filter = mgutil.ZeroOrDoesNotExist(identityStatusField, prevState)
	}
	filter[accountIDField] = aid.Int64()
	_, err := global.DB.UpdateOne(c, filter, mgutil.Set(bson.M{
		accountIDField: aid.Int64(),
		profileField:   p,
	}), options.Update().SetUpsert(true))
	return err
}

// UpdateProfilePhoto updates profile photo blob id.
func UpdateProfilePhoto(c context.Context, aid id.AccountID, bid id.BlobID) error {
	_, err := global.DB.UpdateOne(c, bson.M{
		accountIDField: aid.Int64(),
	}, mgutil.Set(bson.M{
		accountIDField:   aid.Int64(),
		photoBlobIDField: bid.Int64(),
	}), options.Update().SetUpsert(true))
	return err
}

func byAccountID(aid id.AccountID) bson.M {
	return bson.M{
		accountIDField: aid.Int64(),
	}
}
