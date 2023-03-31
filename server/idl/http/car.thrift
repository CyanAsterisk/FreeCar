namespace go car

include "../base/common.thrift"
include "../base/car.thrift"

struct AdminCreateCarRequest {
    1:  string plate_num (api.raw = "plate_num", api.vd = "len($) > 0 && len($) < 20>"),
}

struct AdminDeleteCarRequest {
    1:  string id (api.raw = "id", api.vd = "len($) > 0 && len($) < 20>"),
}

struct AdminUpdateCarRequest {
    1:  string id (api.raw = "id", api.vd = "len($) > 0 && len($) < 20>"),
    2:  car.Car car (api.raw = "car"),
}

struct AdminGetSomeCarsRequest {}

struct AdminGetAllCarsRequest {}

struct GetCarsRequest {}

struct GetCarRequest {
    1:  string id (api.raw = "id", api.vd = "len($) > 0 && len($) < 20>"),
}

service CarService {
    // for back-stage management
    common.NilResponse AdminCreateCar(1: AdminCreateCarRequest req) (api.post = "/admin/car"),
    common.NilResponse AdminDeleteCar(1: AdminDeleteCarRequest req) (api.delete = "/admin/car"),
    common.NilResponse AdminUpdateCar(1: AdminUpdateCarRequest req) (api.put = "/admin/car"),
    common.NilResponse AdminGetSomeCars(1: AdminGetSomeCarsRequest req) (api.get = "/admin/car/some"),
    common.NilResponse AdminGetAllCars(1: AdminGetAllCarsRequest req) (api.get = "/admin/car/all"),

    // for mini-program
    common.NilResponse GetCars(1: GetCarsRequest req) (api.get = "/cars"),
    common.NilResponse GetCar(1: GetCarRequest req) (api.get = "/car"),
}