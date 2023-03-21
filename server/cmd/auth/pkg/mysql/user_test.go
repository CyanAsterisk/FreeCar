package mysql

import (
	"fmt"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/test"
	"github.com/bytedance/sonic"
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
			want: "[err = <nil>][resp = &{ID:1234 PhoneNumber:10086 AvatarBlobId:1001 Username:username1 OpenID:5cc2876d40c14dcabe891399c4a0422a Deleted:{Time:0001-01-01 00:00:00 +0000 UTC Valid:false}}]",
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
			want: "[err = <nil>][resp = &{ID:1234 PhoneNumber:10086 AvatarBlobId:1001 Username:username1 OpenID:5cc2876d40c14dcabe891399c4a0422a Deleted:{Time:0001-01-01 00:00:00 +0000 UTC Valid:false}}]",
		},
		{
			name: "get user by openId",
			op: func() string {
				resp, err := manager.GetUserByOpenId(user.OpenID)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1234 PhoneNumber:10086 AvatarBlobId:1001 Username:username1 OpenID:5cc2876d40c14dcabe891399c4a0422a Deleted:{Time:0001-01-01 00:00:00 +0000 UTC Valid:false}}]",
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
			want: "[err = <nil>][resp = &{ID:1234 PhoneNumber:8888888888 AvatarBlobId:10100101001 Username:new-username OpenID:5cc2876d40c14dcabe891399c4a0422a Deleted:{Time:0001-01-01 00:00:00 +0000 UTC Valid:false}}]",
		},
		{
			name: "get some users",
			op: func() string {
				manager.CreateUser(&User{
					ID:           1235,
					PhoneNumber:  10086,
					AvatarBlobId: 1001,
					Username:     "username2",
					OpenID:       "openID-2",
				})
				manager.CreateUser(&User{
					ID:           1236,
					PhoneNumber:  10086,
					AvatarBlobId: 1001,
					Username:     "username3",
					OpenID:       "openID-3",
				})
				users, err := manager.GetSomeUsers()
				resp, _ := sonic.Marshal(users)
				if err != nil {
					return fmt.Sprintf("[err=%+v]", err)
				}
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, string(resp))
			},
			want: `[err = <nil>][resp = [{"ID":1234,"PhoneNumber":8888888888,"AvatarBlobId":10100101001,"Username":"new-username","OpenID":"5cc2876d40c14dcabe891399c4a0422a","Deleted":null},{"ID":1235,"PhoneNumber":10086,"AvatarBlobId":1001,"Username":"username2","OpenID":"dcd63116db07e44a16e3f0015f965a53","Deleted":null},{"ID":1236,"PhoneNumber":10086,"AvatarBlobId":1001,"Username":"username3","OpenID":"72e38afb76dc1022c1c78b2429024d80","Deleted":null}]]`,
		},
		{
			name: "get all users",
			op: func() string {
				users, err := manager.GetSomeUsers()
				resp, _ := sonic.Marshal(users)
				if err != nil {
					return fmt.Sprintf("[err=%+v]", err)
				}
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, string(resp))
			},
			want: `[err = <nil>][resp = [{"ID":1234,"PhoneNumber":8888888888,"AvatarBlobId":10100101001,"Username":"new-username","OpenID":"5cc2876d40c14dcabe891399c4a0422a","Deleted":null},{"ID":1235,"PhoneNumber":10086,"AvatarBlobId":1001,"Username":"username2","OpenID":"dcd63116db07e44a16e3f0015f965a53","Deleted":null},{"ID":1236,"PhoneNumber":10086,"AvatarBlobId":1001,"Username":"username3","OpenID":"72e38afb76dc1022c1c78b2429024d80","Deleted":null}]]`,
		},
		{
			name: "delete user",
			op: func() string {
				manager.CreateUser(&User{
					ID:           1235,
					PhoneNumber:  10086,
					AvatarBlobId: 1001,
					Username:     "username2",
					OpenID:       "openID-2",
				})
				manager.CreateUser(&User{
					ID:           1236,
					PhoneNumber:  10086,
					AvatarBlobId: 1001,
					Username:     "username3",
					OpenID:       "openID-3",
				})
				err = manager.DeleteUser(1235)
				if err != nil {
					return fmt.Sprintf("[err=%+v]", err)
				}
				users, err := manager.GetSomeUsers()
				resp, _ := sonic.Marshal(users)
				if err != nil {
					return fmt.Sprintf("[err=%+v]", err)
				}
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, string(resp))
			},
			want: `[err = <nil>][resp = [{"ID":1234,"PhoneNumber":8888888888,"AvatarBlobId":10100101001,"Username":"new-username","OpenID":"5cc2876d40c14dcabe891399c4a0422a","Deleted":null},{"ID":1236,"PhoneNumber":10086,"AvatarBlobId":1001,"Username":"username3","OpenID":"72e38afb76dc1022c1c78b2429024d80","Deleted":null}]]`,
		},
	}

	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: want: %s,got %s", cc.name, cc.want, got)
		}
	}
}
