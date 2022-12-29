import * as $protobuf from "protobufjs";
/** Namespace api. */
export namespace api {

    /** Properties of a LoginRequest. */
    interface ILoginRequest {

        /** LoginRequest code */
        code?: (string|null);
    }

    /** Represents a LoginRequest. */
    class LoginRequest implements ILoginRequest {

        /**
         * Constructs a new LoginRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ILoginRequest);

        /** LoginRequest code. */
        public code: string;

        /**
         * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRequest
         */
        public static fromObject(object: { [k: string]: any }): api.LoginRequest;

        /**
         * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
         * @param message LoginRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.LoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginResponse. */
    interface ILoginResponse {

        /** LoginResponse token */
        token?: (string|null);

        /** LoginResponse expiredAt */
        expiredAt?: (number|null);
    }

    /** Represents a LoginResponse. */
    class LoginResponse implements ILoginResponse {

        /**
         * Constructs a new LoginResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ILoginResponse);

        /** LoginResponse token. */
        public token: string;

        /** LoginResponse expiredAt. */
        public expiredAt: number;

        /**
         * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginResponse
         */
        public static fromObject(object: { [k: string]: any }): api.LoginResponse;

        /**
         * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
         * @param message LoginResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.LoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ELoginResponse. */
    interface IELoginResponse {

        /** ELoginResponse code */
        code?: (number|null);

        /** ELoginResponse data */
        data?: (api.ILoginResponse|null);

        /** ELoginResponse message */
        message?: (string|null);
    }

    /** Represents a ELoginResponse. */
    class ELoginResponse implements IELoginResponse {

        /**
         * Constructs a new ELoginResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IELoginResponse);

        /** ELoginResponse code. */
        public code: number;

        /** ELoginResponse data. */
        public data?: (api.ILoginResponse|null);

        /** ELoginResponse message. */
        public message: string;

        /**
         * Creates a ELoginResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ELoginResponse
         */
        public static fromObject(object: { [k: string]: any }): api.ELoginResponse;

        /**
         * Creates a plain object from a ELoginResponse message. Also converts values to other types if specified.
         * @param message ELoginResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ELoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ELoginResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CarEntity. */
    interface ICarEntity {

        /** CarEntity id */
        id?: (string|null);

        /** CarEntity car */
        car?: (api.ICar|null);
    }

    /** Represents a CarEntity. */
    class CarEntity implements ICarEntity {

        /**
         * Constructs a new CarEntity.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICarEntity);

        /** CarEntity id. */
        public id: string;

        /** CarEntity car. */
        public car?: (api.ICar|null);

        /**
         * Creates a CarEntity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CarEntity
         */
        public static fromObject(object: { [k: string]: any }): api.CarEntity;

        /**
         * Creates a plain object from a CarEntity message. Also converts values to other types if specified.
         * @param message CarEntity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.CarEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CarEntity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ECarEntity. */
    interface IECarEntity {

        /** ECarEntity code */
        code?: (number|null);

        /** ECarEntity data */
        data?: (api.ICarEntity|null);

        /** ECarEntity message */
        message?: (string|null);
    }

    /** Represents a ECarEntity. */
    class ECarEntity implements IECarEntity {

        /**
         * Constructs a new ECarEntity.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IECarEntity);

        /** ECarEntity code. */
        public code: number;

        /** ECarEntity data. */
        public data?: (api.ICarEntity|null);

        /** ECarEntity message. */
        public message: string;

        /**
         * Creates a ECarEntity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ECarEntity
         */
        public static fromObject(object: { [k: string]: any }): api.ECarEntity;

        /**
         * Creates a plain object from a ECarEntity message. Also converts values to other types if specified.
         * @param message ECarEntity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ECarEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ECarEntity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** CarStatus enum. */
    enum CarStatus {
        CS_NOT_SPECIFIED = 0,
        LOCKED = 1,
        UNLOCKING = 2,
        UNLOCKED = 3,
        LOCKING = 4
    }

    /** Properties of a Driver. */
    interface IDriver {

        /** Driver id */
        id?: (string|null);

        /** Driver avatarUrl */
        avatarUrl?: (string|null);
    }

    /** Represents a Driver. */
    class Driver implements IDriver {

        /**
         * Constructs a new Driver.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDriver);

        /** Driver id. */
        public id: string;

        /** Driver avatarUrl. */
        public avatarUrl: string;

        /**
         * Creates a Driver message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Driver
         */
        public static fromObject(object: { [k: string]: any }): api.Driver;

        /**
         * Creates a plain object from a Driver message. Also converts values to other types if specified.
         * @param message Driver
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Driver, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Driver to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Location. */
    interface ILocation {

        /** Location latitude */
        latitude?: (number|null);

        /** Location longitude */
        longitude?: (number|null);
    }

    /** Represents a Location. */
    class Location implements ILocation {

        /**
         * Constructs a new Location.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ILocation);

        /** Location latitude. */
        public latitude: number;

        /** Location longitude. */
        public longitude: number;

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Location
         */
        public static fromObject(object: { [k: string]: any }): api.Location;

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @param message Location
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Location to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Car. */
    interface ICar {

        /** Car status */
        status?: (api.CarStatus|null);

        /** Car driver */
        driver?: (api.IDriver|null);

        /** Car position */
        position?: (api.ILocation|null);

        /** Car tripId */
        tripId?: (string|null);
    }

    /** Represents a Car. */
    class Car implements ICar {

        /**
         * Constructs a new Car.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICar);

        /** Car status. */
        public status: api.CarStatus;

        /** Car driver. */
        public driver?: (api.IDriver|null);

        /** Car position. */
        public position?: (api.ILocation|null);

        /** Car tripId. */
        public tripId: string;

        /**
         * Creates a Car message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Car
         */
        public static fromObject(object: { [k: string]: any }): api.Car;

        /**
         * Creates a plain object from a Car message. Also converts values to other types if specified.
         * @param message Car
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Car, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Car to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ECar. */
    interface IECar {

        /** ECar code */
        code?: (number|null);

        /** ECar data */
        data?: (api.ICar|null);

        /** ECar message */
        message?: (string|null);
    }

    /** Represents a ECar. */
    class ECar implements IECar {

        /**
         * Constructs a new ECar.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IECar);

        /** ECar code. */
        public code: number;

        /** ECar data. */
        public data?: (api.ICar|null);

        /** ECar message. */
        public message: string;

        /**
         * Creates a ECar message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ECar
         */
        public static fromObject(object: { [k: string]: any }): api.ECar;

        /**
         * Creates a plain object from a ECar message. Also converts values to other types if specified.
         * @param message ECar
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ECar, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ECar to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateCarRequest. */
    interface ICreateCarRequest {

        /** CreateCarRequest accountId */
        accountId?: (number|null);
    }

    /** Represents a CreateCarRequest. */
    class CreateCarRequest implements ICreateCarRequest {

        /**
         * Constructs a new CreateCarRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICreateCarRequest);

        /** CreateCarRequest accountId. */
        public accountId: number;

        /**
         * Creates a CreateCarRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateCarRequest
         */
        public static fromObject(object: { [k: string]: any }): api.CreateCarRequest;

        /**
         * Creates a plain object from a CreateCarRequest message. Also converts values to other types if specified.
         * @param message CreateCarRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.CreateCarRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateCarRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetCarRequest. */
    interface IGetCarRequest {

        /** GetCarRequest id */
        id?: (string|null);
    }

    /** Represents a GetCarRequest. */
    class GetCarRequest implements IGetCarRequest {

        /**
         * Constructs a new GetCarRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IGetCarRequest);

        /** GetCarRequest id. */
        public id: string;

        /**
         * Creates a GetCarRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetCarRequest
         */
        public static fromObject(object: { [k: string]: any }): api.GetCarRequest;

        /**
         * Creates a plain object from a GetCarRequest message. Also converts values to other types if specified.
         * @param message GetCarRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.GetCarRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetCarRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LocationStatus. */
    interface ILocationStatus {

        /** LocationStatus location */
        location?: (api.ILocation|null);

        /** LocationStatus feeCent */
        feeCent?: (number|null);

        /** LocationStatus kmDriven */
        kmDriven?: (number|null);

        /** LocationStatus poiName */
        poiName?: (string|null);

        /** LocationStatus timestampSec */
        timestampSec?: (number|null);
    }

    /** Represents a LocationStatus. */
    class LocationStatus implements ILocationStatus {

        /**
         * Constructs a new LocationStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ILocationStatus);

        /** LocationStatus location. */
        public location?: (api.ILocation|null);

