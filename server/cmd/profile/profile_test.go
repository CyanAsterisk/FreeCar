package main

import (
	"context"
	"os"
	"strconv"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/dao"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/kitex_gen/blob"
	"github.com/CyanAsterisk/FreeCar/server/cmd/profile/kitex_gen/profile"
	"github.com/CyanAsterisk/FreeCar/shared/id"
	mongotesting "github.com/CyanAsterisk/FreeCar/shared/mongo/testing"
	"github.com/cloudwego/kitex/client/callopt"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/codes"
	"github.com/cloudwego/kitex/pkg/remote/trans/nphttp2/status"
)

func TestProfileLifeCycle(t *testing.T) {
	c := context.Background()
	s := ProfileServiceImpl{}
	newDB(c, t)

	aid := id.AccountID(123)
	cases := []struct {
		name       string
		op         func() (*profile.Profile, error)
		wantName   string
		wantStatus profile.IdentityStatus
		wantErr    bool
	}{
		{
			name: "get_empty",
			op: func() (*profile.Profile, error) {
				return s.GetProfile(c, &profile.GetProfileRequest{})
			},
			wantStatus: profile.IdentityStatus_UNSUBMITTED,
		},
		{
			name: "submit",
			op: func() (*profile.Profile, error) {
				return s.SubmitProfile(c, &profile.SubmitProfileRequest{
					AccountId: int64(aid),
					Identity: &profile.Identity{
						Name: "abc",
					},
				})
			},
			wantName:   "abc",
			wantStatus: profile.IdentityStatus_PENDING,
		},
		{
			name: "submit_again",
			op: func() (*profile.Profile, error) {
				return s.SubmitProfile(c, &profile.SubmitProfileRequest{
					AccountId: int64(aid),
					Identity: &profile.Identity{
						Name: "abc",
					},
				})
			},
			wantErr: true,
		},
		{
			name: "todo_force_verify",
			op: func() (*profile.Profile, error) {
				p := &profile.Profile{
					Identity: &profile.Identity{
						Name: "abc",
					},
					IdentityStatus: profile.IdentityStatus_VERIFIED,
				}
				err := dao.UpdateProfile(c, aid, profile.IdentityStatus_PENDING, p)
				if err != nil {
					return nil, err
				}
				return p, nil
			},
			wantName:   "abc",
			wantStatus: profile.IdentityStatus_VERIFIED,
		},
		{
			name: "clear",
			op: func() (*profile.Profile, error) {
				return s.ClearProfile(c, &profile.ClearProfileRequest{})
			},
			wantStatus: profile.IdentityStatus_UNSUBMITTED,
		},
	}
	for _, cc := range cases {
		p, err := cc.op()
		if cc.wantErr {
			if err == nil {
				t.Errorf("%s: want error; got none", cc.name)
			} else {
				continue
			}
		}
		if err != nil {
			t.Errorf("%s: operation failed: %v", cc.name, err)
		}
		gotName := ""
		if p.Identity != nil {
			gotName = p.Identity.Name
		}
		if gotName != cc.wantName {
			t.Errorf("%s: name field incorrect: want %q, got %q", cc.name, cc.wantName, gotName)
		}
		if p.IdentityStatus != cc.wantStatus {
			t.Errorf("%s: status field incorrect: want %s, got %s", cc.name, cc.wantStatus, p.IdentityStatus)
		}
	}
}

func TestProfilePhotoLifecycle(t *testing.T) {
	c := context.Background()
	s := ProfileServiceImpl{}
	newDB(c, t)

	aid := id.AccountID(123)
	global.BlobClient = &blobClient{
		idForCreate: 123,
	}

	getPhotoOp := func() (string, error) {
		r, err := s.GetProfilePhoto(c, &profile.GetProfilePhotoRequest{AccountId: int64(aid)})
		if err != nil {
			return "", err
		}
		return r.Url, nil
	}

	cases := []struct {
		name        string
		op          func() (string, error)
		wantURL     string
		wantErrCode codes.Code
	}{
		{
			name:        "get_photo_before_upload",
			op:          getPhotoOp,
			wantErrCode: codes.NotFound,
		},
		{
			name: "create_photo",
			op: func() (string, error) {
				r, err := s.CreateProfilePhoto(c, &profile.CreateProfilePhotoRequest{AccountId: int64(aid)})
				if err != nil {
					return "", err
				}
				return r.UploadUrl, nil
			},
			wantURL: "upload_url for 123",
		},
		{
			name: "complete_photo_upload",
			op: func() (string, error) {
				_, err := s.CompleteProfilePhoto(c, &profile.CompleteProfilePhotoRequest{AccountId: int64(aid)})
				return "", err
			},
		},
		{
			name:    "get_photo_url",
			op:      getPhotoOp,
			wantURL: "get_url for 123",
		},
		{
			name: "clear_photo",
			op: func() (string, error) {
				_, err := s.ClearProfilePhoto(c, &profile.ClearProfilePhotoRequest{AccountId: int64(aid)})
				return "", err
			},
		},
		{
			name:        "get_photo_after_clear",
			op:          getPhotoOp,
			wantErrCode: codes.NotFound,
		},
	}

	for _, cc := range cases {
		got, err := cc.op()
		code := codes.OK
		if err != nil {
			if s, ok := status.FromError(err); ok {
				code = s.Code()
			} else {
				t.Errorf("%s: operation failed: %v", cc.name, err)
			}
		}
		if code != cc.wantErrCode {
			t.Errorf("%s: wrong error code: want %d, got %d", cc.name, cc.wantErrCode, code)
		}
		if got != cc.wantURL {
			t.Errorf("%s: wrong url: want %q, got %q", cc.name, cc.wantURL, got)
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

func (b *blobClient) GetBlob(ctx context.Context, req *blob.GetBlobRequest, callOptions ...callopt.Option) (r *blob.GetBlobResponse, err error) {
	return &blob.GetBlobResponse{}, nil
}

func (b *blobClient) GetBlobURL(ctx context.Context, req *blob.GetBlobURLRequest, callOptions ...callopt.Option) (r *blob.GetBlobURLResponse, err error) {
	return &blob.GetBlobURLResponse{
		Url: "get_url for " + strconv.FormatInt(req.Id, 10),
	}, nil
}

func newDB(c context.Context, t *testing.T) {
	mc, err := mongotesting.NewClient(c)
	if err != nil {
		t.Fatalf("cannot create new mongo client: %v", err)
	}
	db := mc.Database("FreeCar")
	mongotesting.SetupIndexes(c, db)

	global.DB = db.Collection("profile")
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}
