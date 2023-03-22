import { api } from "./codegen/api_pb";
import { FreeCar } from "./request";

export namespace AuthService {
    export function getUserInfo(): Promise<api.IEUserInfo> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: '/user/info',
            respMarshaller: api.EUserInfo.fromObject,
        })
    }

    export function updateUserInfo(req :api.IUpdateUserRequest): Promise<api.IEUpdateUserResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/user/info',
            data: req,
            respMarshaller: api.EUpdateUserResponse.fromObject
        })
    }
   
    export function uploadAvatar(): Promise<api.IEUploadAvatarResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/user/avatar',
            respMarshaller: api.EUploadAvatarResponse.fromObject
        })
    }

}
