package main

import (
	"context"
	"fmt"
	"strconv"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/pkg/mongo"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/pkg/redis"
	"github.com/CyanAsterisk/FreeCar/server/shared/consts"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/profile"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
	"github.com/cloudwego/kitex/client/callopt"
)

func TestProfileLifeCycle(t *testing.T) {
	c := context.Background()
	mongoCleanUp, mongoClient, err := test.RunWithMongoInDocker(t)
	defer mongoCleanUp()
	if err != nil {
		t.Fatal(err)
	}

	redisCleanUp, redisClient, err := test.RunWithRedisInDocker(consts.RedisCarClientDB, t)
	defer redisCleanUp()
	if err != nil {
		t.Fatal(err)
	}

	s := ProfileServiceImpl{
		MongoManager: mongo.NewManager(mongoClient.Database(consts.FreeCar)),
		RedisManager: redis.NewManager(redisClient),
	}

	aid := id.AccountID(123)
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "get_empty",
			op: func() string {
				resp, err := s.GetProfile(c, &profile.GetProfileRequest{})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = Profile({Identity:<nil> IdentityStatus:UNSUBMITTED})]",
		},
		{
			name: "submit",
			op: func() string {
				resp, err := s.SubmitProfile(c, &profile.SubmitProfileRequest{
					AccountId: int64(aid),
					Identity: &profile.Identity{
						Name: "abc",
					},
				})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = Profile({Identity:Identity({LicNumber: Name:abc Gender:G_NOT_SPECIFIED BirthDateMillis:0}) IdentityStatus:PENDING})]",
		},
		{
			name: "submit_again",
			op: func() string {
				resp, err := s.SubmitProfile(c, &profile.SubmitProfileRequest{
					AccountId: int64(aid),
					Identity: &profile.Identity{
						Name: "abc",
					},
				})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = Profile({Identity:Identity({LicNumber: Name:abc Gender:G_NOT_SPECIFIED BirthDateMillis:0}) IdentityStatus:PENDING})]",
		},
		{
			name: "todo_force_verify",
			op: func() string {
				p := &profile.Profile{
					Identity: &profile.Identity{
						Name: "abc",
					},
					IdentityStatus: profile.IdentityStatus_VERIFIED,
				}
				err = s.UpdateProfile(c, aid, profile.IdentityStatus_PENDING, p)
				return fmt.Sprintf("[err = %+v]", err)
			},
			want: "[err = <nil>]",
		},
		{
			name: "clear",
			op: func() string {
				resp, err := s.ClearProfile(c, &profile.ClearProfileRequest{})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = Profile({Identity:<nil> IdentityStatus:UNSUBMITTED})]",
		},
	}
	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: want: %s,got %s", cc.name, cc.want, got)
		}
	}
}

func TestProfilePhotoLifecycle(t *testing.T) {
	c := context.Background()
	mongoCleanUp, mongoClient, err := test.RunWithMongoInDocker(t)
	defer mongoCleanUp()
	if err != nil {
		t.Fatal(err)
	}

	redisCleanUp, redisClient, err := test.RunWithRedisInDocker(consts.RedisCarClientDB, t)
	defer redisCleanUp()
	if err != nil {
		t.Fatal(err)
	}

	s := ProfileServiceImpl{
		MongoManager: mongo.NewManager(mongoClient.Database(consts.FreeCar)),
		RedisManager: redis.NewManager(redisClient),
		BlobManager:  &blobClient{idForCreate: 123},
	}
	aid := id.AccountID(123)
	cases := []struct {
		name string
		op   func() string
		want string
	}{
		{
			name: "get_photo_before_upload",
			op: func() string {
				resp, err := s.GetProfilePhoto(c, &profile.GetProfilePhotoRequest{AccountId: int64(aid)})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=60001, err_msg=get profile photo error][resp = <nil>]",
		},
		{
			name: "create_photo",
			op: func() string {
				resp, err := s.CreateProfilePhoto(c, &profile.CreateProfilePhotoRequest{AccountId: int64(aid)})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = CreateProfilePhotoResponse({UploadUrl:upload_url for 123})]",
		},
		{
			name: "complete_photo_upload",
			op: func() string {
				resp, err := s.CompleteProfilePhoto(c, &profile.CompleteProfilePhotoRequest{AccountId: int64(aid)})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = Identity({LicNumber:100000000001 Name:FreeCar Gender:MALE BirthDateMillis:631152000000})]",
		},
		{
			name: "get_photo_after_upload",
			op: func() string {
				resp, err := s.GetProfilePhoto(c, &profile.GetProfilePhotoRequest{AccountId: int64(aid)})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = GetProfilePhotoResponse({Url:get_url for 123})]",
		},
		{
			name: "clear_photo",
			op: func() string {
				resp, err := s.ClearProfilePhoto(c, &profile.ClearProfilePhotoRequest{AccountId: int64(aid)})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = <nil>][resp = ClearProfilePhotoResponse({})]",
		},
		{
			name: "get_photo_after_clear",
			op: func() string {
				resp, err := s.GetProfilePhoto(c, &profile.GetProfilePhotoRequest{AccountId: int64(aid)})
				return fmt.Sprintf("[err = %+v][resp = %+v]", err, resp)
			},
			want: "[err = err_code=60001, err_msg=get profile photo error][resp = <nil>]",
		},
	}
	for _, cc := range cases {
		got := cc.op()
		if got != cc.want {
			t.Errorf("%s failed: want: %s,got %s", cc.name, cc.want, got)
		}
	}
}

type blobClient struct {
	idForCreate int64
}

func (b *blobClient) CreateBlob(ctx context.Context, req *blob.CreateBlobRequest, callOptions ...callopt.Option) (r *blob.CreateBlobResponse, err error) {
	return &blob.CreateBlobResponse{
		Id:        b.idForCreate,
		UploadUrl: "upload_url for " + strconv.FormatInt(b.idForCreate, 10),
	}, nil
}

func (b *blobClient) GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest, callOptions ...callopt.Option) (r *blob.GetBlobURLResponse, err error) {
	return &blob.GetBlobURLResponse{
		Url: "get_url for " + strconv.FormatInt(req.Id, 10),
	}, nil
}
