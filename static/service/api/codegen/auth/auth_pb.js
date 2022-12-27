import * as $protobuf from "protobufjs";
// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const auth = $root.auth = (() => {

    /**
     * Namespace auth.
     * @exports auth
     * @namespace
     */
    const auth = {};

    auth.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof auth
         * @namespace
         */
        const v1 = {};

        v1.LoginRequest = (function() {

            /**
             * Properties of a LoginRequest.
             * @memberof auth.v1
             * @interface ILoginRequest
             * @property {string|null} [code] LoginRequest code
             */

            /**
             * Constructs a new LoginRequest.
             * @memberof auth.v1
             * @classdesc Represents a LoginRequest.
             * @implements ILoginRequest
             * @constructor
             * @param {auth.v1.ILoginRequest=} [properties] Properties to set
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
             * @memberof auth.v1.LoginRequest
             * @instance
             */
            LoginRequest.prototype.code = "";

            /**
             * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.LoginRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.LoginRequest} LoginRequest
             */
            LoginRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.LoginRequest)
                    return object;
                let message = new $root.auth.v1.LoginRequest();
                if (object.code != null)
                    message.code = String(object.code);
                return message;
            };

            /**
             * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.LoginRequest
             * @static
             * @param {auth.v1.LoginRequest} message LoginRequest
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
             * @memberof auth.v1.LoginRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginRequest;
        })();

        v1.Data = (function() {

            /**
             * Properties of a Data.
             * @memberof auth.v1
             * @interface IData
             * @property {number|null} [expiredAt] Data expiredAt
             * @property {string|null} [token] Data token
             */

            /**
             * Constructs a new Data.
             * @memberof auth.v1
             * @classdesc Represents a Data.
             * @implements IData
             * @constructor
             * @param {auth.v1.IData=} [properties] Properties to set
             */
            function Data(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Data expiredAt.
             * @member {number} expiredAt
             * @memberof auth.v1.Data
             * @instance
             */
            Data.prototype.expiredAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Data token.
             * @member {string} token
             * @memberof auth.v1.Data
             * @instance
             */
            Data.prototype.token = "";

            /**
             * Creates a Data message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.Data
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.Data} Data
             */
            Data.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.Data)
                    return object;
                let message = new $root.auth.v1.Data();
                if (object.expiredAt != null)
                    if ($util.Long)
                        (message.expiredAt = $util.Long.fromValue(object.expiredAt)).unsigned = false;
                    else if (typeof object.expiredAt === "string")
                        message.expiredAt = parseInt(object.expiredAt, 10);
                    else if (typeof object.expiredAt === "number")
                        message.expiredAt = object.expiredAt;
                    else if (typeof object.expiredAt === "object")
                        message.expiredAt = new $util.LongBits(object.expiredAt.low >>> 0, object.expiredAt.high >>> 0).toNumber();
                if (object.token != null)
                    message.token = String(object.token);
                return message;
            };

            /**
             * Creates a plain object from a Data message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.Data
             * @static
             * @param {auth.v1.Data} message Data
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Data.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.expiredAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.expiredAt = options.longs === String ? "0" : 0;
                    object.token = "";
                }
                if (message.expiredAt != null && message.hasOwnProperty("expiredAt"))
                    if (typeof message.expiredAt === "number")
                        object.expiredAt = options.longs === String ? String(message.expiredAt) : message.expiredAt;
                    else
                        object.expiredAt = options.longs === String ? $util.Long.prototype.toString.call(message.expiredAt) : options.longs === Number ? new $util.LongBits(message.expiredAt.low >>> 0, message.expiredAt.high >>> 0).toNumber() : message.expiredAt;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                return object;
            };

            /**
             * Converts this Data to JSON.
             * @function toJSON
             * @memberof auth.v1.Data
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Data.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Data;
        })();

        v1.LoginResponse = (function() {

            /**
             * Properties of a LoginResponse.
             * @memberof auth.v1
             * @interface ILoginResponse
             * @property {number|null} [code] LoginResponse code
             * @property {auth.v1.IData|null} [data] LoginResponse data
             * @property {string|null} [message] LoginResponse message
             */

            /**
             * Constructs a new LoginResponse.
             * @memberof auth.v1
             * @classdesc Represents a LoginResponse.
             * @implements ILoginResponse
             * @constructor
             * @param {auth.v1.ILoginResponse=} [properties] Properties to set
             */
            function LoginResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginResponse code.
             * @member {number} code
             * @memberof auth.v1.LoginResponse
             * @instance
             */
            LoginResponse.prototype.code = 0;

            /**
             * LoginResponse data.
             * @member {auth.v1.IData|null|undefined} data
             * @memberof auth.v1.LoginResponse
             * @instance
             */
            LoginResponse.prototype.data = null;

            /**
             * LoginResponse message.
             * @member {string} message
             * @memberof auth.v1.LoginResponse
             * @instance
             */
            LoginResponse.prototype.message = "";

            /**
             * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.LoginResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.LoginResponse} LoginResponse
             */
            LoginResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.LoginResponse)
                    return object;
                let message = new $root.auth.v1.LoginResponse();
                if (object.code != null)
                    message.code = object.code | 0;
                if (object.data != null) {
                    if (typeof object.data !== "object")
                        throw TypeError(".auth.v1.LoginResponse.data: object expected");
                    message.data = $root.auth.v1.Data.fromObject(object.data);
                }
                if (object.message != null)
                    message.message = String(object.message);
                return message;
            };

            /**
             * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.LoginResponse
             * @static
             * @param {auth.v1.LoginResponse} message LoginResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginResponse.toObject = function toObject(message, options) {
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
                    object.data = $root.auth.v1.Data.toObject(message.data, options);
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                return object;
            };

            /**
             * Converts this LoginResponse to JSON.
             * @function toJSON
             * @memberof auth.v1.LoginResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginResponse;
        })();

        v1.AuthService = (function() {

            /**
             * Constructs a new AuthService service.
             * @memberof auth.v1
             * @classdesc Represents an AuthService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function AuthService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (AuthService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = AuthService;

            /**
             * Callback as used by {@link auth.v1.AuthService#login}.
             * @memberof auth.v1.AuthService
             * @typedef LoginCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {auth.v1.LoginResponse} [response] LoginResponse
             */

            /**
             * Calls Login.
             * @function login
             * @memberof auth.v1.AuthService
             * @instance
             * @param {auth.v1.ILoginRequest} request LoginRequest message or plain object
             * @param {auth.v1.AuthService.LoginCallback} callback Node-style callback called with the error, if any, and LoginResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(AuthService.prototype.login = function login(request, callback) {
                return this.rpcCall(login, $root.auth.v1.LoginRequest, $root.auth.v1.LoginResponse, request, callback);
            }, "name", { value: "Login" });

            /**
             * Calls Login.
             * @function login
             * @memberof auth.v1.AuthService
             * @instance
             * @param {auth.v1.ILoginRequest} request LoginRequest message or plain object
             * @returns {Promise<auth.v1.LoginResponse>} Promise
             * @variation 2
             */

            return AuthService;
        })();

        return v1;
    })();

    return auth;
})();