        /** LocationStatus feeCent. */
        public feeCent: number;

        /** LocationStatus kmDriven. */
        public kmDriven: number;

        /** LocationStatus poiName. */
        public poiName: string;

        /** LocationStatus timestampSec. */
        public timestampSec: number;

        /**
         * Creates a LocationStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LocationStatus
         */
        public static fromObject(object: { [k: string]: any }): api.LocationStatus;

        /**
         * Creates a plain object from a LocationStatus message. Also converts values to other types if specified.
         * @param message LocationStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.LocationStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LocationStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** TripStatus enum. */
    enum TripStatus {
        TS_NOT_SPECIFIED = 0,
        IN_PROGRESS = 1,
        FINISHED = 2
    }

    /** Properties of a TripEntity. */
    interface ITripEntity {

        /** TripEntity id */
        id?: (string|null);

        /** TripEntity trip */
        trip?: (api.ITrip|null);
    }

    /** Represents a TripEntity. */
    class TripEntity implements ITripEntity {

        /**
         * Constructs a new TripEntity.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ITripEntity);

        /** TripEntity id. */
        public id: string;

        /** TripEntity trip. */
        public trip?: (api.ITrip|null);

        /**
         * Creates a TripEntity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TripEntity
         */
        public static fromObject(object: { [k: string]: any }): api.TripEntity;

        /**
         * Creates a plain object from a TripEntity message. Also converts values to other types if specified.
         * @param message TripEntity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.TripEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TripEntity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ETripEntity. */
    interface IETripEntity {

        /** ETripEntity code */
        code?: (number|null);

        /** ETripEntity data */
        data?: (api.ITripEntity|null);

        /** ETripEntity message */
        message?: (string|null);
    }

    /** Represents a ETripEntity. */
    class ETripEntity implements IETripEntity {

        /**
         * Constructs a new ETripEntity.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IETripEntity);

        /** ETripEntity code. */
        public code: number;

        /** ETripEntity data. */
        public data?: (api.ITripEntity|null);

        /** ETripEntity message. */
        public message: string;

        /**
         * Creates a ETripEntity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ETripEntity
         */
        public static fromObject(object: { [k: string]: any }): api.ETripEntity;

        /**
         * Creates a plain object from a ETripEntity message. Also converts values to other types if specified.
         * @param message ETripEntity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ETripEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ETripEntity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Trip. */
    interface ITrip {

        /** Trip accountId */
        accountId?: (number|null);

        /** Trip carId */
        carId?: (string|null);

        /** Trip start */
        start?: (api.ILocationStatus|null);

        /** Trip current */
        current?: (api.ILocationStatus|null);

        /** Trip end */
        end?: (api.ILocationStatus|null);

        /** Trip status */
        status?: (api.TripStatus|null);

        /** Trip identityId */
        identityId?: (string|null);
    }

    /** Represents a Trip. */
    class Trip implements ITrip {

        /**
         * Constructs a new Trip.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ITrip);

        /** Trip accountId. */
        public accountId: number;

        /** Trip carId. */
        public carId: string;

        /** Trip start. */
        public start?: (api.ILocationStatus|null);

        /** Trip current. */
        public current?: (api.ILocationStatus|null);

        /** Trip end. */
        public end?: (api.ILocationStatus|null);

        /** Trip status. */
        public status: api.TripStatus;

        /** Trip identityId. */
        public identityId: string;

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Trip
         */
        public static fromObject(object: { [k: string]: any }): api.Trip;

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @param message Trip
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Trip, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Trip to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ETrip. */
    interface IETrip {

        /** ETrip code */
        code?: (number|null);

        /** ETrip data */
        data?: (api.ITrip|null);

        /** ETrip message */
        message?: (string|null);
    }

    /** Represents a ETrip. */
    class ETrip implements IETrip {

        /**
         * Constructs a new ETrip.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IETrip);

        /** ETrip code. */
        public code: number;

        /** ETrip data. */
        public data?: (api.ITrip|null);

        /** ETrip message. */
        public message: string;

        /**
         * Creates a ETrip message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ETrip
         */
        public static fromObject(object: { [k: string]: any }): api.ETrip;

        /**
         * Creates a plain object from a ETrip message. Also converts values to other types if specified.
         * @param message ETrip
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ETrip, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ETrip to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateTripRequest. */
    interface ICreateTripRequest {

        /** CreateTripRequest start */
        start?: (api.ILocation|null);

        /** CreateTripRequest carId */
        carId?: (string|null);

        /** CreateTripRequest avatarUrl */
        avatarUrl?: (string|null);
    }

    /** Represents a CreateTripRequest. */
    class CreateTripRequest implements ICreateTripRequest {

        /**
         * Constructs a new CreateTripRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICreateTripRequest);

        /** CreateTripRequest start. */
        public start?: (api.ILocation|null);

        /** CreateTripRequest carId. */
        public carId: string;

        /** CreateTripRequest avatarUrl. */
        public avatarUrl: string;

        /**
         * Creates a CreateTripRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateTripRequest
         */
        public static fromObject(object: { [k: string]: any }): api.CreateTripRequest;

        /**
         * Creates a plain object from a CreateTripRequest message. Also converts values to other types if specified.
         * @param message CreateTripRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.CreateTripRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateTripRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetTripRequest. */
    interface IGetTripRequest {

        /** GetTripRequest id */
        id?: (string|null);
    }

    /** Represents a GetTripRequest. */
    class GetTripRequest implements IGetTripRequest {

        /**
         * Constructs a new GetTripRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IGetTripRequest);

        /** GetTripRequest id. */
        public id: string;

        /**
         * Creates a GetTripRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetTripRequest
         */
        public static fromObject(object: { [k: string]: any }): api.GetTripRequest;

        /**
         * Creates a plain object from a GetTripRequest message. Also converts values to other types if specified.
         * @param message GetTripRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.GetTripRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetTripRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetTripsRequest. */
    interface IGetTripsRequest {

        /** GetTripsRequest status */
        status?: (api.TripStatus|null);
    }

    /** Represents a GetTripsRequest. */
    class GetTripsRequest implements IGetTripsRequest {

        /**
         * Constructs a new GetTripsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IGetTripsRequest);

        /** GetTripsRequest status. */
        public status: api.TripStatus;

        /**
         * Creates a GetTripsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetTripsRequest
         */
        public static fromObject(object: { [k: string]: any }): api.GetTripsRequest;

        /**
         * Creates a plain object from a GetTripsRequest message. Also converts values to other types if specified.
         * @param message GetTripsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.GetTripsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetTripsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetTripsResponse. */
    interface IGetTripsResponse {

        /** GetTripsResponse trips */
        trips?: (api.ITripEntity[]|null);
    }

    /** Represents a GetTripsResponse. */
    class GetTripsResponse implements IGetTripsResponse {

        /**
         * Constructs a new GetTripsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IGetTripsResponse);

        /** GetTripsResponse trips. */
        public trips: api.ITripEntity[];

        /**
         * Creates a GetTripsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetTripsResponse
         */
        public static fromObject(object: { [k: string]: any }): api.GetTripsResponse;

        /**
         * Creates a plain object from a GetTripsResponse message. Also converts values to other types if specified.
         * @param message GetTripsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.GetTripsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetTripsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a EGetTripsResponse. */
    interface IEGetTripsResponse {

        /** EGetTripsResponse code */
        code?: (number|null);

        /** EGetTripsResponse data */
        data?: (api.IGetTripsResponse|null);

        /** EGetTripsResponse message */
        message?: (string|null);
    }

    /** Represents a EGetTripsResponse. */
    class EGetTripsResponse implements IEGetTripsResponse {

        /**
         * Constructs a new EGetTripsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IEGetTripsResponse);

        /** EGetTripsResponse code. */
        public code: number;

        /** EGetTripsResponse data. */
        public data?: (api.IGetTripsResponse|null);

        /** EGetTripsResponse message. */
        public message: string;

        /**
         * Creates a EGetTripsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EGetTripsResponse
         */
        public static fromObject(object: { [k: string]: any }): api.EGetTripsResponse;

        /**
         * Creates a plain object from a EGetTripsResponse message. Also converts values to other types if specified.
         * @param message EGetTripsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.EGetTripsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EGetTripsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpdateTripRequest. */
    interface IUpdateTripRequest {

        /** UpdateTripRequest id */
        id?: (string|null);

        /** UpdateTripRequest current */
        current?: (api.ILocation|null);

        /** UpdateTripRequest endTrip */
        endTrip?: (boolean|null);
    }

    /** Represents an UpdateTripRequest. */
    class UpdateTripRequest implements IUpdateTripRequest {

