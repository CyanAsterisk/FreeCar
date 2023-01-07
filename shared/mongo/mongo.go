package mgutil

import (
	"fmt"
	"time"

	"github.com/CyanAsterisk/FreeCar/shared/mongo/objid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Common field names.
const (
	IDFieldName        = "_id"
	UpdatedAtFieldName = "updatedat"
)

// IDField defines the object id field.
type IDField struct {
	ID primitive.ObjectID `bson:"_id"`
}

// UpdatedAtField defines the updatedat field.
type UpdatedAtField struct {
	UpdatedAt int64 `bson:"updatedat"`
}

// NewObjID generates a new object id.
var NewObjID = primitive.NewObjectID

// NewObjIDWithValue sets id for next objectID generation.
func NewObjIDWithValue(id fmt.Stringer) {
	NewObjID = func() primitive.ObjectID {
		return objid.MustFromID(id)
	}
}

// UpdatedAt returns a value suitable for UpdatedAt field.
var UpdatedAt = func() int64 {
	return time.Now().UnixNano()
}

// Set returns a $set update document.
func Set(v interface{}) bson.M {
	return bson.M{
		"$set": v,
	}
}

// ZeroOrDoesNotExist generates a filter expression with
// field equal to zero or field does not exist.
func ZeroOrDoesNotExist(field string, zero interface{}) bson.M {
	return bson.M{
		"$or": []bson.M{
			{
				field: zero,
			},
			{
				field: bson.M{
					"$exists": false,
				},
			},
		},
	}
}
