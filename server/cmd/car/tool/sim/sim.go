package sim

import (
	"context"
	"math/rand"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car/carservice"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/tool/mq"
	"github.com/cloudwego/kitex/pkg/klog"
)

const (
	minCarNum      = 8
	AccountId      = 1024
	CQUPTLatitude  = 29.53832
	CQUPTLongitude = 106.613922
)

// Controller defines a car simulation controller.
type Controller struct {
	CarService carservice.Client
	Subscriber mq.Subscriber
}

// RunSimulations runs simulations for all cars.
func (c *Controller) RunSimulations(ctx context.Context) {
	var cars []*car.CarEntity
	for {
		// Prevent vehicle information not being retrieved due to service failure
		time.Sleep(2 * time.Second)
		res, err := c.CarService.GetCars(ctx, &car.GetCarsRequest{})
		if err != nil {
			klog.Error("cannot get cars: %s", err.Error())
			continue
		}
		cars = res.Cars
		break
	}

	if len(cars) < minCarNum {
		for i := minCarNum - len(cars); i > 0; i-- {
			res, err := c.CarService.CreateCar(ctx, &car.CreateCarRequest{})
			if err != nil {
				klog.Fatalf("create cars error: %s", err.Error())
			}
			cars = append(cars, res)
		}
	}
	klog.Infof("Running car simulations. car_count = %d", len(cars))

	msgCh, cleanUp, err := c.Subscriber.Subscribe(ctx)
	defer cleanUp()

	if err != nil {
		klog.Errorf("cannot subscribe %s", err.Error())
		return
	}

	for idx, _car := range cars {
		req := &car.UpdateCarRequest{
			Id: _car.Id,
			Position: &car.Location{
				Latitude:   CQUPTLatitude,
				Longtitude: CQUPTLongitude,
			},
			AccountId: AccountId,
		}
		if idx < minCarNum-2 {
			req.Status = car.CarStatus_UNLOCKED
		} else {
			req.Status = car.CarStatus_LOCKED
		}
		_, err := c.CarService.UpdateCar(ctx, req)
		if err != nil {
			klog.Errorf("updateCar error: %s", err.Error())
		}
	}

	carChans := make(map[string]chan *car.Car)
	for _, _car := range cars {
		ch := make(chan *car.Car)
		carChans[_car.Id] = ch
		go c.SimulateCar(context.Background(), _car, ch)
	}

	for carUpdate := range msgCh {
		if ch := carChans[carUpdate.Id]; ch != nil {
			ch <- carUpdate.Car
		}
	}
}

// SimulateCar simulates a single car.
func (c *Controller) SimulateCar(ctx context.Context, initial *car.CarEntity, ch chan *car.Car) {
	carID := initial.Id
	klog.Infof("Simulating car: %s", carID)

	for update := range ch {
		time.Sleep(time.Millisecond * 500)
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
		} else if update.Status == car.CarStatus_UNLOCKED {
			_, err := c.CarService.UpdateCar(ctx, &car.UpdateCarRequest{
				Id: carID,
				Position: &car.Location{
					Latitude:   update.Position.Latitude + (rand.Float64()-0.5)*0.001,
					Longtitude: update.Position.Longtitude + (rand.Float64()-0.5)*0.001,
				},
			})
			if err != nil {
				klog.Errorf("cannot update car position: %s", err.Error())
			}
		}
	}
}
