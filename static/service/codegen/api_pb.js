import * as $protobuf from "protobufjs";
// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const api = $root.api = (() => {

    /**
     * Namespace api.
     * @exports api
     * @namespace
     */
    const api = {};

    api.LoginRequest = (function() {

        /**
         * Properties of a LoginRequest.
         * @memberof api
         * @interface ILoginRequest
         * @property {string|null} [code] LoginRequest code
         */

        /**
         * Constructs a new LoginRequest.
         * @memberof api
         * @classdesc Represents a LoginRequest.
         * @implements ILoginRequest
         * @constructor
         * @param {api.ILoginRequest=} [properties] Properties to set
         */
        function LoginRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginRequest code.
         * @member {string} code
         * @memberof api.LoginRequest
         * @instance
         */
        LoginRequest.prototype.code = "";

        /**
         * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.LoginRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.LoginRequest} LoginRequest
         */
        LoginRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.LoginRequest)
                return object;
            let message = new $root.api.LoginRequest();
            if (object.code != null)
                message.code = String(object.code);
            return message;
        };

        /**
         * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.LoginRequest
         * @static
         * @param {api.LoginRequest} message LoginRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.code = "";
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            return object;
        };

        /**
         * Converts this LoginRequest to JSON.
         * @function toJSON
         * @memberof api.LoginRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginRequest;
    })();

    api.LoginResponse = (function() {

        /**
         * Properties of a LoginResponse.
         * @memberof api
         * @interface ILoginResponse
         * @property {string|null} [token] LoginResponse token
         * @property {number|null} [expiredAt] LoginResponse expiredAt
         */

        /**
         * Constructs a new LoginResponse.
         * @memberof api
         * @classdesc Represents a LoginResponse.
         * @implements ILoginResponse
         * @constructor
         * @param {api.ILoginResponse=} [properties] Properties to set
         */
        function LoginResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginResponse token.
         * @member {string} token
         * @memberof api.LoginResponse
         * @instance
         */
        LoginResponse.prototype.token = "";

        /**
         * LoginResponse expiredAt.
         * @member {number} expiredAt
         * @memberof api.LoginResponse
         * @instance
         */
        LoginResponse.prototype.expiredAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.LoginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.LoginResponse} LoginResponse
         */
        LoginResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.LoginResponse)
                return object;
            let message = new $root.api.LoginResponse();
            if (object.token != null)
                message.token = String(object.token);
            if (object.expiredAt != null)
                if ($util.Long)
                    (message.expiredAt = $util.Long.fromValue(object.expiredAt)).unsigned = false;
                else if (typeof object.expiredAt === "string")
                    message.expiredAt = parseInt(object.expiredAt, 10);
                else if (typeof object.expiredAt === "number")
                    message.expiredAt = object.expiredAt;
                else if (typeof object.expiredAt === "object")
                    message.expiredAt = new $util.LongBits(object.expiredAt.low >>> 0, object.expiredAt.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.LoginResponse
         * @static
         * @param {api.LoginResponse} message LoginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.token = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiredAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.expiredAt = options.longs === String ? "0" : 0;
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.expiredAt != null && message.hasOwnProperty("expiredAt"))
                if (typeof message.expiredAt === "number")
                    object.expiredAt = options.longs === String ? String(message.expiredAt) : message.expiredAt;
                else
                    object.expiredAt = options.longs === String ? $util.Long.prototype.toString.call(message.expiredAt) : options.longs === Number ? new $util.LongBits(message.expiredAt.low >>> 0, message.expiredAt.high >>> 0).toNumber() : message.expiredAt;
            return object;
        };

        /**
         * Converts this LoginResponse to JSON.
         * @function toJSON
         * @memberof api.LoginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginResponse;
    })();

    api.ELoginResponse = (function() {

        /**
         * Properties of a ELoginResponse.
         * @memberof api
         * @interface IELoginResponse
         * @property {number|null} [code] ELoginResponse code
         * @property {api.ILoginResponse|null} [data] ELoginResponse data
         * @property {string|null} [message] ELoginResponse message
         */

        /**
         * Constructs a new ELoginResponse.
         * @memberof api
         * @classdesc Represents a ELoginResponse.
         * @implements IELoginResponse
         * @constructor
         * @param {api.IELoginResponse=} [properties] Properties to set
         */
        function ELoginResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ELoginResponse code.
         * @member {number} code
         * @memberof api.ELoginResponse
         * @instance
         */
        ELoginResponse.prototype.code = 0;

        /**
         * ELoginResponse data.
         * @member {api.ILoginResponse|null|undefined} data
         * @memberof api.ELoginResponse
         * @instance
         */
        ELoginResponse.prototype.data = null;

        /**
         * ELoginResponse message.
         * @member {string} message
         * @memberof api.ELoginResponse
         * @instance
         */
        ELoginResponse.prototype.message = "";

        /**
         * Creates a ELoginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ELoginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ELoginResponse} ELoginResponse
         */
        ELoginResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ELoginResponse)
                return object;
            let message = new $root.api.ELoginResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.ELoginResponse.data: object expected");
                message.data = $root.api.LoginResponse.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a ELoginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ELoginResponse
         * @static
         * @param {api.ELoginResponse} message ELoginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ELoginResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.LoginResponse.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ELoginResponse to JSON.
         * @function toJSON
         * @memberof api.ELoginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ELoginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ELoginResponse;
    })();

    api.CarEntity = (function() {

        /**
         * Properties of a CarEntity.
         * @memberof api
         * @interface ICarEntity
         * @property {string|null} [id] CarEntity id
         * @property {api.ICar|null} [car] CarEntity car
         */

        /**
         * Constructs a new CarEntity.
         * @memberof api
         * @classdesc Represents a CarEntity.
         * @implements ICarEntity
         * @constructor
         * @param {api.ICarEntity=} [properties] Properties to set
         */
        function CarEntity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CarEntity id.
         * @member {string} id
         * @memberof api.CarEntity
         * @instance
         */
        CarEntity.prototype.id = "";

        /**
         * CarEntity car.
         * @member {api.ICar|null|undefined} car
         * @memberof api.CarEntity
         * @instance
         */
        CarEntity.prototype.car = null;

        /**
         * Creates a CarEntity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.CarEntity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.CarEntity} CarEntity
         */
        CarEntity.fromObject = function fromObject(object) {
            if (object instanceof $root.api.CarEntity)
                return object;
            let message = new $root.api.CarEntity();
            if (object.id != null)
                message.id = String(object.id);
            if (object.car != null) {
                if (typeof object.car !== "object")
                    throw TypeError(".api.CarEntity.car: object expected");
                message.car = $root.api.Car.fromObject(object.car);
            }
            return message;
        };

        /**
         * Creates a plain object from a CarEntity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.CarEntity
         * @static
         * @param {api.CarEntity} message CarEntity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CarEntity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.car = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.car != null && message.hasOwnProperty("car"))
                object.car = $root.api.Car.toObject(message.car, options);
            return object;
        };

        /**
         * Converts this CarEntity to JSON.
         * @function toJSON
         * @memberof api.CarEntity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CarEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CarEntity;
    })();

    api.ECarEntity = (function() {

        /**
         * Properties of a ECarEntity.
         * @memberof api
         * @interface IECarEntity
         * @property {number|null} [code] ECarEntity code
         * @property {api.ICarEntity|null} [data] ECarEntity data
         * @property {string|null} [message] ECarEntity message
         */

        /**
         * Constructs a new ECarEntity.
         * @memberof api
         * @classdesc Represents a ECarEntity.
         * @implements IECarEntity
         * @constructor
         * @param {api.IECarEntity=} [properties] Properties to set
         */
        function ECarEntity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ECarEntity code.
         * @member {number} code
         * @memberof api.ECarEntity
         * @instance
         */
        ECarEntity.prototype.code = 0;

        /**
         * ECarEntity data.
         * @member {api.ICarEntity|null|undefined} data
         * @memberof api.ECarEntity
         * @instance
         */
        ECarEntity.prototype.data = null;

        /**
         * ECarEntity message.
         * @member {string} message
         * @memberof api.ECarEntity
         * @instance
         */
        ECarEntity.prototype.message = "";

        /**
         * Creates a ECarEntity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ECarEntity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ECarEntity} ECarEntity
         */
        ECarEntity.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ECarEntity)
                return object;
            let message = new $root.api.ECarEntity();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.ECarEntity.data: object expected");
                message.data = $root.api.CarEntity.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a ECarEntity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ECarEntity
         * @static
         * @param {api.ECarEntity} message ECarEntity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ECarEntity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.CarEntity.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ECarEntity to JSON.
         * @function toJSON
         * @memberof api.ECarEntity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ECarEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ECarEntity;
    })();

    /**
     * CarStatus enum.
     * @name api.CarStatus
     * @enum {number}
     * @property {number} CS_NOT_SPECIFIED=0 CS_NOT_SPECIFIED value
     * @property {number} LOCKED=1 LOCKED value
     * @property {number} UNLOCKING=2 UNLOCKING value
     * @property {number} UNLOCKED=3 UNLOCKED value
     * @property {number} LOCKING=4 LOCKING value
     */
    api.CarStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CS_NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "LOCKED"] = 1;
        values[valuesById[2] = "UNLOCKING"] = 2;
        values[valuesById[3] = "UNLOCKED"] = 3;
        values[valuesById[4] = "LOCKING"] = 4;
        return values;
    })();

    api.Driver = (function() {

        /**
         * Properties of a Driver.
         * @memberof api
         * @interface IDriver
         * @property {string|null} [id] Driver id
         * @property {string|null} [avatarUrl] Driver avatarUrl
         */

        /**
         * Constructs a new Driver.
         * @memberof api
         * @classdesc Represents a Driver.
         * @implements IDriver
         * @constructor
         * @param {api.IDriver=} [properties] Properties to set
         */
        function Driver(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Driver id.
         * @member {string} id
         * @memberof api.Driver
         * @instance
         */
        Driver.prototype.id = "";

        /**
         * Driver avatarUrl.
         * @member {string} avatarUrl
         * @memberof api.Driver
         * @instance
         */
        Driver.prototype.avatarUrl = "";

        /**
         * Creates a Driver message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Driver
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Driver} Driver
         */
        Driver.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Driver)
                return object;
            let message = new $root.api.Driver();
            if (object.id != null)
                message.id = String(object.id);
            if (object.avatarUrl != null)
                message.avatarUrl = String(object.avatarUrl);
            return message;
        };

        /**
         * Creates a plain object from a Driver message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Driver
         * @static
         * @param {api.Driver} message Driver
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Driver.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.avatarUrl = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                object.avatarUrl = message.avatarUrl;
            return object;
        };

        /**
         * Converts this Driver to JSON.
         * @function toJSON
         * @memberof api.Driver
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Driver.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Driver;
    })();

    api.Location = (function() {

        /**
         * Properties of a Location.
         * @memberof api
         * @interface ILocation
         * @property {number|null} [latitude] Location latitude
         * @property {number|null} [longitude] Location longitude
         */

        /**
         * Constructs a new Location.
         * @memberof api
         * @classdesc Represents a Location.
         * @implements ILocation
         * @constructor
         * @param {api.ILocation=} [properties] Properties to set
         */
        function Location(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Location latitude.
         * @member {number} latitude
         * @memberof api.Location
         * @instance
         */
        Location.prototype.latitude = 0;

        /**
         * Location longitude.
         * @member {number} longitude
         * @memberof api.Location
         * @instance
         */
        Location.prototype.longitude = 0;

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Location
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Location} Location
         */
        Location.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Location)
                return object;
            let message = new $root.api.Location();
            if (object.latitude != null)
                message.latitude = Number(object.latitude);
            if (object.longitude != null)
                message.longitude = Number(object.longitude);
            return message;
        };

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Location
         * @static
         * @param {api.Location} message Location
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Location.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.latitude = 0;
                object.longitude = 0;
            }
            if (message.latitude != null && message.hasOwnProperty("latitude"))
                object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
            if (message.longitude != null && message.hasOwnProperty("longitude"))
                object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
            return object;
        };

        /**
         * Converts this Location to JSON.
         * @function toJSON
         * @memberof api.Location
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Location.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Location;
    })();

    api.Car = (function() {

        /**
         * Properties of a Car.
         * @memberof api
         * @interface ICar
         * @property {api.CarStatus|null} [status] Car status
         * @property {api.IDriver|null} [driver] Car driver
         * @property {api.ILocation|null} [position] Car position
         * @property {string|null} [tripId] Car tripId
         * @property {number|null} [power] Car power
         * @property {string|null} [plateNum] Car plateNum
         */

        /**
         * Constructs a new Car.
         * @memberof api
         * @classdesc Represents a Car.
         * @implements ICar
         * @constructor
         * @param {api.ICar=} [properties] Properties to set
         */
        function Car(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Car status.
         * @member {api.CarStatus} status
         * @memberof api.Car
         * @instance
         */
        Car.prototype.status = 0;

        /**
         * Car driver.
         * @member {api.IDriver|null|undefined} driver
         * @memberof api.Car
         * @instance
         */
        Car.prototype.driver = null;

        /**
         * Car position.
         * @member {api.ILocation|null|undefined} position
         * @memberof api.Car
         * @instance
         */
        Car.prototype.position = null;

        /**
         * Car tripId.
         * @member {string} tripId
         * @memberof api.Car
         * @instance
         */
        Car.prototype.tripId = "";

        /**
         * Car power.
         * @member {number} power
         * @memberof api.Car
         * @instance
         */
        Car.prototype.power = 0;

        /**
         * Car plateNum.
         * @member {string} plateNum
         * @memberof api.Car
         * @instance
         */
        Car.prototype.plateNum = "";

        /**
         * Creates a Car message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Car
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Car} Car
         */
        Car.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Car)
                return object;
            let message = new $root.api.Car();
            switch (object.status) {
            case "CS_NOT_SPECIFIED":
            case 0:
                message.status = 0;
                break;
            case "LOCKED":
            case 1:
                message.status = 1;
                break;
            case "UNLOCKING":
            case 2:
                message.status = 2;
                break;
            case "UNLOCKED":
            case 3:
                message.status = 3;
                break;
            case "LOCKING":
            case 4:
                message.status = 4;
                break;
            }
            if (object.driver != null) {
                if (typeof object.driver !== "object")
                    throw TypeError(".api.Car.driver: object expected");
                message.driver = $root.api.Driver.fromObject(object.driver);
            }
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".api.Car.position: object expected");
                message.position = $root.api.Location.fromObject(object.position);
            }
            if (object.tripId != null)
                message.tripId = String(object.tripId);
            if (object.power != null)
                message.power = Number(object.power);
            if (object.plateNum != null)
                message.plateNum = String(object.plateNum);
            return message;
        };

        /**
         * Creates a plain object from a Car message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Car
         * @static
         * @param {api.Car} message Car
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Car.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.status = options.enums === String ? "CS_NOT_SPECIFIED" : 0;
                object.driver = null;
                object.position = null;
                object.tripId = "";
                object.power = 0;
                object.plateNum = "";
            }
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.api.CarStatus[message.status] : message.status;
            if (message.driver != null && message.hasOwnProperty("driver"))
                object.driver = $root.api.Driver.toObject(message.driver, options);
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.api.Location.toObject(message.position, options);
            if (message.tripId != null && message.hasOwnProperty("tripId"))
                object.tripId = message.tripId;
            if (message.power != null && message.hasOwnProperty("power"))
                object.power = options.json && !isFinite(message.power) ? String(message.power) : message.power;
            if (message.plateNum != null && message.hasOwnProperty("plateNum"))
                object.plateNum = message.plateNum;
            return object;
        };

        /**
         * Converts this Car to JSON.
         * @function toJSON
         * @memberof api.Car
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Car.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Car;
    })();

    api.ECar = (function() {

        /**
         * Properties of a ECar.
         * @memberof api
         * @interface IECar
         * @property {number|null} [code] ECar code
         * @property {api.ICar|null} [data] ECar data
         * @property {string|null} [message] ECar message
         */

        /**
         * Constructs a new ECar.
         * @memberof api
         * @classdesc Represents a ECar.
         * @implements IECar
         * @constructor
         * @param {api.IECar=} [properties] Properties to set
         */
        function ECar(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ECar code.
         * @member {number} code
         * @memberof api.ECar
         * @instance
         */
        ECar.prototype.code = 0;

        /**
         * ECar data.
         * @member {api.ICar|null|undefined} data
         * @memberof api.ECar
         * @instance
         */
        ECar.prototype.data = null;

        /**
         * ECar message.
         * @member {string} message
         * @memberof api.ECar
         * @instance
         */
        ECar.prototype.message = "";

        /**
         * Creates a ECar message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ECar
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ECar} ECar
         */
        ECar.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ECar)
                return object;
            let message = new $root.api.ECar();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.ECar.data: object expected");
                message.data = $root.api.Car.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a ECar message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ECar
         * @static
         * @param {api.ECar} message ECar
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ECar.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.Car.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ECar to JSON.
         * @function toJSON
         * @memberof api.ECar
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ECar.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ECar;
    })();

    api.CreateCarRequest = (function() {

        /**
         * Properties of a CreateCarRequest.
         * @memberof api
         * @interface ICreateCarRequest
         * @property {string|null} [plateNum] CreateCarRequest plateNum
         */

        /**
         * Constructs a new CreateCarRequest.
         * @memberof api
         * @classdesc Represents a CreateCarRequest.
         * @implements ICreateCarRequest
         * @constructor
         * @param {api.ICreateCarRequest=} [properties] Properties to set
         */
        function CreateCarRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateCarRequest plateNum.
         * @member {string} plateNum
         * @memberof api.CreateCarRequest
         * @instance
         */
        CreateCarRequest.prototype.plateNum = "";

        /**
         * Creates a CreateCarRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.CreateCarRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.CreateCarRequest} CreateCarRequest
         */
        CreateCarRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.CreateCarRequest)
                return object;
            let message = new $root.api.CreateCarRequest();
            if (object.plateNum != null)
                message.plateNum = String(object.plateNum);
            return message;
        };

        /**
         * Creates a plain object from a CreateCarRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.CreateCarRequest
         * @static
         * @param {api.CreateCarRequest} message CreateCarRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateCarRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.plateNum = "";
            if (message.plateNum != null && message.hasOwnProperty("plateNum"))
                object.plateNum = message.plateNum;
            return object;
        };

        /**
         * Converts this CreateCarRequest to JSON.
         * @function toJSON
         * @memberof api.CreateCarRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateCarRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateCarRequest;
    })();

    api.GetCarRequest = (function() {

        /**
         * Properties of a GetCarRequest.
         * @memberof api
         * @interface IGetCarRequest
         * @property {string|null} [id] GetCarRequest id
         */

        /**
         * Constructs a new GetCarRequest.
         * @memberof api
         * @classdesc Represents a GetCarRequest.
         * @implements IGetCarRequest
         * @constructor
         * @param {api.IGetCarRequest=} [properties] Properties to set
         */
        function GetCarRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetCarRequest id.
         * @member {string} id
         * @memberof api.GetCarRequest
         * @instance
         */
        GetCarRequest.prototype.id = "";

        /**
         * Creates a GetCarRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetCarRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetCarRequest} GetCarRequest
         */
        GetCarRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetCarRequest)
                return object;
            let message = new $root.api.GetCarRequest();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a GetCarRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetCarRequest
         * @static
         * @param {api.GetCarRequest} message GetCarRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetCarRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this GetCarRequest to JSON.
         * @function toJSON
         * @memberof api.GetCarRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetCarRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetCarRequest;
    })();

    api.GetCarsRequest = (function() {

        /**
         * Properties of a GetCarsRequest.
         * @memberof api
         * @interface IGetCarsRequest
         */

        /**
         * Constructs a new GetCarsRequest.
         * @memberof api
         * @classdesc Represents a GetCarsRequest.
         * @implements IGetCarsRequest
         * @constructor
         * @param {api.IGetCarsRequest=} [properties] Properties to set
         */
        function GetCarsRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a GetCarsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetCarsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetCarsRequest} GetCarsRequest
         */
        GetCarsRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetCarsRequest)
                return object;
            return new $root.api.GetCarsRequest();
        };

        /**
         * Creates a plain object from a GetCarsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetCarsRequest
         * @static
         * @param {api.GetCarsRequest} message GetCarsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetCarsRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetCarsRequest to JSON.
         * @function toJSON
         * @memberof api.GetCarsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetCarsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetCarsRequest;
    })();

    api.GetCarsResponse = (function() {

        /**
         * Properties of a GetCarsResponse.
         * @memberof api
         * @interface IGetCarsResponse
         * @property {Array.<api.ICarEntity>|null} [cars] GetCarsResponse cars
         */

        /**
         * Constructs a new GetCarsResponse.
         * @memberof api
         * @classdesc Represents a GetCarsResponse.
         * @implements IGetCarsResponse
         * @constructor
         * @param {api.IGetCarsResponse=} [properties] Properties to set
         */
        function GetCarsResponse(properties) {
            this.cars = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetCarsResponse cars.
         * @member {Array.<api.ICarEntity>} cars
         * @memberof api.GetCarsResponse
         * @instance
         */
        GetCarsResponse.prototype.cars = $util.emptyArray;

        /**
         * Creates a GetCarsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetCarsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetCarsResponse} GetCarsResponse
         */
        GetCarsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetCarsResponse)
                return object;
            let message = new $root.api.GetCarsResponse();
            if (object.cars) {
                if (!Array.isArray(object.cars))
                    throw TypeError(".api.GetCarsResponse.cars: array expected");
                message.cars = [];
                for (let i = 0; i < object.cars.length; ++i) {
                    if (typeof object.cars[i] !== "object")
                        throw TypeError(".api.GetCarsResponse.cars: object expected");
                    message.cars[i] = $root.api.CarEntity.fromObject(object.cars[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetCarsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetCarsResponse
         * @static
         * @param {api.GetCarsResponse} message GetCarsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetCarsResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.cars = [];
            if (message.cars && message.cars.length) {
                object.cars = [];
                for (let j = 0; j < message.cars.length; ++j)
                    object.cars[j] = $root.api.CarEntity.toObject(message.cars[j], options);
            }
            return object;
        };

        /**
         * Converts this GetCarsResponse to JSON.
         * @function toJSON
         * @memberof api.GetCarsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetCarsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetCarsResponse;
    })();

    api.EGetCarsResponse = (function() {

        /**
         * Properties of a EGetCarsResponse.
         * @memberof api
         * @interface IEGetCarsResponse
         * @property {number|null} [code] EGetCarsResponse code
         * @property {api.IGetCarsResponse|null} [data] EGetCarsResponse data
         * @property {string|null} [message] EGetCarsResponse message
         */

        /**
         * Constructs a new EGetCarsResponse.
         * @memberof api
         * @classdesc Represents a EGetCarsResponse.
         * @implements IEGetCarsResponse
         * @constructor
         * @param {api.IEGetCarsResponse=} [properties] Properties to set
         */
        function EGetCarsResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EGetCarsResponse code.
         * @member {number} code
         * @memberof api.EGetCarsResponse
         * @instance
         */
        EGetCarsResponse.prototype.code = 0;

        /**
         * EGetCarsResponse data.
         * @member {api.IGetCarsResponse|null|undefined} data
         * @memberof api.EGetCarsResponse
         * @instance
         */
        EGetCarsResponse.prototype.data = null;

        /**
         * EGetCarsResponse message.
         * @member {string} message
         * @memberof api.EGetCarsResponse
         * @instance
         */
        EGetCarsResponse.prototype.message = "";

        /**
         * Creates a EGetCarsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.EGetCarsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.EGetCarsResponse} EGetCarsResponse
         */
        EGetCarsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.EGetCarsResponse)
                return object;
            let message = new $root.api.EGetCarsResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.EGetCarsResponse.data: object expected");
                message.data = $root.api.GetCarsResponse.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a EGetCarsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.EGetCarsResponse
         * @static
         * @param {api.EGetCarsResponse} message EGetCarsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EGetCarsResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.GetCarsResponse.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this EGetCarsResponse to JSON.
         * @function toJSON
         * @memberof api.EGetCarsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EGetCarsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EGetCarsResponse;
    })();

    api.LocationStatus = (function() {

        /**
         * Properties of a LocationStatus.
         * @memberof api
         * @interface ILocationStatus
         * @property {api.ILocation|null} [location] LocationStatus location
         * @property {number|null} [feeCent] LocationStatus feeCent
         * @property {number|null} [kmDriven] LocationStatus kmDriven
         * @property {string|null} [poiName] LocationStatus poiName
         * @property {number|null} [timestampSec] LocationStatus timestampSec
         */

        /**
         * Constructs a new LocationStatus.
         * @memberof api
         * @classdesc Represents a LocationStatus.
         * @implements ILocationStatus
         * @constructor
         * @param {api.ILocationStatus=} [properties] Properties to set
         */
        function LocationStatus(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LocationStatus location.
         * @member {api.ILocation|null|undefined} location
         * @memberof api.LocationStatus
         * @instance
         */
        LocationStatus.prototype.location = null;

        /**
         * LocationStatus feeCent.
         * @member {number} feeCent
         * @memberof api.LocationStatus
         * @instance
         */
        LocationStatus.prototype.feeCent = 0;

        /**
         * LocationStatus kmDriven.
         * @member {number} kmDriven
         * @memberof api.LocationStatus
         * @instance
         */
        LocationStatus.prototype.kmDriven = 0;

        /**
         * LocationStatus poiName.
         * @member {string} poiName
         * @memberof api.LocationStatus
         * @instance
         */
        LocationStatus.prototype.poiName = "";

        /**
         * LocationStatus timestampSec.
         * @member {number} timestampSec
         * @memberof api.LocationStatus
         * @instance
         */
        LocationStatus.prototype.timestampSec = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a LocationStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.LocationStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.LocationStatus} LocationStatus
         */
        LocationStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.api.LocationStatus)
                return object;
            let message = new $root.api.LocationStatus();
            if (object.location != null) {
                if (typeof object.location !== "object")
                    throw TypeError(".api.LocationStatus.location: object expected");
                message.location = $root.api.Location.fromObject(object.location);
            }
            if (object.feeCent != null)
                message.feeCent = object.feeCent | 0;
            if (object.kmDriven != null)
                message.kmDriven = Number(object.kmDriven);
            if (object.poiName != null)
                message.poiName = String(object.poiName);
            if (object.timestampSec != null)
                if ($util.Long)
                    (message.timestampSec = $util.Long.fromValue(object.timestampSec)).unsigned = false;
                else if (typeof object.timestampSec === "string")
                    message.timestampSec = parseInt(object.timestampSec, 10);
                else if (typeof object.timestampSec === "number")
                    message.timestampSec = object.timestampSec;
                else if (typeof object.timestampSec === "object")
                    message.timestampSec = new $util.LongBits(object.timestampSec.low >>> 0, object.timestampSec.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a LocationStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.LocationStatus
         * @static
         * @param {api.LocationStatus} message LocationStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LocationStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.location = null;
                object.feeCent = 0;
                object.kmDriven = 0;
                object.poiName = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.timestampSec = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestampSec = options.longs === String ? "0" : 0;
            }
            if (message.location != null && message.hasOwnProperty("location"))
                object.location = $root.api.Location.toObject(message.location, options);
            if (message.feeCent != null && message.hasOwnProperty("feeCent"))
                object.feeCent = message.feeCent;
            if (message.kmDriven != null && message.hasOwnProperty("kmDriven"))
                object.kmDriven = options.json && !isFinite(message.kmDriven) ? String(message.kmDriven) : message.kmDriven;
            if (message.poiName != null && message.hasOwnProperty("poiName"))
                object.poiName = message.poiName;
            if (message.timestampSec != null && message.hasOwnProperty("timestampSec"))
                if (typeof message.timestampSec === "number")
                    object.timestampSec = options.longs === String ? String(message.timestampSec) : message.timestampSec;
                else
                    object.timestampSec = options.longs === String ? $util.Long.prototype.toString.call(message.timestampSec) : options.longs === Number ? new $util.LongBits(message.timestampSec.low >>> 0, message.timestampSec.high >>> 0).toNumber() : message.timestampSec;
            return object;
        };

        /**
         * Converts this LocationStatus to JSON.
         * @function toJSON
         * @memberof api.LocationStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LocationStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LocationStatus;
    })();

    /**
     * TripStatus enum.
     * @name api.TripStatus
     * @enum {number}
     * @property {number} TS_NOT_SPECIFIED=0 TS_NOT_SPECIFIED value
     * @property {number} IN_PROGRESS=1 IN_PROGRESS value
     * @property {number} FINISHED=2 FINISHED value
     */
    api.TripStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "TS_NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "IN_PROGRESS"] = 1;
        values[valuesById[2] = "FINISHED"] = 2;
        return values;
    })();

    api.TripEntity = (function() {

        /**
         * Properties of a TripEntity.
         * @memberof api
         * @interface ITripEntity
         * @property {string|null} [id] TripEntity id
         * @property {api.ITrip|null} [trip] TripEntity trip
         */

        /**
         * Constructs a new TripEntity.
         * @memberof api
         * @classdesc Represents a TripEntity.
         * @implements ITripEntity
         * @constructor
         * @param {api.ITripEntity=} [properties] Properties to set
         */
        function TripEntity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TripEntity id.
         * @member {string} id
         * @memberof api.TripEntity
         * @instance
         */
        TripEntity.prototype.id = "";

        /**
         * TripEntity trip.
         * @member {api.ITrip|null|undefined} trip
         * @memberof api.TripEntity
         * @instance
         */
        TripEntity.prototype.trip = null;

        /**
         * Creates a TripEntity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.TripEntity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.TripEntity} TripEntity
         */
        TripEntity.fromObject = function fromObject(object) {
            if (object instanceof $root.api.TripEntity)
                return object;
            let message = new $root.api.TripEntity();
            if (object.id != null)
                message.id = String(object.id);
            if (object.trip != null) {
                if (typeof object.trip !== "object")
                    throw TypeError(".api.TripEntity.trip: object expected");
                message.trip = $root.api.Trip.fromObject(object.trip);
            }
            return message;
        };

        /**
         * Creates a plain object from a TripEntity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.TripEntity
         * @static
         * @param {api.TripEntity} message TripEntity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TripEntity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.trip = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.trip != null && message.hasOwnProperty("trip"))
                object.trip = $root.api.Trip.toObject(message.trip, options);
            return object;
        };

        /**
         * Converts this TripEntity to JSON.
         * @function toJSON
         * @memberof api.TripEntity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TripEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TripEntity;
    })();

    api.ETripEntity = (function() {

        /**
         * Properties of a ETripEntity.
         * @memberof api
         * @interface IETripEntity
         * @property {number|null} [code] ETripEntity code
         * @property {api.ITripEntity|null} [data] ETripEntity data
         * @property {string|null} [message] ETripEntity message
         */

        /**
         * Constructs a new ETripEntity.
         * @memberof api
         * @classdesc Represents a ETripEntity.
         * @implements IETripEntity
         * @constructor
         * @param {api.IETripEntity=} [properties] Properties to set
         */
        function ETripEntity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ETripEntity code.
         * @member {number} code
         * @memberof api.ETripEntity
         * @instance
         */
        ETripEntity.prototype.code = 0;

        /**
         * ETripEntity data.
         * @member {api.ITripEntity|null|undefined} data
         * @memberof api.ETripEntity
         * @instance
         */
        ETripEntity.prototype.data = null;

        /**
         * ETripEntity message.
         * @member {string} message
         * @memberof api.ETripEntity
         * @instance
         */
        ETripEntity.prototype.message = "";

        /**
         * Creates a ETripEntity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ETripEntity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ETripEntity} ETripEntity
         */
        ETripEntity.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ETripEntity)
                return object;
            let message = new $root.api.ETripEntity();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.ETripEntity.data: object expected");
                message.data = $root.api.TripEntity.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a ETripEntity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ETripEntity
         * @static
         * @param {api.ETripEntity} message ETripEntity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ETripEntity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.TripEntity.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ETripEntity to JSON.
         * @function toJSON
         * @memberof api.ETripEntity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ETripEntity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ETripEntity;
    })();

    api.Trip = (function() {

        /**
         * Properties of a Trip.
         * @memberof api
         * @interface ITrip
         * @property {number|null} [accountId] Trip accountId
         * @property {string|null} [carId] Trip carId
         * @property {api.ILocationStatus|null} [start] Trip start
         * @property {api.ILocationStatus|null} [current] Trip current
         * @property {api.ILocationStatus|null} [end] Trip end
         * @property {api.TripStatus|null} [status] Trip status
         * @property {string|null} [identityId] Trip identityId
         */

        /**
         * Constructs a new Trip.
         * @memberof api
         * @classdesc Represents a Trip.
         * @implements ITrip
         * @constructor
         * @param {api.ITrip=} [properties] Properties to set
         */
        function Trip(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Trip accountId.
         * @member {number} accountId
         * @memberof api.Trip
         * @instance
         */
        Trip.prototype.accountId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Trip carId.
         * @member {string} carId
         * @memberof api.Trip
         * @instance
         */
        Trip.prototype.carId = "";

        /**
         * Trip start.
         * @member {api.ILocationStatus|null|undefined} start
         * @memberof api.Trip
         * @instance
         */
        Trip.prototype.start = null;

        /**
         * Trip current.
         * @member {api.ILocationStatus|null|undefined} current
         * @memberof api.Trip
         * @instance
         */
        Trip.prototype.current = null;

        /**
         * Trip end.
         * @member {api.ILocationStatus|null|undefined} end
         * @memberof api.Trip
         * @instance
         */
        Trip.prototype.end = null;

        /**
         * Trip status.
         * @member {api.TripStatus} status
         * @memberof api.Trip
         * @instance
         */
        Trip.prototype.status = 0;

        /**
         * Trip identityId.
         * @member {string} identityId
         * @memberof api.Trip
         * @instance
         */
        Trip.prototype.identityId = "";

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Trip
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Trip} Trip
         */
        Trip.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Trip)
                return object;
            let message = new $root.api.Trip();
            if (object.accountId != null)
                if ($util.Long)
                    (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = false;
                else if (typeof object.accountId === "string")
                    message.accountId = parseInt(object.accountId, 10);
                else if (typeof object.accountId === "number")
                    message.accountId = object.accountId;
                else if (typeof object.accountId === "object")
                    message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber();
            if (object.carId != null)
                message.carId = String(object.carId);
            if (object.start != null) {
                if (typeof object.start !== "object")
                    throw TypeError(".api.Trip.start: object expected");
                message.start = $root.api.LocationStatus.fromObject(object.start);
            }
            if (object.current != null) {
                if (typeof object.current !== "object")
                    throw TypeError(".api.Trip.current: object expected");
                message.current = $root.api.LocationStatus.fromObject(object.current);
            }
            if (object.end != null) {
                if (typeof object.end !== "object")
                    throw TypeError(".api.Trip.end: object expected");
                message.end = $root.api.LocationStatus.fromObject(object.end);
            }
            switch (object.status) {
            case "TS_NOT_SPECIFIED":
            case 0:
                message.status = 0;
                break;
            case "IN_PROGRESS":
            case 1:
                message.status = 1;
                break;
            case "FINISHED":
            case 2:
                message.status = 2;
                break;
            }
            if (object.identityId != null)
                message.identityId = String(object.identityId);
            return message;
        };

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Trip
         * @static
         * @param {api.Trip} message Trip
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Trip.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.accountId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.accountId = options.longs === String ? "0" : 0;
                object.carId = "";
                object.start = null;
                object.current = null;
                object.end = null;
                object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                object.identityId = "";
            }
            if (message.accountId != null && message.hasOwnProperty("accountId"))
                if (typeof message.accountId === "number")
                    object.accountId = options.longs === String ? String(message.accountId) : message.accountId;
                else
                    object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber() : message.accountId;
            if (message.carId != null && message.hasOwnProperty("carId"))
                object.carId = message.carId;
            if (message.start != null && message.hasOwnProperty("start"))
                object.start = $root.api.LocationStatus.toObject(message.start, options);
            if (message.current != null && message.hasOwnProperty("current"))
                object.current = $root.api.LocationStatus.toObject(message.current, options);
            if (message.end != null && message.hasOwnProperty("end"))
                object.end = $root.api.LocationStatus.toObject(message.end, options);
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.api.TripStatus[message.status] : message.status;
            if (message.identityId != null && message.hasOwnProperty("identityId"))
                object.identityId = message.identityId;
            return object;
        };

        /**
         * Converts this Trip to JSON.
         * @function toJSON
         * @memberof api.Trip
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Trip.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Trip;
    })();

    api.ETrip = (function() {

        /**
         * Properties of a ETrip.
         * @memberof api
         * @interface IETrip
         * @property {number|null} [code] ETrip code
         * @property {api.ITrip|null} [data] ETrip data
         * @property {string|null} [message] ETrip message
         */

        /**
         * Constructs a new ETrip.
         * @memberof api
         * @classdesc Represents a ETrip.
         * @implements IETrip
         * @constructor
         * @param {api.IETrip=} [properties] Properties to set
         */
        function ETrip(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ETrip code.
         * @member {number} code
         * @memberof api.ETrip
         * @instance
         */
        ETrip.prototype.code = 0;

        /**
         * ETrip data.
         * @member {api.ITrip|null|undefined} data
         * @memberof api.ETrip
         * @instance
         */
        ETrip.prototype.data = null;

        /**
         * ETrip message.
         * @member {string} message
         * @memberof api.ETrip
         * @instance
         */
        ETrip.prototype.message = "";

        /**
         * Creates a ETrip message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ETrip
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ETrip} ETrip
         */
        ETrip.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ETrip)
                return object;
            let message = new $root.api.ETrip();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.ETrip.data: object expected");
                message.data = $root.api.Trip.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a ETrip message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ETrip
         * @static
         * @param {api.ETrip} message ETrip
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ETrip.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.Trip.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ETrip to JSON.
         * @function toJSON
         * @memberof api.ETrip
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ETrip.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ETrip;
    })();

    api.CreateTripRequest = (function() {

        /**
         * Properties of a CreateTripRequest.
         * @memberof api
         * @interface ICreateTripRequest
         * @property {api.ILocation|null} [start] CreateTripRequest start
         * @property {string|null} [carId] CreateTripRequest carId
         * @property {string|null} [avatarUrl] CreateTripRequest avatarUrl
         */

        /**
         * Constructs a new CreateTripRequest.
         * @memberof api
         * @classdesc Represents a CreateTripRequest.
         * @implements ICreateTripRequest
         * @constructor
         * @param {api.ICreateTripRequest=} [properties] Properties to set
         */
        function CreateTripRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateTripRequest start.
         * @member {api.ILocation|null|undefined} start
         * @memberof api.CreateTripRequest
         * @instance
         */
        CreateTripRequest.prototype.start = null;

        /**
         * CreateTripRequest carId.
         * @member {string} carId
         * @memberof api.CreateTripRequest
         * @instance
         */
        CreateTripRequest.prototype.carId = "";

        /**
         * CreateTripRequest avatarUrl.
         * @member {string} avatarUrl
         * @memberof api.CreateTripRequest
         * @instance
         */
        CreateTripRequest.prototype.avatarUrl = "";

        /**
         * Creates a CreateTripRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.CreateTripRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.CreateTripRequest} CreateTripRequest
         */
        CreateTripRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.CreateTripRequest)
                return object;
            let message = new $root.api.CreateTripRequest();
            if (object.start != null) {
                if (typeof object.start !== "object")
                    throw TypeError(".api.CreateTripRequest.start: object expected");
                message.start = $root.api.Location.fromObject(object.start);
            }
            if (object.carId != null)
                message.carId = String(object.carId);
            if (object.avatarUrl != null)
                message.avatarUrl = String(object.avatarUrl);
            return message;
        };

        /**
         * Creates a plain object from a CreateTripRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.CreateTripRequest
         * @static
         * @param {api.CreateTripRequest} message CreateTripRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateTripRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.start = null;
                object.carId = "";
                object.avatarUrl = "";
            }
            if (message.start != null && message.hasOwnProperty("start"))
                object.start = $root.api.Location.toObject(message.start, options);
            if (message.carId != null && message.hasOwnProperty("carId"))
                object.carId = message.carId;
            if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                object.avatarUrl = message.avatarUrl;
            return object;
        };

        /**
         * Converts this CreateTripRequest to JSON.
         * @function toJSON
         * @memberof api.CreateTripRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateTripRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateTripRequest;
    })();

    api.GetTripRequest = (function() {

        /**
         * Properties of a GetTripRequest.
         * @memberof api
         * @interface IGetTripRequest
         * @property {string|null} [id] GetTripRequest id
         */

        /**
         * Constructs a new GetTripRequest.
         * @memberof api
         * @classdesc Represents a GetTripRequest.
         * @implements IGetTripRequest
         * @constructor
         * @param {api.IGetTripRequest=} [properties] Properties to set
         */
        function GetTripRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetTripRequest id.
         * @member {string} id
         * @memberof api.GetTripRequest
         * @instance
         */
        GetTripRequest.prototype.id = "";

        /**
         * Creates a GetTripRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetTripRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetTripRequest} GetTripRequest
         */
        GetTripRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetTripRequest)
                return object;
            let message = new $root.api.GetTripRequest();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a GetTripRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetTripRequest
         * @static
         * @param {api.GetTripRequest} message GetTripRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetTripRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this GetTripRequest to JSON.
         * @function toJSON
         * @memberof api.GetTripRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetTripRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetTripRequest;
    })();

    api.GetTripsRequest = (function() {

        /**
         * Properties of a GetTripsRequest.
         * @memberof api
         * @interface IGetTripsRequest
         * @property {api.TripStatus|null} [status] GetTripsRequest status
         */

        /**
         * Constructs a new GetTripsRequest.
         * @memberof api
         * @classdesc Represents a GetTripsRequest.
         * @implements IGetTripsRequest
         * @constructor
         * @param {api.IGetTripsRequest=} [properties] Properties to set
         */
        function GetTripsRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetTripsRequest status.
         * @member {api.TripStatus} status
         * @memberof api.GetTripsRequest
         * @instance
         */
        GetTripsRequest.prototype.status = 0;

        /**
         * Creates a GetTripsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetTripsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetTripsRequest} GetTripsRequest
         */
        GetTripsRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetTripsRequest)
                return object;
            let message = new $root.api.GetTripsRequest();
            switch (object.status) {
            case "TS_NOT_SPECIFIED":
            case 0:
                message.status = 0;
                break;
            case "IN_PROGRESS":
            case 1:
                message.status = 1;
                break;
            case "FINISHED":
            case 2:
                message.status = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a GetTripsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetTripsRequest
         * @static
         * @param {api.GetTripsRequest} message GetTripsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetTripsRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.api.TripStatus[message.status] : message.status;
            return object;
        };

        /**
         * Converts this GetTripsRequest to JSON.
         * @function toJSON
         * @memberof api.GetTripsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetTripsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetTripsRequest;
    })();

    api.GetTripsResponse = (function() {

        /**
         * Properties of a GetTripsResponse.
         * @memberof api
         * @interface IGetTripsResponse
         * @property {Array.<api.ITripEntity>|null} [trips] GetTripsResponse trips
         */

        /**
         * Constructs a new GetTripsResponse.
         * @memberof api
         * @classdesc Represents a GetTripsResponse.
         * @implements IGetTripsResponse
         * @constructor
         * @param {api.IGetTripsResponse=} [properties] Properties to set
         */
        function GetTripsResponse(properties) {
            this.trips = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetTripsResponse trips.
         * @member {Array.<api.ITripEntity>} trips
         * @memberof api.GetTripsResponse
         * @instance
         */
        GetTripsResponse.prototype.trips = $util.emptyArray;

        /**
         * Creates a GetTripsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetTripsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetTripsResponse} GetTripsResponse
         */
        GetTripsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetTripsResponse)
                return object;
            let message = new $root.api.GetTripsResponse();
            if (object.trips) {
                if (!Array.isArray(object.trips))
                    throw TypeError(".api.GetTripsResponse.trips: array expected");
                message.trips = [];
                for (let i = 0; i < object.trips.length; ++i) {
                    if (typeof object.trips[i] !== "object")
                        throw TypeError(".api.GetTripsResponse.trips: object expected");
                    message.trips[i] = $root.api.TripEntity.fromObject(object.trips[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetTripsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetTripsResponse
         * @static
         * @param {api.GetTripsResponse} message GetTripsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetTripsResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.trips = [];
            if (message.trips && message.trips.length) {
                object.trips = [];
                for (let j = 0; j < message.trips.length; ++j)
                    object.trips[j] = $root.api.TripEntity.toObject(message.trips[j], options);
            }
            return object;
        };

        /**
         * Converts this GetTripsResponse to JSON.
         * @function toJSON
         * @memberof api.GetTripsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetTripsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetTripsResponse;
    })();

    api.EGetTripsResponse = (function() {

        /**
         * Properties of a EGetTripsResponse.
         * @memberof api
         * @interface IEGetTripsResponse
         * @property {number|null} [code] EGetTripsResponse code
         * @property {api.IGetTripsResponse|null} [data] EGetTripsResponse data
         * @property {string|null} [message] EGetTripsResponse message
         */

        /**
         * Constructs a new EGetTripsResponse.
         * @memberof api
         * @classdesc Represents a EGetTripsResponse.
         * @implements IEGetTripsResponse
         * @constructor
         * @param {api.IEGetTripsResponse=} [properties] Properties to set
         */
        function EGetTripsResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EGetTripsResponse code.
         * @member {number} code
         * @memberof api.EGetTripsResponse
         * @instance
         */
        EGetTripsResponse.prototype.code = 0;

        /**
         * EGetTripsResponse data.
         * @member {api.IGetTripsResponse|null|undefined} data
         * @memberof api.EGetTripsResponse
         * @instance
         */
        EGetTripsResponse.prototype.data = null;

        /**
         * EGetTripsResponse message.
         * @member {string} message
         * @memberof api.EGetTripsResponse
         * @instance
         */
        EGetTripsResponse.prototype.message = "";

        /**
         * Creates a EGetTripsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.EGetTripsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.EGetTripsResponse} EGetTripsResponse
         */
        EGetTripsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.EGetTripsResponse)
                return object;
            let message = new $root.api.EGetTripsResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.EGetTripsResponse.data: object expected");
                message.data = $root.api.GetTripsResponse.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a EGetTripsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.EGetTripsResponse
         * @static
         * @param {api.EGetTripsResponse} message EGetTripsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EGetTripsResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.GetTripsResponse.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this EGetTripsResponse to JSON.
         * @function toJSON
         * @memberof api.EGetTripsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EGetTripsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EGetTripsResponse;
    })();

    api.UpdateTripRequest = (function() {

        /**
         * Properties of an UpdateTripRequest.
         * @memberof api
         * @interface IUpdateTripRequest
         * @property {string|null} [id] UpdateTripRequest id
         * @property {api.ILocation|null} [current] UpdateTripRequest current
         * @property {boolean|null} [endTrip] UpdateTripRequest endTrip
         */

        /**
         * Constructs a new UpdateTripRequest.
         * @memberof api
         * @classdesc Represents an UpdateTripRequest.
         * @implements IUpdateTripRequest
         * @constructor
         * @param {api.IUpdateTripRequest=} [properties] Properties to set
         */
        function UpdateTripRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateTripRequest id.
         * @member {string} id
         * @memberof api.UpdateTripRequest
         * @instance
         */
        UpdateTripRequest.prototype.id = "";

        /**
         * UpdateTripRequest current.
         * @member {api.ILocation|null|undefined} current
         * @memberof api.UpdateTripRequest
         * @instance
         */
        UpdateTripRequest.prototype.current = null;

        /**
         * UpdateTripRequest endTrip.
         * @member {boolean} endTrip
         * @memberof api.UpdateTripRequest
         * @instance
         */
        UpdateTripRequest.prototype.endTrip = false;

        /**
         * Creates an UpdateTripRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.UpdateTripRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.UpdateTripRequest} UpdateTripRequest
         */
        UpdateTripRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.UpdateTripRequest)
                return object;
            let message = new $root.api.UpdateTripRequest();
            if (object.id != null)
                message.id = String(object.id);
            if (object.current != null) {
                if (typeof object.current !== "object")
                    throw TypeError(".api.UpdateTripRequest.current: object expected");
                message.current = $root.api.Location.fromObject(object.current);
            }
            if (object.endTrip != null)
                message.endTrip = Boolean(object.endTrip);
            return message;
        };

        /**
         * Creates a plain object from an UpdateTripRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.UpdateTripRequest
         * @static
         * @param {api.UpdateTripRequest} message UpdateTripRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateTripRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.current = null;
                object.endTrip = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.current != null && message.hasOwnProperty("current"))
                object.current = $root.api.Location.toObject(message.current, options);
            if (message.endTrip != null && message.hasOwnProperty("endTrip"))
                object.endTrip = message.endTrip;
            return object;
        };

        /**
         * Converts this UpdateTripRequest to JSON.
         * @function toJSON
         * @memberof api.UpdateTripRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateTripRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UpdateTripRequest;
    })();

    /**
     * Gender enum.
     * @name api.Gender
     * @enum {number}
     * @property {number} G_NOT_SPECIFIED=0 G_NOT_SPECIFIED value
     * @property {number} MALE=1 MALE value
     * @property {number} FEMALE=2 FEMALE value
     */
    api.Gender = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "G_NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "MALE"] = 1;
        values[valuesById[2] = "FEMALE"] = 2;
        return values;
    })();

    /**
     * IdentityStatus enum.
     * @name api.IdentityStatus
     * @enum {number}
     * @property {number} UNSUBMITTED=0 UNSUBMITTED value
     * @property {number} PENDING=1 PENDING value
     * @property {number} VERIFIED=2 VERIFIED value
     */
    api.IdentityStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNSUBMITTED"] = 0;
        values[valuesById[1] = "PENDING"] = 1;
        values[valuesById[2] = "VERIFIED"] = 2;
        return values;
    })();

    api.Profile = (function() {

        /**
         * Properties of a Profile.
         * @memberof api
         * @interface IProfile
         * @property {api.IIdentity|null} [identity] Profile identity
         * @property {api.IdentityStatus|null} [identityStatus] Profile identityStatus
         */

        /**
         * Constructs a new Profile.
         * @memberof api
         * @classdesc Represents a Profile.
         * @implements IProfile
         * @constructor
         * @param {api.IProfile=} [properties] Properties to set
         */
        function Profile(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Profile identity.
         * @member {api.IIdentity|null|undefined} identity
         * @memberof api.Profile
         * @instance
         */
        Profile.prototype.identity = null;

        /**
         * Profile identityStatus.
         * @member {api.IdentityStatus} identityStatus
         * @memberof api.Profile
         * @instance
         */
        Profile.prototype.identityStatus = 0;

        /**
         * Creates a Profile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Profile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Profile} Profile
         */
        Profile.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Profile)
                return object;
            let message = new $root.api.Profile();
            if (object.identity != null) {
                if (typeof object.identity !== "object")
                    throw TypeError(".api.Profile.identity: object expected");
                message.identity = $root.api.Identity.fromObject(object.identity);
            }
            switch (object.identityStatus) {
            case "UNSUBMITTED":
            case 0:
                message.identityStatus = 0;
                break;
            case "PENDING":
            case 1:
                message.identityStatus = 1;
                break;
            case "VERIFIED":
            case 2:
                message.identityStatus = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Profile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Profile
         * @static
         * @param {api.Profile} message Profile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Profile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.identity = null;
                object.identityStatus = options.enums === String ? "UNSUBMITTED" : 0;
            }
            if (message.identity != null && message.hasOwnProperty("identity"))
                object.identity = $root.api.Identity.toObject(message.identity, options);
            if (message.identityStatus != null && message.hasOwnProperty("identityStatus"))
                object.identityStatus = options.enums === String ? $root.api.IdentityStatus[message.identityStatus] : message.identityStatus;
            return object;
        };

        /**
         * Converts this Profile to JSON.
         * @function toJSON
         * @memberof api.Profile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Profile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Profile;
    })();

    api.EProfile = (function() {

        /**
         * Properties of a EProfile.
         * @memberof api
         * @interface IEProfile
         * @property {number|null} [code] EProfile code
         * @property {api.IProfile|null} [data] EProfile data
         * @property {string|null} [message] EProfile message
         */

        /**
         * Constructs a new EProfile.
         * @memberof api
         * @classdesc Represents a EProfile.
         * @implements IEProfile
         * @constructor
         * @param {api.IEProfile=} [properties] Properties to set
         */
        function EProfile(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EProfile code.
         * @member {number} code
         * @memberof api.EProfile
         * @instance
         */
        EProfile.prototype.code = 0;

        /**
         * EProfile data.
         * @member {api.IProfile|null|undefined} data
         * @memberof api.EProfile
         * @instance
         */
        EProfile.prototype.data = null;

        /**
         * EProfile message.
         * @member {string} message
         * @memberof api.EProfile
         * @instance
         */
        EProfile.prototype.message = "";

        /**
         * Creates a EProfile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.EProfile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.EProfile} EProfile
         */
        EProfile.fromObject = function fromObject(object) {
            if (object instanceof $root.api.EProfile)
                return object;
            let message = new $root.api.EProfile();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.EProfile.data: object expected");
                message.data = $root.api.Profile.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a EProfile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.EProfile
         * @static
         * @param {api.EProfile} message EProfile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EProfile.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.Profile.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this EProfile to JSON.
         * @function toJSON
         * @memberof api.EProfile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EProfile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EProfile;
    })();

    api.Identity = (function() {

        /**
         * Properties of an Identity.
         * @memberof api
         * @interface IIdentity
         * @property {string|null} [licNumber] Identity licNumber
         * @property {string|null} [name] Identity name
         * @property {api.Gender|null} [gender] Identity gender
         * @property {number|null} [birthDateMillis] Identity birthDateMillis
         */

        /**
         * Constructs a new Identity.
         * @memberof api
         * @classdesc Represents an Identity.
         * @implements IIdentity
         * @constructor
         * @param {api.IIdentity=} [properties] Properties to set
         */
        function Identity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Identity licNumber.
         * @member {string} licNumber
         * @memberof api.Identity
         * @instance
         */
        Identity.prototype.licNumber = "";

        /**
         * Identity name.
         * @member {string} name
         * @memberof api.Identity
         * @instance
         */
        Identity.prototype.name = "";

        /**
         * Identity gender.
         * @member {api.Gender} gender
         * @memberof api.Identity
         * @instance
         */
        Identity.prototype.gender = 0;

        /**
         * Identity birthDateMillis.
         * @member {number} birthDateMillis
         * @memberof api.Identity
         * @instance
         */
        Identity.prototype.birthDateMillis = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates an Identity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.Identity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.Identity} Identity
         */
        Identity.fromObject = function fromObject(object) {
            if (object instanceof $root.api.Identity)
                return object;
            let message = new $root.api.Identity();
            if (object.licNumber != null)
                message.licNumber = String(object.licNumber);
            if (object.name != null)
                message.name = String(object.name);
            switch (object.gender) {
            case "G_NOT_SPECIFIED":
            case 0:
                message.gender = 0;
                break;
            case "MALE":
            case 1:
                message.gender = 1;
                break;
            case "FEMALE":
            case 2:
                message.gender = 2;
                break;
            }
            if (object.birthDateMillis != null)
                if ($util.Long)
                    (message.birthDateMillis = $util.Long.fromValue(object.birthDateMillis)).unsigned = false;
                else if (typeof object.birthDateMillis === "string")
                    message.birthDateMillis = parseInt(object.birthDateMillis, 10);
                else if (typeof object.birthDateMillis === "number")
                    message.birthDateMillis = object.birthDateMillis;
                else if (typeof object.birthDateMillis === "object")
                    message.birthDateMillis = new $util.LongBits(object.birthDateMillis.low >>> 0, object.birthDateMillis.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an Identity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.Identity
         * @static
         * @param {api.Identity} message Identity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Identity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.licNumber = "";
                object.name = "";
                object.gender = options.enums === String ? "G_NOT_SPECIFIED" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.birthDateMillis = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.birthDateMillis = options.longs === String ? "0" : 0;
            }
            if (message.licNumber != null && message.hasOwnProperty("licNumber"))
                object.licNumber = message.licNumber;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = options.enums === String ? $root.api.Gender[message.gender] : message.gender;
            if (message.birthDateMillis != null && message.hasOwnProperty("birthDateMillis"))
                if (typeof message.birthDateMillis === "number")
                    object.birthDateMillis = options.longs === String ? String(message.birthDateMillis) : message.birthDateMillis;
                else
                    object.birthDateMillis = options.longs === String ? $util.Long.prototype.toString.call(message.birthDateMillis) : options.longs === Number ? new $util.LongBits(message.birthDateMillis.low >>> 0, message.birthDateMillis.high >>> 0).toNumber() : message.birthDateMillis;
            return object;
        };

        /**
         * Converts this Identity to JSON.
         * @function toJSON
         * @memberof api.Identity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Identity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Identity;
    })();

    api.EIdentity = (function() {

        /**
         * Properties of a EIdentity.
         * @memberof api
         * @interface IEIdentity
         * @property {number|null} [code] EIdentity code
         * @property {api.IIdentity|null} [data] EIdentity data
         * @property {string|null} [message] EIdentity message
         */

        /**
         * Constructs a new EIdentity.
         * @memberof api
         * @classdesc Represents a EIdentity.
         * @implements IEIdentity
         * @constructor
         * @param {api.IEIdentity=} [properties] Properties to set
         */
        function EIdentity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EIdentity code.
         * @member {number} code
         * @memberof api.EIdentity
         * @instance
         */
        EIdentity.prototype.code = 0;

        /**
         * EIdentity data.
         * @member {api.IIdentity|null|undefined} data
         * @memberof api.EIdentity
         * @instance
         */
        EIdentity.prototype.data = null;

        /**
         * EIdentity message.
         * @member {string} message
         * @memberof api.EIdentity
         * @instance
         */
        EIdentity.prototype.message = "";

        /**
         * Creates a EIdentity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.EIdentity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.EIdentity} EIdentity
         */
        EIdentity.fromObject = function fromObject(object) {
            if (object instanceof $root.api.EIdentity)
                return object;
            let message = new $root.api.EIdentity();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.EIdentity.data: object expected");
                message.data = $root.api.Identity.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a EIdentity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.EIdentity
         * @static
         * @param {api.EIdentity} message EIdentity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EIdentity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.Identity.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this EIdentity to JSON.
         * @function toJSON
         * @memberof api.EIdentity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EIdentity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EIdentity;
    })();

    api.GetProfileRequest = (function() {

        /**
         * Properties of a GetProfileRequest.
         * @memberof api
         * @interface IGetProfileRequest
         */

        /**
         * Constructs a new GetProfileRequest.
         * @memberof api
         * @classdesc Represents a GetProfileRequest.
         * @implements IGetProfileRequest
         * @constructor
         * @param {api.IGetProfileRequest=} [properties] Properties to set
         */
        function GetProfileRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a GetProfileRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetProfileRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetProfileRequest} GetProfileRequest
         */
        GetProfileRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetProfileRequest)
                return object;
            return new $root.api.GetProfileRequest();
        };

        /**
         * Creates a plain object from a GetProfileRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetProfileRequest
         * @static
         * @param {api.GetProfileRequest} message GetProfileRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetProfileRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetProfileRequest to JSON.
         * @function toJSON
         * @memberof api.GetProfileRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetProfileRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetProfileRequest;
    })();

    api.SubmitProfileRequest = (function() {

        /**
         * Properties of a SubmitProfileRequest.
         * @memberof api
         * @interface ISubmitProfileRequest
         * @property {api.IIdentity|null} [identity] SubmitProfileRequest identity
         */

        /**
         * Constructs a new SubmitProfileRequest.
         * @memberof api
         * @classdesc Represents a SubmitProfileRequest.
         * @implements ISubmitProfileRequest
         * @constructor
         * @param {api.ISubmitProfileRequest=} [properties] Properties to set
         */
        function SubmitProfileRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubmitProfileRequest identity.
         * @member {api.IIdentity|null|undefined} identity
         * @memberof api.SubmitProfileRequest
         * @instance
         */
        SubmitProfileRequest.prototype.identity = null;

        /**
         * Creates a SubmitProfileRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.SubmitProfileRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.SubmitProfileRequest} SubmitProfileRequest
         */
        SubmitProfileRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.SubmitProfileRequest)
                return object;
            let message = new $root.api.SubmitProfileRequest();
            if (object.identity != null) {
                if (typeof object.identity !== "object")
                    throw TypeError(".api.SubmitProfileRequest.identity: object expected");
                message.identity = $root.api.Identity.fromObject(object.identity);
            }
            return message;
        };

        /**
         * Creates a plain object from a SubmitProfileRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.SubmitProfileRequest
         * @static
         * @param {api.SubmitProfileRequest} message SubmitProfileRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubmitProfileRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.identity = null;
            if (message.identity != null && message.hasOwnProperty("identity"))
                object.identity = $root.api.Identity.toObject(message.identity, options);
            return object;
        };

        /**
         * Converts this SubmitProfileRequest to JSON.
         * @function toJSON
         * @memberof api.SubmitProfileRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubmitProfileRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SubmitProfileRequest;
    })();

    api.ClearProfileRequest = (function() {

        /**
         * Properties of a ClearProfileRequest.
         * @memberof api
         * @interface IClearProfileRequest
         */

        /**
         * Constructs a new ClearProfileRequest.
         * @memberof api
         * @classdesc Represents a ClearProfileRequest.
         * @implements IClearProfileRequest
         * @constructor
         * @param {api.IClearProfileRequest=} [properties] Properties to set
         */
        function ClearProfileRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a ClearProfileRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ClearProfileRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ClearProfileRequest} ClearProfileRequest
         */
        ClearProfileRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ClearProfileRequest)
                return object;
            return new $root.api.ClearProfileRequest();
        };

        /**
         * Creates a plain object from a ClearProfileRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ClearProfileRequest
         * @static
         * @param {api.ClearProfileRequest} message ClearProfileRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClearProfileRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ClearProfileRequest to JSON.
         * @function toJSON
         * @memberof api.ClearProfileRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClearProfileRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ClearProfileRequest;
    })();

    api.GetProfilePhotoRequest = (function() {

        /**
         * Properties of a GetProfilePhotoRequest.
         * @memberof api
         * @interface IGetProfilePhotoRequest
         */

        /**
         * Constructs a new GetProfilePhotoRequest.
         * @memberof api
         * @classdesc Represents a GetProfilePhotoRequest.
         * @implements IGetProfilePhotoRequest
         * @constructor
         * @param {api.IGetProfilePhotoRequest=} [properties] Properties to set
         */
        function GetProfilePhotoRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a GetProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetProfilePhotoRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetProfilePhotoRequest} GetProfilePhotoRequest
         */
        GetProfilePhotoRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetProfilePhotoRequest)
                return object;
            return new $root.api.GetProfilePhotoRequest();
        };

        /**
         * Creates a plain object from a GetProfilePhotoRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetProfilePhotoRequest
         * @static
         * @param {api.GetProfilePhotoRequest} message GetProfilePhotoRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetProfilePhotoRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GetProfilePhotoRequest to JSON.
         * @function toJSON
         * @memberof api.GetProfilePhotoRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetProfilePhotoRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetProfilePhotoRequest;
    })();

    api.GetProfilePhotoResponse = (function() {

        /**
         * Properties of a GetProfilePhotoResponse.
         * @memberof api
         * @interface IGetProfilePhotoResponse
         * @property {string|null} [url] GetProfilePhotoResponse url
         */

        /**
         * Constructs a new GetProfilePhotoResponse.
         * @memberof api
         * @classdesc Represents a GetProfilePhotoResponse.
         * @implements IGetProfilePhotoResponse
         * @constructor
         * @param {api.IGetProfilePhotoResponse=} [properties] Properties to set
         */
        function GetProfilePhotoResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetProfilePhotoResponse url.
         * @member {string} url
         * @memberof api.GetProfilePhotoResponse
         * @instance
         */
        GetProfilePhotoResponse.prototype.url = "";

        /**
         * Creates a GetProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.GetProfilePhotoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.GetProfilePhotoResponse} GetProfilePhotoResponse
         */
        GetProfilePhotoResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.GetProfilePhotoResponse)
                return object;
            let message = new $root.api.GetProfilePhotoResponse();
            if (object.url != null)
                message.url = String(object.url);
            return message;
        };

        /**
         * Creates a plain object from a GetProfilePhotoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.GetProfilePhotoResponse
         * @static
         * @param {api.GetProfilePhotoResponse} message GetProfilePhotoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetProfilePhotoResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.url = "";
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            return object;
        };

        /**
         * Converts this GetProfilePhotoResponse to JSON.
         * @function toJSON
         * @memberof api.GetProfilePhotoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetProfilePhotoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetProfilePhotoResponse;
    })();

    api.EGetProfilePhotoResponse = (function() {

        /**
         * Properties of a EGetProfilePhotoResponse.
         * @memberof api
         * @interface IEGetProfilePhotoResponse
         * @property {number|null} [code] EGetProfilePhotoResponse code
         * @property {api.IGetProfilePhotoResponse|null} [data] EGetProfilePhotoResponse data
         * @property {string|null} [message] EGetProfilePhotoResponse message
         */

        /**
         * Constructs a new EGetProfilePhotoResponse.
         * @memberof api
         * @classdesc Represents a EGetProfilePhotoResponse.
         * @implements IEGetProfilePhotoResponse
         * @constructor
         * @param {api.IEGetProfilePhotoResponse=} [properties] Properties to set
         */
        function EGetProfilePhotoResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EGetProfilePhotoResponse code.
         * @member {number} code
         * @memberof api.EGetProfilePhotoResponse
         * @instance
         */
        EGetProfilePhotoResponse.prototype.code = 0;

        /**
         * EGetProfilePhotoResponse data.
         * @member {api.IGetProfilePhotoResponse|null|undefined} data
         * @memberof api.EGetProfilePhotoResponse
         * @instance
         */
        EGetProfilePhotoResponse.prototype.data = null;

        /**
         * EGetProfilePhotoResponse message.
         * @member {string} message
         * @memberof api.EGetProfilePhotoResponse
         * @instance
         */
        EGetProfilePhotoResponse.prototype.message = "";

        /**
         * Creates a EGetProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.EGetProfilePhotoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.EGetProfilePhotoResponse} EGetProfilePhotoResponse
         */
        EGetProfilePhotoResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.EGetProfilePhotoResponse)
                return object;
            let message = new $root.api.EGetProfilePhotoResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.EGetProfilePhotoResponse.data: object expected");
                message.data = $root.api.GetProfilePhotoResponse.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a EGetProfilePhotoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.EGetProfilePhotoResponse
         * @static
         * @param {api.EGetProfilePhotoResponse} message EGetProfilePhotoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EGetProfilePhotoResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.GetProfilePhotoResponse.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this EGetProfilePhotoResponse to JSON.
         * @function toJSON
         * @memberof api.EGetProfilePhotoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EGetProfilePhotoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EGetProfilePhotoResponse;
    })();

    api.CreateProfilePhotoRequest = (function() {

        /**
         * Properties of a CreateProfilePhotoRequest.
         * @memberof api
         * @interface ICreateProfilePhotoRequest
         */

        /**
         * Constructs a new CreateProfilePhotoRequest.
         * @memberof api
         * @classdesc Represents a CreateProfilePhotoRequest.
         * @implements ICreateProfilePhotoRequest
         * @constructor
         * @param {api.ICreateProfilePhotoRequest=} [properties] Properties to set
         */
        function CreateProfilePhotoRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a CreateProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.CreateProfilePhotoRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.CreateProfilePhotoRequest} CreateProfilePhotoRequest
         */
        CreateProfilePhotoRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.CreateProfilePhotoRequest)
                return object;
            return new $root.api.CreateProfilePhotoRequest();
        };

        /**
         * Creates a plain object from a CreateProfilePhotoRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.CreateProfilePhotoRequest
         * @static
         * @param {api.CreateProfilePhotoRequest} message CreateProfilePhotoRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateProfilePhotoRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CreateProfilePhotoRequest to JSON.
         * @function toJSON
         * @memberof api.CreateProfilePhotoRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateProfilePhotoRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateProfilePhotoRequest;
    })();

    api.CreateProfilePhotoResponse = (function() {

        /**
         * Properties of a CreateProfilePhotoResponse.
         * @memberof api
         * @interface ICreateProfilePhotoResponse
         * @property {string|null} [uploadUrl] CreateProfilePhotoResponse uploadUrl
         */

        /**
         * Constructs a new CreateProfilePhotoResponse.
         * @memberof api
         * @classdesc Represents a CreateProfilePhotoResponse.
         * @implements ICreateProfilePhotoResponse
         * @constructor
         * @param {api.ICreateProfilePhotoResponse=} [properties] Properties to set
         */
        function CreateProfilePhotoResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateProfilePhotoResponse uploadUrl.
         * @member {string} uploadUrl
         * @memberof api.CreateProfilePhotoResponse
         * @instance
         */
        CreateProfilePhotoResponse.prototype.uploadUrl = "";

        /**
         * Creates a CreateProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.CreateProfilePhotoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.CreateProfilePhotoResponse} CreateProfilePhotoResponse
         */
        CreateProfilePhotoResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.CreateProfilePhotoResponse)
                return object;
            let message = new $root.api.CreateProfilePhotoResponse();
            if (object.uploadUrl != null)
                message.uploadUrl = String(object.uploadUrl);
            return message;
        };

        /**
         * Creates a plain object from a CreateProfilePhotoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.CreateProfilePhotoResponse
         * @static
         * @param {api.CreateProfilePhotoResponse} message CreateProfilePhotoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateProfilePhotoResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.uploadUrl = "";
            if (message.uploadUrl != null && message.hasOwnProperty("uploadUrl"))
                object.uploadUrl = message.uploadUrl;
            return object;
        };

        /**
         * Converts this CreateProfilePhotoResponse to JSON.
         * @function toJSON
         * @memberof api.CreateProfilePhotoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateProfilePhotoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateProfilePhotoResponse;
    })();

    api.ECreateProfilePhotoResponse = (function() {

        /**
         * Properties of a ECreateProfilePhotoResponse.
         * @memberof api
         * @interface IECreateProfilePhotoResponse
         * @property {number|null} [code] ECreateProfilePhotoResponse code
         * @property {api.ICreateProfilePhotoResponse|null} [data] ECreateProfilePhotoResponse data
         * @property {string|null} [message] ECreateProfilePhotoResponse message
         */

        /**
         * Constructs a new ECreateProfilePhotoResponse.
         * @memberof api
         * @classdesc Represents a ECreateProfilePhotoResponse.
         * @implements IECreateProfilePhotoResponse
         * @constructor
         * @param {api.IECreateProfilePhotoResponse=} [properties] Properties to set
         */
        function ECreateProfilePhotoResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ECreateProfilePhotoResponse code.
         * @member {number} code
         * @memberof api.ECreateProfilePhotoResponse
         * @instance
         */
        ECreateProfilePhotoResponse.prototype.code = 0;

        /**
         * ECreateProfilePhotoResponse data.
         * @member {api.ICreateProfilePhotoResponse|null|undefined} data
         * @memberof api.ECreateProfilePhotoResponse
         * @instance
         */
        ECreateProfilePhotoResponse.prototype.data = null;

        /**
         * ECreateProfilePhotoResponse message.
         * @member {string} message
         * @memberof api.ECreateProfilePhotoResponse
         * @instance
         */
        ECreateProfilePhotoResponse.prototype.message = "";

        /**
         * Creates a ECreateProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ECreateProfilePhotoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ECreateProfilePhotoResponse} ECreateProfilePhotoResponse
         */
        ECreateProfilePhotoResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ECreateProfilePhotoResponse)
                return object;
            let message = new $root.api.ECreateProfilePhotoResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.ECreateProfilePhotoResponse.data: object expected");
                message.data = $root.api.CreateProfilePhotoResponse.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a ECreateProfilePhotoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ECreateProfilePhotoResponse
         * @static
         * @param {api.ECreateProfilePhotoResponse} message ECreateProfilePhotoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ECreateProfilePhotoResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.CreateProfilePhotoResponse.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this ECreateProfilePhotoResponse to JSON.
         * @function toJSON
         * @memberof api.ECreateProfilePhotoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ECreateProfilePhotoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ECreateProfilePhotoResponse;
    })();

    api.CompleteProfilePhotoRequest = (function() {

        /**
         * Properties of a CompleteProfilePhotoRequest.
         * @memberof api
         * @interface ICompleteProfilePhotoRequest
         */

        /**
         * Constructs a new CompleteProfilePhotoRequest.
         * @memberof api
         * @classdesc Represents a CompleteProfilePhotoRequest.
         * @implements ICompleteProfilePhotoRequest
         * @constructor
         * @param {api.ICompleteProfilePhotoRequest=} [properties] Properties to set
         */
        function CompleteProfilePhotoRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a CompleteProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.CompleteProfilePhotoRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.CompleteProfilePhotoRequest} CompleteProfilePhotoRequest
         */
        CompleteProfilePhotoRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.CompleteProfilePhotoRequest)
                return object;
            return new $root.api.CompleteProfilePhotoRequest();
        };

        /**
         * Creates a plain object from a CompleteProfilePhotoRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.CompleteProfilePhotoRequest
         * @static
         * @param {api.CompleteProfilePhotoRequest} message CompleteProfilePhotoRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CompleteProfilePhotoRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CompleteProfilePhotoRequest to JSON.
         * @function toJSON
         * @memberof api.CompleteProfilePhotoRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CompleteProfilePhotoRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CompleteProfilePhotoRequest;
    })();

    api.ClearProfilePhotoRequest = (function() {

        /**
         * Properties of a ClearProfilePhotoRequest.
         * @memberof api
         * @interface IClearProfilePhotoRequest
         */

        /**
         * Constructs a new ClearProfilePhotoRequest.
         * @memberof api
         * @classdesc Represents a ClearProfilePhotoRequest.
         * @implements IClearProfilePhotoRequest
         * @constructor
         * @param {api.IClearProfilePhotoRequest=} [properties] Properties to set
         */
        function ClearProfilePhotoRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a ClearProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ClearProfilePhotoRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ClearProfilePhotoRequest} ClearProfilePhotoRequest
         */
        ClearProfilePhotoRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ClearProfilePhotoRequest)
                return object;
            return new $root.api.ClearProfilePhotoRequest();
        };

        /**
         * Creates a plain object from a ClearProfilePhotoRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ClearProfilePhotoRequest
         * @static
         * @param {api.ClearProfilePhotoRequest} message ClearProfilePhotoRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClearProfilePhotoRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ClearProfilePhotoRequest to JSON.
         * @function toJSON
         * @memberof api.ClearProfilePhotoRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClearProfilePhotoRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ClearProfilePhotoRequest;
    })();

    api.ClearProfilePhotoResponse = (function() {

        /**
         * Properties of a ClearProfilePhotoResponse.
         * @memberof api
         * @interface IClearProfilePhotoResponse
         */

        /**
         * Constructs a new ClearProfilePhotoResponse.
         * @memberof api
         * @classdesc Represents a ClearProfilePhotoResponse.
         * @implements IClearProfilePhotoResponse
         * @constructor
         * @param {api.IClearProfilePhotoResponse=} [properties] Properties to set
         */
        function ClearProfilePhotoResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a ClearProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.ClearProfilePhotoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.ClearProfilePhotoResponse} ClearProfilePhotoResponse
         */
        ClearProfilePhotoResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.ClearProfilePhotoResponse)
                return object;
            return new $root.api.ClearProfilePhotoResponse();
        };

        /**
         * Creates a plain object from a ClearProfilePhotoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.ClearProfilePhotoResponse
         * @static
         * @param {api.ClearProfilePhotoResponse} message ClearProfilePhotoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClearProfilePhotoResponse.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ClearProfilePhotoResponse to JSON.
         * @function toJSON
         * @memberof api.ClearProfilePhotoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClearProfilePhotoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ClearProfilePhotoResponse;
    })();

    api.EClearProfilePhotoResponse = (function() {

        /**
         * Properties of a EClearProfilePhotoResponse.
         * @memberof api
         * @interface IEClearProfilePhotoResponse
         * @property {number|null} [code] EClearProfilePhotoResponse code
         * @property {api.IClearProfilePhotoResponse|null} [data] EClearProfilePhotoResponse data
         * @property {string|null} [message] EClearProfilePhotoResponse message
         */

        /**
         * Constructs a new EClearProfilePhotoResponse.
         * @memberof api
         * @classdesc Represents a EClearProfilePhotoResponse.
         * @implements IEClearProfilePhotoResponse
         * @constructor
         * @param {api.IEClearProfilePhotoResponse=} [properties] Properties to set
         */
        function EClearProfilePhotoResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EClearProfilePhotoResponse code.
         * @member {number} code
         * @memberof api.EClearProfilePhotoResponse
         * @instance
         */
        EClearProfilePhotoResponse.prototype.code = 0;

        /**
         * EClearProfilePhotoResponse data.
         * @member {api.IClearProfilePhotoResponse|null|undefined} data
         * @memberof api.EClearProfilePhotoResponse
         * @instance
         */
        EClearProfilePhotoResponse.prototype.data = null;

        /**
         * EClearProfilePhotoResponse message.
         * @member {string} message
         * @memberof api.EClearProfilePhotoResponse
         * @instance
         */
        EClearProfilePhotoResponse.prototype.message = "";

        /**
         * Creates a EClearProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof api.EClearProfilePhotoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {api.EClearProfilePhotoResponse} EClearProfilePhotoResponse
         */
        EClearProfilePhotoResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.api.EClearProfilePhotoResponse)
                return object;
            let message = new $root.api.EClearProfilePhotoResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".api.EClearProfilePhotoResponse.data: object expected");
                message.data = $root.api.ClearProfilePhotoResponse.fromObject(object.data);
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a EClearProfilePhotoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof api.EClearProfilePhotoResponse
         * @static
         * @param {api.EClearProfilePhotoResponse} message EClearProfilePhotoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EClearProfilePhotoResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.code = 0;
                object.data = null;
                object.message = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.api.ClearProfilePhotoResponse.toObject(message.data, options);
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this EClearProfilePhotoResponse to JSON.
         * @function toJSON
         * @memberof api.EClearProfilePhotoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EClearProfilePhotoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EClearProfilePhotoResponse;
    })();

    api.apiService = (function() {

        /**
         * Constructs a new apiService service.
         * @memberof api
         * @classdesc Represents an apiService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function apiService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (apiService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = apiService;

        /**
         * Callback as used by {@link api.apiService#login}.
         * @memberof api.apiService
         * @typedef LoginCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.LoginResponse} [response] LoginResponse
         */

        /**
         * Calls Login.
         * @function login
         * @memberof api.apiService
         * @instance
         * @param {api.ILoginRequest} request LoginRequest message or plain object
         * @param {api.apiService.LoginCallback} callback Node-style callback called with the error, if any, and LoginResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.login = function login(request, callback) {
            return this.rpcCall(login, $root.api.LoginRequest, $root.api.LoginResponse, request, callback);
        }, "name", { value: "Login" });

        /**
         * Calls Login.
         * @function login
         * @memberof api.apiService
         * @instance
         * @param {api.ILoginRequest} request LoginRequest message or plain object
         * @returns {Promise<api.LoginResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#createCar}.
         * @memberof api.apiService
         * @typedef CreateCarCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.CarEntity} [response] CarEntity
         */

        /**
         * Calls CreateCar.
         * @function createCar
         * @memberof api.apiService
         * @instance
         * @param {api.ICreateCarRequest} request CreateCarRequest message or plain object
         * @param {api.apiService.CreateCarCallback} callback Node-style callback called with the error, if any, and CarEntity
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.createCar = function createCar(request, callback) {
            return this.rpcCall(createCar, $root.api.CreateCarRequest, $root.api.CarEntity, request, callback);
        }, "name", { value: "CreateCar" });

        /**
         * Calls CreateCar.
         * @function createCar
         * @memberof api.apiService
         * @instance
         * @param {api.ICreateCarRequest} request CreateCarRequest message or plain object
         * @returns {Promise<api.CarEntity>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#getCar}.
         * @memberof api.apiService
         * @typedef GetCarCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.Car} [response] Car
         */

        /**
         * Calls GetCar.
         * @function getCar
         * @memberof api.apiService
         * @instance
         * @param {api.IGetCarRequest} request GetCarRequest message or plain object
         * @param {api.apiService.GetCarCallback} callback Node-style callback called with the error, if any, and Car
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.getCar = function getCar(request, callback) {
            return this.rpcCall(getCar, $root.api.GetCarRequest, $root.api.Car, request, callback);
        }, "name", { value: "GetCar" });

        /**
         * Calls GetCar.
         * @function getCar
         * @memberof api.apiService
         * @instance
         * @param {api.IGetCarRequest} request GetCarRequest message or plain object
         * @returns {Promise<api.Car>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#getCars}.
         * @memberof api.apiService
         * @typedef GetCarsCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.GetCarsRequest} [response] GetCarsRequest
         */

        /**
         * Calls GetCars.
         * @function getCars
         * @memberof api.apiService
         * @instance
         * @param {api.IGetCarsRequest} request GetCarsRequest message or plain object
         * @param {api.apiService.GetCarsCallback} callback Node-style callback called with the error, if any, and GetCarsRequest
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.getCars = function getCars(request, callback) {
            return this.rpcCall(getCars, $root.api.GetCarsRequest, $root.api.GetCarsRequest, request, callback);
        }, "name", { value: "GetCars" });

        /**
         * Calls GetCars.
         * @function getCars
         * @memberof api.apiService
         * @instance
         * @param {api.IGetCarsRequest} request GetCarsRequest message or plain object
         * @returns {Promise<api.GetCarsRequest>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#getProfile}.
         * @memberof api.apiService
         * @typedef GetProfileCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.Profile} [response] Profile
         */

        /**
         * Calls GetProfile.
         * @function getProfile
         * @memberof api.apiService
         * @instance
         * @param {api.IGetProfileRequest} request GetProfileRequest message or plain object
         * @param {api.apiService.GetProfileCallback} callback Node-style callback called with the error, if any, and Profile
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.getProfile = function getProfile(request, callback) {
            return this.rpcCall(getProfile, $root.api.GetProfileRequest, $root.api.Profile, request, callback);
        }, "name", { value: "GetProfile" });

        /**
         * Calls GetProfile.
         * @function getProfile
         * @memberof api.apiService
         * @instance
         * @param {api.IGetProfileRequest} request GetProfileRequest message or plain object
         * @returns {Promise<api.Profile>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#submitProfile}.
         * @memberof api.apiService
         * @typedef SubmitProfileCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.Profile} [response] Profile
         */

        /**
         * Calls SubmitProfile.
         * @function submitProfile
         * @memberof api.apiService
         * @instance
         * @param {api.ISubmitProfileRequest} request SubmitProfileRequest message or plain object
         * @param {api.apiService.SubmitProfileCallback} callback Node-style callback called with the error, if any, and Profile
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.submitProfile = function submitProfile(request, callback) {
            return this.rpcCall(submitProfile, $root.api.SubmitProfileRequest, $root.api.Profile, request, callback);
        }, "name", { value: "SubmitProfile" });

        /**
         * Calls SubmitProfile.
         * @function submitProfile
         * @memberof api.apiService
         * @instance
         * @param {api.ISubmitProfileRequest} request SubmitProfileRequest message or plain object
         * @returns {Promise<api.Profile>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#clearProfile}.
         * @memberof api.apiService
         * @typedef ClearProfileCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.Profile} [response] Profile
         */

        /**
         * Calls ClearProfile.
         * @function clearProfile
         * @memberof api.apiService
         * @instance
         * @param {api.IClearProfileRequest} request ClearProfileRequest message or plain object
         * @param {api.apiService.ClearProfileCallback} callback Node-style callback called with the error, if any, and Profile
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.clearProfile = function clearProfile(request, callback) {
            return this.rpcCall(clearProfile, $root.api.ClearProfileRequest, $root.api.Profile, request, callback);
        }, "name", { value: "ClearProfile" });

        /**
         * Calls ClearProfile.
         * @function clearProfile
         * @memberof api.apiService
         * @instance
         * @param {api.IClearProfileRequest} request ClearProfileRequest message or plain object
         * @returns {Promise<api.Profile>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#getProfilePhoto}.
         * @memberof api.apiService
         * @typedef GetProfilePhotoCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.GetProfilePhotoResponse} [response] GetProfilePhotoResponse
         */

        /**
         * Calls GetProfilePhoto.
         * @function getProfilePhoto
         * @memberof api.apiService
         * @instance
         * @param {api.IGetProfilePhotoRequest} request GetProfilePhotoRequest message or plain object
         * @param {api.apiService.GetProfilePhotoCallback} callback Node-style callback called with the error, if any, and GetProfilePhotoResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.getProfilePhoto = function getProfilePhoto(request, callback) {
            return this.rpcCall(getProfilePhoto, $root.api.GetProfilePhotoRequest, $root.api.GetProfilePhotoResponse, request, callback);
        }, "name", { value: "GetProfilePhoto" });

        /**
         * Calls GetProfilePhoto.
         * @function getProfilePhoto
         * @memberof api.apiService
         * @instance
         * @param {api.IGetProfilePhotoRequest} request GetProfilePhotoRequest message or plain object
         * @returns {Promise<api.GetProfilePhotoResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#createProfilePhoto}.
         * @memberof api.apiService
         * @typedef CreateProfilePhotoCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.CreateProfilePhotoResponse} [response] CreateProfilePhotoResponse
         */

        /**
         * Calls CreateProfilePhoto.
         * @function createProfilePhoto
         * @memberof api.apiService
         * @instance
         * @param {api.ICreateProfilePhotoRequest} request CreateProfilePhotoRequest message or plain object
         * @param {api.apiService.CreateProfilePhotoCallback} callback Node-style callback called with the error, if any, and CreateProfilePhotoResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.createProfilePhoto = function createProfilePhoto(request, callback) {
            return this.rpcCall(createProfilePhoto, $root.api.CreateProfilePhotoRequest, $root.api.CreateProfilePhotoResponse, request, callback);
        }, "name", { value: "CreateProfilePhoto" });

        /**
         * Calls CreateProfilePhoto.
         * @function createProfilePhoto
         * @memberof api.apiService
         * @instance
         * @param {api.ICreateProfilePhotoRequest} request CreateProfilePhotoRequest message or plain object
         * @returns {Promise<api.CreateProfilePhotoResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#completeProfilePhoto}.
         * @memberof api.apiService
         * @typedef CompleteProfilePhotoCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.Identity} [response] Identity
         */

        /**
         * Calls CompleteProfilePhoto.
         * @function completeProfilePhoto
         * @memberof api.apiService
         * @instance
         * @param {api.ICompleteProfilePhotoRequest} request CompleteProfilePhotoRequest message or plain object
         * @param {api.apiService.CompleteProfilePhotoCallback} callback Node-style callback called with the error, if any, and Identity
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.completeProfilePhoto = function completeProfilePhoto(request, callback) {
            return this.rpcCall(completeProfilePhoto, $root.api.CompleteProfilePhotoRequest, $root.api.Identity, request, callback);
        }, "name", { value: "CompleteProfilePhoto" });

        /**
         * Calls CompleteProfilePhoto.
         * @function completeProfilePhoto
         * @memberof api.apiService
         * @instance
         * @param {api.ICompleteProfilePhotoRequest} request CompleteProfilePhotoRequest message or plain object
         * @returns {Promise<api.Identity>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#clearProfilePhoto}.
         * @memberof api.apiService
         * @typedef ClearProfilePhotoCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.ClearProfilePhotoResponse} [response] ClearProfilePhotoResponse
         */

        /**
         * Calls ClearProfilePhoto.
         * @function clearProfilePhoto
         * @memberof api.apiService
         * @instance
         * @param {api.IClearProfilePhotoRequest} request ClearProfilePhotoRequest message or plain object
         * @param {api.apiService.ClearProfilePhotoCallback} callback Node-style callback called with the error, if any, and ClearProfilePhotoResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.clearProfilePhoto = function clearProfilePhoto(request, callback) {
            return this.rpcCall(clearProfilePhoto, $root.api.ClearProfilePhotoRequest, $root.api.ClearProfilePhotoResponse, request, callback);
        }, "name", { value: "ClearProfilePhoto" });

        /**
         * Calls ClearProfilePhoto.
         * @function clearProfilePhoto
         * @memberof api.apiService
         * @instance
         * @param {api.IClearProfilePhotoRequest} request ClearProfilePhotoRequest message or plain object
         * @returns {Promise<api.ClearProfilePhotoResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#createTrip}.
         * @memberof api.apiService
         * @typedef CreateTripCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.TripEntity} [response] TripEntity
         */

        /**
         * Calls CreateTrip.
         * @function createTrip
         * @memberof api.apiService
         * @instance
         * @param {api.ICreateTripRequest} request CreateTripRequest message or plain object
         * @param {api.apiService.CreateTripCallback} callback Node-style callback called with the error, if any, and TripEntity
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.createTrip = function createTrip(request, callback) {
            return this.rpcCall(createTrip, $root.api.CreateTripRequest, $root.api.TripEntity, request, callback);
        }, "name", { value: "CreateTrip" });

        /**
         * Calls CreateTrip.
         * @function createTrip
         * @memberof api.apiService
         * @instance
         * @param {api.ICreateTripRequest} request CreateTripRequest message or plain object
         * @returns {Promise<api.TripEntity>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#getTrip}.
         * @memberof api.apiService
         * @typedef GetTripCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.Trip} [response] Trip
         */

        /**
         * Calls GetTrip.
         * @function getTrip
         * @memberof api.apiService
         * @instance
         * @param {api.IGetTripRequest} request GetTripRequest message or plain object
         * @param {api.apiService.GetTripCallback} callback Node-style callback called with the error, if any, and Trip
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.getTrip = function getTrip(request, callback) {
            return this.rpcCall(getTrip, $root.api.GetTripRequest, $root.api.Trip, request, callback);
        }, "name", { value: "GetTrip" });

        /**
         * Calls GetTrip.
         * @function getTrip
         * @memberof api.apiService
         * @instance
         * @param {api.IGetTripRequest} request GetTripRequest message or plain object
         * @returns {Promise<api.Trip>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#getTrips}.
         * @memberof api.apiService
         * @typedef GetTripsCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.GetTripsResponse} [response] GetTripsResponse
         */

        /**
         * Calls GetTrips.
         * @function getTrips
         * @memberof api.apiService
         * @instance
         * @param {api.IGetTripsRequest} request GetTripsRequest message or plain object
         * @param {api.apiService.GetTripsCallback} callback Node-style callback called with the error, if any, and GetTripsResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.getTrips = function getTrips(request, callback) {
            return this.rpcCall(getTrips, $root.api.GetTripsRequest, $root.api.GetTripsResponse, request, callback);
        }, "name", { value: "GetTrips" });

        /**
         * Calls GetTrips.
         * @function getTrips
         * @memberof api.apiService
         * @instance
         * @param {api.IGetTripsRequest} request GetTripsRequest message or plain object
         * @returns {Promise<api.GetTripsResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link api.apiService#updateTrip}.
         * @memberof api.apiService
         * @typedef UpdateTripCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {api.Trip} [response] Trip
         */

        /**
         * Calls UpdateTrip.
         * @function updateTrip
         * @memberof api.apiService
         * @instance
         * @param {api.IUpdateTripRequest} request UpdateTripRequest message or plain object
         * @param {api.apiService.UpdateTripCallback} callback Node-style callback called with the error, if any, and Trip
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(apiService.prototype.updateTrip = function updateTrip(request, callback) {
            return this.rpcCall(updateTrip, $root.api.UpdateTripRequest, $root.api.Trip, request, callback);
        }, "name", { value: "UpdateTrip" });

        /**
         * Calls UpdateTrip.
         * @function updateTrip
         * @memberof api.apiService
         * @instance
         * @param {api.IUpdateTripRequest} request UpdateTripRequest message or plain object
         * @returns {Promise<api.Trip>} Promise
         * @variation 2
         */

        return apiService;
    })();

    return api;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.FileDescriptorSet = (function() {

            /**
             * Properties of a FileDescriptorSet.
             * @memberof google.protobuf
             * @interface IFileDescriptorSet
             * @property {Array.<google.protobuf.IFileDescriptorProto>|null} [file] FileDescriptorSet file
             */

            /**
             * Constructs a new FileDescriptorSet.
             * @memberof google.protobuf
             * @classdesc Represents a FileDescriptorSet.
             * @implements IFileDescriptorSet
             * @constructor
             * @param {google.protobuf.IFileDescriptorSet=} [properties] Properties to set
             */
            function FileDescriptorSet(properties) {
                this.file = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FileDescriptorSet file.
             * @member {Array.<google.protobuf.IFileDescriptorProto>} file
             * @memberof google.protobuf.FileDescriptorSet
             * @instance
             */
            FileDescriptorSet.prototype.file = $util.emptyArray;

            /**
             * Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */
            FileDescriptorSet.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.FileDescriptorSet)
                    return object;
                let message = new $root.google.protobuf.FileDescriptorSet();
                if (object.file) {
                    if (!Array.isArray(object.file))
                        throw TypeError(".google.protobuf.FileDescriptorSet.file: array expected");
                    message.file = [];
                    for (let i = 0; i < object.file.length; ++i) {
                        if (typeof object.file[i] !== "object")
                            throw TypeError(".google.protobuf.FileDescriptorSet.file: object expected");
                        message.file[i] = $root.google.protobuf.FileDescriptorProto.fromObject(object.file[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {google.protobuf.FileDescriptorSet} message FileDescriptorSet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FileDescriptorSet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.file = [];
                if (message.file && message.file.length) {
                    object.file = [];
                    for (let j = 0; j < message.file.length; ++j)
                        object.file[j] = $root.google.protobuf.FileDescriptorProto.toObject(message.file[j], options);
                }
                return object;
            };

            /**
             * Converts this FileDescriptorSet to JSON.
             * @function toJSON
             * @memberof google.protobuf.FileDescriptorSet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FileDescriptorSet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FileDescriptorSet;
        })();

        protobuf.FileDescriptorProto = (function() {

            /**
             * Properties of a FileDescriptorProto.
             * @memberof google.protobuf
             * @interface IFileDescriptorProto
             * @property {string|null} [name] FileDescriptorProto name
             * @property {string|null} ["package"] FileDescriptorProto package
             * @property {Array.<string>|null} [dependency] FileDescriptorProto dependency
             * @property {Array.<number>|null} [publicDependency] FileDescriptorProto publicDependency
             * @property {Array.<number>|null} [weakDependency] FileDescriptorProto weakDependency
             * @property {Array.<google.protobuf.IDescriptorProto>|null} [messageType] FileDescriptorProto messageType
             * @property {Array.<google.protobuf.IEnumDescriptorProto>|null} [enumType] FileDescriptorProto enumType
             * @property {Array.<google.protobuf.IServiceDescriptorProto>|null} [service] FileDescriptorProto service
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [extension] FileDescriptorProto extension
             * @property {google.protobuf.IFileOptions|null} [options] FileDescriptorProto options
             * @property {google.protobuf.ISourceCodeInfo|null} [sourceCodeInfo] FileDescriptorProto sourceCodeInfo
             * @property {string|null} [syntax] FileDescriptorProto syntax
             */

            /**
             * Constructs a new FileDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a FileDescriptorProto.
             * @implements IFileDescriptorProto
             * @constructor
             * @param {google.protobuf.IFileDescriptorProto=} [properties] Properties to set
             */
            function FileDescriptorProto(properties) {
                this.dependency = [];
                this.publicDependency = [];
                this.weakDependency = [];
                this.messageType = [];
                this.enumType = [];
                this.service = [];
                this.extension = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FileDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.name = "";

            /**
             * FileDescriptorProto package.
             * @member {string} package
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype["package"] = "";

            /**
             * FileDescriptorProto dependency.
             * @member {Array.<string>} dependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.dependency = $util.emptyArray;

            /**
             * FileDescriptorProto publicDependency.
             * @member {Array.<number>} publicDependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.publicDependency = $util.emptyArray;

            /**
             * FileDescriptorProto weakDependency.
             * @member {Array.<number>} weakDependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.weakDependency = $util.emptyArray;

            /**
             * FileDescriptorProto messageType.
             * @member {Array.<google.protobuf.IDescriptorProto>} messageType
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.messageType = $util.emptyArray;

            /**
             * FileDescriptorProto enumType.
             * @member {Array.<google.protobuf.IEnumDescriptorProto>} enumType
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.enumType = $util.emptyArray;

            /**
             * FileDescriptorProto service.
             * @member {Array.<google.protobuf.IServiceDescriptorProto>} service
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.service = $util.emptyArray;

            /**
             * FileDescriptorProto extension.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} extension
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.extension = $util.emptyArray;

            /**
             * FileDescriptorProto options.
             * @member {google.protobuf.IFileOptions|null|undefined} options
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.options = null;

            /**
             * FileDescriptorProto sourceCodeInfo.
             * @member {google.protobuf.ISourceCodeInfo|null|undefined} sourceCodeInfo
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.sourceCodeInfo = null;

            /**
             * FileDescriptorProto syntax.
             * @member {string} syntax
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */
            FileDescriptorProto.prototype.syntax = "";

            /**
             * Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */
            FileDescriptorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.FileDescriptorProto)
                    return object;
                let message = new $root.google.protobuf.FileDescriptorProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object["package"] != null)
                    message["package"] = String(object["package"]);
                if (object.dependency) {
                    if (!Array.isArray(object.dependency))
                        throw TypeError(".google.protobuf.FileDescriptorProto.dependency: array expected");
                    message.dependency = [];
                    for (let i = 0; i < object.dependency.length; ++i)
                        message.dependency[i] = String(object.dependency[i]);
                }
                if (object.publicDependency) {
                    if (!Array.isArray(object.publicDependency))
                        throw TypeError(".google.protobuf.FileDescriptorProto.publicDependency: array expected");
                    message.publicDependency = [];
                    for (let i = 0; i < object.publicDependency.length; ++i)
                        message.publicDependency[i] = object.publicDependency[i] | 0;
                }
                if (object.weakDependency) {
                    if (!Array.isArray(object.weakDependency))
                        throw TypeError(".google.protobuf.FileDescriptorProto.weakDependency: array expected");
                    message.weakDependency = [];
                    for (let i = 0; i < object.weakDependency.length; ++i)
                        message.weakDependency[i] = object.weakDependency[i] | 0;
                }
                if (object.messageType) {
                    if (!Array.isArray(object.messageType))
                        throw TypeError(".google.protobuf.FileDescriptorProto.messageType: array expected");
                    message.messageType = [];
                    for (let i = 0; i < object.messageType.length; ++i) {
                        if (typeof object.messageType[i] !== "object")
                            throw TypeError(".google.protobuf.FileDescriptorProto.messageType: object expected");
                        message.messageType[i] = $root.google.protobuf.DescriptorProto.fromObject(object.messageType[i]);
                    }
                }
                if (object.enumType) {
                    if (!Array.isArray(object.enumType))
                        throw TypeError(".google.protobuf.FileDescriptorProto.enumType: array expected");
                    message.enumType = [];
                    for (let i = 0; i < object.enumType.length; ++i) {
                        if (typeof object.enumType[i] !== "object")
                            throw TypeError(".google.protobuf.FileDescriptorProto.enumType: object expected");
                        message.enumType[i] = $root.google.protobuf.EnumDescriptorProto.fromObject(object.enumType[i]);
                    }
                }
                if (object.service) {
                    if (!Array.isArray(object.service))
                        throw TypeError(".google.protobuf.FileDescriptorProto.service: array expected");
                    message.service = [];
                    for (let i = 0; i < object.service.length; ++i) {
                        if (typeof object.service[i] !== "object")
                            throw TypeError(".google.protobuf.FileDescriptorProto.service: object expected");
                        message.service[i] = $root.google.protobuf.ServiceDescriptorProto.fromObject(object.service[i]);
                    }
                }
                if (object.extension) {
                    if (!Array.isArray(object.extension))
                        throw TypeError(".google.protobuf.FileDescriptorProto.extension: array expected");
                    message.extension = [];
                    for (let i = 0; i < object.extension.length; ++i) {
                        if (typeof object.extension[i] !== "object")
                            throw TypeError(".google.protobuf.FileDescriptorProto.extension: object expected");
                        message.extension[i] = $root.google.protobuf.FieldDescriptorProto.fromObject(object.extension[i]);
                    }
                }
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".google.protobuf.FileDescriptorProto.options: object expected");
                    message.options = $root.google.protobuf.FileOptions.fromObject(object.options);
                }
                if (object.sourceCodeInfo != null) {
                    if (typeof object.sourceCodeInfo !== "object")
                        throw TypeError(".google.protobuf.FileDescriptorProto.sourceCodeInfo: object expected");
                    message.sourceCodeInfo = $root.google.protobuf.SourceCodeInfo.fromObject(object.sourceCodeInfo);
                }
                if (object.syntax != null)
                    message.syntax = String(object.syntax);
                return message;
            };

            /**
             * Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {google.protobuf.FileDescriptorProto} message FileDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FileDescriptorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.dependency = [];
                    object.messageType = [];
                    object.enumType = [];
                    object.service = [];
                    object.extension = [];
                    object.publicDependency = [];
                    object.weakDependency = [];
                }
                if (options.defaults) {
                    object.name = "";
                    object["package"] = "";
                    object.options = null;
                    object.sourceCodeInfo = null;
                    object.syntax = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message["package"] != null && message.hasOwnProperty("package"))
                    object["package"] = message["package"];
                if (message.dependency && message.dependency.length) {
                    object.dependency = [];
                    for (let j = 0; j < message.dependency.length; ++j)
                        object.dependency[j] = message.dependency[j];
                }
                if (message.messageType && message.messageType.length) {
                    object.messageType = [];
                    for (let j = 0; j < message.messageType.length; ++j)
                        object.messageType[j] = $root.google.protobuf.DescriptorProto.toObject(message.messageType[j], options);
                }
                if (message.enumType && message.enumType.length) {
                    object.enumType = [];
                    for (let j = 0; j < message.enumType.length; ++j)
                        object.enumType[j] = $root.google.protobuf.EnumDescriptorProto.toObject(message.enumType[j], options);
                }
                if (message.service && message.service.length) {
                    object.service = [];
                    for (let j = 0; j < message.service.length; ++j)
                        object.service[j] = $root.google.protobuf.ServiceDescriptorProto.toObject(message.service[j], options);
                }
                if (message.extension && message.extension.length) {
                    object.extension = [];
                    for (let j = 0; j < message.extension.length; ++j)
                        object.extension[j] = $root.google.protobuf.FieldDescriptorProto.toObject(message.extension[j], options);
                }
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.google.protobuf.FileOptions.toObject(message.options, options);
                if (message.sourceCodeInfo != null && message.hasOwnProperty("sourceCodeInfo"))
                    object.sourceCodeInfo = $root.google.protobuf.SourceCodeInfo.toObject(message.sourceCodeInfo, options);
                if (message.publicDependency && message.publicDependency.length) {
                    object.publicDependency = [];
                    for (let j = 0; j < message.publicDependency.length; ++j)
                        object.publicDependency[j] = message.publicDependency[j];
                }
                if (message.weakDependency && message.weakDependency.length) {
                    object.weakDependency = [];
                    for (let j = 0; j < message.weakDependency.length; ++j)
                        object.weakDependency[j] = message.weakDependency[j];
                }
                if (message.syntax != null && message.hasOwnProperty("syntax"))
                    object.syntax = message.syntax;
                return object;
            };

            /**
             * Converts this FileDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FileDescriptorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FileDescriptorProto;
        })();

        protobuf.DescriptorProto = (function() {

            /**
             * Properties of a DescriptorProto.
             * @memberof google.protobuf
             * @interface IDescriptorProto
             * @property {string|null} [name] DescriptorProto name
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [field] DescriptorProto field
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [extension] DescriptorProto extension
             * @property {Array.<google.protobuf.IDescriptorProto>|null} [nestedType] DescriptorProto nestedType
             * @property {Array.<google.protobuf.IEnumDescriptorProto>|null} [enumType] DescriptorProto enumType
             * @property {Array.<google.protobuf.DescriptorProto.IExtensionRange>|null} [extensionRange] DescriptorProto extensionRange
             * @property {Array.<google.protobuf.IOneofDescriptorProto>|null} [oneofDecl] DescriptorProto oneofDecl
             * @property {google.protobuf.IMessageOptions|null} [options] DescriptorProto options
             * @property {Array.<google.protobuf.DescriptorProto.IReservedRange>|null} [reservedRange] DescriptorProto reservedRange
             * @property {Array.<string>|null} [reservedName] DescriptorProto reservedName
             */

            /**
             * Constructs a new DescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a DescriptorProto.
             * @implements IDescriptorProto
             * @constructor
             * @param {google.protobuf.IDescriptorProto=} [properties] Properties to set
             */
            function DescriptorProto(properties) {
                this.field = [];
                this.extension = [];
                this.nestedType = [];
                this.enumType = [];
                this.extensionRange = [];
                this.oneofDecl = [];
                this.reservedRange = [];
                this.reservedName = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.name = "";

            /**
             * DescriptorProto field.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} field
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.field = $util.emptyArray;

            /**
             * DescriptorProto extension.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} extension
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.extension = $util.emptyArray;

            /**
             * DescriptorProto nestedType.
             * @member {Array.<google.protobuf.IDescriptorProto>} nestedType
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.nestedType = $util.emptyArray;

            /**
             * DescriptorProto enumType.
             * @member {Array.<google.protobuf.IEnumDescriptorProto>} enumType
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.enumType = $util.emptyArray;

            /**
             * DescriptorProto extensionRange.
             * @member {Array.<google.protobuf.DescriptorProto.IExtensionRange>} extensionRange
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.extensionRange = $util.emptyArray;

            /**
             * DescriptorProto oneofDecl.
             * @member {Array.<google.protobuf.IOneofDescriptorProto>} oneofDecl
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.oneofDecl = $util.emptyArray;

            /**
             * DescriptorProto options.
             * @member {google.protobuf.IMessageOptions|null|undefined} options
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.options = null;

            /**
             * DescriptorProto reservedRange.
             * @member {Array.<google.protobuf.DescriptorProto.IReservedRange>} reservedRange
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.reservedRange = $util.emptyArray;

            /**
             * DescriptorProto reservedName.
             * @member {Array.<string>} reservedName
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */
            DescriptorProto.prototype.reservedName = $util.emptyArray;

            /**
             * Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */
            DescriptorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.DescriptorProto)
                    return object;
                let message = new $root.google.protobuf.DescriptorProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.field) {
                    if (!Array.isArray(object.field))
                        throw TypeError(".google.protobuf.DescriptorProto.field: array expected");
                    message.field = [];
                    for (let i = 0; i < object.field.length; ++i) {
                        if (typeof object.field[i] !== "object")
                            throw TypeError(".google.protobuf.DescriptorProto.field: object expected");
                        message.field[i] = $root.google.protobuf.FieldDescriptorProto.fromObject(object.field[i]);
                    }
                }
                if (object.extension) {
                    if (!Array.isArray(object.extension))
                        throw TypeError(".google.protobuf.DescriptorProto.extension: array expected");
                    message.extension = [];
                    for (let i = 0; i < object.extension.length; ++i) {
                        if (typeof object.extension[i] !== "object")
                            throw TypeError(".google.protobuf.DescriptorProto.extension: object expected");
                        message.extension[i] = $root.google.protobuf.FieldDescriptorProto.fromObject(object.extension[i]);
                    }
                }
                if (object.nestedType) {
                    if (!Array.isArray(object.nestedType))
                        throw TypeError(".google.protobuf.DescriptorProto.nestedType: array expected");
                    message.nestedType = [];
                    for (let i = 0; i < object.nestedType.length; ++i) {
                        if (typeof object.nestedType[i] !== "object")
                            throw TypeError(".google.protobuf.DescriptorProto.nestedType: object expected");
                        message.nestedType[i] = $root.google.protobuf.DescriptorProto.fromObject(object.nestedType[i]);
                    }
                }
                if (object.enumType) {
                    if (!Array.isArray(object.enumType))
                        throw TypeError(".google.protobuf.DescriptorProto.enumType: array expected");
                    message.enumType = [];
                    for (let i = 0; i < object.enumType.length; ++i) {
                        if (typeof object.enumType[i] !== "object")
                            throw TypeError(".google.protobuf.DescriptorProto.enumType: object expected");
                        message.enumType[i] = $root.google.protobuf.EnumDescriptorProto.fromObject(object.enumType[i]);
                    }
                }
                if (object.extensionRange) {
                    if (!Array.isArray(object.extensionRange))
                        throw TypeError(".google.protobuf.DescriptorProto.extensionRange: array expected");
                    message.extensionRange = [];
                    for (let i = 0; i < object.extensionRange.length; ++i) {
                        if (typeof object.extensionRange[i] !== "object")
                            throw TypeError(".google.protobuf.DescriptorProto.extensionRange: object expected");
                        message.extensionRange[i] = $root.google.protobuf.DescriptorProto.ExtensionRange.fromObject(object.extensionRange[i]);
                    }
                }
                if (object.oneofDecl) {
                    if (!Array.isArray(object.oneofDecl))
                        throw TypeError(".google.protobuf.DescriptorProto.oneofDecl: array expected");
                    message.oneofDecl = [];
                    for (let i = 0; i < object.oneofDecl.length; ++i) {
                        if (typeof object.oneofDecl[i] !== "object")
                            throw TypeError(".google.protobuf.DescriptorProto.oneofDecl: object expected");
                        message.oneofDecl[i] = $root.google.protobuf.OneofDescriptorProto.fromObject(object.oneofDecl[i]);
                    }
                }
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".google.protobuf.DescriptorProto.options: object expected");
                    message.options = $root.google.protobuf.MessageOptions.fromObject(object.options);
                }
                if (object.reservedRange) {
                    if (!Array.isArray(object.reservedRange))
                        throw TypeError(".google.protobuf.DescriptorProto.reservedRange: array expected");
                    message.reservedRange = [];
                    for (let i = 0; i < object.reservedRange.length; ++i) {
                        if (typeof object.reservedRange[i] !== "object")
                            throw TypeError(".google.protobuf.DescriptorProto.reservedRange: object expected");
                        message.reservedRange[i] = $root.google.protobuf.DescriptorProto.ReservedRange.fromObject(object.reservedRange[i]);
                    }
                }
                if (object.reservedName) {
                    if (!Array.isArray(object.reservedName))
                        throw TypeError(".google.protobuf.DescriptorProto.reservedName: array expected");
                    message.reservedName = [];
                    for (let i = 0; i < object.reservedName.length; ++i)
                        message.reservedName[i] = String(object.reservedName[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {google.protobuf.DescriptorProto} message DescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DescriptorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.field = [];
                    object.nestedType = [];
                    object.enumType = [];
                    object.extensionRange = [];
                    object.extension = [];
                    object.oneofDecl = [];
                    object.reservedRange = [];
                    object.reservedName = [];
                }
                if (options.defaults) {
                    object.name = "";
                    object.options = null;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.field && message.field.length) {
                    object.field = [];
                    for (let j = 0; j < message.field.length; ++j)
                        object.field[j] = $root.google.protobuf.FieldDescriptorProto.toObject(message.field[j], options);
                }
                if (message.nestedType && message.nestedType.length) {
                    object.nestedType = [];
                    for (let j = 0; j < message.nestedType.length; ++j)
                        object.nestedType[j] = $root.google.protobuf.DescriptorProto.toObject(message.nestedType[j], options);
                }
                if (message.enumType && message.enumType.length) {
                    object.enumType = [];
                    for (let j = 0; j < message.enumType.length; ++j)
                        object.enumType[j] = $root.google.protobuf.EnumDescriptorProto.toObject(message.enumType[j], options);
                }
                if (message.extensionRange && message.extensionRange.length) {
                    object.extensionRange = [];
                    for (let j = 0; j < message.extensionRange.length; ++j)
                        object.extensionRange[j] = $root.google.protobuf.DescriptorProto.ExtensionRange.toObject(message.extensionRange[j], options);
                }
                if (message.extension && message.extension.length) {
                    object.extension = [];
                    for (let j = 0; j < message.extension.length; ++j)
                        object.extension[j] = $root.google.protobuf.FieldDescriptorProto.toObject(message.extension[j], options);
                }
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.google.protobuf.MessageOptions.toObject(message.options, options);
                if (message.oneofDecl && message.oneofDecl.length) {
                    object.oneofDecl = [];
                    for (let j = 0; j < message.oneofDecl.length; ++j)
                        object.oneofDecl[j] = $root.google.protobuf.OneofDescriptorProto.toObject(message.oneofDecl[j], options);
                }
                if (message.reservedRange && message.reservedRange.length) {
                    object.reservedRange = [];
                    for (let j = 0; j < message.reservedRange.length; ++j)
                        object.reservedRange[j] = $root.google.protobuf.DescriptorProto.ReservedRange.toObject(message.reservedRange[j], options);
                }
                if (message.reservedName && message.reservedName.length) {
                    object.reservedName = [];
                    for (let j = 0; j < message.reservedName.length; ++j)
                        object.reservedName[j] = message.reservedName[j];
                }
                return object;
            };

            /**
             * Converts this DescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.DescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DescriptorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            DescriptorProto.ExtensionRange = (function() {

                /**
                 * Properties of an ExtensionRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @interface IExtensionRange
                 * @property {number|null} [start] ExtensionRange start
                 * @property {number|null} [end] ExtensionRange end
                 */

                /**
                 * Constructs a new ExtensionRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @classdesc Represents an ExtensionRange.
                 * @implements IExtensionRange
                 * @constructor
                 * @param {google.protobuf.DescriptorProto.IExtensionRange=} [properties] Properties to set
                 */
                function ExtensionRange(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ExtensionRange start.
                 * @member {number} start
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @instance
                 */
                ExtensionRange.prototype.start = 0;

                /**
                 * ExtensionRange end.
                 * @member {number} end
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @instance
                 */
                ExtensionRange.prototype.end = 0;

                /**
                 * Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */
                ExtensionRange.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.DescriptorProto.ExtensionRange)
                        return object;
                    let message = new $root.google.protobuf.DescriptorProto.ExtensionRange();
                    if (object.start != null)
                        message.start = object.start | 0;
                    if (object.end != null)
                        message.end = object.end | 0;
                    return message;
                };

                /**
                 * Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.ExtensionRange} message ExtensionRange
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ExtensionRange.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.start = 0;
                        object.end = 0;
                    }
                    if (message.start != null && message.hasOwnProperty("start"))
                        object.start = message.start;
                    if (message.end != null && message.hasOwnProperty("end"))
                        object.end = message.end;
                    return object;
                };

                /**
                 * Converts this ExtensionRange to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ExtensionRange.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ExtensionRange;
            })();

            DescriptorProto.ReservedRange = (function() {

                /**
                 * Properties of a ReservedRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @interface IReservedRange
                 * @property {number|null} [start] ReservedRange start
                 * @property {number|null} [end] ReservedRange end
                 */

                /**
                 * Constructs a new ReservedRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @classdesc Represents a ReservedRange.
                 * @implements IReservedRange
                 * @constructor
                 * @param {google.protobuf.DescriptorProto.IReservedRange=} [properties] Properties to set
                 */
                function ReservedRange(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ReservedRange start.
                 * @member {number} start
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @instance
                 */
                ReservedRange.prototype.start = 0;

                /**
                 * ReservedRange end.
                 * @member {number} end
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @instance
                 */
                ReservedRange.prototype.end = 0;

                /**
                 * Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */
                ReservedRange.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.DescriptorProto.ReservedRange)
                        return object;
                    let message = new $root.google.protobuf.DescriptorProto.ReservedRange();
                    if (object.start != null)
                        message.start = object.start | 0;
                    if (object.end != null)
                        message.end = object.end | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ReservedRange message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.ReservedRange} message ReservedRange
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ReservedRange.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.start = 0;
                        object.end = 0;
                    }
                    if (message.start != null && message.hasOwnProperty("start"))
                        object.start = message.start;
                    if (message.end != null && message.hasOwnProperty("end"))
                        object.end = message.end;
                    return object;
                };

                /**
                 * Converts this ReservedRange to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ReservedRange.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ReservedRange;
            })();

            return DescriptorProto;
        })();

        protobuf.FieldDescriptorProto = (function() {

            /**
             * Properties of a FieldDescriptorProto.
             * @memberof google.protobuf
             * @interface IFieldDescriptorProto
             * @property {string|null} [name] FieldDescriptorProto name
             * @property {number|null} [number] FieldDescriptorProto number
             * @property {google.protobuf.FieldDescriptorProto.Label|null} [label] FieldDescriptorProto label
             * @property {google.protobuf.FieldDescriptorProto.Type|null} [type] FieldDescriptorProto type
             * @property {string|null} [typeName] FieldDescriptorProto typeName
             * @property {string|null} [extendee] FieldDescriptorProto extendee
             * @property {string|null} [defaultValue] FieldDescriptorProto defaultValue
             * @property {number|null} [oneofIndex] FieldDescriptorProto oneofIndex
             * @property {string|null} [jsonName] FieldDescriptorProto jsonName
             * @property {google.protobuf.IFieldOptions|null} [options] FieldDescriptorProto options
             */

            /**
             * Constructs a new FieldDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a FieldDescriptorProto.
             * @implements IFieldDescriptorProto
             * @constructor
             * @param {google.protobuf.IFieldDescriptorProto=} [properties] Properties to set
             */
            function FieldDescriptorProto(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FieldDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.name = "";

            /**
             * FieldDescriptorProto number.
             * @member {number} number
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.number = 0;

            /**
             * FieldDescriptorProto label.
             * @member {google.protobuf.FieldDescriptorProto.Label} label
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.label = 1;

            /**
             * FieldDescriptorProto type.
             * @member {google.protobuf.FieldDescriptorProto.Type} type
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.type = 1;

            /**
             * FieldDescriptorProto typeName.
             * @member {string} typeName
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.typeName = "";

            /**
             * FieldDescriptorProto extendee.
             * @member {string} extendee
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.extendee = "";

            /**
             * FieldDescriptorProto defaultValue.
             * @member {string} defaultValue
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.defaultValue = "";

            /**
             * FieldDescriptorProto oneofIndex.
             * @member {number} oneofIndex
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.oneofIndex = 0;

            /**
             * FieldDescriptorProto jsonName.
             * @member {string} jsonName
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.jsonName = "";

            /**
             * FieldDescriptorProto options.
             * @member {google.protobuf.IFieldOptions|null|undefined} options
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */
            FieldDescriptorProto.prototype.options = null;

            /**
             * Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */
            FieldDescriptorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.FieldDescriptorProto)
                    return object;
                let message = new $root.google.protobuf.FieldDescriptorProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.number != null)
                    message.number = object.number | 0;
                switch (object.label) {
                case "LABEL_OPTIONAL":
                case 1:
                    message.label = 1;
                    break;
                case "LABEL_REQUIRED":
                case 2:
                    message.label = 2;
                    break;
                case "LABEL_REPEATED":
                case 3:
                    message.label = 3;
                    break;
                }
                switch (object.type) {
                case "TYPE_DOUBLE":
                case 1:
                    message.type = 1;
                    break;
                case "TYPE_FLOAT":
                case 2:
                    message.type = 2;
                    break;
                case "TYPE_INT64":
                case 3:
                    message.type = 3;
                    break;
                case "TYPE_UINT64":
                case 4:
                    message.type = 4;
                    break;
                case "TYPE_INT32":
                case 5:
                    message.type = 5;
                    break;
                case "TYPE_FIXED64":
                case 6:
                    message.type = 6;
                    break;
                case "TYPE_FIXED32":
                case 7:
                    message.type = 7;
                    break;
                case "TYPE_BOOL":
                case 8:
                    message.type = 8;
                    break;
                case "TYPE_STRING":
                case 9:
                    message.type = 9;
                    break;
                case "TYPE_GROUP":
                case 10:
                    message.type = 10;
                    break;
                case "TYPE_MESSAGE":
                case 11:
                    message.type = 11;
                    break;
                case "TYPE_BYTES":
                case 12:
                    message.type = 12;
                    break;
                case "TYPE_UINT32":
                case 13:
                    message.type = 13;
                    break;
                case "TYPE_ENUM":
                case 14:
                    message.type = 14;
                    break;
                case "TYPE_SFIXED32":
                case 15:
                    message.type = 15;
                    break;
                case "TYPE_SFIXED64":
                case 16:
                    message.type = 16;
                    break;
                case "TYPE_SINT32":
                case 17:
                    message.type = 17;
                    break;
                case "TYPE_SINT64":
                case 18:
                    message.type = 18;
                    break;
                }
                if (object.typeName != null)
                    message.typeName = String(object.typeName);
                if (object.extendee != null)
                    message.extendee = String(object.extendee);
                if (object.defaultValue != null)
                    message.defaultValue = String(object.defaultValue);
                if (object.oneofIndex != null)
                    message.oneofIndex = object.oneofIndex | 0;
                if (object.jsonName != null)
                    message.jsonName = String(object.jsonName);
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".google.protobuf.FieldDescriptorProto.options: object expected");
                    message.options = $root.google.protobuf.FieldOptions.fromObject(object.options);
                }
                return message;
            };

            /**
             * Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {google.protobuf.FieldDescriptorProto} message FieldDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FieldDescriptorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.name = "";
                    object.extendee = "";
                    object.number = 0;
                    object.label = options.enums === String ? "LABEL_OPTIONAL" : 1;
                    object.type = options.enums === String ? "TYPE_DOUBLE" : 1;
                    object.typeName = "";
                    object.defaultValue = "";
                    object.options = null;
                    object.oneofIndex = 0;
                    object.jsonName = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.extendee != null && message.hasOwnProperty("extendee"))
                    object.extendee = message.extendee;
                if (message.number != null && message.hasOwnProperty("number"))
                    object.number = message.number;
                if (message.label != null && message.hasOwnProperty("label"))
                    object.label = options.enums === String ? $root.google.protobuf.FieldDescriptorProto.Label[message.label] : message.label;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.google.protobuf.FieldDescriptorProto.Type[message.type] : message.type;
                if (message.typeName != null && message.hasOwnProperty("typeName"))
                    object.typeName = message.typeName;
                if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                    object.defaultValue = message.defaultValue;
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.google.protobuf.FieldOptions.toObject(message.options, options);
                if (message.oneofIndex != null && message.hasOwnProperty("oneofIndex"))
                    object.oneofIndex = message.oneofIndex;
                if (message.jsonName != null && message.hasOwnProperty("jsonName"))
                    object.jsonName = message.jsonName;
                return object;
            };

            /**
             * Converts this FieldDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FieldDescriptorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Type enum.
             * @name google.protobuf.FieldDescriptorProto.Type
             * @enum {number}
             * @property {number} TYPE_DOUBLE=1 TYPE_DOUBLE value
             * @property {number} TYPE_FLOAT=2 TYPE_FLOAT value
             * @property {number} TYPE_INT64=3 TYPE_INT64 value
             * @property {number} TYPE_UINT64=4 TYPE_UINT64 value
             * @property {number} TYPE_INT32=5 TYPE_INT32 value
             * @property {number} TYPE_FIXED64=6 TYPE_FIXED64 value
             * @property {number} TYPE_FIXED32=7 TYPE_FIXED32 value
             * @property {number} TYPE_BOOL=8 TYPE_BOOL value
             * @property {number} TYPE_STRING=9 TYPE_STRING value
             * @property {number} TYPE_GROUP=10 TYPE_GROUP value
             * @property {number} TYPE_MESSAGE=11 TYPE_MESSAGE value
             * @property {number} TYPE_BYTES=12 TYPE_BYTES value
             * @property {number} TYPE_UINT32=13 TYPE_UINT32 value
             * @property {number} TYPE_ENUM=14 TYPE_ENUM value
             * @property {number} TYPE_SFIXED32=15 TYPE_SFIXED32 value
             * @property {number} TYPE_SFIXED64=16 TYPE_SFIXED64 value
             * @property {number} TYPE_SINT32=17 TYPE_SINT32 value
             * @property {number} TYPE_SINT64=18 TYPE_SINT64 value
             */
            FieldDescriptorProto.Type = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "TYPE_DOUBLE"] = 1;
                values[valuesById[2] = "TYPE_FLOAT"] = 2;
                values[valuesById[3] = "TYPE_INT64"] = 3;
                values[valuesById[4] = "TYPE_UINT64"] = 4;
                values[valuesById[5] = "TYPE_INT32"] = 5;
                values[valuesById[6] = "TYPE_FIXED64"] = 6;
                values[valuesById[7] = "TYPE_FIXED32"] = 7;
                values[valuesById[8] = "TYPE_BOOL"] = 8;
                values[valuesById[9] = "TYPE_STRING"] = 9;
                values[valuesById[10] = "TYPE_GROUP"] = 10;
                values[valuesById[11] = "TYPE_MESSAGE"] = 11;
                values[valuesById[12] = "TYPE_BYTES"] = 12;
                values[valuesById[13] = "TYPE_UINT32"] = 13;
                values[valuesById[14] = "TYPE_ENUM"] = 14;
                values[valuesById[15] = "TYPE_SFIXED32"] = 15;
                values[valuesById[16] = "TYPE_SFIXED64"] = 16;
                values[valuesById[17] = "TYPE_SINT32"] = 17;
                values[valuesById[18] = "TYPE_SINT64"] = 18;
                return values;
            })();

            /**
             * Label enum.
             * @name google.protobuf.FieldDescriptorProto.Label
             * @enum {number}
             * @property {number} LABEL_OPTIONAL=1 LABEL_OPTIONAL value
             * @property {number} LABEL_REQUIRED=2 LABEL_REQUIRED value
             * @property {number} LABEL_REPEATED=3 LABEL_REPEATED value
             */
            FieldDescriptorProto.Label = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "LABEL_OPTIONAL"] = 1;
                values[valuesById[2] = "LABEL_REQUIRED"] = 2;
                values[valuesById[3] = "LABEL_REPEATED"] = 3;
                return values;
            })();

            return FieldDescriptorProto;
        })();

        protobuf.OneofDescriptorProto = (function() {

            /**
             * Properties of an OneofDescriptorProto.
             * @memberof google.protobuf
             * @interface IOneofDescriptorProto
             * @property {string|null} [name] OneofDescriptorProto name
             * @property {google.protobuf.IOneofOptions|null} [options] OneofDescriptorProto options
             */

            /**
             * Constructs a new OneofDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an OneofDescriptorProto.
             * @implements IOneofDescriptorProto
             * @constructor
             * @param {google.protobuf.IOneofDescriptorProto=} [properties] Properties to set
             */
            function OneofDescriptorProto(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OneofDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.OneofDescriptorProto
             * @instance
             */
            OneofDescriptorProto.prototype.name = "";

            /**
             * OneofDescriptorProto options.
             * @member {google.protobuf.IOneofOptions|null|undefined} options
             * @memberof google.protobuf.OneofDescriptorProto
             * @instance
             */
            OneofDescriptorProto.prototype.options = null;

            /**
             * Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */
            OneofDescriptorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.OneofDescriptorProto)
                    return object;
                let message = new $root.google.protobuf.OneofDescriptorProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".google.protobuf.OneofDescriptorProto.options: object expected");
                    message.options = $root.google.protobuf.OneofOptions.fromObject(object.options);
                }
                return message;
            };

            /**
             * Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {google.protobuf.OneofDescriptorProto} message OneofDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OneofDescriptorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.name = "";
                    object.options = null;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.google.protobuf.OneofOptions.toObject(message.options, options);
                return object;
            };

            /**
             * Converts this OneofDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.OneofDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OneofDescriptorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return OneofDescriptorProto;
        })();

        protobuf.EnumDescriptorProto = (function() {

            /**
             * Properties of an EnumDescriptorProto.
             * @memberof google.protobuf
             * @interface IEnumDescriptorProto
             * @property {string|null} [name] EnumDescriptorProto name
             * @property {Array.<google.protobuf.IEnumValueDescriptorProto>|null} [value] EnumDescriptorProto value
             * @property {google.protobuf.IEnumOptions|null} [options] EnumDescriptorProto options
             */

            /**
             * Constructs a new EnumDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an EnumDescriptorProto.
             * @implements IEnumDescriptorProto
             * @constructor
             * @param {google.protobuf.IEnumDescriptorProto=} [properties] Properties to set
             */
            function EnumDescriptorProto(properties) {
                this.value = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EnumDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */
            EnumDescriptorProto.prototype.name = "";

            /**
             * EnumDescriptorProto value.
             * @member {Array.<google.protobuf.IEnumValueDescriptorProto>} value
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */
            EnumDescriptorProto.prototype.value = $util.emptyArray;

            /**
             * EnumDescriptorProto options.
             * @member {google.protobuf.IEnumOptions|null|undefined} options
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */
            EnumDescriptorProto.prototype.options = null;

            /**
             * Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */
            EnumDescriptorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.EnumDescriptorProto)
                    return object;
                let message = new $root.google.protobuf.EnumDescriptorProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.value) {
                    if (!Array.isArray(object.value))
                        throw TypeError(".google.protobuf.EnumDescriptorProto.value: array expected");
                    message.value = [];
                    for (let i = 0; i < object.value.length; ++i) {
                        if (typeof object.value[i] !== "object")
                            throw TypeError(".google.protobuf.EnumDescriptorProto.value: object expected");
                        message.value[i] = $root.google.protobuf.EnumValueDescriptorProto.fromObject(object.value[i]);
                    }
                }
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".google.protobuf.EnumDescriptorProto.options: object expected");
                    message.options = $root.google.protobuf.EnumOptions.fromObject(object.options);
                }
                return message;
            };

            /**
             * Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {google.protobuf.EnumDescriptorProto} message EnumDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EnumDescriptorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.value = [];
                if (options.defaults) {
                    object.name = "";
                    object.options = null;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.value && message.value.length) {
                    object.value = [];
                    for (let j = 0; j < message.value.length; ++j)
                        object.value[j] = $root.google.protobuf.EnumValueDescriptorProto.toObject(message.value[j], options);
                }
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.google.protobuf.EnumOptions.toObject(message.options, options);
                return object;
            };

            /**
             * Converts this EnumDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EnumDescriptorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return EnumDescriptorProto;
        })();

        protobuf.EnumValueDescriptorProto = (function() {

            /**
             * Properties of an EnumValueDescriptorProto.
             * @memberof google.protobuf
             * @interface IEnumValueDescriptorProto
             * @property {string|null} [name] EnumValueDescriptorProto name
             * @property {number|null} [number] EnumValueDescriptorProto number
             * @property {google.protobuf.IEnumValueOptions|null} [options] EnumValueDescriptorProto options
             */

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an EnumValueDescriptorProto.
             * @implements IEnumValueDescriptorProto
             * @constructor
             * @param {google.protobuf.IEnumValueDescriptorProto=} [properties] Properties to set
             */
            function EnumValueDescriptorProto(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EnumValueDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */
            EnumValueDescriptorProto.prototype.name = "";

            /**
             * EnumValueDescriptorProto number.
             * @member {number} number
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */
            EnumValueDescriptorProto.prototype.number = 0;

            /**
             * EnumValueDescriptorProto options.
             * @member {google.protobuf.IEnumValueOptions|null|undefined} options
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */
            EnumValueDescriptorProto.prototype.options = null;

            /**
             * Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */
            EnumValueDescriptorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.EnumValueDescriptorProto)
                    return object;
                let message = new $root.google.protobuf.EnumValueDescriptorProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.number != null)
                    message.number = object.number | 0;
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".google.protobuf.EnumValueDescriptorProto.options: object expected");
                    message.options = $root.google.protobuf.EnumValueOptions.fromObject(object.options);
                }
                return message;
            };

            /**
             * Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {google.protobuf.EnumValueDescriptorProto} message EnumValueDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EnumValueDescriptorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.name = "";
                    object.number = 0;
                    object.options = null;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.number != null && message.hasOwnProperty("number"))
                    object.number = message.number;
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.google.protobuf.EnumValueOptions.toObject(message.options, options);
                return object;
            };

            /**
             * Converts this EnumValueDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EnumValueDescriptorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return EnumValueDescriptorProto;
        })();

        protobuf.ServiceDescriptorProto = (function() {

            /**
             * Properties of a ServiceDescriptorProto.
             * @memberof google.protobuf
             * @interface IServiceDescriptorProto
             * @property {string|null} [name] ServiceDescriptorProto name
             * @property {Array.<google.protobuf.IMethodDescriptorProto>|null} [method] ServiceDescriptorProto method
             * @property {google.protobuf.IServiceOptions|null} [options] ServiceDescriptorProto options
             */

            /**
             * Constructs a new ServiceDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a ServiceDescriptorProto.
             * @implements IServiceDescriptorProto
             * @constructor
             * @param {google.protobuf.IServiceDescriptorProto=} [properties] Properties to set
             */
            function ServiceDescriptorProto(properties) {
                this.method = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServiceDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */
            ServiceDescriptorProto.prototype.name = "";

            /**
             * ServiceDescriptorProto method.
             * @member {Array.<google.protobuf.IMethodDescriptorProto>} method
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */
            ServiceDescriptorProto.prototype.method = $util.emptyArray;

            /**
             * ServiceDescriptorProto options.
             * @member {google.protobuf.IServiceOptions|null|undefined} options
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */
            ServiceDescriptorProto.prototype.options = null;

            /**
             * Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */
            ServiceDescriptorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.ServiceDescriptorProto)
                    return object;
                let message = new $root.google.protobuf.ServiceDescriptorProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.method) {
                    if (!Array.isArray(object.method))
                        throw TypeError(".google.protobuf.ServiceDescriptorProto.method: array expected");
                    message.method = [];
                    for (let i = 0; i < object.method.length; ++i) {
                        if (typeof object.method[i] !== "object")
                            throw TypeError(".google.protobuf.ServiceDescriptorProto.method: object expected");
                        message.method[i] = $root.google.protobuf.MethodDescriptorProto.fromObject(object.method[i]);
                    }
                }
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".google.protobuf.ServiceDescriptorProto.options: object expected");
                    message.options = $root.google.protobuf.ServiceOptions.fromObject(object.options);
                }
                return message;
            };

            /**
             * Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {google.protobuf.ServiceDescriptorProto} message ServiceDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServiceDescriptorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.method = [];
                if (options.defaults) {
                    object.name = "";
                    object.options = null;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.method && message.method.length) {
                    object.method = [];
                    for (let j = 0; j < message.method.length; ++j)
                        object.method[j] = $root.google.protobuf.MethodDescriptorProto.toObject(message.method[j], options);
                }
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.google.protobuf.ServiceOptions.toObject(message.options, options);
                return object;
            };

            /**
             * Converts this ServiceDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServiceDescriptorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ServiceDescriptorProto;
        })();

        protobuf.MethodDescriptorProto = (function() {

            /**
             * Properties of a MethodDescriptorProto.
             * @memberof google.protobuf
             * @interface IMethodDescriptorProto
             * @property {string|null} [name] MethodDescriptorProto name
             * @property {string|null} [inputType] MethodDescriptorProto inputType
             * @property {string|null} [outputType] MethodDescriptorProto outputType
             * @property {google.protobuf.IMethodOptions|null} [options] MethodDescriptorProto options
             * @property {boolean|null} [clientStreaming] MethodDescriptorProto clientStreaming
             * @property {boolean|null} [serverStreaming] MethodDescriptorProto serverStreaming
             */

            /**
             * Constructs a new MethodDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a MethodDescriptorProto.
             * @implements IMethodDescriptorProto
             * @constructor
             * @param {google.protobuf.IMethodDescriptorProto=} [properties] Properties to set
             */
            function MethodDescriptorProto(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MethodDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.name = "";

            /**
             * MethodDescriptorProto inputType.
             * @member {string} inputType
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.inputType = "";

            /**
             * MethodDescriptorProto outputType.
             * @member {string} outputType
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.outputType = "";

            /**
             * MethodDescriptorProto options.
             * @member {google.protobuf.IMethodOptions|null|undefined} options
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.options = null;

            /**
             * MethodDescriptorProto clientStreaming.
             * @member {boolean} clientStreaming
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.clientStreaming = false;

            /**
             * MethodDescriptorProto serverStreaming.
             * @member {boolean} serverStreaming
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */
            MethodDescriptorProto.prototype.serverStreaming = false;

            /**
             * Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */
            MethodDescriptorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.MethodDescriptorProto)
                    return object;
                let message = new $root.google.protobuf.MethodDescriptorProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.inputType != null)
                    message.inputType = String(object.inputType);
                if (object.outputType != null)
                    message.outputType = String(object.outputType);
                if (object.options != null) {
                    if (typeof object.options !== "object")
                        throw TypeError(".google.protobuf.MethodDescriptorProto.options: object expected");
                    message.options = $root.google.protobuf.MethodOptions.fromObject(object.options);
                }
                if (object.clientStreaming != null)
                    message.clientStreaming = Boolean(object.clientStreaming);
                if (object.serverStreaming != null)
                    message.serverStreaming = Boolean(object.serverStreaming);
                return message;
            };

            /**
             * Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {google.protobuf.MethodDescriptorProto} message MethodDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MethodDescriptorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.name = "";
                    object.inputType = "";
                    object.outputType = "";
                    object.options = null;
                    object.clientStreaming = false;
                    object.serverStreaming = false;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.inputType != null && message.hasOwnProperty("inputType"))
                    object.inputType = message.inputType;
                if (message.outputType != null && message.hasOwnProperty("outputType"))
                    object.outputType = message.outputType;
                if (message.options != null && message.hasOwnProperty("options"))
                    object.options = $root.google.protobuf.MethodOptions.toObject(message.options, options);
                if (message.clientStreaming != null && message.hasOwnProperty("clientStreaming"))
                    object.clientStreaming = message.clientStreaming;
                if (message.serverStreaming != null && message.hasOwnProperty("serverStreaming"))
                    object.serverStreaming = message.serverStreaming;
                return object;
            };

            /**
             * Converts this MethodDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MethodDescriptorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MethodDescriptorProto;
        })();

        protobuf.FileOptions = (function() {

            /**
             * Properties of a FileOptions.
             * @memberof google.protobuf
             * @interface IFileOptions
             * @property {string|null} [javaPackage] FileOptions javaPackage
             * @property {string|null} [javaOuterClassname] FileOptions javaOuterClassname
             * @property {boolean|null} [javaMultipleFiles] FileOptions javaMultipleFiles
             * @property {boolean|null} [javaGenerateEqualsAndHash] FileOptions javaGenerateEqualsAndHash
             * @property {boolean|null} [javaStringCheckUtf8] FileOptions javaStringCheckUtf8
             * @property {google.protobuf.FileOptions.OptimizeMode|null} [optimizeFor] FileOptions optimizeFor
             * @property {string|null} [goPackage] FileOptions goPackage
             * @property {boolean|null} [ccGenericServices] FileOptions ccGenericServices
             * @property {boolean|null} [javaGenericServices] FileOptions javaGenericServices
             * @property {boolean|null} [pyGenericServices] FileOptions pyGenericServices
             * @property {boolean|null} [deprecated] FileOptions deprecated
             * @property {boolean|null} [ccEnableArenas] FileOptions ccEnableArenas
             * @property {string|null} [objcClassPrefix] FileOptions objcClassPrefix
             * @property {string|null} [csharpNamespace] FileOptions csharpNamespace
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] FileOptions uninterpretedOption
             */

            /**
             * Constructs a new FileOptions.
             * @memberof google.protobuf
             * @classdesc Represents a FileOptions.
             * @implements IFileOptions
             * @constructor
             * @param {google.protobuf.IFileOptions=} [properties] Properties to set
             */
            function FileOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FileOptions javaPackage.
             * @member {string} javaPackage
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaPackage = "";

            /**
             * FileOptions javaOuterClassname.
             * @member {string} javaOuterClassname
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaOuterClassname = "";

            /**
             * FileOptions javaMultipleFiles.
             * @member {boolean} javaMultipleFiles
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaMultipleFiles = false;

            /**
             * FileOptions javaGenerateEqualsAndHash.
             * @member {boolean} javaGenerateEqualsAndHash
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaGenerateEqualsAndHash = false;

            /**
             * FileOptions javaStringCheckUtf8.
             * @member {boolean} javaStringCheckUtf8
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaStringCheckUtf8 = false;

            /**
             * FileOptions optimizeFor.
             * @member {google.protobuf.FileOptions.OptimizeMode} optimizeFor
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.optimizeFor = 1;

            /**
             * FileOptions goPackage.
             * @member {string} goPackage
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.goPackage = "";

            /**
             * FileOptions ccGenericServices.
             * @member {boolean} ccGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.ccGenericServices = false;

            /**
             * FileOptions javaGenericServices.
             * @member {boolean} javaGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.javaGenericServices = false;

            /**
             * FileOptions pyGenericServices.
             * @member {boolean} pyGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.pyGenericServices = false;

            /**
             * FileOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.deprecated = false;

            /**
             * FileOptions ccEnableArenas.
             * @member {boolean} ccEnableArenas
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.ccEnableArenas = false;

            /**
             * FileOptions objcClassPrefix.
             * @member {string} objcClassPrefix
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.objcClassPrefix = "";

            /**
             * FileOptions csharpNamespace.
             * @member {string} csharpNamespace
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.csharpNamespace = "";

            /**
             * FileOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.FileOptions
             * @instance
             */
            FileOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * Creates a FileOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FileOptions} FileOptions
             */
            FileOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.FileOptions)
                    return object;
                let message = new $root.google.protobuf.FileOptions();
                if (object.javaPackage != null)
                    message.javaPackage = String(object.javaPackage);
                if (object.javaOuterClassname != null)
                    message.javaOuterClassname = String(object.javaOuterClassname);
                if (object.javaMultipleFiles != null)
                    message.javaMultipleFiles = Boolean(object.javaMultipleFiles);
                if (object.javaGenerateEqualsAndHash != null)
                    message.javaGenerateEqualsAndHash = Boolean(object.javaGenerateEqualsAndHash);
                if (object.javaStringCheckUtf8 != null)
                    message.javaStringCheckUtf8 = Boolean(object.javaStringCheckUtf8);
                switch (object.optimizeFor) {
                case "SPEED":
                case 1:
                    message.optimizeFor = 1;
                    break;
                case "CODE_SIZE":
                case 2:
                    message.optimizeFor = 2;
                    break;
                case "LITE_RUNTIME":
                case 3:
                    message.optimizeFor = 3;
                    break;
                }
                if (object.goPackage != null)
                    message.goPackage = String(object.goPackage);
                if (object.ccGenericServices != null)
                    message.ccGenericServices = Boolean(object.ccGenericServices);
                if (object.javaGenericServices != null)
                    message.javaGenericServices = Boolean(object.javaGenericServices);
                if (object.pyGenericServices != null)
                    message.pyGenericServices = Boolean(object.pyGenericServices);
                if (object.deprecated != null)
                    message.deprecated = Boolean(object.deprecated);
                if (object.ccEnableArenas != null)
                    message.ccEnableArenas = Boolean(object.ccEnableArenas);
                if (object.objcClassPrefix != null)
                    message.objcClassPrefix = String(object.objcClassPrefix);
                if (object.csharpNamespace != null)
                    message.csharpNamespace = String(object.csharpNamespace);
                if (object.uninterpretedOption) {
                    if (!Array.isArray(object.uninterpretedOption))
                        throw TypeError(".google.protobuf.FileOptions.uninterpretedOption: array expected");
                    message.uninterpretedOption = [];
                    for (let i = 0; i < object.uninterpretedOption.length; ++i) {
                        if (typeof object.uninterpretedOption[i] !== "object")
                            throw TypeError(".google.protobuf.FileOptions.uninterpretedOption: object expected");
                        message.uninterpretedOption[i] = $root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a FileOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {google.protobuf.FileOptions} message FileOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FileOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uninterpretedOption = [];
                if (options.defaults) {
                    object.javaPackage = "";
                    object.javaOuterClassname = "";
                    object.optimizeFor = options.enums === String ? "SPEED" : 1;
                    object.javaMultipleFiles = false;
                    object.goPackage = "";
                    object.ccGenericServices = false;
                    object.javaGenericServices = false;
                    object.pyGenericServices = false;
                    object.javaGenerateEqualsAndHash = false;
                    object.deprecated = false;
                    object.javaStringCheckUtf8 = false;
                    object.ccEnableArenas = false;
                    object.objcClassPrefix = "";
                    object.csharpNamespace = "";
                }
                if (message.javaPackage != null && message.hasOwnProperty("javaPackage"))
                    object.javaPackage = message.javaPackage;
                if (message.javaOuterClassname != null && message.hasOwnProperty("javaOuterClassname"))
                    object.javaOuterClassname = message.javaOuterClassname;
                if (message.optimizeFor != null && message.hasOwnProperty("optimizeFor"))
                    object.optimizeFor = options.enums === String ? $root.google.protobuf.FileOptions.OptimizeMode[message.optimizeFor] : message.optimizeFor;
                if (message.javaMultipleFiles != null && message.hasOwnProperty("javaMultipleFiles"))
                    object.javaMultipleFiles = message.javaMultipleFiles;
                if (message.goPackage != null && message.hasOwnProperty("goPackage"))
                    object.goPackage = message.goPackage;
                if (message.ccGenericServices != null && message.hasOwnProperty("ccGenericServices"))
                    object.ccGenericServices = message.ccGenericServices;
                if (message.javaGenericServices != null && message.hasOwnProperty("javaGenericServices"))
                    object.javaGenericServices = message.javaGenericServices;
                if (message.pyGenericServices != null && message.hasOwnProperty("pyGenericServices"))
                    object.pyGenericServices = message.pyGenericServices;
                if (message.javaGenerateEqualsAndHash != null && message.hasOwnProperty("javaGenerateEqualsAndHash"))
                    object.javaGenerateEqualsAndHash = message.javaGenerateEqualsAndHash;
                if (message.deprecated != null && message.hasOwnProperty("deprecated"))
                    object.deprecated = message.deprecated;
                if (message.javaStringCheckUtf8 != null && message.hasOwnProperty("javaStringCheckUtf8"))
                    object.javaStringCheckUtf8 = message.javaStringCheckUtf8;
                if (message.ccEnableArenas != null && message.hasOwnProperty("ccEnableArenas"))
                    object.ccEnableArenas = message.ccEnableArenas;
                if (message.objcClassPrefix != null && message.hasOwnProperty("objcClassPrefix"))
                    object.objcClassPrefix = message.objcClassPrefix;
                if (message.csharpNamespace != null && message.hasOwnProperty("csharpNamespace"))
                    object.csharpNamespace = message.csharpNamespace;
                if (message.uninterpretedOption && message.uninterpretedOption.length) {
                    object.uninterpretedOption = [];
                    for (let j = 0; j < message.uninterpretedOption.length; ++j)
                        object.uninterpretedOption[j] = $root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j], options);
                }
                return object;
            };

            /**
             * Converts this FileOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.FileOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FileOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * OptimizeMode enum.
             * @name google.protobuf.FileOptions.OptimizeMode
             * @enum {number}
             * @property {number} SPEED=1 SPEED value
             * @property {number} CODE_SIZE=2 CODE_SIZE value
             * @property {number} LITE_RUNTIME=3 LITE_RUNTIME value
             */
            FileOptions.OptimizeMode = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "SPEED"] = 1;
                values[valuesById[2] = "CODE_SIZE"] = 2;
                values[valuesById[3] = "LITE_RUNTIME"] = 3;
                return values;
            })();

            return FileOptions;
        })();

        protobuf.MessageOptions = (function() {

            /**
             * Properties of a MessageOptions.
             * @memberof google.protobuf
             * @interface IMessageOptions
             * @property {boolean|null} [messageSetWireFormat] MessageOptions messageSetWireFormat
             * @property {boolean|null} [noStandardDescriptorAccessor] MessageOptions noStandardDescriptorAccessor
             * @property {boolean|null} [deprecated] MessageOptions deprecated
             * @property {boolean|null} [mapEntry] MessageOptions mapEntry
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] MessageOptions uninterpretedOption
             */

            /**
             * Constructs a new MessageOptions.
             * @memberof google.protobuf
             * @classdesc Represents a MessageOptions.
             * @implements IMessageOptions
             * @constructor
             * @param {google.protobuf.IMessageOptions=} [properties] Properties to set
             */
            function MessageOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MessageOptions messageSetWireFormat.
             * @member {boolean} messageSetWireFormat
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.messageSetWireFormat = false;

            /**
             * MessageOptions noStandardDescriptorAccessor.
             * @member {boolean} noStandardDescriptorAccessor
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.noStandardDescriptorAccessor = false;

            /**
             * MessageOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.deprecated = false;

            /**
             * MessageOptions mapEntry.
             * @member {boolean} mapEntry
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.mapEntry = false;

            /**
             * MessageOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.MessageOptions
             * @instance
             */
            MessageOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */
            MessageOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.MessageOptions)
                    return object;
                let message = new $root.google.protobuf.MessageOptions();
                if (object.messageSetWireFormat != null)
                    message.messageSetWireFormat = Boolean(object.messageSetWireFormat);
                if (object.noStandardDescriptorAccessor != null)
                    message.noStandardDescriptorAccessor = Boolean(object.noStandardDescriptorAccessor);
                if (object.deprecated != null)
                    message.deprecated = Boolean(object.deprecated);
                if (object.mapEntry != null)
                    message.mapEntry = Boolean(object.mapEntry);
                if (object.uninterpretedOption) {
                    if (!Array.isArray(object.uninterpretedOption))
                        throw TypeError(".google.protobuf.MessageOptions.uninterpretedOption: array expected");
                    message.uninterpretedOption = [];
                    for (let i = 0; i < object.uninterpretedOption.length; ++i) {
                        if (typeof object.uninterpretedOption[i] !== "object")
                            throw TypeError(".google.protobuf.MessageOptions.uninterpretedOption: object expected");
                        message.uninterpretedOption[i] = $root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a MessageOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {google.protobuf.MessageOptions} message MessageOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MessageOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uninterpretedOption = [];
                if (options.defaults) {
                    object.messageSetWireFormat = false;
                    object.noStandardDescriptorAccessor = false;
                    object.deprecated = false;
                    object.mapEntry = false;
                }
                if (message.messageSetWireFormat != null && message.hasOwnProperty("messageSetWireFormat"))
                    object.messageSetWireFormat = message.messageSetWireFormat;
                if (message.noStandardDescriptorAccessor != null && message.hasOwnProperty("noStandardDescriptorAccessor"))
                    object.noStandardDescriptorAccessor = message.noStandardDescriptorAccessor;
                if (message.deprecated != null && message.hasOwnProperty("deprecated"))
                    object.deprecated = message.deprecated;
                if (message.mapEntry != null && message.hasOwnProperty("mapEntry"))
                    object.mapEntry = message.mapEntry;
                if (message.uninterpretedOption && message.uninterpretedOption.length) {
                    object.uninterpretedOption = [];
                    for (let j = 0; j < message.uninterpretedOption.length; ++j)
                        object.uninterpretedOption[j] = $root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j], options);
                }
                return object;
            };

            /**
             * Converts this MessageOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.MessageOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MessageOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MessageOptions;
        })();

        protobuf.FieldOptions = (function() {

            /**
             * Properties of a FieldOptions.
             * @memberof google.protobuf
             * @interface IFieldOptions
             * @property {google.protobuf.FieldOptions.CType|null} [ctype] FieldOptions ctype
             * @property {boolean|null} [packed] FieldOptions packed
             * @property {google.protobuf.FieldOptions.JSType|null} [jstype] FieldOptions jstype
             * @property {boolean|null} [lazy] FieldOptions lazy
             * @property {boolean|null} [deprecated] FieldOptions deprecated
             * @property {boolean|null} [weak] FieldOptions weak
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] FieldOptions uninterpretedOption
             * @property {string|null} [".api.rawBody"] FieldOptions .api.rawBody
             * @property {string|null} [".api.query"] FieldOptions .api.query
             * @property {string|null} [".api.header"] FieldOptions .api.header
             * @property {string|null} [".api.cookie"] FieldOptions .api.cookie
             * @property {string|null} [".api.body"] FieldOptions .api.body
             * @property {string|null} [".api.path"] FieldOptions .api.path
             * @property {string|null} [".api.vd"] FieldOptions .api.vd
             * @property {string|null} [".api.form"] FieldOptions .api.form
             * @property {string|null} [".api.goTag"] FieldOptions .api.goTag
             * @property {string|null} [".api.jsConv"] FieldOptions .api.jsConv
             */

            /**
             * Constructs a new FieldOptions.
             * @memberof google.protobuf
             * @classdesc Represents a FieldOptions.
             * @implements IFieldOptions
             * @constructor
             * @param {google.protobuf.IFieldOptions=} [properties] Properties to set
             */
            function FieldOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FieldOptions ctype.
             * @member {google.protobuf.FieldOptions.CType} ctype
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.ctype = 0;

            /**
             * FieldOptions packed.
             * @member {boolean} packed
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.packed = false;

            /**
             * FieldOptions jstype.
             * @member {google.protobuf.FieldOptions.JSType} jstype
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.jstype = 0;

            /**
             * FieldOptions lazy.
             * @member {boolean} lazy
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.lazy = false;

            /**
             * FieldOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.deprecated = false;

            /**
             * FieldOptions weak.
             * @member {boolean} weak
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.weak = false;

            /**
             * FieldOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * FieldOptions .api.rawBody.
             * @member {string} .api.rawBody
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.rawBody"] = "";

            /**
             * FieldOptions .api.query.
             * @member {string} .api.query
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.query"] = "";

            /**
             * FieldOptions .api.header.
             * @member {string} .api.header
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.header"] = "";

            /**
             * FieldOptions .api.cookie.
             * @member {string} .api.cookie
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.cookie"] = "";

            /**
             * FieldOptions .api.body.
             * @member {string} .api.body
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.body"] = "";

            /**
             * FieldOptions .api.path.
             * @member {string} .api.path
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.path"] = "";

            /**
             * FieldOptions .api.vd.
             * @member {string} .api.vd
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.vd"] = "";

            /**
             * FieldOptions .api.form.
             * @member {string} .api.form
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.form"] = "";

            /**
             * FieldOptions .api.goTag.
             * @member {string} .api.goTag
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.goTag"] = "";

            /**
             * FieldOptions .api.jsConv.
             * @member {string} .api.jsConv
             * @memberof google.protobuf.FieldOptions
             * @instance
             */
            FieldOptions.prototype[".api.jsConv"] = "";

            /**
             * Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */
            FieldOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.FieldOptions)
                    return object;
                let message = new $root.google.protobuf.FieldOptions();
                switch (object.ctype) {
                case "STRING":
                case 0:
                    message.ctype = 0;
                    break;
                case "CORD":
                case 1:
                    message.ctype = 1;
                    break;
                case "STRING_PIECE":
                case 2:
                    message.ctype = 2;
                    break;
                }
                if (object.packed != null)
                    message.packed = Boolean(object.packed);
                switch (object.jstype) {
                case "JS_NORMAL":
                case 0:
                    message.jstype = 0;
                    break;
                case "JS_STRING":
                case 1:
                    message.jstype = 1;
                    break;
                case "JS_NUMBER":
                case 2:
                    message.jstype = 2;
                    break;
                }
                if (object.lazy != null)
                    message.lazy = Boolean(object.lazy);
                if (object.deprecated != null)
                    message.deprecated = Boolean(object.deprecated);
                if (object.weak != null)
                    message.weak = Boolean(object.weak);
                if (object.uninterpretedOption) {
                    if (!Array.isArray(object.uninterpretedOption))
                        throw TypeError(".google.protobuf.FieldOptions.uninterpretedOption: array expected");
                    message.uninterpretedOption = [];
                    for (let i = 0; i < object.uninterpretedOption.length; ++i) {
                        if (typeof object.uninterpretedOption[i] !== "object")
                            throw TypeError(".google.protobuf.FieldOptions.uninterpretedOption: object expected");
                        message.uninterpretedOption[i] = $root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);
                    }
                }
                if (object[".api.rawBody"] != null)
                    message[".api.rawBody"] = String(object[".api.rawBody"]);
                if (object[".api.query"] != null)
                    message[".api.query"] = String(object[".api.query"]);
                if (object[".api.header"] != null)
                    message[".api.header"] = String(object[".api.header"]);
                if (object[".api.cookie"] != null)
                    message[".api.cookie"] = String(object[".api.cookie"]);
                if (object[".api.body"] != null)
                    message[".api.body"] = String(object[".api.body"]);
                if (object[".api.path"] != null)
                    message[".api.path"] = String(object[".api.path"]);
                if (object[".api.vd"] != null)
                    message[".api.vd"] = String(object[".api.vd"]);
                if (object[".api.form"] != null)
                    message[".api.form"] = String(object[".api.form"]);
                if (object[".api.goTag"] != null)
                    message[".api.goTag"] = String(object[".api.goTag"]);
                if (object[".api.jsConv"] != null)
                    message[".api.jsConv"] = String(object[".api.jsConv"]);
                return message;
            };

            /**
             * Creates a plain object from a FieldOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {google.protobuf.FieldOptions} message FieldOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FieldOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uninterpretedOption = [];
                if (options.defaults) {
                    object.ctype = options.enums === String ? "STRING" : 0;
                    object.packed = false;
                    object.deprecated = false;
                    object.lazy = false;
                    object.jstype = options.enums === String ? "JS_NORMAL" : 0;
                    object.weak = false;
                    object[".api.rawBody"] = "";
                    object[".api.query"] = "";
                    object[".api.header"] = "";
                    object[".api.cookie"] = "";
                    object[".api.body"] = "";
                    object[".api.path"] = "";
                    object[".api.vd"] = "";
                    object[".api.form"] = "";
                    object[".api.jsConv"] = "";
                    object[".api.goTag"] = "";
                }
                if (message.ctype != null && message.hasOwnProperty("ctype"))
                    object.ctype = options.enums === String ? $root.google.protobuf.FieldOptions.CType[message.ctype] : message.ctype;
                if (message.packed != null && message.hasOwnProperty("packed"))
                    object.packed = message.packed;
                if (message.deprecated != null && message.hasOwnProperty("deprecated"))
                    object.deprecated = message.deprecated;
                if (message.lazy != null && message.hasOwnProperty("lazy"))
                    object.lazy = message.lazy;
                if (message.jstype != null && message.hasOwnProperty("jstype"))
                    object.jstype = options.enums === String ? $root.google.protobuf.FieldOptions.JSType[message.jstype] : message.jstype;
                if (message.weak != null && message.hasOwnProperty("weak"))
                    object.weak = message.weak;
                if (message.uninterpretedOption && message.uninterpretedOption.length) {
                    object.uninterpretedOption = [];
                    for (let j = 0; j < message.uninterpretedOption.length; ++j)
                        object.uninterpretedOption[j] = $root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j], options);
                }
                if (message[".api.rawBody"] != null && message.hasOwnProperty(".api.rawBody"))
                    object[".api.rawBody"] = message[".api.rawBody"];
                if (message[".api.query"] != null && message.hasOwnProperty(".api.query"))
                    object[".api.query"] = message[".api.query"];
                if (message[".api.header"] != null && message.hasOwnProperty(".api.header"))
                    object[".api.header"] = message[".api.header"];
                if (message[".api.cookie"] != null && message.hasOwnProperty(".api.cookie"))
                    object[".api.cookie"] = message[".api.cookie"];
                if (message[".api.body"] != null && message.hasOwnProperty(".api.body"))
                    object[".api.body"] = message[".api.body"];
                if (message[".api.path"] != null && message.hasOwnProperty(".api.path"))
                    object[".api.path"] = message[".api.path"];
                if (message[".api.vd"] != null && message.hasOwnProperty(".api.vd"))
                    object[".api.vd"] = message[".api.vd"];
                if (message[".api.form"] != null && message.hasOwnProperty(".api.form"))
                    object[".api.form"] = message[".api.form"];
                if (message[".api.jsConv"] != null && message.hasOwnProperty(".api.jsConv"))
                    object[".api.jsConv"] = message[".api.jsConv"];
                if (message[".api.goTag"] != null && message.hasOwnProperty(".api.goTag"))
                    object[".api.goTag"] = message[".api.goTag"];
                return object;
            };

            /**
             * Converts this FieldOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.FieldOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FieldOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * CType enum.
             * @name google.protobuf.FieldOptions.CType
             * @enum {number}
             * @property {number} STRING=0 STRING value
             * @property {number} CORD=1 CORD value
             * @property {number} STRING_PIECE=2 STRING_PIECE value
             */
            FieldOptions.CType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "STRING"] = 0;
                values[valuesById[1] = "CORD"] = 1;
                values[valuesById[2] = "STRING_PIECE"] = 2;
                return values;
            })();

            /**
             * JSType enum.
             * @name google.protobuf.FieldOptions.JSType
             * @enum {number}
             * @property {number} JS_NORMAL=0 JS_NORMAL value
             * @property {number} JS_STRING=1 JS_STRING value
             * @property {number} JS_NUMBER=2 JS_NUMBER value
             */
            FieldOptions.JSType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "JS_NORMAL"] = 0;
                values[valuesById[1] = "JS_STRING"] = 1;
                values[valuesById[2] = "JS_NUMBER"] = 2;
                return values;
            })();

            return FieldOptions;
        })();

        protobuf.OneofOptions = (function() {

            /**
             * Properties of an OneofOptions.
             * @memberof google.protobuf
             * @interface IOneofOptions
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] OneofOptions uninterpretedOption
             */

            /**
             * Constructs a new OneofOptions.
             * @memberof google.protobuf
             * @classdesc Represents an OneofOptions.
             * @implements IOneofOptions
             * @constructor
             * @param {google.protobuf.IOneofOptions=} [properties] Properties to set
             */
            function OneofOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OneofOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.OneofOptions
             * @instance
             */
            OneofOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */
            OneofOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.OneofOptions)
                    return object;
                let message = new $root.google.protobuf.OneofOptions();
                if (object.uninterpretedOption) {
                    if (!Array.isArray(object.uninterpretedOption))
                        throw TypeError(".google.protobuf.OneofOptions.uninterpretedOption: array expected");
                    message.uninterpretedOption = [];
                    for (let i = 0; i < object.uninterpretedOption.length; ++i) {
                        if (typeof object.uninterpretedOption[i] !== "object")
                            throw TypeError(".google.protobuf.OneofOptions.uninterpretedOption: object expected");
                        message.uninterpretedOption[i] = $root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an OneofOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {google.protobuf.OneofOptions} message OneofOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OneofOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uninterpretedOption = [];
                if (message.uninterpretedOption && message.uninterpretedOption.length) {
                    object.uninterpretedOption = [];
                    for (let j = 0; j < message.uninterpretedOption.length; ++j)
                        object.uninterpretedOption[j] = $root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j], options);
                }
                return object;
            };

            /**
             * Converts this OneofOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.OneofOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OneofOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return OneofOptions;
        })();

        protobuf.EnumOptions = (function() {

            /**
             * Properties of an EnumOptions.
             * @memberof google.protobuf
             * @interface IEnumOptions
             * @property {boolean|null} [allowAlias] EnumOptions allowAlias
             * @property {boolean|null} [deprecated] EnumOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] EnumOptions uninterpretedOption
             */

            /**
             * Constructs a new EnumOptions.
             * @memberof google.protobuf
             * @classdesc Represents an EnumOptions.
             * @implements IEnumOptions
             * @constructor
             * @param {google.protobuf.IEnumOptions=} [properties] Properties to set
             */
            function EnumOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EnumOptions allowAlias.
             * @member {boolean} allowAlias
             * @memberof google.protobuf.EnumOptions
             * @instance
             */
            EnumOptions.prototype.allowAlias = false;

            /**
             * EnumOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.EnumOptions
             * @instance
             */
            EnumOptions.prototype.deprecated = false;

            /**
             * EnumOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.EnumOptions
             * @instance
             */
            EnumOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */
            EnumOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.EnumOptions)
                    return object;
                let message = new $root.google.protobuf.EnumOptions();
                if (object.allowAlias != null)
                    message.allowAlias = Boolean(object.allowAlias);
                if (object.deprecated != null)
                    message.deprecated = Boolean(object.deprecated);
                if (object.uninterpretedOption) {
                    if (!Array.isArray(object.uninterpretedOption))
                        throw TypeError(".google.protobuf.EnumOptions.uninterpretedOption: array expected");
                    message.uninterpretedOption = [];
                    for (let i = 0; i < object.uninterpretedOption.length; ++i) {
                        if (typeof object.uninterpretedOption[i] !== "object")
                            throw TypeError(".google.protobuf.EnumOptions.uninterpretedOption: object expected");
                        message.uninterpretedOption[i] = $root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an EnumOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {google.protobuf.EnumOptions} message EnumOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EnumOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uninterpretedOption = [];
                if (options.defaults) {
                    object.allowAlias = false;
                    object.deprecated = false;
                }
                if (message.allowAlias != null && message.hasOwnProperty("allowAlias"))
                    object.allowAlias = message.allowAlias;
                if (message.deprecated != null && message.hasOwnProperty("deprecated"))
                    object.deprecated = message.deprecated;
                if (message.uninterpretedOption && message.uninterpretedOption.length) {
                    object.uninterpretedOption = [];
                    for (let j = 0; j < message.uninterpretedOption.length; ++j)
                        object.uninterpretedOption[j] = $root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j], options);
                }
                return object;
            };

            /**
             * Converts this EnumOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.EnumOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EnumOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return EnumOptions;
        })();

        protobuf.EnumValueOptions = (function() {

            /**
             * Properties of an EnumValueOptions.
             * @memberof google.protobuf
             * @interface IEnumValueOptions
             * @property {boolean|null} [deprecated] EnumValueOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] EnumValueOptions uninterpretedOption
             * @property {number|null} [".api.httpCode"] EnumValueOptions .api.httpCode
             */

            /**
             * Constructs a new EnumValueOptions.
             * @memberof google.protobuf
             * @classdesc Represents an EnumValueOptions.
             * @implements IEnumValueOptions
             * @constructor
             * @param {google.protobuf.IEnumValueOptions=} [properties] Properties to set
             */
            function EnumValueOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * EnumValueOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             */
            EnumValueOptions.prototype.deprecated = false;

            /**
             * EnumValueOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             */
            EnumValueOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * EnumValueOptions .api.httpCode.
             * @member {number} .api.httpCode
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             */
            EnumValueOptions.prototype[".api.httpCode"] = 0;

            /**
             * Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */
            EnumValueOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.EnumValueOptions)
                    return object;
                let message = new $root.google.protobuf.EnumValueOptions();
                if (object.deprecated != null)
                    message.deprecated = Boolean(object.deprecated);
                if (object.uninterpretedOption) {
                    if (!Array.isArray(object.uninterpretedOption))
                        throw TypeError(".google.protobuf.EnumValueOptions.uninterpretedOption: array expected");
                    message.uninterpretedOption = [];
                    for (let i = 0; i < object.uninterpretedOption.length; ++i) {
                        if (typeof object.uninterpretedOption[i] !== "object")
                            throw TypeError(".google.protobuf.EnumValueOptions.uninterpretedOption: object expected");
                        message.uninterpretedOption[i] = $root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);
                    }
                }
                if (object[".api.httpCode"] != null)
                    message[".api.httpCode"] = object[".api.httpCode"] | 0;
                return message;
            };

            /**
             * Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {google.protobuf.EnumValueOptions} message EnumValueOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EnumValueOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uninterpretedOption = [];
                if (options.defaults) {
                    object.deprecated = false;
                    object[".api.httpCode"] = 0;
                }
                if (message.deprecated != null && message.hasOwnProperty("deprecated"))
                    object.deprecated = message.deprecated;
                if (message.uninterpretedOption && message.uninterpretedOption.length) {
                    object.uninterpretedOption = [];
                    for (let j = 0; j < message.uninterpretedOption.length; ++j)
                        object.uninterpretedOption[j] = $root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j], options);
                }
                if (message[".api.httpCode"] != null && message.hasOwnProperty(".api.httpCode"))
                    object[".api.httpCode"] = message[".api.httpCode"];
                return object;
            };

            /**
             * Converts this EnumValueOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EnumValueOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return EnumValueOptions;
        })();

        protobuf.ServiceOptions = (function() {

            /**
             * Properties of a ServiceOptions.
             * @memberof google.protobuf
             * @interface IServiceOptions
             * @property {boolean|null} [deprecated] ServiceOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] ServiceOptions uninterpretedOption
             */

            /**
             * Constructs a new ServiceOptions.
             * @memberof google.protobuf
             * @classdesc Represents a ServiceOptions.
             * @implements IServiceOptions
             * @constructor
             * @param {google.protobuf.IServiceOptions=} [properties] Properties to set
             */
            function ServiceOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServiceOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.ServiceOptions
             * @instance
             */
            ServiceOptions.prototype.deprecated = false;

            /**
             * ServiceOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.ServiceOptions
             * @instance
             */
            ServiceOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */
            ServiceOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.ServiceOptions)
                    return object;
                let message = new $root.google.protobuf.ServiceOptions();
                if (object.deprecated != null)
                    message.deprecated = Boolean(object.deprecated);
                if (object.uninterpretedOption) {
                    if (!Array.isArray(object.uninterpretedOption))
                        throw TypeError(".google.protobuf.ServiceOptions.uninterpretedOption: array expected");
                    message.uninterpretedOption = [];
                    for (let i = 0; i < object.uninterpretedOption.length; ++i) {
                        if (typeof object.uninterpretedOption[i] !== "object")
                            throw TypeError(".google.protobuf.ServiceOptions.uninterpretedOption: object expected");
                        message.uninterpretedOption[i] = $root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {google.protobuf.ServiceOptions} message ServiceOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServiceOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uninterpretedOption = [];
                if (options.defaults)
                    object.deprecated = false;
                if (message.deprecated != null && message.hasOwnProperty("deprecated"))
                    object.deprecated = message.deprecated;
                if (message.uninterpretedOption && message.uninterpretedOption.length) {
                    object.uninterpretedOption = [];
                    for (let j = 0; j < message.uninterpretedOption.length; ++j)
                        object.uninterpretedOption[j] = $root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j], options);
                }
                return object;
            };

            /**
             * Converts this ServiceOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.ServiceOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServiceOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ServiceOptions;
        })();

        protobuf.MethodOptions = (function() {

            /**
             * Properties of a MethodOptions.
             * @memberof google.protobuf
             * @interface IMethodOptions
             * @property {boolean|null} [deprecated] MethodOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] MethodOptions uninterpretedOption
             * @property {string|null} [".api.get"] MethodOptions .api.get
             * @property {string|null} [".api.post"] MethodOptions .api.post
             * @property {string|null} [".api.put"] MethodOptions .api.put
             * @property {string|null} [".api.delete"] MethodOptions .api.delete
             * @property {string|null} [".api.patch"] MethodOptions .api.patch
             * @property {string|null} [".api.options"] MethodOptions .api.options
             * @property {string|null} [".api.head"] MethodOptions .api.head
             * @property {string|null} [".api.any"] MethodOptions .api.any
             * @property {string|null} [".api.genPath"] MethodOptions .api.genPath
             * @property {string|null} [".api.apiVersion"] MethodOptions .api.apiVersion
             * @property {string|null} [".api.tag"] MethodOptions .api.tag
             * @property {string|null} [".api.name"] MethodOptions .api.name
             * @property {string|null} [".api.apiLevel"] MethodOptions .api.apiLevel
             * @property {string|null} [".api.serializer"] MethodOptions .api.serializer
             * @property {string|null} [".api.param"] MethodOptions .api.param
             * @property {string|null} [".api.baseurl"] MethodOptions .api.baseurl
             */

            /**
             * Constructs a new MethodOptions.
             * @memberof google.protobuf
             * @classdesc Represents a MethodOptions.
             * @implements IMethodOptions
             * @constructor
             * @param {google.protobuf.IMethodOptions=} [properties] Properties to set
             */
            function MethodOptions(properties) {
                this.uninterpretedOption = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MethodOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype.deprecated = false;

            /**
             * MethodOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype.uninterpretedOption = $util.emptyArray;

            /**
             * MethodOptions .api.get.
             * @member {string} .api.get
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.get"] = "";

            /**
             * MethodOptions .api.post.
             * @member {string} .api.post
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.post"] = "";

            /**
             * MethodOptions .api.put.
             * @member {string} .api.put
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.put"] = "";

            /**
             * MethodOptions .api.delete.
             * @member {string} .api.delete
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.delete"] = "";

            /**
             * MethodOptions .api.patch.
             * @member {string} .api.patch
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.patch"] = "";

            /**
             * MethodOptions .api.options.
             * @member {string} .api.options
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.options"] = "";

            /**
             * MethodOptions .api.head.
             * @member {string} .api.head
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.head"] = "";

            /**
             * MethodOptions .api.any.
             * @member {string} .api.any
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.any"] = "";

            /**
             * MethodOptions .api.genPath.
             * @member {string} .api.genPath
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.genPath"] = "";

            /**
             * MethodOptions .api.apiVersion.
             * @member {string} .api.apiVersion
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.apiVersion"] = "";

            /**
             * MethodOptions .api.tag.
             * @member {string} .api.tag
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.tag"] = "";

            /**
             * MethodOptions .api.name.
             * @member {string} .api.name
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.name"] = "";

            /**
             * MethodOptions .api.apiLevel.
             * @member {string} .api.apiLevel
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.apiLevel"] = "";

            /**
             * MethodOptions .api.serializer.
             * @member {string} .api.serializer
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.serializer"] = "";

            /**
             * MethodOptions .api.param.
             * @member {string} .api.param
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.param"] = "";

            /**
             * MethodOptions .api.baseurl.
             * @member {string} .api.baseurl
             * @memberof google.protobuf.MethodOptions
             * @instance
             */
            MethodOptions.prototype[".api.baseurl"] = "";

            /**
             * Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */
            MethodOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.MethodOptions)
                    return object;
                let message = new $root.google.protobuf.MethodOptions();
                if (object.deprecated != null)
                    message.deprecated = Boolean(object.deprecated);
                if (object.uninterpretedOption) {
                    if (!Array.isArray(object.uninterpretedOption))
                        throw TypeError(".google.protobuf.MethodOptions.uninterpretedOption: array expected");
                    message.uninterpretedOption = [];
                    for (let i = 0; i < object.uninterpretedOption.length; ++i) {
                        if (typeof object.uninterpretedOption[i] !== "object")
                            throw TypeError(".google.protobuf.MethodOptions.uninterpretedOption: object expected");
                        message.uninterpretedOption[i] = $root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);
                    }
                }
                if (object[".api.get"] != null)
                    message[".api.get"] = String(object[".api.get"]);
                if (object[".api.post"] != null)
                    message[".api.post"] = String(object[".api.post"]);
                if (object[".api.put"] != null)
                    message[".api.put"] = String(object[".api.put"]);
                if (object[".api.delete"] != null)
                    message[".api.delete"] = String(object[".api.delete"]);
                if (object[".api.patch"] != null)
                    message[".api.patch"] = String(object[".api.patch"]);
                if (object[".api.options"] != null)
                    message[".api.options"] = String(object[".api.options"]);
                if (object[".api.head"] != null)
                    message[".api.head"] = String(object[".api.head"]);
                if (object[".api.any"] != null)
                    message[".api.any"] = String(object[".api.any"]);
                if (object[".api.genPath"] != null)
                    message[".api.genPath"] = String(object[".api.genPath"]);
                if (object[".api.apiVersion"] != null)
                    message[".api.apiVersion"] = String(object[".api.apiVersion"]);
                if (object[".api.tag"] != null)
                    message[".api.tag"] = String(object[".api.tag"]);
                if (object[".api.name"] != null)
                    message[".api.name"] = String(object[".api.name"]);
                if (object[".api.apiLevel"] != null)
                    message[".api.apiLevel"] = String(object[".api.apiLevel"]);
                if (object[".api.serializer"] != null)
                    message[".api.serializer"] = String(object[".api.serializer"]);
                if (object[".api.param"] != null)
                    message[".api.param"] = String(object[".api.param"]);
                if (object[".api.baseurl"] != null)
                    message[".api.baseurl"] = String(object[".api.baseurl"]);
                return message;
            };

            /**
             * Creates a plain object from a MethodOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {google.protobuf.MethodOptions} message MethodOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MethodOptions.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.uninterpretedOption = [];
                if (options.defaults) {
                    object.deprecated = false;
                    object[".api.get"] = "";
                    object[".api.post"] = "";
                    object[".api.put"] = "";
                    object[".api.delete"] = "";
                    object[".api.patch"] = "";
                    object[".api.options"] = "";
                    object[".api.head"] = "";
                    object[".api.any"] = "";
                    object[".api.genPath"] = "";
                    object[".api.apiVersion"] = "";
                    object[".api.tag"] = "";
                    object[".api.name"] = "";
                    object[".api.apiLevel"] = "";
                    object[".api.serializer"] = "";
                    object[".api.param"] = "";
                    object[".api.baseurl"] = "";
                }
                if (message.deprecated != null && message.hasOwnProperty("deprecated"))
                    object.deprecated = message.deprecated;
                if (message.uninterpretedOption && message.uninterpretedOption.length) {
                    object.uninterpretedOption = [];
                    for (let j = 0; j < message.uninterpretedOption.length; ++j)
                        object.uninterpretedOption[j] = $root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j], options);
                }
                if (message[".api.get"] != null && message.hasOwnProperty(".api.get"))
                    object[".api.get"] = message[".api.get"];
                if (message[".api.post"] != null && message.hasOwnProperty(".api.post"))
                    object[".api.post"] = message[".api.post"];
                if (message[".api.put"] != null && message.hasOwnProperty(".api.put"))
                    object[".api.put"] = message[".api.put"];
                if (message[".api.delete"] != null && message.hasOwnProperty(".api.delete"))
                    object[".api.delete"] = message[".api.delete"];
                if (message[".api.patch"] != null && message.hasOwnProperty(".api.patch"))
                    object[".api.patch"] = message[".api.patch"];
                if (message[".api.options"] != null && message.hasOwnProperty(".api.options"))
                    object[".api.options"] = message[".api.options"];
                if (message[".api.head"] != null && message.hasOwnProperty(".api.head"))
                    object[".api.head"] = message[".api.head"];
                if (message[".api.any"] != null && message.hasOwnProperty(".api.any"))
                    object[".api.any"] = message[".api.any"];
                if (message[".api.genPath"] != null && message.hasOwnProperty(".api.genPath"))
                    object[".api.genPath"] = message[".api.genPath"];
                if (message[".api.apiVersion"] != null && message.hasOwnProperty(".api.apiVersion"))
                    object[".api.apiVersion"] = message[".api.apiVersion"];
                if (message[".api.tag"] != null && message.hasOwnProperty(".api.tag"))
                    object[".api.tag"] = message[".api.tag"];
                if (message[".api.name"] != null && message.hasOwnProperty(".api.name"))
                    object[".api.name"] = message[".api.name"];
                if (message[".api.apiLevel"] != null && message.hasOwnProperty(".api.apiLevel"))
                    object[".api.apiLevel"] = message[".api.apiLevel"];
                if (message[".api.serializer"] != null && message.hasOwnProperty(".api.serializer"))
                    object[".api.serializer"] = message[".api.serializer"];
                if (message[".api.param"] != null && message.hasOwnProperty(".api.param"))
                    object[".api.param"] = message[".api.param"];
                if (message[".api.baseurl"] != null && message.hasOwnProperty(".api.baseurl"))
                    object[".api.baseurl"] = message[".api.baseurl"];
                return object;
            };

            /**
             * Converts this MethodOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.MethodOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MethodOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MethodOptions;
        })();

        protobuf.UninterpretedOption = (function() {

            /**
             * Properties of an UninterpretedOption.
             * @memberof google.protobuf
             * @interface IUninterpretedOption
             * @property {Array.<google.protobuf.UninterpretedOption.INamePart>|null} [name] UninterpretedOption name
             * @property {string|null} [identifierValue] UninterpretedOption identifierValue
             * @property {number|null} [positiveIntValue] UninterpretedOption positiveIntValue
             * @property {number|null} [negativeIntValue] UninterpretedOption negativeIntValue
             * @property {number|null} [doubleValue] UninterpretedOption doubleValue
             * @property {Uint8Array|null} [stringValue] UninterpretedOption stringValue
             * @property {string|null} [aggregateValue] UninterpretedOption aggregateValue
             */

            /**
             * Constructs a new UninterpretedOption.
             * @memberof google.protobuf
             * @classdesc Represents an UninterpretedOption.
             * @implements IUninterpretedOption
             * @constructor
             * @param {google.protobuf.IUninterpretedOption=} [properties] Properties to set
             */
            function UninterpretedOption(properties) {
                this.name = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UninterpretedOption name.
             * @member {Array.<google.protobuf.UninterpretedOption.INamePart>} name
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.name = $util.emptyArray;

            /**
             * UninterpretedOption identifierValue.
             * @member {string} identifierValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.identifierValue = "";

            /**
             * UninterpretedOption positiveIntValue.
             * @member {number} positiveIntValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.positiveIntValue = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * UninterpretedOption negativeIntValue.
             * @member {number} negativeIntValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.negativeIntValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * UninterpretedOption doubleValue.
             * @member {number} doubleValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.doubleValue = 0;

            /**
             * UninterpretedOption stringValue.
             * @member {Uint8Array} stringValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.stringValue = $util.newBuffer([]);

            /**
             * UninterpretedOption aggregateValue.
             * @member {string} aggregateValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */
            UninterpretedOption.prototype.aggregateValue = "";

            /**
             * Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */
            UninterpretedOption.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.UninterpretedOption)
                    return object;
                let message = new $root.google.protobuf.UninterpretedOption();
                if (object.name) {
                    if (!Array.isArray(object.name))
                        throw TypeError(".google.protobuf.UninterpretedOption.name: array expected");
                    message.name = [];
                    for (let i = 0; i < object.name.length; ++i) {
                        if (typeof object.name[i] !== "object")
                            throw TypeError(".google.protobuf.UninterpretedOption.name: object expected");
                        message.name[i] = $root.google.protobuf.UninterpretedOption.NamePart.fromObject(object.name[i]);
                    }
                }
                if (object.identifierValue != null)
                    message.identifierValue = String(object.identifierValue);
                if (object.positiveIntValue != null)
                    if ($util.Long)
                        (message.positiveIntValue = $util.Long.fromValue(object.positiveIntValue)).unsigned = true;
                    else if (typeof object.positiveIntValue === "string")
                        message.positiveIntValue = parseInt(object.positiveIntValue, 10);
                    else if (typeof object.positiveIntValue === "number")
                        message.positiveIntValue = object.positiveIntValue;
                    else if (typeof object.positiveIntValue === "object")
                        message.positiveIntValue = new $util.LongBits(object.positiveIntValue.low >>> 0, object.positiveIntValue.high >>> 0).toNumber(true);
                if (object.negativeIntValue != null)
                    if ($util.Long)
                        (message.negativeIntValue = $util.Long.fromValue(object.negativeIntValue)).unsigned = false;
                    else if (typeof object.negativeIntValue === "string")
                        message.negativeIntValue = parseInt(object.negativeIntValue, 10);
                    else if (typeof object.negativeIntValue === "number")
                        message.negativeIntValue = object.negativeIntValue;
                    else if (typeof object.negativeIntValue === "object")
                        message.negativeIntValue = new $util.LongBits(object.negativeIntValue.low >>> 0, object.negativeIntValue.high >>> 0).toNumber();
                if (object.doubleValue != null)
                    message.doubleValue = Number(object.doubleValue);
                if (object.stringValue != null)
                    if (typeof object.stringValue === "string")
                        $util.base64.decode(object.stringValue, message.stringValue = $util.newBuffer($util.base64.length(object.stringValue)), 0);
                    else if (object.stringValue.length)
                        message.stringValue = object.stringValue;
                if (object.aggregateValue != null)
                    message.aggregateValue = String(object.aggregateValue);
                return message;
            };

            /**
             * Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {google.protobuf.UninterpretedOption} message UninterpretedOption
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UninterpretedOption.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.name = [];
                if (options.defaults) {
                    object.identifierValue = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.positiveIntValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.positiveIntValue = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.negativeIntValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.negativeIntValue = options.longs === String ? "0" : 0;
                    object.doubleValue = 0;
                    if (options.bytes === String)
                        object.stringValue = "";
                    else {
                        object.stringValue = [];
                        if (options.bytes !== Array)
                            object.stringValue = $util.newBuffer(object.stringValue);
                    }
                    object.aggregateValue = "";
                }
                if (message.name && message.name.length) {
                    object.name = [];
                    for (let j = 0; j < message.name.length; ++j)
                        object.name[j] = $root.google.protobuf.UninterpretedOption.NamePart.toObject(message.name[j], options);
                }
                if (message.identifierValue != null && message.hasOwnProperty("identifierValue"))
                    object.identifierValue = message.identifierValue;
                if (message.positiveIntValue != null && message.hasOwnProperty("positiveIntValue"))
                    if (typeof message.positiveIntValue === "number")
                        object.positiveIntValue = options.longs === String ? String(message.positiveIntValue) : message.positiveIntValue;
                    else
                        object.positiveIntValue = options.longs === String ? $util.Long.prototype.toString.call(message.positiveIntValue) : options.longs === Number ? new $util.LongBits(message.positiveIntValue.low >>> 0, message.positiveIntValue.high >>> 0).toNumber(true) : message.positiveIntValue;
                if (message.negativeIntValue != null && message.hasOwnProperty("negativeIntValue"))
                    if (typeof message.negativeIntValue === "number")
                        object.negativeIntValue = options.longs === String ? String(message.negativeIntValue) : message.negativeIntValue;
                    else
                        object.negativeIntValue = options.longs === String ? $util.Long.prototype.toString.call(message.negativeIntValue) : options.longs === Number ? new $util.LongBits(message.negativeIntValue.low >>> 0, message.negativeIntValue.high >>> 0).toNumber() : message.negativeIntValue;
                if (message.doubleValue != null && message.hasOwnProperty("doubleValue"))
                    object.doubleValue = options.json && !isFinite(message.doubleValue) ? String(message.doubleValue) : message.doubleValue;
                if (message.stringValue != null && message.hasOwnProperty("stringValue"))
                    object.stringValue = options.bytes === String ? $util.base64.encode(message.stringValue, 0, message.stringValue.length) : options.bytes === Array ? Array.prototype.slice.call(message.stringValue) : message.stringValue;
                if (message.aggregateValue != null && message.hasOwnProperty("aggregateValue"))
                    object.aggregateValue = message.aggregateValue;
                return object;
            };

            /**
             * Converts this UninterpretedOption to JSON.
             * @function toJSON
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UninterpretedOption.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            UninterpretedOption.NamePart = (function() {

                /**
                 * Properties of a NamePart.
                 * @memberof google.protobuf.UninterpretedOption
                 * @interface INamePart
                 * @property {string} namePart NamePart namePart
                 * @property {boolean} isExtension NamePart isExtension
                 */

                /**
                 * Constructs a new NamePart.
                 * @memberof google.protobuf.UninterpretedOption
                 * @classdesc Represents a NamePart.
                 * @implements INamePart
                 * @constructor
                 * @param {google.protobuf.UninterpretedOption.INamePart=} [properties] Properties to set
                 */
                function NamePart(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * NamePart namePart.
                 * @member {string} namePart
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @instance
                 */
                NamePart.prototype.namePart = "";

                /**
                 * NamePart isExtension.
                 * @member {boolean} isExtension
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @instance
                 */
                NamePart.prototype.isExtension = false;

                /**
                 * Creates a NamePart message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */
                NamePart.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.UninterpretedOption.NamePart)
                        return object;
                    let message = new $root.google.protobuf.UninterpretedOption.NamePart();
                    if (object.namePart != null)
                        message.namePart = String(object.namePart);
                    if (object.isExtension != null)
                        message.isExtension = Boolean(object.isExtension);
                    return message;
                };

                /**
                 * Creates a plain object from a NamePart message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {google.protobuf.UninterpretedOption.NamePart} message NamePart
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NamePart.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.namePart = "";
                        object.isExtension = false;
                    }
                    if (message.namePart != null && message.hasOwnProperty("namePart"))
                        object.namePart = message.namePart;
                    if (message.isExtension != null && message.hasOwnProperty("isExtension"))
                        object.isExtension = message.isExtension;
                    return object;
                };

                /**
                 * Converts this NamePart to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NamePart.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return NamePart;
            })();

            return UninterpretedOption;
        })();

        protobuf.SourceCodeInfo = (function() {

            /**
             * Properties of a SourceCodeInfo.
             * @memberof google.protobuf
             * @interface ISourceCodeInfo
             * @property {Array.<google.protobuf.SourceCodeInfo.ILocation>|null} [location] SourceCodeInfo location
             */

            /**
             * Constructs a new SourceCodeInfo.
             * @memberof google.protobuf
             * @classdesc Represents a SourceCodeInfo.
             * @implements ISourceCodeInfo
             * @constructor
             * @param {google.protobuf.ISourceCodeInfo=} [properties] Properties to set
             */
            function SourceCodeInfo(properties) {
                this.location = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SourceCodeInfo location.
             * @member {Array.<google.protobuf.SourceCodeInfo.ILocation>} location
             * @memberof google.protobuf.SourceCodeInfo
             * @instance
             */
            SourceCodeInfo.prototype.location = $util.emptyArray;

            /**
             * Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */
            SourceCodeInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.SourceCodeInfo)
                    return object;
                let message = new $root.google.protobuf.SourceCodeInfo();
                if (object.location) {
                    if (!Array.isArray(object.location))
                        throw TypeError(".google.protobuf.SourceCodeInfo.location: array expected");
                    message.location = [];
                    for (let i = 0; i < object.location.length; ++i) {
                        if (typeof object.location[i] !== "object")
                            throw TypeError(".google.protobuf.SourceCodeInfo.location: object expected");
                        message.location[i] = $root.google.protobuf.SourceCodeInfo.Location.fromObject(object.location[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {google.protobuf.SourceCodeInfo} message SourceCodeInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SourceCodeInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.location = [];
                if (message.location && message.location.length) {
                    object.location = [];
                    for (let j = 0; j < message.location.length; ++j)
                        object.location[j] = $root.google.protobuf.SourceCodeInfo.Location.toObject(message.location[j], options);
                }
                return object;
            };

            /**
             * Converts this SourceCodeInfo to JSON.
             * @function toJSON
             * @memberof google.protobuf.SourceCodeInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SourceCodeInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            SourceCodeInfo.Location = (function() {

                /**
                 * Properties of a Location.
                 * @memberof google.protobuf.SourceCodeInfo
                 * @interface ILocation
                 * @property {Array.<number>|null} [path] Location path
                 * @property {Array.<number>|null} [span] Location span
                 * @property {string|null} [leadingComments] Location leadingComments
                 * @property {string|null} [trailingComments] Location trailingComments
                 * @property {Array.<string>|null} [leadingDetachedComments] Location leadingDetachedComments
                 */

                /**
                 * Constructs a new Location.
                 * @memberof google.protobuf.SourceCodeInfo
                 * @classdesc Represents a Location.
                 * @implements ILocation
                 * @constructor
                 * @param {google.protobuf.SourceCodeInfo.ILocation=} [properties] Properties to set
                 */
                function Location(properties) {
                    this.path = [];
                    this.span = [];
                    this.leadingDetachedComments = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Location path.
                 * @member {Array.<number>} path
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.path = $util.emptyArray;

                /**
                 * Location span.
                 * @member {Array.<number>} span
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.span = $util.emptyArray;

                /**
                 * Location leadingComments.
                 * @member {string} leadingComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.leadingComments = "";

                /**
                 * Location trailingComments.
                 * @member {string} trailingComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.trailingComments = "";

                /**
                 * Location leadingDetachedComments.
                 * @member {Array.<string>} leadingDetachedComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */
                Location.prototype.leadingDetachedComments = $util.emptyArray;

                /**
                 * Creates a Location message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */
                Location.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.SourceCodeInfo.Location)
                        return object;
                    let message = new $root.google.protobuf.SourceCodeInfo.Location();
                    if (object.path) {
                        if (!Array.isArray(object.path))
                            throw TypeError(".google.protobuf.SourceCodeInfo.Location.path: array expected");
                        message.path = [];
                        for (let i = 0; i < object.path.length; ++i)
                            message.path[i] = object.path[i] | 0;
                    }
                    if (object.span) {
                        if (!Array.isArray(object.span))
                            throw TypeError(".google.protobuf.SourceCodeInfo.Location.span: array expected");
                        message.span = [];
                        for (let i = 0; i < object.span.length; ++i)
                            message.span[i] = object.span[i] | 0;
                    }
                    if (object.leadingComments != null)
                        message.leadingComments = String(object.leadingComments);
                    if (object.trailingComments != null)
                        message.trailingComments = String(object.trailingComments);
                    if (object.leadingDetachedComments) {
                        if (!Array.isArray(object.leadingDetachedComments))
                            throw TypeError(".google.protobuf.SourceCodeInfo.Location.leadingDetachedComments: array expected");
                        message.leadingDetachedComments = [];
                        for (let i = 0; i < object.leadingDetachedComments.length; ++i)
                            message.leadingDetachedComments[i] = String(object.leadingDetachedComments[i]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {google.protobuf.SourceCodeInfo.Location} message Location
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Location.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults) {
                        object.path = [];
                        object.span = [];
                        object.leadingDetachedComments = [];
                    }
                    if (options.defaults) {
                        object.leadingComments = "";
                        object.trailingComments = "";
                    }
                    if (message.path && message.path.length) {
                        object.path = [];
                        for (let j = 0; j < message.path.length; ++j)
                            object.path[j] = message.path[j];
                    }
                    if (message.span && message.span.length) {
                        object.span = [];
                        for (let j = 0; j < message.span.length; ++j)
                            object.span[j] = message.span[j];
                    }
                    if (message.leadingComments != null && message.hasOwnProperty("leadingComments"))
                        object.leadingComments = message.leadingComments;
                    if (message.trailingComments != null && message.hasOwnProperty("trailingComments"))
                        object.trailingComments = message.trailingComments;
                    if (message.leadingDetachedComments && message.leadingDetachedComments.length) {
                        object.leadingDetachedComments = [];
                        for (let j = 0; j < message.leadingDetachedComments.length; ++j)
                            object.leadingDetachedComments[j] = message.leadingDetachedComments[j];
                    }
                    return object;
                };

                /**
                 * Converts this Location to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Location.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Location;
            })();

            return SourceCodeInfo;
        })();

        protobuf.GeneratedCodeInfo = (function() {

            /**
             * Properties of a GeneratedCodeInfo.
             * @memberof google.protobuf
             * @interface IGeneratedCodeInfo
             * @property {Array.<google.protobuf.GeneratedCodeInfo.IAnnotation>|null} [annotation] GeneratedCodeInfo annotation
             */

            /**
             * Constructs a new GeneratedCodeInfo.
             * @memberof google.protobuf
             * @classdesc Represents a GeneratedCodeInfo.
             * @implements IGeneratedCodeInfo
             * @constructor
             * @param {google.protobuf.IGeneratedCodeInfo=} [properties] Properties to set
             */
            function GeneratedCodeInfo(properties) {
                this.annotation = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GeneratedCodeInfo annotation.
             * @member {Array.<google.protobuf.GeneratedCodeInfo.IAnnotation>} annotation
             * @memberof google.protobuf.GeneratedCodeInfo
             * @instance
             */
            GeneratedCodeInfo.prototype.annotation = $util.emptyArray;

            /**
             * Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */
            GeneratedCodeInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.GeneratedCodeInfo)
                    return object;
                let message = new $root.google.protobuf.GeneratedCodeInfo();
                if (object.annotation) {
                    if (!Array.isArray(object.annotation))
                        throw TypeError(".google.protobuf.GeneratedCodeInfo.annotation: array expected");
                    message.annotation = [];
                    for (let i = 0; i < object.annotation.length; ++i) {
                        if (typeof object.annotation[i] !== "object")
                            throw TypeError(".google.protobuf.GeneratedCodeInfo.annotation: object expected");
                        message.annotation[i] = $root.google.protobuf.GeneratedCodeInfo.Annotation.fromObject(object.annotation[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {google.protobuf.GeneratedCodeInfo} message GeneratedCodeInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GeneratedCodeInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.annotation = [];
                if (message.annotation && message.annotation.length) {
                    object.annotation = [];
                    for (let j = 0; j < message.annotation.length; ++j)
                        object.annotation[j] = $root.google.protobuf.GeneratedCodeInfo.Annotation.toObject(message.annotation[j], options);
                }
                return object;
            };

            /**
             * Converts this GeneratedCodeInfo to JSON.
             * @function toJSON
             * @memberof google.protobuf.GeneratedCodeInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GeneratedCodeInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            GeneratedCodeInfo.Annotation = (function() {

                /**
                 * Properties of an Annotation.
                 * @memberof google.protobuf.GeneratedCodeInfo
                 * @interface IAnnotation
                 * @property {Array.<number>|null} [path] Annotation path
                 * @property {string|null} [sourceFile] Annotation sourceFile
                 * @property {number|null} [begin] Annotation begin
                 * @property {number|null} [end] Annotation end
                 */

                /**
                 * Constructs a new Annotation.
                 * @memberof google.protobuf.GeneratedCodeInfo
                 * @classdesc Represents an Annotation.
                 * @implements IAnnotation
                 * @constructor
                 * @param {google.protobuf.GeneratedCodeInfo.IAnnotation=} [properties] Properties to set
                 */
                function Annotation(properties) {
                    this.path = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Annotation path.
                 * @member {Array.<number>} path
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */
                Annotation.prototype.path = $util.emptyArray;

                /**
                 * Annotation sourceFile.
                 * @member {string} sourceFile
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */
                Annotation.prototype.sourceFile = "";

                /**
                 * Annotation begin.
                 * @member {number} begin
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */
                Annotation.prototype.begin = 0;

                /**
                 * Annotation end.
                 * @member {number} end
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */
                Annotation.prototype.end = 0;

                /**
                 * Creates an Annotation message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */
                Annotation.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.GeneratedCodeInfo.Annotation)
                        return object;
                    let message = new $root.google.protobuf.GeneratedCodeInfo.Annotation();
                    if (object.path) {
                        if (!Array.isArray(object.path))
                            throw TypeError(".google.protobuf.GeneratedCodeInfo.Annotation.path: array expected");
                        message.path = [];
                        for (let i = 0; i < object.path.length; ++i)
                            message.path[i] = object.path[i] | 0;
                    }
                    if (object.sourceFile != null)
                        message.sourceFile = String(object.sourceFile);
                    if (object.begin != null)
                        message.begin = object.begin | 0;
                    if (object.end != null)
                        message.end = object.end | 0;
                    return message;
                };

                /**
                 * Creates a plain object from an Annotation message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation} message Annotation
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Annotation.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.path = [];
                    if (options.defaults) {
                        object.sourceFile = "";
                        object.begin = 0;
                        object.end = 0;
                    }
                    if (message.path && message.path.length) {
                        object.path = [];
                        for (let j = 0; j < message.path.length; ++j)
                            object.path[j] = message.path[j];
                    }
                    if (message.sourceFile != null && message.hasOwnProperty("sourceFile"))
                        object.sourceFile = message.sourceFile;
                    if (message.begin != null && message.hasOwnProperty("begin"))
                        object.begin = message.begin;
                    if (message.end != null && message.hasOwnProperty("end"))
                        object.end = message.end;
                    return object;
                };

                /**
                 * Converts this Annotation to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Annotation.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Annotation;
            })();

            return GeneratedCodeInfo;
        })();

        return protobuf;
    })();

    return google;
})();