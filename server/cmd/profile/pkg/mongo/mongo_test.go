package mongo

import (
	"context"
	"fmt"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/base"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
	"github.com/bytedance/sonic"
)

func TestProfileLifeCycle(t *testing.T) {
	ctx := context.Background()
	cleanUpFunc, client, err := test.RunWithMongoInDocker(t)
	defer cleanUpFunc()
	if err != nil {
		t.Fatal(err)
	}

	aid := id.AccountID("1024")
	pf := &base.Profile{
		Identity: &base.Identity{
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
				err := manager.UpdateProfilePhoto(ctx, aid, "200000002")
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: `[err = <nil>][resp = &{AccountID:1024 Profile:<nil> PhotoBlobID:200000002}]`,
		},
		{
			name: "submit profile",
			op: func() string {
				err := manager.UpdateProfile(ctx, aid, base.IdentityStatus_UNSUBMITTED, pf)
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
				err := manager.UpdateProfile(ctx, aid, base.IdentityStatus_UNSUBMITTED, pf)
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
				err := manager.UpdateProfile(ctx, aid, base.IdentityStatus_PENDING, &base.Profile{
					Identity:       pf.Identity,
					IdentityStatus: base.IdentityStatus_VERIFIED,
				})
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, err := manager.GetProfile(ctx, aid)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{AccountID:1024 Profile:Profile({Identity:Identity({LicNumber:10000000001 Name:FreeCar Gender:MALE BirthDateMillis:1676323213}) IdentityStatus:VERIFIED}) PhotoBlobID:200000002}]",
		},
		{
			name: "get profiles",
			op: func() string {
				prs, err := manager.GetProfiles(ctx, -1)
				if err != nil {
					return fmt.Sprintf("[err = %+v]", err)
				}
				resp, _ := sonic.MarshalString(prs)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: `[err = <nil>][resp = [{"AccountID":"1024","Profile":{"identity":{"lic_number":"10000000001","name":"FreeCar","gender":1,"birth_date_millis":1676323213},"identity_status":2},"PhotoBlobID":"200000002"}]]`,
		},
		{
			name: "delete profile",
			op: func() string {
				// err := manager.DeleteProfile(ctx, id.AccountID(1001))
				prs, err := manager.GetProfiles(ctx, -1)
				resp, _ := sonic.MarshalString(prs)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: `[err = <nil>][resp = [{"AccountID":"1024","Profile":{"identity":{"lic_number":"10000000001","name":"FreeCar","gender":1,"birth_date_millis":1676323213},"identity_status":2},"PhotoBlobID":"200000002"}]]`,
		},
	}

	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: \nwant:%s\ngot :%s", cc.name, cc.want, got)
		}
	}
}
