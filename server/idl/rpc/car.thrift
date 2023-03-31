namespace go car

include "../base/common.thrift"
include "../base/car.thrift"

struct CreateCarRequest {
    1:  i64 account_id,
    2:  string plate_num,
}

struct CreateCarResponse {
    1:  common.BaseResponse base_resp,
    2:  car.CarEntity car_entity,
}

struct GetCarRequest {
    1:  i64 account_id,
    2:  string id,
}

struct GetCarResponse {
    1:  common.BaseResponse base_resp,
    2:  car.Car car,
}

struct GetCarsRequest {
    1:  i64 account_id,
}

struct GetCarsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<car.CarEntity> cars,
}

struct GetAllCarsRequest {
    1:  i64 account_id,
}

struct GetAllCarsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<car.CarEntity> cars,
}

struct LockCarRequest {
    1:  i64 account_id,
    2:  string id,
}

struct LockCarResponse {
    1:  common.BaseResponse base_resp,
}

struct UnlockCarRequest {
    1:  string id,
    2:  i64 account_id,
    3:  car.Driver driver,
    4:  string trip_id,
}

struct UnlockCarResponse {
    1:  common.BaseResponse base_resp,
}

struct UpdateCarRequest {
    1:  string id,
    2:  car.CarStatus status,
    3:  car.Position position,
    4:  i64 account_id,
    5:  double power,
}

struct UpdateCarResponse {
    1:  common.BaseResponse base_resp,
}

struct AdminUpdateCarRequest {
    1:  string id,
    2:  car.Car car,
}

struct AdminUpdateCarResponse {
    1:  common.BaseResponse base_resp,
}

struct GetSomeCarsRequest {
    1:  i64 account_id,
}

struct GetSomeCarsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<car.CarEntity> cars,
}

struct DeleteCarRequest {
    1:  i64 account_id,
    2:  string id,
}

struct DeleteCarResponse {
    1:  common.BaseResponse base_resp,
}

service CarService {
    // for back-stage management
    CreateCarResponse CreateCar(1: CreateCarRequest req),
    DeleteCarResponse DeleteCar(1: DeleteCarRequest req),
    AdminUpdateCarResponse AdminUpdateCar(1: AdminUpdateCarRequest req),
    GetSomeCarsResponse GetSomeCars(1: GetSomeCarsRequest req),
    GetAllCarsResponse GetAllCars(1: GetAllCarsRequest req),
    // for mini-program
    GetCarsResponse GetCars(1: GetCarsRequest req),
    GetCarResponse GetCar(1: GetCarRequest req),
    // for trip service
    LockCarResponse LockCar(1: LockCarRequest req),
    UnlockCarResponse UnlockCar(1: UnlockCarRequest req),
    // for firmware in car
    UpdateCarResponse UpdateCar(1: UpdateCarRequest req),
}