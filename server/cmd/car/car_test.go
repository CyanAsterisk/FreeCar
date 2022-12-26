package main

import (
	"context"
	"encoding/json"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/car/kitex_gen/car"
	"github.com/CyanAsterisk/FreeCar/shared/id"
	mgutil "github.com/CyanAsterisk/FreeCar/shared/mongo"
	"os"
	"testing"

	mongotesting "github.com/CyanAsterisk/FreeCar/shared/mongo/testing"
)

func TestCarUpdate(t *testing.T) {
	c := context.Background()
	s := CarServiceImpl{}

	newDB(c, t)
	newMq(c, t)

	carID := id.CarID("5f8132eb22814bf629489056")
	mgutil.NewObjIDWithValue(carID)
	_, err := s.CreateCar(c, &car.CreateCarRequest{})
	if err != nil {
		t.Fatalf("cannot create car: %v", err)
	}

	cases := []struct {
		name    string
		op      func() error
		want    string
		wantErr bool
	}{
		{
			name: "get_car",
			op: func() error {
				return nil
			},
			want: `{"status":1,"driver":null,"position":{"latitude":30,"longtitude":120},"trip_id":""}`,
		},
		{
			name: "unlock_car",
			op: func() error {
				_, err = s.UnlockCar(c, &car.UnlockCarRequest{
					Id:     carID.String(),
					TripId: "test_trip",
					Driver: &car.Driver{
						Id:        1024,
						AvatarUrl: "test_avatar",
					},
				})
				return err
			},
			want: `{"status":2,"driver":{"id":1024,"avatar_url":"test_avatar"},"position":{"latitude":30,"longtitude":120},"trip_id":"test_trip"}`,
		},
		{
			name: "unlock_complete",
			op: func() error {
				_, err = s.UpdateCar(c, &car.UpdateCarRequest{
					Id: carID.String(),
					Position: &car.Location{
						Latitude:   31,
						Longtitude: 121,
					},
					Status: car.CarStatus_UNLOCKED,
				})
				return err
			},
			want: `{"status":3,"driver":{"id":1024,"avatar_url":"test_avatar"},"position":{"latitude":31,"longtitude":121},"trip_id":"test_trip"}`,
		},
		{
			name: "unlock_car_by_another_driver",
			op: func() error {
				_, err := s.UnlockCar(c, &car.UnlockCarRequest{
					Id:     carID.String(),
					TripId: "bad_trip",
					Driver: &car.Driver{
						Id:        1111,
						AvatarUrl: "test_avatar",
					},
				})
				return err
			},
			wantErr: true,
		},
		{
			name: "lock_car",
			op: func() error {
				_, err := s.LockCar(c, &car.LockCarRequest{
					Id: carID.String(),
				})
				return err
			},
			want: `{"status":4,"driver":{"id":1024,"avatar_url":"test_avatar"},"position":{"latitude":31,"longtitude":121},"trip_id":"test_trip"}`,
		},
		{
			name: "lock_complete",
			op: func() error {
				_, err := s.UpdateCar(c, &car.UpdateCarRequest{
					Id:     carID.String(),
					Status: car.CarStatus_LOCKED,
				})
				return err
			},
			want: `{"status":1,"driver":{"id":0,"avatar_url":""},"position":{"latitude":31,"longtitude":121},"trip_id":""}`,
		},
	}
	for _, cc := range cases {
		err := cc.op()
		if cc.wantErr {
			if err == nil {
				t.Errorf("%s: want error; got none", cc.name)
			} else {
				continue
			}
		}
		if err != nil {
			t.Errorf("%s: operation failed: %v", cc.name, err)
			continue
		}
		car, err := s.GetCar(c, &car.GetCarRequest{
			Id: carID.String(),
		})
		if err != nil {
			t.Errorf("%s: cannot get car after operation: %v", cc.name, err)
		}
		b, err := json.Marshal(car)
		if err != nil {
			t.Errorf("%s: failed marshalling response: %v", cc.name, err)
		}
		got := string(b)
		if cc.want != got {
			t.Errorf("%s: incorrect response; want: %s, got: %s", cc.name, cc.want, got)
		}
	}
}

func newDB(c context.Context, t *testing.T) {
	mc, err := mongotesting.NewClient(c)
	if err != nil {
		t.Fatalf("cannot create new mongo client: %v", err)
	}
	db := mc.Database("FreeCar")
	mongotesting.SetupIndexes(c, db)

	global.Col = db.Collection("car")
}

func newMq(c context.Context, t *testing.T) {
	global.Publisher = &testPublisher{}
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}

type testPublisher struct{}

func (p *testPublisher) Publish(context.Context, *car.CarEntity) error {
	return nil
}
