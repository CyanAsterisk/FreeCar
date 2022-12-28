import { api } from "./codegen/api_pb"
import { FreeCar } from "./request";

export namespace TripService{
    export function createTrip(req:api.ICreateTripRequest):Promise<api.IETripEntity>{
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/trip',
            data: req,
            respMarshaller: api.ETripEntity.fromObject,
        })
    }

    export function getTrip(id: string): Promise<api.ITrip> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/v1/trip/${encodeURIComponent(id)}`,
            respMarshaller: api.Trip.fromObject,
        })
    }

    export function getTrips(s?: api.TripStatus): Promise<api.IGetTripsResponse> {
        let path = '/v1/trips'
        if (s) {
            path += `?status=${s}`
        }
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path,
            respMarshaller: api.GetTripsResponse.fromObject,
        })
    }

    export function updateTripPos(id: string, loc?: api.ILocation) {
        return updateTrip({
            id,
            current: loc,
        })
    }

    export function finishTrip(id: string) {
        return updateTrip({
            id,
            endTrip: true,
        })
    }

    function updateTrip(r: api.IUpdateTripRequest): Promise<api.ITrip> {
        if (!r.id) {
            return Promise.reject("must specify id")
        }
        return FreeCar.sendRequestWithAuthRetry({
            method: 'PUT',
            path: `/v1/trip/${encodeURIComponent(r.id)}`,
            data: r,
            respMarshaller: api.Trip.fromObject,
        })
    } 
}