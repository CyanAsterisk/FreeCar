package sim

import (
	"context"
	"math/rand"
	"strconv"
	"time"

	"github.com/CyanAsterisk/FreeCar/server/cmd/car/pkg/mq"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car/carservice"
	"github.com/cloudwego/kitex/pkg/klog"
)

const (
	minCarNum      = 10
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
	var cars []*base.CarEntity
	for {
		// Prevent vehicle information not being retrieved due to service failure
		time.Sleep(2 * time.Second)
		res, err := c.CarService.GetCars(ctx, &car.GetCarsRequest{})
		if err != nil {
			klog.Errorf("cannot get cars: %s", err.Error())
			continue
		}
		cars = res.Cars
		break
	}

	if len(cars) < minCarNum {
		for i := minCarNum - len(cars); i > 0; i-- {
			res, err := c.CarService.CreateCar(ctx, &car.CreateCarRequest{
				AccountId: AccountId,
				PlateNum:  genPlateNum(),
			})
			if err != nil {
				klog.Fatalf("create cars error: %s", err.Error())
			}
			cars = append(cars, res.CarEntity)
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
			Position: &base.Position{
				Latitude:  CQUPTLatitude + (rand.Float64()-0.5)*0.1,
				Longitude: CQUPTLongitude + (rand.Float64()-0.5)*0.1,
			},
			AccountId: AccountId,
			Power:     99,
		}
		if idx < minCarNum-2 {
			req.Status = base.CarStatus_UNLOCKED
		} else {
			req.Status = base.CarStatus_LOCKED
		}
		_, err := c.CarService.UpdateCar(ctx, req)
		if err != nil {
			klog.Errorf("updateCar error: %s", err.Error())
		}
	}

	carChans := make(map[string]chan *base.Car)
	for _, _car := range cars {
		ch := make(chan *base.Car)
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
func (c *Controller) SimulateCar(ctx context.Context, initial *base.CarEntity, ch chan *base.Car) {
	carID := initial.Id
	klog.Infof("Simulating car: %s", carID)

	for update := range ch {
		time.Sleep(time.Millisecond * 500)
		if update.Status == base.CarStatus_UNLOCKING {
			_, err := c.CarService.UpdateCar(ctx, &car.UpdateCarRequest{
				Id:     carID,
				Status: base.CarStatus_UNLOCKED,
				Position: &base.Position{
					Latitude:  CQUPTLatitude,
					Longitude: CQUPTLongitude,
				},
			})
			if err != nil {
				klog.Errorf("cannot unlock car: %s", err.Error())
			}
		} else if update.Status == base.CarStatus_LOCKING {
			_, err := c.CarService.UpdateCar(ctx, &car.UpdateCarRequest{
				Id:     carID,
				Status: base.CarStatus_LOCKED,
			})
			if err != nil {
				klog.Errorf("cannot lock car: %s", err.Error())
			}
		} else if update.Status == base.CarStatus_UNLOCKED {
			_, err := c.CarService.UpdateCar(ctx, &car.UpdateCarRequest{
				Id: carID,
				Position: &base.Position{
					Latitude:  update.Position.Latitude + (rand.Float64()-0.5)*0.001,
					Longitude: update.Position.Longitude + (rand.Float64()-0.5)*0.001,
				},
				Power: update.Power - 0.02*rand.Float64(),
			})
			if err != nil {
				klog.Errorf("cannot update car position: %s", err.Error())
			}
		} else if update.Status == base.CarStatus_LOCKED {
			var err error
			if update.Power >= 100 {
				return
			} else {
				_, err = c.CarService.UpdateCar(ctx, &car.UpdateCarRequest{
					Id:       carID,
					Power:    update.Power + 0.01*rand.Float64(),
					Position: update.Position,
				})
			}
			if err != nil {
				klog.Errorf("cannot update car position: %s", err.Error())
			}
		}
	}
}

func genPlateNum() string {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	plateNum := "渝"
	plateNum += string(letters[rand.Int()%26])
	for i := 0; i < 5; i++ {
		plateNum += strconv.Itoa(rand.Int() % 10)
	}
	return plateNum
}
