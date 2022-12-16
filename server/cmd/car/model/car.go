package model

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	mongoUtil "github.com/CyanAsterisk/FreeCar/shared/mongo"
)

// CarRecord defines a car record in mongo db.
type CarRecord struct {
	mongoUtil.IDField `bson:"inline"`
	Car               *car.Car `bson:"car"`
}