        /**
         * Constructs a new UpdateTripRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IUpdateTripRequest);

        /** UpdateTripRequest id. */
        public id: string;

        /** UpdateTripRequest current. */
        public current?: (api.ILocation|null);

        /** UpdateTripRequest endTrip. */
        public endTrip: boolean;

        /**
         * Creates an UpdateTripRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateTripRequest
         */
        public static fromObject(object: { [k: string]: any }): api.UpdateTripRequest;

        /**
         * Creates a plain object from an UpdateTripRequest message. Also converts values to other types if specified.
         * @param message UpdateTripRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.UpdateTripRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateTripRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Gender enum. */
    enum Gender {
        G_NOT_SPECIFIED = 0,
        MALE = 1,
        FEMALE = 2
    }

    /** IdentityStatus enum. */
    enum IdentityStatus {
        UNSUBMITTED = 0,
        PENDING = 1,
        VERIFIED = 2
    }

    /** Properties of a Profile. */
    interface IProfile {

        /** Profile identity */
        identity?: (api.IIdentity|null);

        /** Profile identityStatus */
        identityStatus?: (api.IdentityStatus|null);
    }

    /** Represents a Profile. */
    class Profile implements IProfile {

        /**
         * Constructs a new Profile.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IProfile);

        /** Profile identity. */
        public identity?: (api.IIdentity|null);

        /** Profile identityStatus. */
        public identityStatus: api.IdentityStatus;

        /**
         * Creates a Profile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Profile
         */
        public static fromObject(object: { [k: string]: any }): api.Profile;

        /**
         * Creates a plain object from a Profile message. Also converts values to other types if specified.
         * @param message Profile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Profile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Profile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a EProfile. */
    interface IEProfile {

        /** EProfile code */
        code?: (number|null);

        /** EProfile data */
        data?: (api.IProfile|null);

        /** EProfile message */
        message?: (string|null);
    }

    /** Represents a EProfile. */
    class EProfile implements IEProfile {

        /**
         * Constructs a new EProfile.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IEProfile);

        /** EProfile code. */
        public code: number;

        /** EProfile data. */
        public data?: (api.IProfile|null);

        /** EProfile message. */
        public message: string;

        /**
         * Creates a EProfile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EProfile
         */
        public static fromObject(object: { [k: string]: any }): api.EProfile;

        /**
         * Creates a plain object from a EProfile message. Also converts values to other types if specified.
         * @param message EProfile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.EProfile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EProfile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Identity. */
    interface IIdentity {

        /** Identity licNumber */
        licNumber?: (string|null);

        /** Identity name */
        name?: (string|null);

        /** Identity gender */
        gender?: (api.Gender|null);

        /** Identity birthDateMillis */
        birthDateMillis?: (number|null);
    }

    /** Represents an Identity. */
    class Identity implements IIdentity {

        /**
         * Constructs a new Identity.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentity);

        /** Identity licNumber. */
        public licNumber: string;

        /** Identity name. */
        public name: string;

        /** Identity gender. */
        public gender: api.Gender;

        /** Identity birthDateMillis. */
        public birthDateMillis: number;

        /**
         * Creates an Identity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Identity
         */
        public static fromObject(object: { [k: string]: any }): api.Identity;

        /**
         * Creates a plain object from an Identity message. Also converts values to other types if specified.
         * @param message Identity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Identity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Identity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a EIdentity. */
    interface IEIdentity {

        /** EIdentity code */
        code?: (number|null);

        /** EIdentity data */
        data?: (api.IIdentity|null);

        /** EIdentity message */
        message?: (string|null);
    }

    /** Represents a EIdentity. */
    class EIdentity implements IEIdentity {

        /**
         * Constructs a new EIdentity.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IEIdentity);

        /** EIdentity code. */
        public code: number;

        /** EIdentity data. */
        public data?: (api.IIdentity|null);

        /** EIdentity message. */
        public message: string;

        /**
         * Creates a EIdentity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EIdentity
         */
        public static fromObject(object: { [k: string]: any }): api.EIdentity;

        /**
         * Creates a plain object from a EIdentity message. Also converts values to other types if specified.
         * @param message EIdentity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.EIdentity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EIdentity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetProfileRequest. */
    interface IGetProfileRequest {
    }

    /** Represents a GetProfileRequest. */
    class GetProfileRequest implements IGetProfileRequest {

        /**
         * Constructs a new GetProfileRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IGetProfileRequest);

        /**
         * Creates a GetProfileRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetProfileRequest
         */
        public static fromObject(object: { [k: string]: any }): api.GetProfileRequest;

        /**
         * Creates a plain object from a GetProfileRequest message. Also converts values to other types if specified.
         * @param message GetProfileRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.GetProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetProfileRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SubmitProfileRequest. */
    interface ISubmitProfileRequest {

        /** SubmitProfileRequest identity */
        identity?: (api.IIdentity|null);
    }

    /** Represents a SubmitProfileRequest. */
    class SubmitProfileRequest implements ISubmitProfileRequest {

        /**
         * Constructs a new SubmitProfileRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISubmitProfileRequest);

        /** SubmitProfileRequest identity. */
        public identity?: (api.IIdentity|null);

        /**
         * Creates a SubmitProfileRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SubmitProfileRequest
         */
        public static fromObject(object: { [k: string]: any }): api.SubmitProfileRequest;

        /**
         * Creates a plain object from a SubmitProfileRequest message. Also converts values to other types if specified.
         * @param message SubmitProfileRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SubmitProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubmitProfileRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClearProfileRequest. */
    interface IClearProfileRequest {
    }

    /** Represents a ClearProfileRequest. */
    class ClearProfileRequest implements IClearProfileRequest {

        /**
         * Constructs a new ClearProfileRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IClearProfileRequest);

        /**
         * Creates a ClearProfileRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClearProfileRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ClearProfileRequest;

        /**
         * Creates a plain object from a ClearProfileRequest message. Also converts values to other types if specified.
         * @param message ClearProfileRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ClearProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClearProfileRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetProfilePhotoRequest. */
    interface IGetProfilePhotoRequest {
    }

    /** Represents a GetProfilePhotoRequest. */
    class GetProfilePhotoRequest implements IGetProfilePhotoRequest {

        /**
         * Constructs a new GetProfilePhotoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IGetProfilePhotoRequest);

        /**
         * Creates a GetProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetProfilePhotoRequest
         */
        public static fromObject(object: { [k: string]: any }): api.GetProfilePhotoRequest;

        /**
         * Creates a plain object from a GetProfilePhotoRequest message. Also converts values to other types if specified.
         * @param message GetProfilePhotoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.GetProfilePhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetProfilePhotoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetProfilePhotoResponse. */
    interface IGetProfilePhotoResponse {

        /** GetProfilePhotoResponse url */
        url?: (string|null);
    }

    /** Represents a GetProfilePhotoResponse. */
    class GetProfilePhotoResponse implements IGetProfilePhotoResponse {

        /**
         * Constructs a new GetProfilePhotoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IGetProfilePhotoResponse);

        /** GetProfilePhotoResponse url. */
        public url: string;

        /**
         * Creates a GetProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetProfilePhotoResponse
         */
        public static fromObject(object: { [k: string]: any }): api.GetProfilePhotoResponse;

        /**
         * Creates a plain object from a GetProfilePhotoResponse message. Also converts values to other types if specified.
         * @param message GetProfilePhotoResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.GetProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetProfilePhotoResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a EGetProfilePhotoResponse. */
    interface IEGetProfilePhotoResponse {

        /** EGetProfilePhotoResponse code */
        code?: (number|null);

        /** EGetProfilePhotoResponse data */
        data?: (api.IGetProfilePhotoResponse|null);

        /** EGetProfilePhotoResponse message */
        message?: (string|null);
    }

    /** Represents a EGetProfilePhotoResponse. */
    class EGetProfilePhotoResponse implements IEGetProfilePhotoResponse {

        /**
         * Constructs a new EGetProfilePhotoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IEGetProfilePhotoResponse);

        /** EGetProfilePhotoResponse code. */
        public code: number;

        /** EGetProfilePhotoResponse data. */
        public data?: (api.IGetProfilePhotoResponse|null);

        /** EGetProfilePhotoResponse message. */
        public message: string;

        /**
         * Creates a EGetProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EGetProfilePhotoResponse
         */
        public static fromObject(object: { [k: string]: any }): api.EGetProfilePhotoResponse;

