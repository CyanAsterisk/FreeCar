namespace go trip

include "../base/common.thrift"
include "../base/trip.thrift"

struct CreateTripRequest {
    1:  trip.Location start (api.raw = "start"),
    2:  string car_id (api.raw = "car_id"),
    3:  string avatar_url (api.raw = "avatar_url"),
}

struct CreateTripResponse {
    1:  common.BaseResponse base_resp,
    2:  trip.TripEntity trip_entity,
}

struct GetTripRequest {
    1:  string id (api.raw = "id"),
}

struct GetTripResponse {
    1:  common.BaseResponse base_resp,
    2:  trip.Trip trip,
}

struct GetTripsRequest {
    1:  trip.TripStatus status (api.raw = "status"),
}

struct GetTripsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<trip.TripEntity> trips,
}

struct UpdateTripRequest {
    1:  string id (api.raw = "id"),
    2:  trip.Location current (api.raw = "current"),
    3:  bool end_trip (api.raw = "end_trip"),
}

struct UpdateTripResponse {
    1:  common.BaseResponse base_resp,
    2:  trip.Trip trip,
}

struct DeleteTripRequest {
    1:  string id (api.raw = "id"),
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
    // for back-stage management
    DeleteTripResponse DeleteTrip(1: DeleteTripRequest req) (api.delete = "/admin/trip"),
    GetAllTripsResponse GetAllTrips(1: GetAllTripsRequest req) (api.get = "/admin/trip/all"),
    GetSomeTripsResponse GetSomeTrips(1: GetSomeTripsRequest req) (api.get = "/admin/trip/some"),

    // for mini-program
    CreateTripResponse CreateTrip(1: CreateTripRequest req) (api.post = "/trip"),
    GetTripResponse GetTrip(1: GetTripRequest req) (api.get = "/trip"),
    GetTripsResponse GetTrips(1: GetTripsRequest req) (api.get = "/trips"),
    UpdateTripResponse UpdateTrip(1: UpdateTripRequest req) (api.put = "/trip"),
}