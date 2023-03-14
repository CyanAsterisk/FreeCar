package mongo

import (
	"context"
	"fmt"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
	"testing"
)

func TestProfileLifeCycle(t *testing.T) {
	ctx := context.Background()
	cleanUpFunc, client, err := test.RunWithMongoInDocker(t)
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

	db := client.Database(consts.FreeCar)
	err = test.SetupIndexes(ctx, db)
	if err != nil {
		t.Fatal("set index error")
	}
	manager := NewManager(db)
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "get none exist profile",
			op: func() string {
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=80000, err_msg=record not found][resp = <nil>]",
		},
		{
			name: "update profile photo",
			op: func() string {
				err := manager.UpdateProfilePhoto(ctx, aid, id.BlobID(200000002))
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{AccountID:1024 Profile:<nil> PhotoBlobID:200000002}]",
		},
		{
			name: "submit profile",
			op: func() string {
				err := manager.UpdateProfile(ctx, aid, profile.IdentityStatus_UNSUBMITTED, pf)
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{AccountID:1024 Profile:Profile({Identity:Identity({LicNumber:10000000001 Name:FreeCar Gender:MALE BirthDateMillis:1676323213}) IdentityStatus:PENDING}) PhotoBlobID:200000002}]",
		},
		{
			name: "submit_again",
			op: func() string {
				err := manager.UpdateProfile(ctx, aid, profile.IdentityStatus_UNSUBMITTED, pf)
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=80001, err_msg=record already exist]",
		},
		{
			name: "verify profile",
			op: func() string {
				err := manager.UpdateProfile(ctx, aid, profile.IdentityStatus_PENDING, &profile.Profile{
					Identity:       pf.Identity,
					IdentityStatus: profile.IdentityStatus_VERIFIED,
				})
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{AccountID:1024 Profile:Profile({Identity:Identity({LicNumber:10000000001 Name:FreeCar Gender:MALE BirthDateMillis:1676323213}) IdentityStatus:VERIFIED}) PhotoBlobID:200000002}]",
		},
	}

	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: \nwant:%s\ngot :%s", cc.name, cc.want, got)
		}
	}
}
