package pkg

import (
	hbase "github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/model/base"
	//"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"

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

func ConvertCar1(c *api.Car) *car.Car {
	if c == nil {
		return nil
	}
	return &car.Car{
		Status:   car.CarStatus(c.Status),
		Driver:   ConvertDriver1(c.Driver),
		Position: ConvertCarLocation1(c.Position),
		TripId:   c.TripId,
		Power:    float64(c.Power),
		PlateNum: c.PlateNum,
	}
}

func ConvertDriver1(d *api.Driver) *car.Driver {
	if d == nil {
		return nil
	}
	return &car.Driver{
		Id:        d.Id,
		AvatarUrl: d.AvatarUrl,
	}
}

func ConvertCarLocation1(l *api.Location) *car.Location {
	if l == nil {
		return nil
	}
	return &car.Location{
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

func ConvertCarLocation(l *hbase.Location) *car.Location {
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
