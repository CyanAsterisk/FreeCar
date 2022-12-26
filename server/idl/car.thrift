namespace go car


struct CarEntity{
    1: string id;
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
    2: Driver driver;
    3: Location position;
    4: string trip_id;
}

struct CreateCarRequest{
     1: i64 account_id
}

struct GetCarRequest{
    1: i64 account_id
    2: string id;
}

struct GetCarsRequest{
     1: i64 account_id
}

struct GetCarsResponse{
    1: list<CarEntity> cars;
}

struct LockCarRequest{
    1: i64 account_id
    2: string id;
}

struct LockCarResponse{}

struct UnlockCarRequest{
    1: string id;
    2: i64 account_id
    3: Driver driver;
    4: string trip_id;
}

struct UnlockCarResponse{}

struct UpdateCarRequest{
    1: string id
    2: CarStatus status
    3: Location position
    4: i64 account_id
}

struct UpdateCarResponse{}


service CarService {
    CarEntity CreateCar (1:CreateCarRequest req) (api.post="/v1/car")
    Car GetCar(1: GetCarRequest req) (api.get="/v1/car")
    GetCarsResponse GetCars(1: GetCarsRequest req)
    LockCarResponse LockCar (1:LockCarRequest req)
    UnlockCarResponse UnlockCar(1:UnlockCarRequest req)
    UpdateCarResponse UpdateCar(1: UpdateCarRequest req)
}
