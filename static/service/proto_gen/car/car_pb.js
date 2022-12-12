import * as $protobuf from "protobufjs";

// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const car = $root.car = (() => {

    /**
     * Namespace car.
     * @exports car
     * @namespace
     */
    const car = {};

    car.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof car
         * @namespace
         */
        const v1 = {};

        v1.CarEntity = (function() {

            /**
             * Properties of a CarEntity.
             * @memberof car.v1
             * @interface ICarEntity
             * @property {string|null} [id] CarEntity id
             * @property {car.v1.ICar|null} [car] CarEntity car
             */

            /**
             * Constructs a new CarEntity.
             * @memberof car.v1
             * @classdesc Represents a CarEntity.
             * @implements ICarEntity
             * @constructor
             * @param {car.v1.ICarEntity=} [properties] Properties to set
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
             * @memberof car.v1.CarEntity
             * @instance
             */
            CarEntity.prototype.id = "";

            /**
             * CarEntity car.
             * @member {car.v1.ICar|null|undefined} car
             * @memberof car.v1.CarEntity
             * @instance
             */
            CarEntity.prototype.car = null;

            /**
             * Creates a CarEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.CarEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.CarEntity} CarEntity
             */
            CarEntity.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.CarEntity)
                    return object;
                let message = new $root.car.v1.CarEntity();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.car != null) {
                    if (typeof object.car !== "object")
                        throw TypeError(".car.v1.CarEntity.car: object expected");
                    message.car = $root.car.v1.Car.fromObject(object.car);
                }
                return message;
            };

            /**
             * Creates a plain object from a CarEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.CarEntity
             * @static
             * @param {car.v1.CarEntity} message CarEntity
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
                    object.car = $root.car.v1.Car.toObject(message.car, options);
                return object;
            };

            /**
             * Converts this CarEntity to JSON.
             * @function toJSON
             * @memberof car.v1.CarEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CarEntity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CarEntity;
        })();

        /**
         * CarStatus enum.
         * @name car.v1.CarStatus
         * @enum {number}
         * @property {number} CS_NOT_SPECIFIED=0 CS_NOT_SPECIFIED value
         * @property {number} LOCKED=1 LOCKED value
         * @property {number} UNLOCKING=2 UNLOCKING value
         * @property {number} UNLOCKED=3 UNLOCKED value
         * @property {number} LOCKING=4 LOCKING value
         */
        v1.CarStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "CS_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "LOCKED"] = 1;
            values[valuesById[2] = "UNLOCKING"] = 2;
            values[valuesById[3] = "UNLOCKED"] = 3;
            values[valuesById[4] = "LOCKING"] = 4;
            return values;
        })();

        v1.Driver = (function() {

            /**
             * Properties of a Driver.
             * @memberof car.v1
             * @interface IDriver
             * @property {string|null} [id] Driver id
             * @property {string|null} [avatarUrl] Driver avatarUrl
             */

            /**
             * Constructs a new Driver.
             * @memberof car.v1
             * @classdesc Represents a Driver.
             * @implements IDriver
             * @constructor
             * @param {car.v1.IDriver=} [properties] Properties to set
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
             * @memberof car.v1.Driver
             * @instance
             */
            Driver.prototype.id = "";

            /**
             * Driver avatarUrl.
             * @member {string} avatarUrl
             * @memberof car.v1.Driver
             * @instance
             */
            Driver.prototype.avatarUrl = "";

            /**
             * Creates a Driver message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.Driver
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.Driver} Driver
             */
            Driver.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.Driver)
                    return object;
                let message = new $root.car.v1.Driver();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.avatarUrl != null)
                    message.avatarUrl = String(object.avatarUrl);
                return message;
            };

            /**
             * Creates a plain object from a Driver message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.Driver
             * @static
             * @param {car.v1.Driver} message Driver
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
             * @memberof car.v1.Driver
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Driver.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Driver;
        })();

        v1.Location = (function() {

            /**
             * Properties of a Location.
             * @memberof car.v1
             * @interface ILocation
             * @property {number|null} [latitude] Location latitude
             * @property {number|null} [longitude] Location longitude
             */

            /**
             * Constructs a new Location.
             * @memberof car.v1
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {car.v1.ILocation=} [properties] Properties to set
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
             * @memberof car.v1.Location
             * @instance
             */
            Location.prototype.latitude = 0;

            /**
             * Location longitude.
             * @member {number} longitude
             * @memberof car.v1.Location
             * @instance
             */
            Location.prototype.longitude = 0;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.Location)
                    return object;
                let message = new $root.car.v1.Location();
                if (object.latitude != null)
                    message.latitude = Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = Number(object.longitude);
                return message;
            };

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.Location
             * @static
             * @param {car.v1.Location} message Location
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
             * @memberof car.v1.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Location;
        })();

        v1.Car = (function() {

            /**
             * Properties of a Car.
             * @memberof car.v1
             * @interface ICar
             * @property {car.v1.CarStatus|null} [status] Car status
             * @property {car.v1.IDriver|null} [driver] Car driver
             * @property {car.v1.ILocation|null} [position] Car position
             * @property {string|null} [tripId] Car tripId
             */

            /**
             * Constructs a new Car.
             * @memberof car.v1
             * @classdesc Represents a Car.
             * @implements ICar
             * @constructor
             * @param {car.v1.ICar=} [properties] Properties to set
             */
            function Car(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Car status.
             * @member {car.v1.CarStatus} status
             * @memberof car.v1.Car
             * @instance
             */
            Car.prototype.status = 0;

            /**
             * Car driver.
             * @member {car.v1.IDriver|null|undefined} driver
             * @memberof car.v1.Car
             * @instance
             */
            Car.prototype.driver = null;

            /**
             * Car position.
             * @member {car.v1.ILocation|null|undefined} position
             * @memberof car.v1.Car
             * @instance
             */
            Car.prototype.position = null;

            /**
             * Car tripId.
             * @member {string} tripId
             * @memberof car.v1.Car
             * @instance
             */
            Car.prototype.tripId = "";

            /**
             * Creates a Car message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.Car
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.Car} Car
             */
            Car.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.Car)
                    return object;
                let message = new $root.car.v1.Car();
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
                        throw TypeError(".car.v1.Car.driver: object expected");
                    message.driver = $root.car.v1.Driver.fromObject(object.driver);
                }
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".car.v1.Car.position: object expected");
                    message.position = $root.car.v1.Location.fromObject(object.position);
                }
                if (object.tripId != null)
                    message.tripId = String(object.tripId);
                return message;
            };

            /**
             * Creates a plain object from a Car message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.Car
             * @static
             * @param {car.v1.Car} message Car
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
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.car.v1.CarStatus[message.status] : message.status;
                if (message.driver != null && message.hasOwnProperty("driver"))
                    object.driver = $root.car.v1.Driver.toObject(message.driver, options);
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.car.v1.Location.toObject(message.position, options);
                if (message.tripId != null && message.hasOwnProperty("tripId"))
                    object.tripId = message.tripId;
                return object;
            };

            /**
             * Converts this Car to JSON.
             * @function toJSON
             * @memberof car.v1.Car
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Car.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Car;
        })();

        v1.CreateCarRequest = (function() {

            /**
             * Properties of a CreateCarRequest.
             * @memberof car.v1
             * @interface ICreateCarRequest
             */

            /**
             * Constructs a new CreateCarRequest.
             * @memberof car.v1
             * @classdesc Represents a CreateCarRequest.
             * @implements ICreateCarRequest
             * @constructor
             * @param {car.v1.ICreateCarRequest=} [properties] Properties to set
             */
            function CreateCarRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a CreateCarRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.CreateCarRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.CreateCarRequest} CreateCarRequest
             */
            CreateCarRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.CreateCarRequest)
                    return object;
                return new $root.car.v1.CreateCarRequest();
            };

            /**
             * Creates a plain object from a CreateCarRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.CreateCarRequest
             * @static
             * @param {car.v1.CreateCarRequest} message CreateCarRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateCarRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this CreateCarRequest to JSON.
             * @function toJSON
             * @memberof car.v1.CreateCarRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateCarRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateCarRequest;
        })();

        v1.GetCarRequest = (function() {

            /**
             * Properties of a GetCarRequest.
             * @memberof car.v1
             * @interface IGetCarRequest
             * @property {string|null} [id] GetCarRequest id
             */

            /**
             * Constructs a new GetCarRequest.
             * @memberof car.v1
             * @classdesc Represents a GetCarRequest.
             * @implements IGetCarRequest
             * @constructor
             * @param {car.v1.IGetCarRequest=} [properties] Properties to set
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
             * @memberof car.v1.GetCarRequest
             * @instance
             */
            GetCarRequest.prototype.id = "";

            /**
             * Creates a GetCarRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.GetCarRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.GetCarRequest} GetCarRequest
             */
            GetCarRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.GetCarRequest)
                    return object;
                let message = new $root.car.v1.GetCarRequest();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a GetCarRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.GetCarRequest
             * @static
             * @param {car.v1.GetCarRequest} message GetCarRequest
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
             * @memberof car.v1.GetCarRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetCarRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetCarRequest;
        })();

        v1.GetCarsRequest = (function() {

            /**
             * Properties of a GetCarsRequest.
             * @memberof car.v1
             * @interface IGetCarsRequest
             */

            /**
             * Constructs a new GetCarsRequest.
             * @memberof car.v1
             * @classdesc Represents a GetCarsRequest.
             * @implements IGetCarsRequest
             * @constructor
             * @param {car.v1.IGetCarsRequest=} [properties] Properties to set
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
             * @memberof car.v1.GetCarsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.GetCarsRequest} GetCarsRequest
             */
            GetCarsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.GetCarsRequest)
                    return object;
                return new $root.car.v1.GetCarsRequest();
            };

            /**
             * Creates a plain object from a GetCarsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.GetCarsRequest
             * @static
             * @param {car.v1.GetCarsRequest} message GetCarsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetCarsRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetCarsRequest to JSON.
             * @function toJSON
             * @memberof car.v1.GetCarsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetCarsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetCarsRequest;
        })();

        v1.GetCarsResponse = (function() {

            /**
             * Properties of a GetCarsResponse.
             * @memberof car.v1
             * @interface IGetCarsResponse
             * @property {Array.<car.v1.ICarEntity>|null} [cars] GetCarsResponse cars
             */

            /**
             * Constructs a new GetCarsResponse.
             * @memberof car.v1
             * @classdesc Represents a GetCarsResponse.
             * @implements IGetCarsResponse
             * @constructor
             * @param {car.v1.IGetCarsResponse=} [properties] Properties to set
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
             * @member {Array.<car.v1.ICarEntity>} cars
             * @memberof car.v1.GetCarsResponse
             * @instance
             */
            GetCarsResponse.prototype.cars = $util.emptyArray;

            /**
             * Creates a GetCarsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.GetCarsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.GetCarsResponse} GetCarsResponse
             */
            GetCarsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.GetCarsResponse)
                    return object;
                let message = new $root.car.v1.GetCarsResponse();
                if (object.cars) {
                    if (!Array.isArray(object.cars))
                        throw TypeError(".car.v1.GetCarsResponse.cars: array expected");
                    message.cars = [];
                    for (let i = 0; i < object.cars.length; ++i) {
                        if (typeof object.cars[i] !== "object")
                            throw TypeError(".car.v1.GetCarsResponse.cars: object expected");
                        message.cars[i] = $root.car.v1.CarEntity.fromObject(object.cars[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetCarsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.GetCarsResponse
             * @static
             * @param {car.v1.GetCarsResponse} message GetCarsResponse
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
                        object.cars[j] = $root.car.v1.CarEntity.toObject(message.cars[j], options);
                }
                return object;
            };

            /**
             * Converts this GetCarsResponse to JSON.
             * @function toJSON
             * @memberof car.v1.GetCarsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetCarsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetCarsResponse;
        })();

        v1.LockCarRequest = (function() {

            /**
             * Properties of a LockCarRequest.
             * @memberof car.v1
             * @interface ILockCarRequest
             * @property {string|null} [id] LockCarRequest id
             */

            /**
             * Constructs a new LockCarRequest.
             * @memberof car.v1
             * @classdesc Represents a LockCarRequest.
             * @implements ILockCarRequest
             * @constructor
             * @param {car.v1.ILockCarRequest=} [properties] Properties to set
             */
            function LockCarRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LockCarRequest id.
             * @member {string} id
             * @memberof car.v1.LockCarRequest
             * @instance
             */
            LockCarRequest.prototype.id = "";

            /**
             * Creates a LockCarRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.LockCarRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.LockCarRequest} LockCarRequest
             */
            LockCarRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.LockCarRequest)
                    return object;
                let message = new $root.car.v1.LockCarRequest();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a LockCarRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.LockCarRequest
             * @static
             * @param {car.v1.LockCarRequest} message LockCarRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LockCarRequest.toObject = function toObject(message, options) {
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
             * Converts this LockCarRequest to JSON.
             * @function toJSON
             * @memberof car.v1.LockCarRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LockCarRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LockCarRequest;
        })();

        v1.LockCarResponse = (function() {

            /**
             * Properties of a LockCarResponse.
             * @memberof car.v1
             * @interface ILockCarResponse
             */

            /**
             * Constructs a new LockCarResponse.
             * @memberof car.v1
             * @classdesc Represents a LockCarResponse.
             * @implements ILockCarResponse
             * @constructor
             * @param {car.v1.ILockCarResponse=} [properties] Properties to set
             */
            function LockCarResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a LockCarResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.LockCarResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.LockCarResponse} LockCarResponse
             */
            LockCarResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.LockCarResponse)
                    return object;
                return new $root.car.v1.LockCarResponse();
            };

            /**
             * Creates a plain object from a LockCarResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.LockCarResponse
             * @static
             * @param {car.v1.LockCarResponse} message LockCarResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LockCarResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this LockCarResponse to JSON.
             * @function toJSON
             * @memberof car.v1.LockCarResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LockCarResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LockCarResponse;
        })();

        v1.UnlockCarRequest = (function() {

            /**
             * Properties of an UnlockCarRequest.
             * @memberof car.v1
             * @interface IUnlockCarRequest
             * @property {string|null} [id] UnlockCarRequest id
             * @property {car.v1.IDriver|null} [driver] UnlockCarRequest driver
             * @property {string|null} [tripId] UnlockCarRequest tripId
             */

            /**
             * Constructs a new UnlockCarRequest.
             * @memberof car.v1
             * @classdesc Represents an UnlockCarRequest.
             * @implements IUnlockCarRequest
             * @constructor
             * @param {car.v1.IUnlockCarRequest=} [properties] Properties to set
             */
            function UnlockCarRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UnlockCarRequest id.
             * @member {string} id
             * @memberof car.v1.UnlockCarRequest
             * @instance
             */
            UnlockCarRequest.prototype.id = "";

            /**
             * UnlockCarRequest driver.
             * @member {car.v1.IDriver|null|undefined} driver
             * @memberof car.v1.UnlockCarRequest
             * @instance
             */
            UnlockCarRequest.prototype.driver = null;

            /**
             * UnlockCarRequest tripId.
             * @member {string} tripId
             * @memberof car.v1.UnlockCarRequest
             * @instance
             */
            UnlockCarRequest.prototype.tripId = "";

            /**
             * Creates an UnlockCarRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.UnlockCarRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.UnlockCarRequest} UnlockCarRequest
             */
            UnlockCarRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.UnlockCarRequest)
                    return object;
                let message = new $root.car.v1.UnlockCarRequest();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.driver != null) {
                    if (typeof object.driver !== "object")
                        throw TypeError(".car.v1.UnlockCarRequest.driver: object expected");
                    message.driver = $root.car.v1.Driver.fromObject(object.driver);
                }
                if (object.tripId != null)
                    message.tripId = String(object.tripId);
                return message;
            };

            /**
             * Creates a plain object from an UnlockCarRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.UnlockCarRequest
             * @static
             * @param {car.v1.UnlockCarRequest} message UnlockCarRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnlockCarRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.driver = null;
                    object.tripId = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.driver != null && message.hasOwnProperty("driver"))
                    object.driver = $root.car.v1.Driver.toObject(message.driver, options);
                if (message.tripId != null && message.hasOwnProperty("tripId"))
                    object.tripId = message.tripId;
                return object;
            };

            /**
             * Converts this UnlockCarRequest to JSON.
             * @function toJSON
             * @memberof car.v1.UnlockCarRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnlockCarRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UnlockCarRequest;
        })();

        v1.UnlockCarResponse = (function() {

            /**
             * Properties of an UnlockCarResponse.
             * @memberof car.v1
             * @interface IUnlockCarResponse
             */

            /**
             * Constructs a new UnlockCarResponse.
             * @memberof car.v1
             * @classdesc Represents an UnlockCarResponse.
             * @implements IUnlockCarResponse
             * @constructor
             * @param {car.v1.IUnlockCarResponse=} [properties] Properties to set
             */
            function UnlockCarResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates an UnlockCarResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.UnlockCarResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.UnlockCarResponse} UnlockCarResponse
             */
            UnlockCarResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.UnlockCarResponse)
                    return object;
                return new $root.car.v1.UnlockCarResponse();
            };

            /**
             * Creates a plain object from an UnlockCarResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.UnlockCarResponse
             * @static
             * @param {car.v1.UnlockCarResponse} message UnlockCarResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnlockCarResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this UnlockCarResponse to JSON.
             * @function toJSON
             * @memberof car.v1.UnlockCarResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnlockCarResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UnlockCarResponse;
        })();

        v1.UpdateCarRequest = (function() {

            /**
             * Properties of an UpdateCarRequest.
             * @memberof car.v1
             * @interface IUpdateCarRequest
             * @property {string|null} [id] UpdateCarRequest id
             * @property {car.v1.CarStatus|null} [status] UpdateCarRequest status
             * @property {car.v1.ILocation|null} [position] UpdateCarRequest position
             */

            /**
             * Constructs a new UpdateCarRequest.
             * @memberof car.v1
             * @classdesc Represents an UpdateCarRequest.
             * @implements IUpdateCarRequest
             * @constructor
             * @param {car.v1.IUpdateCarRequest=} [properties] Properties to set
             */
            function UpdateCarRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateCarRequest id.
             * @member {string} id
             * @memberof car.v1.UpdateCarRequest
             * @instance
             */
            UpdateCarRequest.prototype.id = "";

            /**
             * UpdateCarRequest status.
             * @member {car.v1.CarStatus} status
             * @memberof car.v1.UpdateCarRequest
             * @instance
             */
            UpdateCarRequest.prototype.status = 0;

            /**
             * UpdateCarRequest position.
             * @member {car.v1.ILocation|null|undefined} position
             * @memberof car.v1.UpdateCarRequest
             * @instance
             */
            UpdateCarRequest.prototype.position = null;

            /**
             * Creates an UpdateCarRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.UpdateCarRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.UpdateCarRequest} UpdateCarRequest
             */
            UpdateCarRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.UpdateCarRequest)
                    return object;
                let message = new $root.car.v1.UpdateCarRequest();
                if (object.id != null)
                    message.id = String(object.id);
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
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".car.v1.UpdateCarRequest.position: object expected");
                    message.position = $root.car.v1.Location.fromObject(object.position);
                }
                return message;
            };

            /**
             * Creates a plain object from an UpdateCarRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.UpdateCarRequest
             * @static
             * @param {car.v1.UpdateCarRequest} message UpdateCarRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateCarRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.status = options.enums === String ? "CS_NOT_SPECIFIED" : 0;
                    object.position = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.car.v1.CarStatus[message.status] : message.status;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.car.v1.Location.toObject(message.position, options);
                return object;
            };

            /**
             * Converts this UpdateCarRequest to JSON.
             * @function toJSON
             * @memberof car.v1.UpdateCarRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateCarRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateCarRequest;
        })();

        v1.UpdateCarResponse = (function() {

            /**
             * Properties of an UpdateCarResponse.
             * @memberof car.v1
             * @interface IUpdateCarResponse
             */

            /**
             * Constructs a new UpdateCarResponse.
             * @memberof car.v1
             * @classdesc Represents an UpdateCarResponse.
             * @implements IUpdateCarResponse
             * @constructor
             * @param {car.v1.IUpdateCarResponse=} [properties] Properties to set
             */
            function UpdateCarResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates an UpdateCarResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.UpdateCarResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.UpdateCarResponse} UpdateCarResponse
             */
            UpdateCarResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.UpdateCarResponse)
                    return object;
                return new $root.car.v1.UpdateCarResponse();
            };

            /**
             * Creates a plain object from an UpdateCarResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.UpdateCarResponse
             * @static
             * @param {car.v1.UpdateCarResponse} message UpdateCarResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateCarResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this UpdateCarResponse to JSON.
             * @function toJSON
             * @memberof car.v1.UpdateCarResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateCarResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateCarResponse;
        })();

        v1.CarService = (function() {

            /**
             * Constructs a new CarService service.
             * @memberof car.v1
             * @classdesc Represents a CarService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function CarService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (CarService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = CarService;

            /**
             * Callback as used by {@link car.v1.CarService#createCar}.
             * @memberof car.v1.CarService
             * @typedef CreateCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.CarEntity} [response] CarEntity
             */

            /**
             * Calls CreateCar.
             * @function createCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.ICreateCarRequest} request CreateCarRequest message or plain object
             * @param {car.v1.CarService.CreateCarCallback} callback Node-style callback called with the error, if any, and CarEntity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.createCar = function createCar(request, callback) {
                return this.rpcCall(createCar, $root.car.v1.CreateCarRequest, $root.car.v1.CarEntity, request, callback);
            }, "name", { value: "CreateCar" });

            /**
             * Calls CreateCar.
             * @function createCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.ICreateCarRequest} request CreateCarRequest message or plain object
             * @returns {Promise<car.v1.CarEntity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#getCar}.
             * @memberof car.v1.CarService
             * @typedef GetCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.Car} [response] Car
             */

            /**
             * Calls GetCar.
             * @function getCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IGetCarRequest} request GetCarRequest message or plain object
             * @param {car.v1.CarService.GetCarCallback} callback Node-style callback called with the error, if any, and Car
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.getCar = function getCar(request, callback) {
                return this.rpcCall(getCar, $root.car.v1.GetCarRequest, $root.car.v1.Car, request, callback);
            }, "name", { value: "GetCar" });

            /**
             * Calls GetCar.
             * @function getCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IGetCarRequest} request GetCarRequest message or plain object
             * @returns {Promise<car.v1.Car>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#getCars}.
             * @memberof car.v1.CarService
             * @typedef GetCarsCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.GetCarsResponse} [response] GetCarsResponse
             */

            /**
             * Calls GetCars.
             * @function getCars
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IGetCarsRequest} request GetCarsRequest message or plain object
             * @param {car.v1.CarService.GetCarsCallback} callback Node-style callback called with the error, if any, and GetCarsResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.getCars = function getCars(request, callback) {
                return this.rpcCall(getCars, $root.car.v1.GetCarsRequest, $root.car.v1.GetCarsResponse, request, callback);
            }, "name", { value: "GetCars" });

            /**
             * Calls GetCars.
             * @function getCars
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IGetCarsRequest} request GetCarsRequest message or plain object
             * @returns {Promise<car.v1.GetCarsResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#lockCar}.
             * @memberof car.v1.CarService
             * @typedef LockCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.LockCarResponse} [response] LockCarResponse
             */

            /**
             * Calls LockCar.
             * @function lockCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.ILockCarRequest} request LockCarRequest message or plain object
             * @param {car.v1.CarService.LockCarCallback} callback Node-style callback called with the error, if any, and LockCarResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.lockCar = function lockCar(request, callback) {
                return this.rpcCall(lockCar, $root.car.v1.LockCarRequest, $root.car.v1.LockCarResponse, request, callback);
            }, "name", { value: "LockCar" });

            /**
             * Calls LockCar.
             * @function lockCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.ILockCarRequest} request LockCarRequest message or plain object
             * @returns {Promise<car.v1.LockCarResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#unlockCar}.
             * @memberof car.v1.CarService
             * @typedef UnlockCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.UnlockCarResponse} [response] UnlockCarResponse
             */

            /**
             * Calls UnlockCar.
             * @function unlockCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IUnlockCarRequest} request UnlockCarRequest message or plain object
             * @param {car.v1.CarService.UnlockCarCallback} callback Node-style callback called with the error, if any, and UnlockCarResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.unlockCar = function unlockCar(request, callback) {
                return this.rpcCall(unlockCar, $root.car.v1.UnlockCarRequest, $root.car.v1.UnlockCarResponse, request, callback);
            }, "name", { value: "UnlockCar" });

            /**
             * Calls UnlockCar.
             * @function unlockCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IUnlockCarRequest} request UnlockCarRequest message or plain object
             * @returns {Promise<car.v1.UnlockCarResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#updateCar}.
             * @memberof car.v1.CarService
             * @typedef UpdateCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.UpdateCarResponse} [response] UpdateCarResponse
             */

            /**
             * Calls UpdateCar.
             * @function updateCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IUpdateCarRequest} request UpdateCarRequest message or plain object
             * @param {car.v1.CarService.UpdateCarCallback} callback Node-style callback called with the error, if any, and UpdateCarResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.updateCar = function updateCar(request, callback) {
                return this.rpcCall(updateCar, $root.car.v1.UpdateCarRequest, $root.car.v1.UpdateCarResponse, request, callback);
            }, "name", { value: "UpdateCar" });

            /**
             * Calls UpdateCar.
             * @function updateCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IUpdateCarRequest} request UpdateCarRequest message or plain object
             * @returns {Promise<car.v1.UpdateCarResponse>} Promise
             * @variation 2
             */

            return CarService;
        })();

        return v1;
    })();

    return car;
})();