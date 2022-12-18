package dao

import (
	"context"
	"fmt"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	mgutil "github.com/CyanAsterisk/FreeCar/shared/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	carField      = "car"
	statusField   = carField + ".status"
	driverField   = carField + ".driver"
	positionField = carField + ".position"
	tripIDField   = carField + ".tripid"
)

// Mongo defines a mongo dao.
type Mongo struct {
	col *mongo.Collection
}

// NewMongo creates a mongo dao.
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("car"),
	}
}

// CarRecord defines a car record in mongo db.
type CarRecord struct {
	mgutil.IDField `bson:"inline"`
	Car            *car.Car `bson:"car"`
}

// CreateCar creates a car.
func (m *Mongo) CreateCar(c context.Context) (*CarRecord, error) {
	cr := &CarRecord{
		Car: &car.Car{
			Position: &car.Location{
				Latitude:   30,
				Longtitude: 120,
			},
			Status: car.CarStatus_LOCKED,
		},
	}
	cr.ID = mgutil.NewObjID()
	_, err := m.col.InsertOne(c, cr)
	if err != nil {
		return nil, err
	}
	return cr, nil
}

// GetCar gets a car.
func (m *Mongo) GetCar(c context.Context, id int64) (*CarRecord, error) {
	return convertSingleResult(m.col.FindOne(c, bson.M{
		mgutil.IDFieldName: id,
	}))
}

// GetCars gets cars.
func (m *Mongo) GetCars(c context.Context) ([]*CarRecord, error) {
	filter := bson.M{}
	res, err := m.col.Find(c, filter, options.Find())
	if err != nil {
		return nil, err
	}

	var cars []*CarRecord
	for res.Next(c) {
		var car CarRecord
		err := res.Decode(&car)
		if err != nil {
			return nil, err
		}
		cars = append(cars, &car)
	}
	return cars, nil
}

// CarUpdate defines updates to a car.
// Only specified fields will be updated.
type CarUpdate struct {
	Status       car.CarStatus
	Position     *car.Location
	Driver       *car.Driver
	UpdateTripID bool
	TripID       int64
}

// UpdateCar updates a car. If status is specified,
// it updates the car only when existing record matches the
// status specified.
func (m *Mongo) UpdateCar(c context.Context, CarId int64, status car.CarStatus, update *CarUpdate) (*CarRecord, error) {
	filter := bson.M{
		mgutil.IDFieldName: CarId,
	}
	if status != car.CarStatus_CS_NOT_SPECIFIED {
		filter[statusField] = status
	}

	u := bson.M{}
	if update.Status != car.CarStatus_CS_NOT_SPECIFIED {
		u[statusField] = update.Status
	}
	if update.Driver != nil {
		u[driverField] = update.Driver
	}
	if update.Position != nil {
		u[positionField] = update.Position
	}
	if update.UpdateTripID {
		u[tripIDField] = update.TripID
	}

	res := m.col.FindOneAndUpdate(c, filter, mgutil.Set(u),
		options.FindOneAndUpdate().SetReturnDocument(options.After))

	return convertSingleResult(res)
}

func convertSingleResult(res *mongo.SingleResult) (*CarRecord, error) {
	if err := res.Err(); err != nil {
		return nil, err
	}
	var cr CarRecord
	err := res.Decode(&cr)
	if err != nil {
		return nil, fmt.Errorf("cannot decode: %v", err)
	}
	return &cr, nil
}
