import { api } from "./codegen/api_pb";
import { FreeCar } from "./request";

export namespace AuthService {
    export function getUserInfo(): Promise<api.IEUserInfo> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: '/auth/info',
            respMarshaller: api.EUserInfo.fromObject,
        })
    }

    export function updateUserInfo(): Promise<api.IUpdateUserResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/auth/info',
            respMarshaller: api.UpdateUserRequest.fromObject
        })
    }
   
    export function uploadAvatar(): Promise<api.IEUploadAvatarResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/auth/avatar',
            respMarshaller: api.EUploadAvatarResponse.fromObject
        })
    }

}
