namespace go car

include "../base/common.thrift"
include "../base/car.thrift"

struct AdminCreateCarRequest {
    1:  string plate_num (api.raw = "plate_num", api.vd = "len($) > 0 && len($) < 20>"),
}

struct AdminCreateCarResponse {
    1:  common.BaseResponse base_resp,
    2:  car.CarEntity car_entity,
}

struct AdminDeleteCarRequest {
    1:  string id (api.raw = "id", api.vd = "len($) > 0 && len($) < 20>"),
}

struct AdminDeleteCarResponse {
    1:  common.BaseResponse base_resp,
}

struct AdminUpdateCarRequest {
    1:  string id (api.raw = "id", api.vd = "len($) > 0 && len($) < 20>"),
    2:  car.Car car (api.raw = "car"),
}

struct AdminUpdateCarResponse {
    1:  common.BaseResponse base_resp,
}

struct AdminGetSomeCarsRequest {
}

struct AdminGetSomeCarsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<car.CarEntity> cars,
}

struct AdminGetAllCarsRequest {
}

struct AdminGetAllCarsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<car.CarEntity> cars,
}

struct GetCarsRequest {
}

struct GetCarsResponse {
    1:  common.BaseResponse base_resp,
    2:  list<car.CarEntity> cars,
}

struct GetCarRequest {
    1:  string id (api.raw = "id", api.vd = "len($) > 0 && len($) < 20>"),
}

struct GetCarResponse {
    1:  common.BaseResponse base_resp,
    2:  car.Car car,
}

service CarService {
    // for back-stage management
    AdminCreateCarResponse AdminCreateCar(1: AdminCreateCarRequest req) (api.post = "/admin/car"),
    AdminDeleteCarResponse AdminDeleteCar(1: AdminDeleteCarRequest req) (api.delete = "/admin/car"),
    AdminUpdateCarResponse AdminUpdateCar(1: AdminUpdateCarRequest req) (api.put = "/admin/car"),
    AdminGetSomeCarsResponse AdminGetSomeCars(1: AdminGetSomeCarsRequest req) (api.get = "/admin/car/some"),
    AdminGetAllCarsResponse AdminGetAllCars(1: AdminGetAllCarsRequest req) (api.get = "/admin/car/all"),

    // for mini-program
    GetCarsResponse GetCars(1: GetCarsRequest req) (api.get = "/cars"),
    GetCarResponse GetCar(1: GetCarRequest req) (api.get = "/car"),
}