        /**
         * Creates a plain object from a EGetProfilePhotoResponse message. Also converts values to other types if specified.
         * @param message EGetProfilePhotoResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.EGetProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EGetProfilePhotoResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateProfilePhotoRequest. */
    interface ICreateProfilePhotoRequest {
    }

    /** Represents a CreateProfilePhotoRequest. */
    class CreateProfilePhotoRequest implements ICreateProfilePhotoRequest {

        /**
         * Constructs a new CreateProfilePhotoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICreateProfilePhotoRequest);

        /**
         * Creates a CreateProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateProfilePhotoRequest
         */
        public static fromObject(object: { [k: string]: any }): api.CreateProfilePhotoRequest;

        /**
         * Creates a plain object from a CreateProfilePhotoRequest message. Also converts values to other types if specified.
         * @param message CreateProfilePhotoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.CreateProfilePhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateProfilePhotoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateProfilePhotoResponse. */
    interface ICreateProfilePhotoResponse {

        /** CreateProfilePhotoResponse uploadUrl */
        uploadUrl?: (string|null);
    }

    /** Represents a CreateProfilePhotoResponse. */
    class CreateProfilePhotoResponse implements ICreateProfilePhotoResponse {

        /**
         * Constructs a new CreateProfilePhotoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICreateProfilePhotoResponse);

        /** CreateProfilePhotoResponse uploadUrl. */
        public uploadUrl: string;

        /**
         * Creates a CreateProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateProfilePhotoResponse
         */
        public static fromObject(object: { [k: string]: any }): api.CreateProfilePhotoResponse;

        /**
         * Creates a plain object from a CreateProfilePhotoResponse message. Also converts values to other types if specified.
         * @param message CreateProfilePhotoResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.CreateProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateProfilePhotoResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ECreateProfilePhotoResponse. */
    interface IECreateProfilePhotoResponse {

        /** ECreateProfilePhotoResponse code */
        code?: (number|null);

        /** ECreateProfilePhotoResponse data */
        data?: (api.ICreateProfilePhotoResponse|null);

        /** ECreateProfilePhotoResponse message */
        message?: (string|null);
    }

    /** Represents a ECreateProfilePhotoResponse. */
    class ECreateProfilePhotoResponse implements IECreateProfilePhotoResponse {

        /**
         * Constructs a new ECreateProfilePhotoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IECreateProfilePhotoResponse);

        /** ECreateProfilePhotoResponse code. */
        public code: number;

        /** ECreateProfilePhotoResponse data. */
        public data?: (api.ICreateProfilePhotoResponse|null);

        /** ECreateProfilePhotoResponse message. */
        public message: string;

        /**
         * Creates a ECreateProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ECreateProfilePhotoResponse
         */
        public static fromObject(object: { [k: string]: any }): api.ECreateProfilePhotoResponse;

        /**
         * Creates a plain object from a ECreateProfilePhotoResponse message. Also converts values to other types if specified.
         * @param message ECreateProfilePhotoResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ECreateProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ECreateProfilePhotoResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CompleteProfilePhotoRequest. */
    interface ICompleteProfilePhotoRequest {
    }

    /** Represents a CompleteProfilePhotoRequest. */
    class CompleteProfilePhotoRequest implements ICompleteProfilePhotoRequest {

        /**
         * Constructs a new CompleteProfilePhotoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICompleteProfilePhotoRequest);

        /**
         * Creates a CompleteProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CompleteProfilePhotoRequest
         */
        public static fromObject(object: { [k: string]: any }): api.CompleteProfilePhotoRequest;

        /**
         * Creates a plain object from a CompleteProfilePhotoRequest message. Also converts values to other types if specified.
         * @param message CompleteProfilePhotoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.CompleteProfilePhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CompleteProfilePhotoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClearProfilePhotoRequest. */
    interface IClearProfilePhotoRequest {
    }

    /** Represents a ClearProfilePhotoRequest. */
    class ClearProfilePhotoRequest implements IClearProfilePhotoRequest {

        /**
         * Constructs a new ClearProfilePhotoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IClearProfilePhotoRequest);

        /**
         * Creates a ClearProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClearProfilePhotoRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ClearProfilePhotoRequest;

        /**
         * Creates a plain object from a ClearProfilePhotoRequest message. Also converts values to other types if specified.
         * @param message ClearProfilePhotoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ClearProfilePhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClearProfilePhotoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClearProfilePhotoResponse. */
    interface IClearProfilePhotoResponse {
    }

    /** Represents a ClearProfilePhotoResponse. */
    class ClearProfilePhotoResponse implements IClearProfilePhotoResponse {

        /**
         * Constructs a new ClearProfilePhotoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IClearProfilePhotoResponse);

        /**
         * Creates a ClearProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClearProfilePhotoResponse
         */
        public static fromObject(object: { [k: string]: any }): api.ClearProfilePhotoResponse;

        /**
         * Creates a plain object from a ClearProfilePhotoResponse message. Also converts values to other types if specified.
         * @param message ClearProfilePhotoResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ClearProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClearProfilePhotoResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a EClearProfilePhotoResponse. */
    interface IEClearProfilePhotoResponse {

        /** EClearProfilePhotoResponse code */
        code?: (number|null);

        /** EClearProfilePhotoResponse data */
        data?: (api.IClearProfilePhotoResponse|null);

        /** EClearProfilePhotoResponse message */
        message?: (string|null);
    }

    /** Represents a EClearProfilePhotoResponse. */
    class EClearProfilePhotoResponse implements IEClearProfilePhotoResponse {

        /**
         * Constructs a new EClearProfilePhotoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IEClearProfilePhotoResponse);

        /** EClearProfilePhotoResponse code. */
        public code: number;

        /** EClearProfilePhotoResponse data. */
        public data?: (api.IClearProfilePhotoResponse|null);

        /** EClearProfilePhotoResponse message. */
        public message: string;

        /**
         * Creates a EClearProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EClearProfilePhotoResponse
         */
        public static fromObject(object: { [k: string]: any }): api.EClearProfilePhotoResponse;

        /**
         * Creates a plain object from a EClearProfilePhotoResponse message. Also converts values to other types if specified.
         * @param message EClearProfilePhotoResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.EClearProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EClearProfilePhotoResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents an apiService */
    class apiService extends $protobuf.rpc.Service {

        /**
         * Constructs a new apiService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls Login.
         * @param request LoginRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and LoginResponse
         */
        public login(request: api.ILoginRequest, callback: api.apiService.LoginCallback): void;

        /**
         * Calls Login.
         * @param request LoginRequest message or plain object
         * @returns Promise
         */
        public login(request: api.ILoginRequest): Promise<api.LoginResponse>;

        /**
         * Calls CreateCar.
         * @param request CreateCarRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and CarEntity
         */
        public createCar(request: api.ICreateCarRequest, callback: api.apiService.CreateCarCallback): void;

        /**
         * Calls CreateCar.
         * @param request CreateCarRequest message or plain object
         * @returns Promise
         */
        public createCar(request: api.ICreateCarRequest): Promise<api.CarEntity>;

        /**
         * Calls GetCar.
         * @param request GetCarRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Car
         */
        public getCar(request: api.IGetCarRequest, callback: api.apiService.GetCarCallback): void;

        /**
         * Calls GetCar.
         * @param request GetCarRequest message or plain object
         * @returns Promise
         */
        public getCar(request: api.IGetCarRequest): Promise<api.Car>;

        /**
         * Calls GetProfile.
         * @param request GetProfileRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Profile
         */
        public getProfile(request: api.IGetProfileRequest, callback: api.apiService.GetProfileCallback): void;

        /**
         * Calls GetProfile.
         * @param request GetProfileRequest message or plain object
         * @returns Promise
         */
        public getProfile(request: api.IGetProfileRequest): Promise<api.Profile>;

        /**
         * Calls SubmitProfile.
         * @param request SubmitProfileRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Profile
         */
        public submitProfile(request: api.ISubmitProfileRequest, callback: api.apiService.SubmitProfileCallback): void;

        /**
         * Calls SubmitProfile.
         * @param request SubmitProfileRequest message or plain object
         * @returns Promise
         */
        public submitProfile(request: api.ISubmitProfileRequest): Promise<api.Profile>;

        /**
         * Calls ClearProfile.
         * @param request ClearProfileRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Profile
         */
        public clearProfile(request: api.IClearProfileRequest, callback: api.apiService.ClearProfileCallback): void;

        /**
         * Calls ClearProfile.
         * @param request ClearProfileRequest message or plain object
         * @returns Promise
         */
        public clearProfile(request: api.IClearProfileRequest): Promise<api.Profile>;

