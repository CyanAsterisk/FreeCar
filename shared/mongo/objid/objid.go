package objid

import (
	"fmt"
	"github.com/CyanAsterisk/FreeCar/shared/id"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// FromID converts an id to objected id.
func FromID(id fmt.Stringer) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(id.String())
}

// MustFromID converts an id to objected id, panics on error.
func MustFromID(id fmt.Stringer) primitive.ObjectID {
	oid, err := FromID(id)
	if err != nil {
		panic(err)
	}
	return oid
}

// ToAccountID converts object id to account id.
func ToAccountID(oid int64) id.AccountID {
	return id.AccountID(oid)
}

// ToTripID converts object id to trip id.
func ToTripID(oid primitive.ObjectID) id.TripID {
	return id.TripID(oid.Hex())
}

// ToCarID converts object id to car id.
func ToCarID(oid primitive.ObjectID) id.CarID {
	return id.CarID(oid.Hex())
}

// ToIdentityID converts object id to identity id.
func ToIdentityID(oid primitive.ObjectID) id.IdentityID {
	return id.IdentityID(oid.Hex())
}

// ToBlobID converts object id to blob id.
func ToBlobID(oid int64) id.BlobID {
	return id.BlobID(oid)
}
