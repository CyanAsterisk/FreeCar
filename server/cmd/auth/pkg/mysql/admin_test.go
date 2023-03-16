package mysql

import (
	"fmt"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestAuthLifeCycle(t *testing.T) {
	cleanUp, db, err := test.RunWithMySQLInDocker(t)
	defer cleanUp()
	if err != nil {
		t.Fatal(err)
	}
	salt := "test-salt"

	admin := Admin{
		ID:       1234,
		Username: "username1",
		Password: "password-1",
	}
	manager := NewAdminManager(db, salt)
	db.Create(&admin)
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "get admin by name",
			op: func() string {
				u := admin
				resp, err := manager.GetAdminByName(u.Username)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1234 Username:username1 Password:password-1}]",
		},
		{
			name: "get admin by AccountId",
			op: func() string {
				u := admin
				resp, err := manager.GetAdminByAccountId(u.ID)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1234 Username:username1 Password:password-1}]",
		},
		{
			name: "update admin password",
			op: func() string {
				u := admin
				err = manager.UpdateAdminPassword(u.ID, "newPassword-1")
				if err != nil {
					return fmt.Sprintf("[err=%+v]", err)
				}
				resp, err := manager.GetAdminByAccountId(u.ID)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1234 Username:username1 Password:newPassword-1}]",
		},
	}

	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: want: %s,got %s", cc.name, cc.want, got)
		}
	}
}
