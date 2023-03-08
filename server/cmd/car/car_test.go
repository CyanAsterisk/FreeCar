package main

import (
	"context"
	"encoding/json"
	"os"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/car"
	mgutil "github.com/CyanAsterisk/FreeCar/server/shared/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestCarUpdate(t *testing.T) {
	c := context.Background()
	s := CarServiceImpl{}

	carID := id.CarID("5f8132eb22814bf629489056")
	mgutil.NewObjIDWithValue(carID)
	_, err := s.CreateCar(c, &car.CreateCarRequest{
		AccountId: 1024,
		PlateNum:  "渝A66666",
	})
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
			want: `{"status":1,"driver":null,"position":{"latitude":29.5,"longitude":106.6},"trip_id":"","power":100,"plate_num":"渝A66666"}`,
		},
		{
			name: "unlock_car",
			op: func() error {
				_, err = s.UnlockCar(c, &car.UnlockCarRequest{
					Id:     carID.String(),
					TripId: "test-tripId",
					Driver: &car.Driver{
						Id:        1024,
						AvatarUrl: "test-avatarURL",
					},
				})
				return err
			},
			want: `{"status":2,"driver":{"id":1024,"avatar_url":"test-avatarURL"},"position":{"latitude":29.5,"longitude":106.6},"trip_id":"test-tripId","power":100,"plate_num":"渝A66666"}`,
		},
		{
			name: "unlock_complete",
			op: func() error {
				_, err = s.UpdateCar(c, &car.UpdateCarRequest{
					Id: carID.String(),
					Position: &car.Location{
						Latitude:  31,
						Longitude: 121,
					},
					Status: car.CarStatus_UNLOCKED,
				})
				return err
			},
			want: `{"status":3,"driver":{"id":1024,"avatar_url":"test-avatarURL"},"position":{"latitude":31,"longitude":121},"trip_id":"test-tripId","power":100,"plate_num":"渝A66666"}`,
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
			want: `{"status":4,"driver":{"id":1024,"avatar_url":"test-avatarURL"},"position":{"latitude":31,"longitude":121},"trip_id":"test-tripId","power":100,"plate_num":"渝A66666"}`,
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
			want: `{"status":1,"driver":{"id":0,"avatar_url":""},"position":{"latitude":31,"longitude":121},"trip_id":"","power":100,"plate_num":"渝A66666"}`,
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

func TestMain(m *testing.M) {
	os.Exit(test.RunWithMongoInDocker(m))
}

type testPublisher struct{}

func (p *testPublisher) Publish(context.Context, *car.CarEntity) error {
	return nil
}
