package trip

import (
	"context"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/mq"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip/tripservice"
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
		if car.Car.Status == base.CarStatus_UNLOCKED &&
			car.Car.TripId != "" && car.Car.Driver.Id != "" {
			_, err := ts.UpdateTrip(context.Background(), &trip.UpdateTripRequest{
				Id: car.Car.TripId,
				Current: &base.Location{
					Latitude:  car.Car.Position.Latitude,
					Longitude: car.Car.Position.Longitude,
				},
				AccountId: car.Car.Driver.Id,
			})
			if err != nil {
				klog.Errorf("cannot update trip : tripId = %s  err: %s", car.Car.TripId, err.Error())
			}
		}
	}
}
