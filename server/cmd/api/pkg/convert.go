package pkg

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/model/server/cmd/api"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip"
)

func ConvertLocationStatus(ls *api.LocationStatus) *trip.LocationStatus {
	return &trip.LocationStatus{
		Location:     ConvertLocation(ls.Location),
		FeeCent:      ls.FeeCent,
		KmDriven:     ls.KmDriven,
		PoiName:      ls.PoiName,
		TimestampSec: ls.TimestampSec,
	}
}

func ConvertLocation(l *api.Location) *trip.Location {
	return &trip.Location{
		Latitude:  l.Latitude,
		Longitude: l.Longitude,
	}
}

func ConvertCar(c *api.Car) *car.Car {
	if c == nil {
		return nil
	}
	return &car.Car{
		Status:   car.CarStatus(c.Status),
		Driver:   ConvertDriver(c.Driver),
		Position: ConvertCarLocation(c.Position),
		TripId:   c.TripId,
		Power:    float64(c.Power),
		PlateNum: c.PlateNum,
	}
}

func ConvertDriver(d *api.Driver) *car.Driver {
	if d == nil {
		return nil
	}
	return &car.Driver{
		Id:        d.Id,
		AvatarUrl: d.AvatarUrl,
	}
}

func ConvertCarLocation(l *api.Location) *car.Location {
	if l == nil {
		return nil
	}
	return &car.Location{
		Latitude:  l.Latitude,
		Longitude: l.Longitude,
	}
}
