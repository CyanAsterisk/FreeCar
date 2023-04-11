namespace go base

// Trip Service
struct Location {
    1:  double latitude,
    2:  double longitude,
}

struct LocationStatus {
    1:  Location location,
    2:  i32 fee_cent,
    3:  double km_driven,
    4:  string poi_name,
    5:  i64 timestamp_sec,
}

enum TripStatus {
    TS_NOT_SPECIFIED = 0,
    IN_PROGRESS = 1,
    FINISHED = 2,
}

struct TripEntity {
    1:  string id,
    2:  Trip trip,
}

struct Trip {
    1:  string account_id,
    2:  string car_id,
    3:  LocationStatus start,
    4:  LocationStatus current,
    5:  LocationStatus end,
    6:  TripStatus status,
    7:  string identity_id,
}