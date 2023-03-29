namespace go base

struct CarEntity {
    1: required string id,
    2: required Car car,
}

enum CarStatus {
    CS_NOT_SPECIFIED = 0,
    LOCKED = 1,
    UNLOCKING = 2,
    UNLOCKED = 3,
    LOCKING = 4,
}

struct Driver {
    1: required i64 id,
    2: required string avatar_url,
}

struct Position {
    1: required double latitude,
    2: required double longitude,
}

struct Car {
    1: required CarStatus status,
    2: required Driver driver,
    3: required Position position,
    4: required string trip_id,
    5: required double power,
    6: required string plate_num,
}
