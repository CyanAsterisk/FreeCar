import { api } from "./codegen/api_pb";
import { FreeCar } from "./request";

export namespace ProfileService {
    export function getProfile(): Promise<api.IEProfile> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: '/v1/profile',
            respMarshaller: api.EProfile.fromObject,
        })
    }

    export function submitProfile(req: api.ISubmitProfileRequest): Promise<api.IEProfile> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/profile',
            data: req,
            respMarshaller: api.EProfile.fromObject,
        })
    }

    export function clearProfile(): Promise<api.IEProfile> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'DELETE',
            path: '/v1/profile',
            respMarshaller: api.EProfile.fromObject,
        })
    }

    export function getProfilePhoto(): Promise<api.IEGetProfilePhotoResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: '/v1/profile/photo',
            respMarshaller: api.EGetProfilePhotoResponse.fromObject,
        })
    }

    export function createProfilePhoto(): Promise<api.IECreateProfilePhotoResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/profile/photo',
            respMarshaller: api.ECreateProfilePhotoResponse.fromObject,
        })
    }

    export function completeProfilePhoto(): Promise<api.IEIdentity> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/profile/photo/complete',
            respMarshaller: api.EIdentity.fromObject,
        })
    }

    export function clearProfilePhoto(): Promise<api.IEClearProfilePhotoResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'DELETE',
            path: '/v1/profile/photo',
            respMarshaller: api.EClearProfilePhotoResponse.fromObject,
        })
    }
}
