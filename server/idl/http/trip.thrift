namespace go trip

include "../base/common.thrift"
include "../base/trip.thrift"

struct CreateTripRequest {
    1: required trip.Location start,
    2: required string car_id,
    3: required string avatar_url,
    4: required i64 account_id,
}

struct CreateTripResponse {
    1: required common.BaseResponse base_resp,
    2: required trip.TripEntity trip_entity,
}

struct GetTripRequest {
    1: required string id,
    2: required i64 account_id,
}

struct GetTripResponse {
    1: required common.BaseResponse base_resp,
    2: required trip.Trip trip,
}

struct GetTripsRequest {
    1: required trip.TripStatus status,
    2: required i64 account_id,
}

struct GetTripsResponse {
    1: required common.BaseResponse base_resp,
    2: required list<trip.TripEntity> trips,
}

struct UpdateTripRequest {
    1: required string id,
    2: required trip.Location current,
    3: required bool end_trip,
    4: required i64 account_id,
}

struct UpdateTripResponse {
    1: required common.BaseResponse base_resp,
    2: required trip.Trip trip,
}

struct DeleteTripRequest {
    1: required string id,
}

struct DeleteTripResponse {
    1: required common.BaseResponse base_resp,
}

struct GetAllTripsRequest {
}

struct GetAllTripsResponse {
    1: required common.BaseResponse base_resp,
    2: required list<trip.TripEntity> trips,
}

struct GetSomeTripsRequest {
}

struct GetSomeTripsResponse {
    1: required common.BaseResponse base_resp,
    2: required list<trip.TripEntity> trips,
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