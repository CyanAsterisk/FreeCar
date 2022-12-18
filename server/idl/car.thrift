namespace go car


struct CarEntity{
    1: i64 id;
    2: Car car

}

enum CarStatus{
    CS_NOT_SPECIFIED = 0,
    LOCKED = 1,
    UNLOCKING = 2,
    UNLOCKED = 3,
    LOCKING = 4
}


struct Driver{
    1: i64 id;
    2: string avatar_url;
}

struct Location{
    1: double latitude;
    2: double longtitude;
}

struct Car{
    1: CarStatus status;
    2: Driver drivar;
    3: Location position;
    4: i64 trip_id;
}

struct CreateCarRequest{}

struct GetCarRequest{
    1: i64 id;
}

struct GetCarsRequest{}

struct GetCarsResponse{
    1: list<CarEntity> cars;
}

struct LockCarRequest{
    1: i64 id;
}

struct LockCarResponse{}

struct UnlockCarRequest{
    1: i64 id;
    2: Driver driver;
    3: i64 trip_id;
}

struct UnlockCarResponse{}

struct UpdateCarRequest{
    1: i64 id
    2: CarStatus status
    3: Location position
}

struct UpdateCarResponse{}


service CarService {
    CarEntity CreateCar (1:CreateCarRequest req) (api.post="/v1/car")
    Car GetCar(1: GetCarRequest req) (api.get="/v1/car/{id}")
    GetCarsResponse GetCars(1: GetCarsRequest req)
    LockCarResponse LockCar (1:LockCarRequest req)
    UnlockCarResponse UnlockCar(1:UnlockCarRequest req)
    UpdateCarResponse UpdateCar(1: UpdateCarRequest req)
}