        /**
         * Calls GetProfilePhoto.
         * @param request GetProfilePhotoRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and GetProfilePhotoResponse
         */
        public getProfilePhoto(request: api.IGetProfilePhotoRequest, callback: api.apiService.GetProfilePhotoCallback): void;

        /**
         * Calls GetProfilePhoto.
         * @param request GetProfilePhotoRequest message or plain object
         * @returns Promise
         */
        public getProfilePhoto(request: api.IGetProfilePhotoRequest): Promise<api.GetProfilePhotoResponse>;

        /**
         * Calls CreateProfilePhoto.
         * @param request CreateProfilePhotoRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and CreateProfilePhotoResponse
         */
        public createProfilePhoto(request: api.ICreateProfilePhotoRequest, callback: api.apiService.CreateProfilePhotoCallback): void;

        /**
         * Calls CreateProfilePhoto.
         * @param request CreateProfilePhotoRequest message or plain object
         * @returns Promise
         */
        public createProfilePhoto(request: api.ICreateProfilePhotoRequest): Promise<api.CreateProfilePhotoResponse>;

        /**
         * Calls CompleteProfilePhoto.
         * @param request CompleteProfilePhotoRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Identity
         */
        public completeProfilePhoto(request: api.ICompleteProfilePhotoRequest, callback: api.apiService.CompleteProfilePhotoCallback): void;

        /**
         * Calls CompleteProfilePhoto.
         * @param request CompleteProfilePhotoRequest message or plain object
         * @returns Promise
         */
        public completeProfilePhoto(request: api.ICompleteProfilePhotoRequest): Promise<api.Identity>;

        /**
         * Calls ClearProfilePhoto.
         * @param request ClearProfilePhotoRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ClearProfilePhotoResponse
         */
        public clearProfilePhoto(request: api.IClearProfilePhotoRequest, callback: api.apiService.ClearProfilePhotoCallback): void;

        /**
         * Calls ClearProfilePhoto.
         * @param request ClearProfilePhotoRequest message or plain object
         * @returns Promise
         */
        public clearProfilePhoto(request: api.IClearProfilePhotoRequest): Promise<api.ClearProfilePhotoResponse>;

        /**
         * Calls CreateTrip.
         * @param request CreateTripRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and TripEntity
         */
        public createTrip(request: api.ICreateTripRequest, callback: api.apiService.CreateTripCallback): void;

        /**
         * Calls CreateTrip.
         * @param request CreateTripRequest message or plain object
         * @returns Promise
         */
        public createTrip(request: api.ICreateTripRequest): Promise<api.TripEntity>;

        /**
         * Calls GetTrip.
         * @param request GetTripRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Trip
         */
        public getTrip(request: api.IGetTripRequest, callback: api.apiService.GetTripCallback): void;

        /**
         * Calls GetTrip.
         * @param request GetTripRequest message or plain object
         * @returns Promise
         */
        public getTrip(request: api.IGetTripRequest): Promise<api.Trip>;

        /**
         * Calls GetTrips.
         * @param request GetTripsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and GetTripsResponse
         */
        public getTrips(request: api.IGetTripsRequest, callback: api.apiService.GetTripsCallback): void;

        /**
         * Calls GetTrips.
         * @param request GetTripsRequest message or plain object
         * @returns Promise
         */
        public getTrips(request: api.IGetTripsRequest): Promise<api.GetTripsResponse>;

        /**
         * Calls UpdateTrip.
         * @param request UpdateTripRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Trip
         */
        public updateTrip(request: api.IUpdateTripRequest, callback: api.apiService.UpdateTripCallback): void;

        /**
         * Calls UpdateTrip.
         * @param request UpdateTripRequest message or plain object
         * @returns Promise
         */
        public updateTrip(request: api.IUpdateTripRequest): Promise<api.Trip>;
    }

    namespace apiService {

        /**
         * Callback as used by {@link api.apiService#login}.
         * @param error Error, if any
         * @param [response] LoginResponse
         */
        type LoginCallback = (error: (Error|null), response?: api.LoginResponse) => void;

        /**
         * Callback as used by {@link api.apiService#createCar}.
         * @param error Error, if any
         * @param [response] CarEntity
         */
        type CreateCarCallback = (error: (Error|null), response?: api.CarEntity) => void;

        /**
         * Callback as used by {@link api.apiService#getCar}.
         * @param error Error, if any
         * @param [response] Car
         */
        type GetCarCallback = (error: (Error|null), response?: api.Car) => void;

        /**
         * Callback as used by {@link api.apiService#getProfile}.
         * @param error Error, if any
         * @param [response] Profile
         */
        type GetProfileCallback = (error: (Error|null), response?: api.Profile) => void;

        /**
         * Callback as used by {@link api.apiService#submitProfile}.
         * @param error Error, if any
         * @param [response] Profile
         */
        type SubmitProfileCallback = (error: (Error|null), response?: api.Profile) => void;

        /**
         * Callback as used by {@link api.apiService#clearProfile}.
         * @param error Error, if any
         * @param [response] Profile
         */
        type ClearProfileCallback = (error: (Error|null), response?: api.Profile) => void;

        /**
         * Callback as used by {@link api.apiService#getProfilePhoto}.
         * @param error Error, if any
         * @param [response] GetProfilePhotoResponse
         */
        type GetProfilePhotoCallback = (error: (Error|null), response?: api.GetProfilePhotoResponse) => void;

        /**
         * Callback as used by {@link api.apiService#createProfilePhoto}.
         * @param error Error, if any
         * @param [response] CreateProfilePhotoResponse
         */
        type CreateProfilePhotoCallback = (error: (Error|null), response?: api.CreateProfilePhotoResponse) => void;

        /**
         * Callback as used by {@link api.apiService#completeProfilePhoto}.
         * @param error Error, if any
         * @param [response] Identity
         */
        type CompleteProfilePhotoCallback = (error: (Error|null), response?: api.Identity) => void;

        /**
         * Callback as used by {@link api.apiService#clearProfilePhoto}.
         * @param error Error, if any
         * @param [response] ClearProfilePhotoResponse
         */
        type ClearProfilePhotoCallback = (error: (Error|null), response?: api.ClearProfilePhotoResponse) => void;

        /**
         * Callback as used by {@link api.apiService#createTrip}.
         * @param error Error, if any
         * @param [response] TripEntity
         */
        type CreateTripCallback = (error: (Error|null), response?: api.TripEntity) => void;

        /**
         * Callback as used by {@link api.apiService#getTrip}.
         * @param error Error, if any
         * @param [response] Trip
         */
        type GetTripCallback = (error: (Error|null), response?: api.Trip) => void;

        /**
         * Callback as used by {@link api.apiService#getTrips}.
         * @param error Error, if any
         * @param [response] GetTripsResponse
         */
        type GetTripsCallback = (error: (Error|null), response?: api.GetTripsResponse) => void;

        /**
         * Callback as used by {@link api.apiService#updateTrip}.
         * @param error Error, if any
         * @param [response] Trip
         */
        type UpdateTripCallback = (error: (Error|null), response?: api.Trip) => void;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a FileDescriptorSet. */
        interface IFileDescriptorSet {

            /** FileDescriptorSet file */
            file?: (google.protobuf.IFileDescriptorProto[]|null);
        }

        /** Represents a FileDescriptorSet. */
        class FileDescriptorSet implements IFileDescriptorSet {

            /**
             * Constructs a new FileDescriptorSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorSet);

            /** FileDescriptorSet file. */
            public file: google.protobuf.IFileDescriptorProto[];

            /**
             * Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorSet
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;

            /**
             * Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.
             * @param message FileDescriptorSet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorSet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileDescriptorProto. */
        interface IFileDescriptorProto {

            /** FileDescriptorProto name */
            name?: (string|null);

            /** FileDescriptorProto package */
            "package"?: (string|null);

            /** FileDescriptorProto dependency */
            dependency?: (string[]|null);

            /** FileDescriptorProto publicDependency */
            publicDependency?: (number[]|null);

            /** FileDescriptorProto weakDependency */
            weakDependency?: (number[]|null);

            /** FileDescriptorProto messageType */
            messageType?: (google.protobuf.IDescriptorProto[]|null);

            /** FileDescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** FileDescriptorProto service */
            service?: (google.protobuf.IServiceDescriptorProto[]|null);

            /** FileDescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** FileDescriptorProto options */
            options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo */
            sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax */
            syntax?: (string|null);
        }

        /** Represents a FileDescriptorProto. */
        class FileDescriptorProto implements IFileDescriptorProto {

