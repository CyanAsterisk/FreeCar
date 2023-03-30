package mongo

import (
	"context"
	"fmt"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	car "github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	mgutil "github.com/CyanAsterisk/FreeCar/server/shared/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestCarLifeCycle(t *testing.T) {
	ctx := context.Background()
	cleanUpFunc, db, err := test.RunWithMongoInDocker(t)
	defer cleanUpFunc()
	if err != nil {
		t.Fatal(err)
	}
	manager := NewManager(db.Database(consts.FreeCar))

	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "create cars",
			op: func() string {
				for i := 0; i < 5; i++ {
					mgutil.NewObjIDWithValue(id.CarID(fmt.Sprintf("640dc5f80dfe5ce3e4d8cf1%d", i)))
					_, err := manager.CreateCar(ctx, fmt.Sprintf("plate-num-%d", i))
					if err != nil {
						return fmt.Sprintf("[err = %+v]", err)
					}
				}
				return fmt.Sprintf("[err = %+v]", nil)
			},
			want: "[err = <nil>]",
		},
		{
			name: "get cars",
			op: func() string {
				resp, err := manager.GetCars(ctx, -1)
				var cars []CarRecord
				for _, c := range resp {
					cars = append(cars, *c)
				}
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, cars)
			},
			want: "[err = <nil>][resp = [{IDField:{ID:ObjectID(\"640dc5f80dfe5ce3e4d8cf10\")} Car:Car({Status:LOCKED Driver:<nil> Position:Location({Latitude:29.5 Longitude:106.6}) TripId: Power:100 PlateNum:plate-num-0})} {IDField:{ID:ObjectID(\"640dc5f80dfe5ce3e4d8cf11\")} Car:Car({Status:LOCKED Driver:<nil> Position:Location({Latitude:29.5 Longitude:106.6}) TripId: Power:100 PlateNum:plate-num-1})} {IDField:{ID:ObjectID(\"640dc5f80dfe5ce3e4d8cf12\")} Car:Car({Status:LOCKED Driver:<nil> Position:Location({Latitude:29.5 Longitude:106.6}) TripId: Power:100 PlateNum:plate-num-2})} {IDField:{ID:ObjectID(\"640dc5f80dfe5ce3e4d8cf13\")} Car:Car({Status:LOCKED Driver:<nil> Position:Location({Latitude:29.5 Longitude:106.6}) TripId: Power:100 PlateNum:plate-num-3})} {IDField:{ID:ObjectID(\"640dc5f80dfe5ce3e4d8cf14\")} Car:Car({Status:LOCKED Driver:<nil> Position:Location({Latitude:29.5 Longitude:106.6}) TripId: Power:100 PlateNum:plate-num-4})}]]",
		},
		{
			name: "get car",
			op: func() string {
				resp, err := manager.GetCar(ctx, "640dc5f80dfe5ce3e4d8cf10")
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{IDField:{ID:ObjectID(\"640dc5f80dfe5ce3e4d8cf10\")} Car:Car({Status:LOCKED Driver:<nil> Position:Location({Latitude:29.5 Longitude:106.6}) TripId: Power:100 PlateNum:plate-num-0})}]",
		},
		{
			name: "update car",
			op: func() string {
				resp, err := manager.UpdateCar(ctx, "640dc5f80dfe5ce3e4d8cf10", car.CarStatus_LOCKED, &CarUpdate{
					Status: car.CarStatus_LOCKING,
					Position: &car.Position{
						Latitude:  29,
						Longitude: 120,
					},
					Driver: &car.Driver{
						Id:        1024,
						AvatarUrl: "test-avatar-url",
					},
					Power:        99,
					UpdateTripID: true,
					TripID:       "test-trip-id",
				})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{IDField:{ID:ObjectID(\"640dc5f80dfe5ce3e4d8cf10\")} Car:Car({Status:LOCKING Driver:Driver({Id:1024 AvatarUrl:test-avatar-url}) Position:Location({Latitude:29 Longitude:120}) TripId:test-trip-id Power:99 PlateNum:plate-num-0})}]",
		},
	}

	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: \nwant: %s\ngot :%s", cc.name, cc.want, got)
		}
	}
}
