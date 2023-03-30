package pkg

import (
	hbase "github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/model/base"

	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip"
)

func ConvertTripLocation(l *hbase.Location) *trip.Location {
	return &trip.Location{
		Latitude:  l.Latitude,
		Longitude: l.Longitude,
	}
}

func ConvertDriver(d *hbase.Driver) *car.Driver {
	if d == nil {
		return nil
	}
	return &car.Driver{
		Id:        d.ID,
		AvatarUrl: d.AvatarURL,
	}
}

func ConvertCarLocation(l *hbase.Position) *car.Location {
	if l == nil {
		return nil
	}
	return &car.Location{
		Latitude:  l.Latitude,
		Longitude: l.Longitude,
	}
}

func ConvertCar(c *hbase.Car) *car.Car {
	if c == nil {
		return nil
	}
	return &car.Car{
		Status:   car.CarStatus(c.Status),
		Driver:   ConvertDriver(c.Driver),
		Position: ConvertCarLocation(c.Position),
		TripId:   c.TripID,
		Power:    c.Power,
		PlateNum: c.PlateNum,
	}
}
