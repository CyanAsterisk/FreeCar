package redis

import (
	"context"
	"fmt"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestProfileLifeCycle(t *testing.T) {
	ctx := context.Background()
	cleanUpFunc, client, err := test.RunWithRedisInDocker(consts.RedisCarClientDB, t)
	defer cleanUpFunc()
	if err != nil {
		t.Fatal(err)
	}

	aid := id.AccountID(1024)
	pf := &profile.Profile{
		Identity: &profile.Identity{
			LicNumber:       "10000000001",
			Name:            "FreeCar",
			Gender:          1,
			BirthDateMillis: 1676323213,
		},
		IdentityStatus: 1,
	}

	manager := NewManager(client)
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "get not exist profile",
			op: func() string {
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=80000, err_msg=record not found][resp = <nil>]",
		},
		{
			name: "insert profile",
			op: func() string {
				err := manager.InsertProfile(ctx, aid, pf)
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = Profile({Identity:Identity({LicNumber:10000000001 Name:FreeCar Gender:MALE BirthDateMillis:1676323213}) IdentityStatus:PENDING})]",
		},
		{
			name: "duplicate insert profile",
			op: func() string {
				err := manager.InsertProfile(ctx, aid, pf)
				return fmt.Sprintf("[err = %+v]", err)
			},
			want: "[err = err_code=80001, err_msg=record already exist]",
		},
		{
			name: "remove profile",
			op: func() string {
				err := manager.RemoveProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v]", err)
			},
			want: "[err = <nil>]",
		},
		{
			name: "get removed profile",
			op: func() string {
				resp, err := manager.GetProfile(ctx, aid)
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
