import * as $protobuf from "protobufjs";
/** Namespace auth. */
export namespace auth {

    /** Namespace v1. */
    namespace v1 {

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
            constructor(properties?: auth.v1.ILoginRequest);

            /** LoginRequest code. */
            public code: string;

            /**
             * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginRequest
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.LoginRequest;

            /**
             * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
             * @param message LoginRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.LoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LoginResponse. */
        interface ILoginResponse {

            /** LoginResponse accessToken */
            accessToken?: (string|null);

            /** LoginResponse expiresIn */
            expiresIn?: (number|null);
        }

        /** Represents a LoginResponse. */
        class LoginResponse implements ILoginResponse {

            /**
             * Constructs a new LoginResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.ILoginResponse);

            /** LoginResponse accessToken. */
            public accessToken: string;

            /** LoginResponse expiresIn. */
            public expiresIn: number;

            /**
             * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginResponse
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.LoginResponse;

            /**
             * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
             * @param message LoginResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.LoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents an AuthService */
        class AuthService extends $protobuf.rpc.Service {

            /**
             * Constructs a new AuthService service.
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
            public login(request: auth.v1.ILoginRequest, callback: auth.v1.AuthService.LoginCallback): void;

            /**
             * Calls Login.
             * @param request LoginRequest message or plain object
             * @returns Promise
             */
            public login(request: auth.v1.ILoginRequest): Promise<auth.v1.LoginResponse>;
        }

        namespace AuthService {

            /**
             * Callback as used by {@link auth.v1.AuthService#login}.
             * @param error Error, if any
             * @param [response] LoginResponse
             */
            type LoginCallback = (error: (Error|null), response?: auth.v1.LoginResponse) => void;
        }
    }
}
