package dao

import (
	"context"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip"
	"github.com/CyanAsterisk/FreeCar/shared/id"
	mgutil "github.com/CyanAsterisk/FreeCar/shared/mongo"
	"github.com/CyanAsterisk/FreeCar/shared/mongo/objid"
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
	Trip                  *trip.Trip `bson:"trip"`
}

// CreateTrip creates a trip.
func CreateTrip(c context.Context, trip *trip.Trip) (*TripRecord, error) {
	r := &TripRecord{
		Trip: trip,
	}

	r.ID = mgutil.NewObjID()
	r.UpdatedAt = mgutil.UpdatedAt()

	_, err := global.DB.InsertOne(c, r)
	if err != nil {
		return nil, err
	}
	return r, nil
}

// GetTrip gets a trip.
func GetTrip(c context.Context, id id.TripID, accountID id.AccountID) (*TripRecord, error) {
	objID, err := objid.FromID(id)
	if err != nil {
		return nil, fmt.Errorf("invalid id :%v", err)
	}
	res := global.DB.FindOne(c, bson.M{
		mgutil.IDFieldName: objID,
		accountIDField:     accountID,
	})

	if err := res.Err(); err != nil {
		return nil, err
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
func GetTrips(c context.Context, accountID id.AccountID, status trip.TripStatus) ([]*TripRecord, error) {
	filter := bson.M{
		accountIDField: accountID.Int64(),
	}
	if status != trip.TripStatus_TS_NOT_SPECIFIED {
		filter[statusField] = status
	}

	res, err := global.DB.Find(c, filter)
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

// UpdateTrip updates a trip.
func UpdateTrip(c context.Context, tid id.TripID, aid id.AccountID, updatedAt int64, trip *trip.Trip) error {
	objID, err := objid.FromID(tid)
	if err != nil {
		return fmt.Errorf("invalid id: %v", err)
	}

	newUpdatedAt := mgutil.UpdatedAt()
	res, err := global.DB.UpdateOne(c, bson.M{
		mgutil.IDFieldName:        objID,
		accountIDField:            aid.Int64(),
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
