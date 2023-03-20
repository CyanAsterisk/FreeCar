namespace go trip
include "base.thrift"

// Trip Service
struct Location {
  1: double latitude
  2: double longitude
}

struct LocationStatus {
  1: Location location
  2: i32 fee_cent
  3: double km_driven
  4: string poi_name
  5: i64 timestamp_sec
}

enum TripStatus {
  TS_NOT_SPECIFIED = 0,
  IN_PROGRESS = 1,
  FINISHED = 2,
}

struct TripEntity {
  1: string id
  2: Trip trip
}

struct Trip {
  1: i64 account_id
  2: string car_id
  3: LocationStatus start
  4: LocationStatus current
  5: LocationStatus end
  6: TripStatus status
  7: string identity_id
}

struct CreateTripRequest {
  1: Location start
  2: string car_id
  3: string avatar_url
  4: i64 account_id
}

struct CreateTripResponse{
     1: base.BaseResponse base_resp
     2: TripEntity trip_entity
}

struct GetTripRequest {
  1: string id
  2: i64 account_id
}

struct GetTripResponse{
     1: base.BaseResponse base_resp
     2: Trip trip
}

struct GetTripsRequest {
  1: TripStatus status
  2: i64 account_id
}

struct GetTripsResponse {
  1: base.BaseResponse base_resp
  2: list<TripEntity> trips
}

struct UpdateTripRequest {
  1: string id
  2: Location current
  3: bool end_trip
  4: i64 account_id
}

struct UpdateTripResponse{
     1: base.BaseResponse base_resp
     2: Trip trip
}

service TripService {
  CreateTripResponse CreateTrip(1: CreateTripRequest req)
  GetTripResponse GetTrip(1: GetTripRequest req)
  GetTripsResponse GetTrips (1: GetTripsRequest req)
  UpdateTripResponse UpdateTrip(1: UpdateTripRequest req)
}