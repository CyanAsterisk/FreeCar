namespace go trip

include "../base/common.thrift"
include "../base/trip.thrift"

struct CreateTripRequest {
    1: required trip.Location start (api.raw = "start"),
    2: required string car_id (api.raw = "car_id"),
    3: required string avatar_url (api.raw = "avatar_url"),
}

struct CreateTripResponse {
    1: required common.BaseResponse base_resp,
    2: required trip.TripEntity trip_entity,
}

struct GetTripRequest {
    1: required string id (api.raw = "id"),
}

struct GetTripResponse {
    1: required common.BaseResponse base_resp,
    2: required trip.Trip trip,
}

struct GetTripsRequest {
    1: required trip.TripStatus status (api.raw = "status"),
}

struct GetTripsResponse {
    1: required common.BaseResponse base_resp,
    2: required list<trip.TripEntity> trips,
}

struct UpdateTripRequest {
    1: required string id (api.raw = "id"),
    2: required trip.Location current (api.raw = "current"),
    3: required bool end_trip (api.raw = "end_trip"),
}

struct UpdateTripResponse {
    1: required common.BaseResponse base_resp,
    2: required trip.Trip trip,
}

struct DeleteTripRequest {
    1: required string id (api.raw = "id"),
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
    // for back-stage management
    DeleteTripResponse DeleteTrip(1: DeleteTripRequest req) (api.delete = "/trip/admin/trip"),
    GetAllTripsResponse GetAllTrips(1: GetAllTripsRequest req) (api.get = "/trip/admin/all"),
    GetSomeTripsResponse GetSomeTrips(1: GetSomeTripsRequest req) (api.get = "/trip/admin/some"),
    // for mini-program
    CreateTripResponse CreateTrip(1: CreateTripRequest req) (api.post = "/trip/mini/trip"),
    GetTripResponse GetTrip(1: GetTripRequest req) (api.get = "/trip/mini/trip"),
    GetTripsResponse GetTrips(1: GetTripsRequest req) (api.get = "/trip/mini/trips"),
    UpdateTripResponse UpdateTrip(1: UpdateTripRequest req) (api.push = "/trip/mini/trip"),
}