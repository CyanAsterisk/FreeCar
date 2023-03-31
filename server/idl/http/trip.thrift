namespace go trip

include "../base/common.thrift"
include "../base/trip.thrift"

struct CreateTripRequest {
    1:  trip.Location start (api.raw = "start"),
    2:  string car_id (api.raw = "car_id"),
    3:  string avatar_url (api.raw = "avatar_url"),
}

struct GetTripRequest {
    1:  string id (api.raw = "id"),
}

struct GetTripsRequest {
    1:  trip.TripStatus status (api.raw = "status"),
}

struct UpdateTripRequest {
    1:  string id (api.raw = "id"),
    2:  trip.Location current (api.raw = "current"),
    3:  bool end_trip (api.raw = "end_trip"),
}

struct DeleteTripRequest {
    1:  string id (api.raw = "id"),
}

struct GetAllTripsRequest {}

struct GetSomeTripsRequest {}

service TripService {
    // for back-stage management
    common.NilResponse DeleteTrip(1: DeleteTripRequest req) (api.delete = "/admin/trip"),
    common.NilResponse GetAllTrips(1: GetAllTripsRequest req) (api.get = "/admin/trip/all"),
    common.NilResponse GetSomeTrips(1: GetSomeTripsRequest req) (api.get = "/admin/trip/some"),

    // for mini-program
    common.NilResponse CreateTrip(1: CreateTripRequest req) (api.post = "/trip"),
    common.NilResponse GetTrip(1: GetTripRequest req) (api.get = "/trip"),
    common.NilResponse GetTrips(1: GetTripsRequest req) (api.get = "/trips"),
    common.NilResponse UpdateTrip(1: UpdateTripRequest req) (api.put = "/trip"),
}