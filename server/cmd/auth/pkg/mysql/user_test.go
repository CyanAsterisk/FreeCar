package mysql

import (
	"fmt"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestUserLifecycle(t *testing.T) {
	cleanUp, db, err := test.RunWithMySQLInDocker(t)
	defer cleanUp()
	if err != nil {
		t.Fatal(err)
	}
	salt := "test-salt"

	user := User{
		ID:           1234,
		PhoneNumber:  10086,
		AvatarBlobId: 1001,
		Username:     "username1",
		OpenID:       "openID-1",
	}
	manager := NewUserManager(db, salt)
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "create user",
			op: func() string {
				u := user
				resp, err := manager.CreateUser(&u)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1234 PhoneNumber:10086 AvatarBlobId:1001 Username:username1 OpenID:5cc2876d40c14dcabe891399c4a0422a}]",
		},
		{
			name: "Duplicate create user",
			op: func() string {
				u := user
				resp, err := manager.CreateUser(&u)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=80001, err_msg=record already exist][resp = <nil>]",
		},
		{
			name: "get user by AccountId",
			op: func() string {
				resp, err := manager.GetUserByAccountId(user.ID)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1234 PhoneNumber:10086 AvatarBlobId:1001 Username:username1 OpenID:5cc2876d40c14dcabe891399c4a0422a}]",
		},
		{
			name: "get user by openId",
			op: func() string {
				resp, err := manager.GetUserByOpenId(user.OpenID)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1234 PhoneNumber:10086 AvatarBlobId:1001 Username:username1 OpenID:5cc2876d40c14dcabe891399c4a0422a}]",
		},
		{
			name: "update user info",
			op: func() string {
				newUserInfo := User{
					ID:           1234,
					PhoneNumber:  8888888888,
					AvatarBlobId: 10100101001,
					Username:     "new-username",
				}
				err = manager.UpdateUser(&newUserInfo)
				if err != nil {
					return fmt.Sprintf("[err=%+v]", err)
				}
				resp, err := manager.GetUserByAccountId(user.ID)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1234 PhoneNumber:8888888888 AvatarBlobId:10100101001 Username:new-username OpenID:5cc2876d40c14dcabe891399c4a0422a}]",
		},
	}

	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: want: %s,got %s", cc.name, cc.want, got)
		}
	}
}
