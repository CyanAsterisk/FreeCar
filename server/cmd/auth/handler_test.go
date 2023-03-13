package main

import (
	"context"
	"fmt"
	"github.com/CyanAsterisk/FreeCar/server/cmd/auth/pkg/mysql"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/auth"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/cloudwego/kitex/client/callopt"
	"strconv"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestUserLifeCycle(t *testing.T) {
	ctx := context.Background()
	//mysqlCleanUp, mysqlDb, err := test.RunWithMySQLInDocker(t)
	//defer mysqlCleanUp()

	mysqlDb, err := test.FakeMysql()
	if err != nil {
		t.Fatal(err)
	}

	salt := "test-salt"
	s := AuthServiceImpl{
		OpenIDResolver: &TestOpenIDResolver{suffix: "test-openId"},
		MysqlManager:   mysql.NewManager(mysqlDb, salt),
		BlobManager:    &TestBlobManager{idForCreate: 1024},
	}

	user := mysql.User{
		ID:           1024,
		PhoneNumber:  0,
		AvatarBlobId: 0,
		Username:     "username",
		OpenID:       "openid",
	}
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "new user login",
			op: func() string {
				_, err := s.Login(ctx, &auth.LoginRequest{Code: "1234"})
				return fmt.Sprintf("[err = %+v]", err)
			},
			want: "[err = <nil>]",
		},
		{
			name: "create a custom account",
			op: func() string {
				u := user
				resp, err := s.MysqlManager.CreateUser(&u)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1024 PhoneNumber:0 AvatarBlobId:0 Username:username OpenID:de73b2ae1a444cd60d81fd986c5a46a9}]",
		},
		{
			name: "test get user",
			op: func() string {
				resp, err := s.GetUserByAccountId(user.ID)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1024 PhoneNumber:0 AvatarBlobId:0 Username:username OpenID:de73b2ae1a444cd60d81fd986c5a46a9}]",
		},
		{
			name: "test update user",
			op: func() string {
				_, err := s.UpdateUser(ctx, &auth.UpdateUserRequest{
					AccountId:   1024,
					Username:    "new-username",
					PhoneNumber: 88888888888,
				})
				if err != nil {
					return fmt.Sprintf("[err=%+v]", err)
				}
				resp, err := s.GetUserByAccountId(user.ID)
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = &{ID:1024 PhoneNumber:88888888888 AvatarBlobId:0 Username:new-username OpenID:de73b2ae1a444cd60d81fd986c5a46a9}]",
		},
		{
			name: "test upload avatar",
			op: func() string {
				resp, err := s.UploadAvatar(ctx, &auth.UploadAvatarRequset{AccountId: user.ID})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = UploadAvatarResponse({UploadUrl:upload_url for 1024})]",
		},
	}
	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: \nwant: %s\ngot :%s", cc.name, cc.want, got)
		}
	}
}

type TestOpenIDResolver struct {
	suffix string
}

func (r *TestOpenIDResolver) Resolve(code string) string {
	return code + r.suffix
}

type TestBlobManager struct {
	idForCreate int64
}

func (b *TestBlobManager) CreateBlob(_ context.Context, _ *blob.CreateBlobRequest, _ ...callopt.Option) (r *blob.CreateBlobResponse, err error) {
	return &blob.CreateBlobResponse{
		Id:        b.idForCreate,
		UploadUrl: "upload_url for " + strconv.FormatInt(b.idForCreate, 10),
	}, nil
}

func (b *TestBlobManager) GetBlobURL(_ context.Context, req *blob.GetBlobURLRequest, _ ...callopt.Option) (r *blob.GetBlobURLResponse, err error) {
	return &blob.GetBlobURLResponse{
		Url: "get_url for " + strconv.FormatInt(req.Id, 10),
	}, nil
}
