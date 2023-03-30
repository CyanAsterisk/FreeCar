package mongo

import (
	"context"
	"fmt"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	mgutil "github.com/CyanAsterisk/FreeCar/server/shared/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestTripLifeCycle(t *testing.T) {
	ctx := context.Background()
	cleanUpFunc, client, err := test.RunWithMongoInDocker(t)
	defer cleanUpFunc()

	db := client.Database(consts.FreeCar)
	err = test.SetupIndexes(ctx, db)
	if err != nil {
		t.Fatal("set index err")
	}

	aid := id.AccountID(1024)
	tid := id.TripID("5f8132eb22714bf629489056")

	manager := NewManager(db)
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "get trip before create",
			op: func() string {
				resp, err := manager.GetTrip(ctx, tid, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=80000, err_msg=record not found][resp = <nil>]",
		},
		{
			name: "create trip",
			op: func() string {
				mgutil.NewObjIDWithValue(tid)
				mgutil.SetNextUpdateAt(1678795599000)
				resp, err := manager.CreateTrip(ctx, &base.Trip{
					AccountId:  1024,
					CarId:      "car1-id",
					Start:      &base.LocationStatus{},
					Status:     1,
					IdentityId: "test-1",
				})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{IDField:{ID:ObjectID(\"5f8132eb22714bf629489056\")} UpdatedAtField:{UpdatedAt:1678795599000} Trip:Trip({AccountId:1024 CarId:car1-id Start:LocationStatus({Location:<nil> FeeCent:0 KmDriven:0 PoiName: TimestampSec:0}) Current:<nil> End:<nil> Status:IN_PROGRESS IdentityId:test-1})}]",
		},
		{
			name: "duplicate create trip",
			op: func() string {
				mgutil.NewObjIDWithValue(tid)
				resp, err := manager.CreateTrip(ctx, &base.Trip{})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=80001, err_msg=record already exist][resp = <nil>]",
		},
		{
			name: "get trip",
			op: func() string {
				resp, err := manager.GetTrip(ctx, tid, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{IDField:{ID:ObjectID(\"5f8132eb22714bf629489056\")} UpdatedAtField:{UpdatedAt:1678795599000} Trip:Trip({AccountId:1024 CarId:car1-id Start:LocationStatus({Location:<nil> FeeCent:0 KmDriven:0 PoiName: TimestampSec:0}) Current:<nil> End:<nil> Status:IN_PROGRESS IdentityId:test-1})}]",
		},
		{
			name: "update trip",
			op: func() string {
				err := manager.UpdateTrip(ctx, tid, aid, 1678795599000, &base.Trip{
					AccountId: aid.Int64(),
					Current: &base.LocationStatus{
						Location: &base.Location{
							Latitude:  30,
							Longitude: 90,
						},
						FeeCent:      1200,
						KmDriven:     10,
						PoiName:      "fake-pos",
						TimestampSec: 1678795599003,
					},
				})
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, err := manager.GetTrip(ctx, tid, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{IDField:{ID:ObjectID(\"5f8132eb22714bf629489056\")} UpdatedAtField:{UpdatedAt:1678795599000} Trip:Trip({AccountId:1024 CarId: Start:<nil> Current:LocationStatus({Location:Location({Latitude:30 Longitude:90}) FeeCent:1200 KmDriven:10 PoiName:fake-pos TimestampSec:1678795599003}) End:<nil> Status:TS_NOT_SPECIFIED IdentityId:})}]",
		},
	}

	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: \nwant:%s\ngot :%s", cc.name, cc.want, got)
		}
	}
}
