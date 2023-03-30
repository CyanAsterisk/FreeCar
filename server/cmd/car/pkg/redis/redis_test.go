package redis

import (
	"context"
	"fmt"
	"strconv"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	car "github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestCarLifecycle(t *testing.T) {
	ctx := context.Background()
	cleanUpFunc, client, err := test.RunWithRedisInDocker(consts.RedisCarClientDB, t)

	defer cleanUpFunc()
	if err != nil {
		t.Fatal(err)
	}

	manager := NewManager(client)
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "create cars",
			op: func() string {
				for i := 0; i < 5; i++ {
					err := manager.InsertCar(ctx, id.CarID(strconv.Itoa(10000000+i)), &car.Car{
						Status: 1,
						Driver: &car.Driver{
							Id:        int64(2000000 + i),
							AvatarUrl: fmt.Sprintf("avatarURL-of-driver%d", i),
						},
						Position: &car.Position{
							Latitude:  float64(69 + i),
							Longitude: float64(120 + i),
						},
						TripId:   fmt.Sprintf("tripId of car%d", i),
						Power:    float64(70 + i),
						PlateNum: fmt.Sprintf("plate num of car%d", i),
					})
					if err != nil {
						return fmt.Sprintf("[err = %+v]", err)
					}
				}
				return fmt.Sprintf("[err = %+v]", nil)
			},
			want: "[err = <nil>]",
		},
		{
			name: "get car",
			op: func() string {
				resp, err := manager.GetCar(ctx, "10000000")
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = CarEntity({Id:10000000 Car:Car({Status:LOCKED Driver:Driver({Id:2000000 AvatarUrl:avatarURL-of-driver0}) Position:Location({Latitude:69 Longitude:120}) TripId:tripId of car0 Power:70 PlateNum:plate num of car0})})]",
		},
		{
			name: "remove car",
			op: func() string {
				err := manager.RemoveCar(ctx, "10000000")
				return fmt.Sprintf("[err = %+v]", err)
			},
			want: "[err = <nil>]",
		},
		{
			name: "get car after removed",
			op: func() string {
				resp, err := manager.GetCar(ctx, "10000000")
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=80000, err_msg=record not found][resp = <nil>]",
		},
	}

	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: \nwant: %s\ngot :%s", cc.name, cc.want, got)
		}
	}
}