            /**
             * Constructs a new FileDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorProto);

            /** FileDescriptorProto name. */
            public name: string;

            /** FileDescriptorProto package. */
            public package: string;

            /** FileDescriptorProto dependency. */
            public dependency: string[];

            /** FileDescriptorProto publicDependency. */
            public publicDependency: number[];

            /** FileDescriptorProto weakDependency. */
            public weakDependency: number[];

            /** FileDescriptorProto messageType. */
            public messageType: google.protobuf.IDescriptorProto[];

            /** FileDescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** FileDescriptorProto service. */
            public service: google.protobuf.IServiceDescriptorProto[];

            /** FileDescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** FileDescriptorProto options. */
            public options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo. */
            public sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax. */
            public syntax: string;

            /**
             * Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;

            /**
             * Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.
             * @param message FileDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DescriptorProto. */
        interface IDescriptorProto {

            /** DescriptorProto name */
            name?: (string|null);

            /** DescriptorProto field */
            field?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto nestedType */
            nestedType?: (google.protobuf.IDescriptorProto[]|null);

            /** DescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** DescriptorProto extensionRange */
            extensionRange?: (google.protobuf.DescriptorProto.IExtensionRange[]|null);

            /** DescriptorProto oneofDecl */
            oneofDecl?: (google.protobuf.IOneofDescriptorProto[]|null);

            /** DescriptorProto options */
            options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange */
            reservedRange?: (google.protobuf.DescriptorProto.IReservedRange[]|null);

            /** DescriptorProto reservedName */
            reservedName?: (string[]|null);
        }

        /** Represents a DescriptorProto. */
        class DescriptorProto implements IDescriptorProto {

            /**
             * Constructs a new DescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDescriptorProto);

            /** DescriptorProto name. */
            public name: string;

            /** DescriptorProto field. */
            public field: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto nestedType. */
            public nestedType: google.protobuf.IDescriptorProto[];

            /** DescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** DescriptorProto extensionRange. */
            public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];

            /** DescriptorProto oneofDecl. */
            public oneofDecl: google.protobuf.IOneofDescriptorProto[];

            /** DescriptorProto options. */
            public options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange. */
            public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];

            /** DescriptorProto reservedName. */
            public reservedName: string[];

            /**
             * Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;

            /**
             * Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.
             * @param message DescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace DescriptorProto {

            /** Properties of an ExtensionRange. */
            interface IExtensionRange {

                /** ExtensionRange start */
                start?: (number|null);

                /** ExtensionRange end */
                end?: (number|null);
            }

            /** Represents an ExtensionRange. */
            class ExtensionRange implements IExtensionRange {

                /**
                 * Constructs a new ExtensionRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);

                /** ExtensionRange start. */
                public start: number;

                /** ExtensionRange end. */
                public end: number;

                /**
                 * Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ExtensionRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.
                 * @param message ExtensionRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ExtensionRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReservedRange. */
            interface IReservedRange {

                /** ReservedRange start */
                start?: (number|null);

                /** ReservedRange end */
                end?: (number|null);
            }

            /** Represents a ReservedRange. */
            class ReservedRange implements IReservedRange {

                /**
                 * Constructs a new ReservedRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);

                /** ReservedRange start. */
                public start: number;

                /** ReservedRange end. */
                public end: number;

                /**
                 * Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReservedRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Creates a plain object from a ReservedRange message. Also converts values to other types if specified.
                 * @param message ReservedRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReservedRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a FieldDescriptorProto. */
        interface IFieldDescriptorProto {

            /** FieldDescriptorProto name */
            name?: (string|null);

            /** FieldDescriptorProto number */
            number?: (number|null);

            /** FieldDescriptorProto label */
            label?: (google.protobuf.FieldDescriptorProto.Label|null);

            /** FieldDescriptorProto type */
            type?: (google.protobuf.FieldDescriptorProto.Type|null);

            /** FieldDescriptorProto typeName */
            typeName?: (string|null);

            /** FieldDescriptorProto extendee */
            extendee?: (string|null);

            /** FieldDescriptorProto defaultValue */
            defaultValue?: (string|null);

            /** FieldDescriptorProto oneofIndex */
            oneofIndex?: (number|null);

            /** FieldDescriptorProto jsonName */
            jsonName?: (string|null);

            /** FieldDescriptorProto options */
            options?: (google.protobuf.IFieldOptions|null);
        }

        /** Represents a FieldDescriptorProto. */
        class FieldDescriptorProto implements IFieldDescriptorProto {

            /**
             * Constructs a new FieldDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldDescriptorProto);

            /** FieldDescriptorProto name. */
            public name: string;

            /** FieldDescriptorProto number. */
            public number: number;

            /** FieldDescriptorProto label. */
            public label: google.protobuf.FieldDescriptorProto.Label;

            /** FieldDescriptorProto type. */
            public type: google.protobuf.FieldDescriptorProto.Type;

            /** FieldDescriptorProto typeName. */
            public typeName: string;

            /** FieldDescriptorProto extendee. */
            public extendee: string;

            /** FieldDescriptorProto defaultValue. */
            public defaultValue: string;

            /** FieldDescriptorProto oneofIndex. */
            public oneofIndex: number;

            /** FieldDescriptorProto jsonName. */
            public jsonName: string;

            /** FieldDescriptorProto options. */
            public options?: (google.protobuf.IFieldOptions|null);

            /**
             * Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;

            /**
             * Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.
             * @param message FieldDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldDescriptorProto {

            /** Type enum. */
            enum Type {
                TYPE_DOUBLE = 1,
                TYPE_FLOAT = 2,
                TYPE_INT64 = 3,
                TYPE_UINT64 = 4,
                TYPE_INT32 = 5,
                TYPE_FIXED64 = 6,
                TYPE_FIXED32 = 7,
                TYPE_BOOL = 8,
                TYPE_STRING = 9,
                TYPE_GROUP = 10,
                TYPE_MESSAGE = 11,
                TYPE_BYTES = 12,
                TYPE_UINT32 = 13,
                TYPE_ENUM = 14,
                TYPE_SFIXED32 = 15,
                TYPE_SFIXED64 = 16,
                TYPE_SINT32 = 17,
                TYPE_SINT64 = 18
            }

            /** Label enum. */
            enum Label {
                LABEL_OPTIONAL = 1,
                LABEL_REQUIRED = 2,
                LABEL_REPEATED = 3
            }
        }

        /** Properties of an OneofDescriptorProto. */
        interface IOneofDescriptorProto {

            /** OneofDescriptorProto name */
            name?: (string|null);

            /** OneofDescriptorProto options */
            options?: (google.protobuf.IOneofOptions|null);
        }

        /** Represents an OneofDescriptorProto. */
        class OneofDescriptorProto implements IOneofDescriptorProto {

            /**
             * Constructs a new OneofDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofDescriptorProto);

            /** OneofDescriptorProto name. */
            public name: string;

            /** OneofDescriptorProto options. */
            public options?: (google.protobuf.IOneofOptions|null);

            /**
             * Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;

            /**
             * Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.
             * @param message OneofDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumDescriptorProto. */
        interface IEnumDescriptorProto {

            /** EnumDescriptorProto name */
            name?: (string|null);

            /** EnumDescriptorProto value */
            value?: (google.protobuf.IEnumValueDescriptorProto[]|null);

            /** EnumDescriptorProto options */
            options?: (google.protobuf.IEnumOptions|null);
        }

        /** Represents an EnumDescriptorProto. */
        class EnumDescriptorProto implements IEnumDescriptorProto {

            /**
             * Constructs a new EnumDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumDescriptorProto);

            /** EnumDescriptorProto name. */
            public name: string;

            /** EnumDescriptorProto value. */
            public value: google.protobuf.IEnumValueDescriptorProto[];

            /** EnumDescriptorProto options. */
            public options?: (google.protobuf.IEnumOptions|null);

            /**
             * Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;

            /**
             * Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueDescriptorProto. */
        interface IEnumValueDescriptorProto {

            /** EnumValueDescriptorProto name */
            name?: (string|null);

            /** EnumValueDescriptorProto number */
            number?: (number|null);

            /** EnumValueDescriptorProto options */
            options?: (google.protobuf.IEnumValueOptions|null);
        }

        /** Represents an EnumValueDescriptorProto. */
        class EnumValueDescriptorProto implements IEnumValueDescriptorProto {

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueDescriptorProto);

            /** EnumValueDescriptorProto name. */
            public name: string;

            /** EnumValueDescriptorProto number. */
            public number: number;

            /** EnumValueDescriptorProto options. */
            public options?: (google.protobuf.IEnumValueOptions|null);

