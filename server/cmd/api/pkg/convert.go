package pkg

import (
	"github.com/CyanAsterisk/FreeCar/server/cmd/api/biz/model/server/cmd/api"
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
