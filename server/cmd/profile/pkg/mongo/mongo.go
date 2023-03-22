package mongo

import (
	"context"
	"github.com/CyanAsterisk/FreeCar/server/shared/mongo/objid"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	mgutil "github.com/CyanAsterisk/FreeCar/server/shared/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Manager struct {
	col *mongo.Collection
}

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

// NewManager creates a mongo manager.
func NewManager(db *mongo.Database) *Manager {
	return &Manager{col: db.Collection(consts.ProfileCollection)}
}

// GetProfile gets profile for an account.
func (m *Manager) GetProfile(c context.Context, aid id.AccountID) (*ProfileRecord, error) {
	res := m.col.FindOne(c, byAccountID(aid))
	if err := res.Err(); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errno.RecordNotFound
		}
		return nil, err
	}
	var pr ProfileRecord
	err := res.Decode(&pr)
	if err != nil {
		return nil, err
	}
	return &pr, nil
}

// GetProfiles gets profiles.
func (m *Manager) GetProfiles(c context.Context, limit int64) ([]*ProfileRecord, error) {
	filter := bson.M{}
	opt := options.Find().SetLimit(limit)
	res, err := m.col.Find(c, filter, opt)
	if err != nil {
		return nil, err
	}
	var pfs []*ProfileRecord
	for res.Next(c) {
		var pr ProfileRecord
		err := res.Decode(&pr)
		if err != nil {
			return nil, err
		}
		pfs = append(pfs, &pr)
	}
	return pfs, nil
}

// GetPendingProfiles gets peding profiles.
func (m *Manager) GetPendingProfiles(c context.Context) ([]*ProfileRecord, error) {
	filter := bson.M{
		identityStatusField: profile.IdentityStatus_PENDING,
	}
	opt := options.Find()
	res, err := m.col.Find(c, filter, opt)
	if err != nil {
		return nil, err
	}
	var pfs []*ProfileRecord
	for res.Next(c) {
		var pr ProfileRecord
		err := res.Decode(&pr)
		if err != nil {
			return nil, err
		}
		pfs = append(pfs, &pr)
	}
	return pfs, nil
}

// UpdateProfile updates profile for an account.
func (m *Manager) UpdateProfile(c context.Context, aid id.AccountID, prevState profile.IdentityStatus, p *profile.Profile) error {
	filter := bson.M{
		identityStatusField: prevState,
	}
	if prevState == profile.IdentityStatus_UNSUBMITTED {
		filter = mgutil.ZeroOrDoesNotExist(identityStatusField, prevState)
	}
	filter[accountIDField] = aid.Int64()
	_, err := m.col.UpdateOne(c, filter, mgutil.Set(bson.M{
		accountIDField: aid.Int64(),
		profileField:   p,
	}), options.Update().SetUpsert(true))
	if mongo.IsDuplicateKeyError(err) {
		return errno.RecordAlreadyExist
	}
	return err
}

// UpdateProfilePhoto updates profile photo blob id.
func (m *Manager) UpdateProfilePhoto(c context.Context, aid id.AccountID, bid id.BlobID) error {
	_, err := m.col.UpdateOne(c, bson.M{
		accountIDField: aid.Int64(),
	}, mgutil.Set(bson.M{
		accountIDField:   aid.Int64(),
		photoBlobIDField: bid.Int64(),
	}), options.Update().SetUpsert(true))
	return err
}

// DeleteProfile delete profile
func (m *Manager) DeleteProfile(c context.Context, aid id.AccountID) error {
	objID, err := objid.FromID(aid)
	if err != nil {
		return err
	}
	filter := bson.M{
		mgutil.IDFieldName: objID,
	}
	result, err := m.col.DeleteOne(c, filter)
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return errno.RecordNotFound
	}
	return nil
}

func byAccountID(aid id.AccountID) bson.M {
	return bson.M{
		accountIDField: aid.Int64(),
	}
}
