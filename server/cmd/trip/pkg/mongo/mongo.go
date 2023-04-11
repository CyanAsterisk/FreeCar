package mongo

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/errno"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	mgutil "github.com/CyanAsterisk/FreeCar/server/shared/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/mongo/objid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	tripField      = "trip"
	accountIDField = tripField + ".accountid"
	statusField    = tripField + ".status"
)

// TripRecord  defines a trip record in mongo db.
type TripRecord struct {
	mgutil.IDField        `bson:"inline"`
	mgutil.UpdatedAtField `bson:"inline"`
	Trip                  *base.Trip `bson:"trip"`
}

type Manager struct {
	col *mongo.Collection
}

// NewManager creates a mongo manager.
func NewManager(db *mongo.Database) *Manager {
	return &Manager{col: db.Collection(consts.TripCollection)}
}

// CreateTrip creates a trip.
func (m *Manager) CreateTrip(c context.Context, trip *base.Trip) (*TripRecord, error) {
	r := &TripRecord{
		Trip: trip,
	}

	r.ID = mgutil.NewObjID()
	r.UpdatedAt = mgutil.UpdatedAt()

	_, err := m.col.InsertOne(c, r)
	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			return nil, errno.RecordAlreadyExist
		}
		return nil, err
	}
	return r, nil
}

// GetTrip gets a trip.
func (m *Manager) GetTrip(c context.Context, id id.TripID, accountID id.AccountID) (*TripRecord, error) {
	objID, err := objid.FromID(id)
	if err != nil {
		return nil, fmt.Errorf("invalid id :%v", err)
	}
	res := m.col.FindOne(c, bson.M{
		mgutil.IDFieldName: objID,
		accountIDField:     accountID,
	})

	if err := res.Err(); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errno.RecordNotFound
		} else {
			return nil, err
		}
	}

	var tr TripRecord
	err = res.Decode(&tr)
	if err != nil {
		return nil, fmt.Errorf("cannot decode: %v", err)
	}
	return &tr, nil
}

// GetTrips gets trips for the account by status.
// If status is not specified, gets all trips for the account.
func (m *Manager) GetTrips(c context.Context, accountID id.AccountID, status base.TripStatus) ([]*TripRecord, error) {
	filter := bson.M{
		accountIDField: accountID.String(),
	}
	if status != base.TripStatus_TS_NOT_SPECIFIED {
		filter[statusField] = status
	}

	res, err := m.col.Find(c, filter)
	if err != nil {
		return nil, err
	}

	var trips []*TripRecord
	for res.Next(c) {
		var tripRc TripRecord
		err := res.Decode(&tripRc)
		if err != nil {
			return nil, err
		}
		trips = append(trips, &tripRc)
	}
	return trips, nil
}

// GetAllTrips gets trips by limit.
func (m *Manager) GetTripsByLimit(c context.Context, limit int64) ([]*TripRecord, error) {
	filter := bson.M{}
	opt := options.Find().SetLimit(limit)
	res, err := m.col.Find(c, filter, opt)
	if err != nil {
		return nil, err
	}
	var ts []*TripRecord
	for res.Next(c) {
		var tr TripRecord
		err := res.Decode(&tr)
		if err != nil {
			return nil, err
		}
		ts = append(ts, &tr)
	}
	return ts, nil
}

// DeleteTrip deletes trip by id.
func (m *Manager) DeleteTrip(c context.Context, id id.TripID) error {
	objID, err := objid.FromID(id)
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

// UpdateTrip updates a trip.
func (m *Manager) UpdateTrip(c context.Context, tid id.TripID, aid id.AccountID, updatedAt int64, trip *base.Trip) error {
	objID, err := objid.FromID(tid)
	if err != nil {
		return fmt.Errorf("invalid id: %v", err)
	}

	newUpdatedAt := mgutil.UpdatedAt()
	res, err := m.col.UpdateOne(c, bson.M{
		mgutil.IDFieldName:        objID,
		accountIDField:            aid.String(),
		mgutil.UpdatedAtFieldName: updatedAt,
	}, mgutil.Set(bson.M{
		tripField:                 trip,
		mgutil.UpdatedAtFieldName: newUpdatedAt,
	}))
	if err != nil {
		return err
	}
	if res.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}
