namespace go car
include "base.thrift"

struct CarEntity{
    1: string id
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
    1: i64 id
    2: string avatar_url
}

struct Location{
    1: double latitude
    2: double longitude
}

struct Car{
    1: CarStatus status
    2: Driver driver
    3: Location position
    4: string trip_id
    5: double power
    6: string plate_num
}

struct CreateCarRequest{
     1: i64 account_id
     2: string plate_num
}

struct CreateCarResponse{
    1: base.BaseResponse base_resp
    2: CarEntity car_entity
}

struct GetCarRequest{
    1: i64 account_id
    2: string id
}

struct GetCarResponse{
    1: base.BaseResponse base_resp
    2: Car car
}

struct GetCarsRequest{
     1: i64 account_id
}

struct GetCarsResponse{
    1: base.BaseResponse base_resp
    2: list<CarEntity> cars
}

struct GetAllCarsRequest{
     1: i64 account_id
}

struct GetAllCarsResponse{
    1: base.BaseResponse base_resp
    2: list<CarEntity> cars
}

struct LockCarRequest{
    1: i64 account_id
    2: string id
}

struct LockCarResponse{
    1: base.BaseResponse base_resp
}

struct UnlockCarRequest{
    1: string id
    2: i64 account_id
    3: Driver driver
    4: string trip_id
}

struct UnlockCarResponse{
    1: base.BaseResponse base_resp
}

struct UpdateCarRequest{
    1: string id
    2: CarStatus status
    3: Location position
    4: i64 account_id
    5: double power
}

struct UpdateCarResponse{
    1: base.BaseResponse base_resp
}

struct AdminUpdateCarRequest{
    1: string id
    2: Car car
}

struct AdminUpdateCarResponse{
    1: base.BaseResponse base_resp
}


struct GetSomeCarsRequest{
   1: i64 account_id
}

struct GetSomeCarsResponse{
     1: base.BaseResponse base_resp
     2: list<CarEntity> cars
}

struct DeleteCarRequest{
     1: i64 account_id
     2: string id
}

struct DeleteCarResponse{
     1: base.BaseResponse base_resp
}

service CarService {
    // for back-stage management
    CreateCarResponse CreateCar (1:CreateCarRequest req)
    DeleteCarResponse  DeleteCar (1: DeleteCarRequest req)
    AdminUpdateCarResponse AdminUpdateCar (1: AdminUpdateCarRequest req)
    GetSomeCarsResponse GetSomeCars (1:GetSomeCarsRequest req)
    GetAllCarsResponse GetAllCars(1: GetAllCarsRequest req)

    // for mini-program
    GetCarsResponse GetCars(1: GetCarsRequest req)
    GetCarResponse GetCar(1: GetCarRequest req)

    // for trip service
    LockCarResponse LockCar (1:LockCarRequest req)
    UnlockCarResponse UnlockCar(1:UnlockCarRequest req)

    // for firmware in car
    UpdateCarResponse UpdateCar(1: UpdateCarRequest req)
}
