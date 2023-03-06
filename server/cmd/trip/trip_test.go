package main

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"testing"

	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/global"
	"github.com/CyanAsterisk/FreeCar/server/cmd/trip/pkg/poi"
	"github.com/CyanAsterisk/FreeCar/server/shared/id"
	"github.com/CyanAsterisk/FreeCar/server/shared/kitex_gen/trip"
	mgutil "github.com/CyanAsterisk/FreeCar/server/shared/mongo"
	"github.com/CyanAsterisk/FreeCar/server/shared/test"
)

func TestCreateTrip(t *testing.T) {
	c := context.Background()
	pm := &profileManager{}
	cm := &carManager{}
	pom := &poi.Manager{}
	s := TripServiceImpl{
		ProfileManager: pm,
		CarManager:     cm,
		POIManager:     pom,
	}
	newDB(c, t)

	req := &trip.CreateTripRequest{
		CarId: "car1",
		Start: &trip.Location{
			Latitude:  32.123,
			Longitude: 114.2525,
		},
	}

	pm.iID = "identity1"
	golden := `{"account_id":%d,"car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"fee_cent":0,"km_driven":0,"poi_name":"兴业苑5舍","timestamp_sec":1602560211},"current":{"location":{"latitude":32.123,"longitude":114.2525},"fee_cent":0,"km_driven":0,"poi_name":"兴业苑5舍","timestamp_sec":1602560211},"end":null,"status":1,"identity_id":"identity1"}`
	nowFunc = func() int64 {
		return 1602560211
	}
	cases := []struct {
		name         string
		accountID    int64
		tripID       string
		profileErr   error
		carVerifyErr error
		carUnlockErr error
		want         string
		wantErr      bool
	}{
		{
			name:      "normal_create",
			accountID: 100,
			tripID:    "5f8132eb12714bf629489054",
			want:      fmt.Sprintf(golden, 100),
		},
		{
			name:       "profile_err",
			accountID:  int64(101),
			tripID:     "5f8132eb12714bf629489055",
			profileErr: fmt.Errorf("profile"),
			wantErr:    true,
		},
		{
			name:         "car_verify_err",
			accountID:    int64(102),
			tripID:       "5f8132eb12714bf629489056",
			carVerifyErr: fmt.Errorf("verify"),
			wantErr:      true,
		},
		{
			name:         "car_unlock_err",
			accountID:    int64(103),
			tripID:       "5f8132eb12714bf629489057",
			carUnlockErr: fmt.Errorf("unlock"),
			want:         fmt.Sprintf(golden, 103),
		},
	}

	for _, cc := range cases {
		t.Run(cc.name, func(t *testing.T) {
			mgutil.NewObjIDWithValue(id.TripID(cc.tripID))
			pm.err = cc.profileErr
			cm.unlockErr = cc.carUnlockErr
			cm.verifyErr = cc.carVerifyErr
			req.AccountId = cc.accountID
			res, err := s.CreateTrip(c, req)
			if cc.wantErr {
				if err == nil {
					t.Error("want error;got none")
				} else {
					return
				}
			}

			if err != nil {
				t.Errorf("error creating trip: %v", err)
				return
			}
			if res.Id != cc.tripID {
				t.Errorf("incorrect id;want %q,got %q", cc.tripID, res.Id)
			}
			b, err := json.Marshal(res.Trip)
			if err != nil {
				t.Errorf("cannot marshall response:%v", err)
			}
			got := string(b)
			if cc.want != got {
				t.Errorf("incorrect response: want %s, got %s", cc.want, got)
			}
		})
	}
}

