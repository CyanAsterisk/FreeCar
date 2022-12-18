package sim

import (
	"context"
	"time"

	"github.com/cloudwego/kitex/pkg/klog"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/mq"
)

// Controller defines a car simulation controller.
type Controller struct {
	CarService car.CarServiceClient
	Subscriber mq.Subscriber
}

// RunSimulations runs simulations for all cars.
func (c *Controller) RunSimulations(ctx context.Context) {
	var cars []*car.CarEntity
	for {
		//防止由于服务没起来而没取到车辆信息
		time.Sleep(3 * time.Second)
		res, err := c.CarService.GetCars(ctx, &car.GetCarsRequest{})
		if err != nil {
			klog.Error("cannot get cars: %s", err.Error())
			continue
		}
		cars = res.Cars
		break
	}

	klog.Infof("Running car simulations. car_count = %d", len(cars))

	msgCh, cleanUp, err := c.Subscriber.Subscribe(ctx)
	defer cleanUp()

	if err != nil {
		klog.Errorf("cannot subscribe %s", err.Error())
		return
	}

	carChans := make(map[int64]chan *car.Car)
	for _, _car := range cars {
		ch := make(chan *car.Car)
		carChans[_car.Id] = ch
		go c.SimulateCar(context.Background(), _car, ch)
	}

	for carUpdate := range msgCh {
		ch := carChans[carUpdate.Id]
		if ch != nil {
			ch <- carUpdate.Car
		}
	}
}

// SimulateCar simulates a single car.
func (c *Controller) SimulateCar(ctx context.Context, initial *car.CarEntity, ch chan *car.Car) {
	carID := initial.Id
	klog.Infof("Simulating car. %d", carID)

	for update := range ch {
		if update.Status == car.CarStatus_UNLOCKING {
			_, err := c.CarService.UpdateCar(ctx, &car.UpdateCarRequest{
				Id:     carID,
				Status: car.CarStatus_UNLOCKED,
			})
			if err != nil {
				klog.Errorf("cannot unlock car: %s", err.Error())
			}
		} else if update.Status == car.CarStatus_LOCKING {
			_, err := c.CarService.UpdateCar(ctx, &car.UpdateCarRequest{
				Id:     carID,
				Status: car.CarStatus_LOCKED,
			})
			if err != nil {
				klog.Errorf("cannot lock car: %s", err.Error())
			}
		}
	}
}
