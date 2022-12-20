package trip

import (
	"context"

	cartr "github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/mq"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip/tripservice"
	"github.com/cloudwego/kitex/pkg/klog"
)

// RunUpdater runs a trip updater.
func RunUpdater(sub mq.Subscriber, ts tripservice.Client) {
	ch, cleanUp, err := sub.Subscribe(context.Background())
	defer cleanUp()

	if err != nil {
		klog.Fatal("cannot subscribe: %s", err.Error())
	}

	for car := range ch {
		if car.Car.Status == cartr.CarStatus_UNLOCKED &&
			car.Car.TripId != "" && car.Car.Drivar.Id != 0 {
			_, err := ts.UpdateTrip(context.Background(), &trip.UpdateTripRequest{
				Id: car.Car.TripId,
				Current: &trip.Location{
					Latitude:  car.Car.Position.Latitude,
					Longitude: car.Car.Position.Longtitude,
				},
			})
			if err != nil {
				klog.Errorf("cannot update trip : tripId = %s  err: %s", car.Car.TripId, err.Error())
			}
		}
	}
}
