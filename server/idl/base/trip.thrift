namespace go base

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