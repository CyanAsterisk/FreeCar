namespace go base

struct CarEntity {
    1:  string id,
    2:  Car car,
}

enum CarStatus {
    CS_NOT_SPECIFIED = 0,
    LOCKED = 1,
    UNLOCKING = 2,
    UNLOCKED = 3,
    LOCKING = 4,
}

struct Driver {
    1:  string id,
    2:  string avatar_url,
}

struct Position {
    1:  double latitude,
    2:  double longitude,
}

struct Car {
    1:  CarStatus status,
    2:  Driver driver,
    3:  Position position,
    4:  string trip_id,
    5:  double power,
    6:  string plate_num,
}