            /**
             * Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;

            /**
             * Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumValueDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceDescriptorProto. */
        interface IServiceDescriptorProto {

            /** ServiceDescriptorProto name */
            name?: (string|null);

            /** ServiceDescriptorProto method */
            method?: (google.protobuf.IMethodDescriptorProto[]|null);

            /** ServiceDescriptorProto options */
            options?: (google.protobuf.IServiceOptions|null);
        }

        /** Represents a ServiceDescriptorProto. */
        class ServiceDescriptorProto implements IServiceDescriptorProto {

            /**
             * Constructs a new ServiceDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceDescriptorProto);

            /** ServiceDescriptorProto name. */
            public name: string;

            /** ServiceDescriptorProto method. */
            public method: google.protobuf.IMethodDescriptorProto[];

            /** ServiceDescriptorProto options. */
            public options?: (google.protobuf.IServiceOptions|null);

            /**
             * Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;

            /**
             * Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.
             * @param message ServiceDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodDescriptorProto. */
        interface IMethodDescriptorProto {

            /** MethodDescriptorProto name */
            name?: (string|null);

            /** MethodDescriptorProto inputType */
            inputType?: (string|null);

            /** MethodDescriptorProto outputType */
            outputType?: (string|null);

            /** MethodDescriptorProto options */
            options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming */
            clientStreaming?: (boolean|null);

            /** MethodDescriptorProto serverStreaming */
            serverStreaming?: (boolean|null);
        }

        /** Represents a MethodDescriptorProto. */
        class MethodDescriptorProto implements IMethodDescriptorProto {

            /**
             * Constructs a new MethodDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodDescriptorProto);

            /** MethodDescriptorProto name. */
            public name: string;

            /** MethodDescriptorProto inputType. */
            public inputType: string;

            /** MethodDescriptorProto outputType. */
            public outputType: string;

            /** MethodDescriptorProto options. */
            public options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming. */
            public clientStreaming: boolean;

            /** MethodDescriptorProto serverStreaming. */
            public serverStreaming: boolean;

            /**
             * Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;

            /**
             * Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.
             * @param message MethodDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileOptions. */
        interface IFileOptions {

            /** FileOptions javaPackage */
            javaPackage?: (string|null);

            /** FileOptions javaOuterClassname */
            javaOuterClassname?: (string|null);

            /** FileOptions javaMultipleFiles */
            javaMultipleFiles?: (boolean|null);

            /** FileOptions javaGenerateEqualsAndHash */
            javaGenerateEqualsAndHash?: (boolean|null);

            /** FileOptions javaStringCheckUtf8 */
            javaStringCheckUtf8?: (boolean|null);

            /** FileOptions optimizeFor */
            optimizeFor?: (google.protobuf.FileOptions.OptimizeMode|null);

            /** FileOptions goPackage */
            goPackage?: (string|null);

            /** FileOptions ccGenericServices */
            ccGenericServices?: (boolean|null);

            /** FileOptions javaGenericServices */
            javaGenericServices?: (boolean|null);

            /** FileOptions pyGenericServices */
            pyGenericServices?: (boolean|null);

            /** FileOptions deprecated */
            deprecated?: (boolean|null);

            /** FileOptions ccEnableArenas */
            ccEnableArenas?: (boolean|null);

            /** FileOptions objcClassPrefix */
            objcClassPrefix?: (string|null);

            /** FileOptions csharpNamespace */
            csharpNamespace?: (string|null);

            /** FileOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a FileOptions. */
        class FileOptions implements IFileOptions {

            /**
             * Constructs a new FileOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileOptions);

            /** FileOptions javaPackage. */
            public javaPackage: string;

            /** FileOptions javaOuterClassname. */
            public javaOuterClassname: string;

            /** FileOptions javaMultipleFiles. */
            public javaMultipleFiles: boolean;

            /** FileOptions javaGenerateEqualsAndHash. */
            public javaGenerateEqualsAndHash: boolean;

            /** FileOptions javaStringCheckUtf8. */
            public javaStringCheckUtf8: boolean;

            /** FileOptions optimizeFor. */
            public optimizeFor: google.protobuf.FileOptions.OptimizeMode;

            /** FileOptions goPackage. */
            public goPackage: string;

            /** FileOptions ccGenericServices. */
            public ccGenericServices: boolean;

            /** FileOptions javaGenericServices. */
            public javaGenericServices: boolean;

            /** FileOptions pyGenericServices. */
            public pyGenericServices: boolean;

            /** FileOptions deprecated. */
            public deprecated: boolean;

            /** FileOptions ccEnableArenas. */
            public ccEnableArenas: boolean;

            /** FileOptions objcClassPrefix. */
            public objcClassPrefix: string;

            /** FileOptions csharpNamespace. */
            public csharpNamespace: string;

            /** FileOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a FileOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;

            /**
             * Creates a plain object from a FileOptions message. Also converts values to other types if specified.
             * @param message FileOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FileOptions {

            /** OptimizeMode enum. */
            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        /** Properties of a MessageOptions. */
        interface IMessageOptions {

            /** MessageOptions messageSetWireFormat */
            messageSetWireFormat?: (boolean|null);

            /** MessageOptions noStandardDescriptorAccessor */
            noStandardDescriptorAccessor?: (boolean|null);

            /** MessageOptions deprecated */
            deprecated?: (boolean|null);

            /** MessageOptions mapEntry */
            mapEntry?: (boolean|null);

            /** MessageOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a MessageOptions. */
        class MessageOptions implements IMessageOptions {

            /**
             * Constructs a new MessageOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMessageOptions);

            /** MessageOptions messageSetWireFormat. */
            public messageSetWireFormat: boolean;

            /** MessageOptions noStandardDescriptorAccessor. */
            public noStandardDescriptorAccessor: boolean;

            /** MessageOptions deprecated. */
            public deprecated: boolean;

            /** MessageOptions mapEntry. */
            public mapEntry: boolean;

            /** MessageOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MessageOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;

            /**
             * Creates a plain object from a MessageOptions message. Also converts values to other types if specified.
             * @param message MessageOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MessageOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FieldOptions. */
        interface IFieldOptions {

            /** FieldOptions ctype */
            ctype?: (google.protobuf.FieldOptions.CType|null);

            /** FieldOptions packed */
            packed?: (boolean|null);

            /** FieldOptions jstype */
            jstype?: (google.protobuf.FieldOptions.JSType|null);

            /** FieldOptions lazy */
            lazy?: (boolean|null);

            /** FieldOptions deprecated */
            deprecated?: (boolean|null);

            /** FieldOptions weak */
            weak?: (boolean|null);

            /** FieldOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** FieldOptions .api.rawBody */
            ".api.rawBody"?: (string|null);

            /** FieldOptions .api.query */
            ".api.query"?: (string|null);

            /** FieldOptions .api.header */
            ".api.header"?: (string|null);

            /** FieldOptions .api.cookie */
            ".api.cookie"?: (string|null);

            /** FieldOptions .api.body */
            ".api.body"?: (string|null);

            /** FieldOptions .api.path */
            ".api.path"?: (string|null);

            /** FieldOptions .api.vd */
            ".api.vd"?: (string|null);

            /** FieldOptions .api.form */
            ".api.form"?: (string|null);

            /** FieldOptions .api.goTag */
            ".api.goTag"?: (string|null);

            /** FieldOptions .api.jsConv */
            ".api.jsConv"?: (string|null);
        }

        /** Represents a FieldOptions. */
        class FieldOptions implements IFieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldOptions);

            /** FieldOptions ctype. */
            public ctype: google.protobuf.FieldOptions.CType;

            /** FieldOptions packed. */
            public packed: boolean;

            /** FieldOptions jstype. */
            public jstype: google.protobuf.FieldOptions.JSType;

            /** FieldOptions lazy. */
            public lazy: boolean;

            /** FieldOptions deprecated. */
            public deprecated: boolean;

            /** FieldOptions weak. */
            public weak: boolean;

            /** FieldOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;

            /**
             * Creates a plain object from a FieldOptions message. Also converts values to other types if specified.
             * @param message FieldOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldOptions {

            /** CType enum. */
            enum CType {
                STRING = 0,
                CORD = 1,
                STRING_PIECE = 2
            }

            /** JSType enum. */
            enum JSType {
                JS_NORMAL = 0,
                JS_STRING = 1,
                JS_NUMBER = 2
            }
        }

        /** Properties of an OneofOptions. */
        interface IOneofOptions {

            /** OneofOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an OneofOptions. */
        class OneofOptions implements IOneofOptions {

