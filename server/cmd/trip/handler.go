package main

import (
	"context"
	trip "github.com/CyanAsterisk/FreeCar/server/cmd/trip/kitex_gen/trip"
)

// TripServiceImpl implements the last service interface defined in the IDL.
type TripServiceImpl struct{}

// CreateTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) CreateTrip(ctx context.Context, req *trip.CreateTripRequest) (resp *trip.TripEntity, err error) {
	// TODO: Your code here...
	return
}

// GetTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) GetTrip(ctx context.Context, req *trip.GetTripRequest) (resp *trip.Trip, err error) {
	// TODO: Your code here...
	return
}

// GetTrips implements the TripServiceImpl interface.
func (s *TripServiceImpl) GetTrips(ctx context.Context, req *trip.GetTripsRequest) (resp *trip.GetTripsResponse, err error) {
	// TODO: Your code here...
	return
}

// UpdateTrip implements the TripServiceImpl interface.
func (s *TripServiceImpl) UpdateTrip(ctx context.Context, req *trip.UpdateTripRequest) (resp *trip.Trip, err error) {
	// TODO: Your code here...
	return
}
