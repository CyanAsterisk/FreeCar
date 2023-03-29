namespace go trip

include "../base/common.thrift"

// Trip Service
struct Location {
    1: required double latitude,
    2: required double longitude,
}

struct LocationStatus {
    1: required Location location,
    2: required i32 fee_cent,
    3: required double km_driven,
    4: required string poi_name,
    5: required i64 timestamp_sec,
}

enum TripStatus {
    TS_NOT_SPECIFIED = 0,
    IN_PROGRESS = 1,
    FINISHED = 2,
}

struct TripEntity {
    1: required string id,
    2: required Trip trip,
}

struct Trip {
    1: required i64 account_id,
    2: required string car_id,
    3: required LocationStatus start,
    4: required LocationStatus current,
    5: required LocationStatus end,
    6: required TripStatus status,
    7: required string identity_id,
}

struct CreateTripRequest {
    1: required Location start,
    2: required string car_id,
    3: required string avatar_url,
    4: required i64 account_id,
}

struct CreateTripResponse {
    1: required common.BaseResponse base_resp,
    2: required TripEntity trip_entity,
}

struct GetTripRequest {
    1: required string id,
    2: required i64 account_id,
}

struct GetTripResponse {
    1: required common.BaseResponse base_resp,
    2: required Trip trip,
}

struct GetTripsRequest {
    1: required TripStatus status,
    2: required i64 account_id,
}

struct GetTripsResponse {
    1: required common.BaseResponse base_resp,
    2: required list<TripEntity> trips,
}

struct UpdateTripRequest {
    1: required string id,
    2: required Location current,
    3: required bool end_trip,
    4: required i64 account_id,
}

struct UpdateTripResponse {
    1: required common.BaseResponse base_resp,
    2: required Trip trip,
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
    2: required list<TripEntity> trips,
}

struct GetSomeTripsRequest {
}

struct GetSomeTripsResponse {
    1: required common.BaseResponse base_resp,
    2: required list<TripEntity> trips,
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