            /**
             * Constructs a new OneofOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofOptions);

            /** OneofOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;

            /**
             * Creates a plain object from an OneofOptions message. Also converts values to other types if specified.
             * @param message OneofOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumOptions. */
        interface IEnumOptions {

            /** EnumOptions allowAlias */
            allowAlias?: (boolean|null);

            /** EnumOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumOptions. */
        class EnumOptions implements IEnumOptions {

            /**
             * Constructs a new EnumOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumOptions);

            /** EnumOptions allowAlias. */
            public allowAlias: boolean;

            /** EnumOptions deprecated. */
            public deprecated: boolean;

            /** EnumOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;

            /**
             * Creates a plain object from an EnumOptions message. Also converts values to other types if specified.
             * @param message EnumOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueOptions. */
        interface IEnumValueOptions {

            /** EnumValueOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumValueOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** EnumValueOptions .api.httpCode */
            ".api.httpCode"?: (number|null);
        }

        /** Represents an EnumValueOptions. */
        class EnumValueOptions implements IEnumValueOptions {

            /**
             * Constructs a new EnumValueOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueOptions);

            /** EnumValueOptions deprecated. */
            public deprecated: boolean;

            /** EnumValueOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;

            /**
             * Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.
             * @param message EnumValueOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceOptions. */
        interface IServiceOptions {

            /** ServiceOptions deprecated */
            deprecated?: (boolean|null);

            /** ServiceOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a ServiceOptions. */
        class ServiceOptions implements IServiceOptions {

            /**
             * Constructs a new ServiceOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceOptions);

            /** ServiceOptions deprecated. */
            public deprecated: boolean;

            /** ServiceOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;

            /**
             * Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.
             * @param message ServiceOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodOptions. */
        interface IMethodOptions {

            /** MethodOptions deprecated */
            deprecated?: (boolean|null);

            /** MethodOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** MethodOptions .api.get */
            ".api.get"?: (string|null);

            /** MethodOptions .api.post */
            ".api.post"?: (string|null);

            /** MethodOptions .api.put */
            ".api.put"?: (string|null);

            /** MethodOptions .api.delete */
            ".api.delete"?: (string|null);

            /** MethodOptions .api.patch */
            ".api.patch"?: (string|null);

            /** MethodOptions .api.options */
            ".api.options"?: (string|null);

            /** MethodOptions .api.head */
            ".api.head"?: (string|null);

            /** MethodOptions .api.any */
            ".api.any"?: (string|null);

            /** MethodOptions .api.genPath */
            ".api.genPath"?: (string|null);

            /** MethodOptions .api.apiVersion */
            ".api.apiVersion"?: (string|null);

            /** MethodOptions .api.tag */
            ".api.tag"?: (string|null);

            /** MethodOptions .api.name */
            ".api.name"?: (string|null);

            /** MethodOptions .api.apiLevel */
            ".api.apiLevel"?: (string|null);

            /** MethodOptions .api.serializer */
            ".api.serializer"?: (string|null);

            /** MethodOptions .api.param */
            ".api.param"?: (string|null);

            /** MethodOptions .api.baseurl */
            ".api.baseurl"?: (string|null);
        }

        /** Represents a MethodOptions. */
        class MethodOptions implements IMethodOptions {

            /**
             * Constructs a new MethodOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodOptions);

            /** MethodOptions deprecated. */
            public deprecated: boolean;

            /** MethodOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;

            /**
             * Creates a plain object from a MethodOptions message. Also converts values to other types if specified.
             * @param message MethodOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UninterpretedOption. */
        interface IUninterpretedOption {

            /** UninterpretedOption name */
            name?: (google.protobuf.UninterpretedOption.INamePart[]|null);

            /** UninterpretedOption identifierValue */
            identifierValue?: (string|null);

            /** UninterpretedOption positiveIntValue */
            positiveIntValue?: (number|null);

            /** UninterpretedOption negativeIntValue */
            negativeIntValue?: (number|null);

            /** UninterpretedOption doubleValue */
            doubleValue?: (number|null);

            /** UninterpretedOption stringValue */
            stringValue?: (Uint8Array|null);

            /** UninterpretedOption aggregateValue */
            aggregateValue?: (string|null);
        }

        /** Represents an UninterpretedOption. */
        class UninterpretedOption implements IUninterpretedOption {

            /**
             * Constructs a new UninterpretedOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUninterpretedOption);

            /** UninterpretedOption name. */
            public name: google.protobuf.UninterpretedOption.INamePart[];

            /** UninterpretedOption identifierValue. */
            public identifierValue: string;

            /** UninterpretedOption positiveIntValue. */
            public positiveIntValue: number;

            /** UninterpretedOption negativeIntValue. */
            public negativeIntValue: number;

            /** UninterpretedOption doubleValue. */
            public doubleValue: number;

            /** UninterpretedOption stringValue. */
            public stringValue: Uint8Array;

            /** UninterpretedOption aggregateValue. */
            public aggregateValue: string;

            /**
             * Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UninterpretedOption
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;

            /**
             * Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.
             * @param message UninterpretedOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UninterpretedOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace UninterpretedOption {

            /** Properties of a NamePart. */
            interface INamePart {

                /** NamePart namePart */
                namePart: string;

                /** NamePart isExtension */
                isExtension: boolean;
            }

            /** Represents a NamePart. */
            class NamePart implements INamePart {

                /**
                 * Constructs a new NamePart.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.UninterpretedOption.INamePart);

                /** NamePart namePart. */
                public namePart: string;

                /** NamePart isExtension. */
                public isExtension: boolean;

                /**
                 * Creates a NamePart message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NamePart
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Creates a plain object from a NamePart message. Also converts values to other types if specified.
                 * @param message NamePart
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NamePart to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a SourceCodeInfo. */
        interface ISourceCodeInfo {

            /** SourceCodeInfo location */
            location?: (google.protobuf.SourceCodeInfo.ILocation[]|null);
        }

        /** Represents a SourceCodeInfo. */
        class SourceCodeInfo implements ISourceCodeInfo {

            /**
             * Constructs a new SourceCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ISourceCodeInfo);

            /** SourceCodeInfo location. */
            public location: google.protobuf.SourceCodeInfo.ILocation[];

            /**
             * Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SourceCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;

            /**
             * Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.
             * @param message SourceCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SourceCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace SourceCodeInfo {

            /** Properties of a Location. */
            interface ILocation {

                /** Location path */
                path?: (number[]|null);

                /** Location span */
                span?: (number[]|null);

                /** Location leadingComments */
                leadingComments?: (string|null);

                /** Location trailingComments */
                trailingComments?: (string|null);

                /** Location leadingDetachedComments */
                leadingDetachedComments?: (string[]|null);
            }

            /** Represents a Location. */
            class Location implements ILocation {

                /**
                 * Constructs a new Location.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);

                /** Location path. */
                public path: number[];

                /** Location span. */
                public span: number[];

                /** Location leadingComments. */
                public leadingComments: string;

                /** Location trailingComments. */
                public trailingComments: string;

                /** Location leadingDetachedComments. */
                public leadingDetachedComments: string[];

                /**
                 * Creates a Location message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Location
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @param message Location
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Location to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a GeneratedCodeInfo. */
        interface IGeneratedCodeInfo {

            /** GeneratedCodeInfo annotation */
            annotation?: (google.protobuf.GeneratedCodeInfo.IAnnotation[]|null);
        }

        /** Represents a GeneratedCodeInfo. */
        class GeneratedCodeInfo implements IGeneratedCodeInfo {

            /**
             * Constructs a new GeneratedCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IGeneratedCodeInfo);

            /** GeneratedCodeInfo annotation. */
            public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];

            /**
             * Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GeneratedCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;

            /**
             * Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.
             * @param message GeneratedCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GeneratedCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace GeneratedCodeInfo {

            /** Properties of an Annotation. */
            interface IAnnotation {

                /** Annotation path */
                path?: (number[]|null);

                /** Annotation sourceFile */
                sourceFile?: (string|null);

                /** Annotation begin */
                begin?: (number|null);

                /** Annotation end */
                end?: (number|null);
            }

            /** Represents an Annotation. */
            class Annotation implements IAnnotation {

                /**
                 * Constructs a new Annotation.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);

                /** Annotation path. */
                public path: number[];

                /** Annotation sourceFile. */
                public sourceFile: string;

                /** Annotation begin. */
                public begin: number;

                /** Annotation end. */
                public end: number;

                /**
                 * Creates an Annotation message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Annotation
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Creates a plain object from an Annotation message. Also converts values to other types if specified.
                 * @param message Annotation
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Annotation to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