func TestTripLifecycle(t *testing.T) {
	c := context.Background()
	pm := &profileManager{}
	cm := &carManager{}
	pom := &poi.Manager{}
	s := TripServiceImpl{
		ProfileManager: pm,
		CarManager:     cm,
		POIManager:     pom,
	}
	newDB(c, t)

	aid1 := id.AccountID(123)

	tid := id.TripID("5f8132eb22714bf629489056")
	mgutil.NewObjIDWithValue(tid)
	cases := []struct {
		name string
		now  int64
		op   func() (*trip.Trip, error)
		want string
	}{
		{
			name: "create_trip",
			now:  10000,
			op: func() (*trip.Trip, error) {
				e, err := s.CreateTrip(c, &trip.CreateTripRequest{
					CarId: "car1",
					Start: &trip.Location{
						Latitude:  32.123,
						Longitude: 114.2525,
					},
					AccountId: int64(aid1),
				})
				if err != nil {
					return nil, err
				}
				return e.Trip, nil
			},
			want: `{"account_id":123,"car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"fee_cent":0,"km_driven":0,"poi_name":"兴业苑5舍","timestamp_sec":10000},"current":{"location":{"latitude":32.123,"longitude":114.2525},"fee_cent":0,"km_driven":0,"poi_name":"兴业苑5舍","timestamp_sec":10000},"end":null,"status":1,"identity_id":""}`,
		},
		{
			name: "update_trip",
			now:  20000,
			op: func() (*trip.Trip, error) {
				return s.UpdateTrip(c, &trip.UpdateTripRequest{
					Id: tid.String(),
					Current: &trip.Location{
						Latitude:  28.234234,
						Longitude: 123.243255,
					},
					AccountId: int64(aid1),
				})
			},
			want: `{"account_id":123,"car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"fee_cent":0,"km_driven":0,"poi_name":"兴业苑5舍","timestamp_sec":10000},"current":{"location":{"latitude":28.234234,"longitude":123.243255},"fee_cent":3857,"km_driven":305.0839256834663,"poi_name":"信科大厦","timestamp_sec":20000},"end":null,"status":1,"identity_id":""}`,
		},
		{
			name: "finish_trip",
			now:  30000,
			op: func() (*trip.Trip, error) {
				return s.UpdateTrip(c, &trip.UpdateTripRequest{
					Id:        tid.String(),
					EndTrip:   true,
					AccountId: int64(aid1),
				})
			},
			want: `{"account_id":123,"car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"fee_cent":0,"km_driven":0,"poi_name":"兴业苑5舍","timestamp_sec":10000},"current":{"location":{"latitude":28.234234,"longitude":123.243255},"fee_cent":7542,"km_driven":538.6937581015429,"poi_name":"信科大厦","timestamp_sec":30000},"end":{"location":{"latitude":28.234234,"longitude":123.243255},"fee_cent":7542,"km_driven":538.6937581015429,"poi_name":"信科大厦","timestamp_sec":30000},"status":2,"identity_id":""}`,
		},
		{
			name: "query_trip",
			now:  40000,
			op: func() (*trip.Trip, error) {
				return s.GetTrip(c, &trip.GetTripRequest{
					Id:        tid.String(),
					AccountId: int64(aid1),
				})
			},
			want: `{"account_id":123,"car_id":"car1","start":{"location":{"latitude":32.123,"longitude":114.2525},"fee_cent":0,"km_driven":0,"poi_name":"兴业苑5舍","timestamp_sec":10000},"current":{"location":{"latitude":28.234234,"longitude":123.243255},"fee_cent":7542,"km_driven":538.6937581015429,"poi_name":"信科大厦","timestamp_sec":30000},"end":{"location":{"latitude":28.234234,"longitude":123.243255},"fee_cent":7542,"km_driven":538.6937581015429,"poi_name":"信科大厦","timestamp_sec":30000},"status":2,"identity_id":""}`,
		},
	}
	rand.Seed(1345)
	for _, cc := range cases {
		nowFunc = func() int64 {
			return cc.now
		}
		trip, err := cc.op()
		if err != nil {
			t.Errorf("%s: operation failed: %v", cc.name, err)
			continue
		}
		b, err := json.Marshal(trip)
		if err != nil {
			t.Errorf("%s: failed marshalling response: %v", cc.name, err)
		}
		got := string(b)
		if cc.want != got {
			t.Errorf("%s: incorrect response; want: %s, got: %s", cc.name, cc.want, got)
		}
	}
}

type profileManager struct {
	iID id.IdentityID
	err error
}

func (p *profileManager) Verify(context.Context, id.AccountID) (id.IdentityID, error) {
	return p.iID, p.err
}

type carManager struct {
	verifyErr error
	unlockErr error
}

func (m *carManager) Verify(c context.Context, cid id.CarID, aid id.AccountID) error {
	return m.verifyErr
}

func (m *carManager) Unlock(c context.Context, cid id.CarID, aid id.AccountID, tid id.TripID, avatarURL string) error {
	return m.unlockErr
}

func (m *carManager) Lock(c context.Context, cid id.CarID, aid id.AccountID) error {
	return nil
}

func newDB(c context.Context, t *testing.T) {
	mc, err := test.NewClient(c)
	if err != nil {
		t.Fatalf("cannot create new mongo client: %v", err)
	}
	db := mc.Database("FreeCar")
	test.SetupIndexes(c, db)

	global.DB = db.Collection("trip")
}

func TestMain(m *testing.M) {
	os.Exit(test.RunWithMongoInDocker(m))
}
