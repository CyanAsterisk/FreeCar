namespace go trip

include "../base/common.thrift"
include "../base/trip.thrift"

struct CreateTripRequest {
    1:  trip.Location start,
    2:  string car_id,
    3:  string avatar_url,
    4:  string account_id,
}

struct CreateTripResponse {
    1:  common.BaseResponse base_resp,
    2:  trip.TripEntity trip_entity,
}

struct GetTripRequest {
    1:  string id,
    2:  string account_id,
}

struct GetTripResponse {
    1:  common.BaseResponse base_resp,
    2:  trip.Trip trip,
}

struct GetTripsRequest {
    1:  trip.TripStatus status,
    2:  string account_id,
}

struct GetTripsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<trip.TripEntity> trips,
}

struct UpdateTripRequest {
    1:  string id,
    2:  trip.Location current,
    3:  bool end_trip,
    4:  string account_id,
}

struct UpdateTripResponse {
    1:  common.BaseResponse base_resp,
    2:  trip.Trip trip,
}

struct DeleteTripRequest {
    1:  string id,
}

struct DeleteTripResponse {
    1:  common.BaseResponse base_resp,
}

struct GetAllTripsRequest {
}

struct GetAllTripsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<trip.TripEntity> trips,
}

struct GetSomeTripsRequest {
}

struct GetSomeTripsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<trip.TripEntity> trips,
}

service TripService {
    CreateTripResponse CreateTrip(1: CreateTripRequest req),
    GetTripResponse GetTrip(1: GetTripRequest req),
    GetTripsResponse GetTrips(1: GetTripsRequest req),
    UpdateTripResponse UpdateTrip(1: UpdateTripRequest req),
    GetAllTripsResponse GetAllTrips(1: GetAllTripsRequest req),
    GetSomeTripsResponse GetSomeTrips(1: GetSomeTripsRequest req),
    DeleteTripResponse DeleteTrip(1: DeleteTripRequest req),
}