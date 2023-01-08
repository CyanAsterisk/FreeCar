import { api } from "./codegen/api_pb"
import { FreeCar } from "./request";

export namespace TripService{
    export function createTrip(req:api.ICreateTripRequest):Promise<api.IETripEntity>{
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/trip',
            data: req,
            respMarshaller: api.ETripEntity.fromObject,
        })
    }

    export function getTrip(id: string): Promise<api.IETrip> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/trip/${encodeURIComponent(id)}`,
            respMarshaller: api.ETrip.fromObject,
        })
    }

    export function getTrips(req: api.IGetTripsRequest): Promise<api.IEGetTripsResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path:  '/trips',
            data: req,
            respMarshaller: api.EGetTripsResponse.fromObject,
        })
    }

    export function updateTripPos(id: string, loc: api.ILocation) {
        return updateTrip({
            id,
            current: loc,
        })
    }

    export function finishTrip(id: string,loc:api.ILocation) {
        return updateTrip({
            id,
            endTrip: true,
            current: loc
        })
    }

    function updateTrip(r: api.IUpdateTripRequest): Promise<api.IETrip> {
        if (!r.id) {
            return Promise.reject("must specify id")
        }
        return FreeCar.sendRequestWithAuthRetry({
            method: 'PUT',
            path: `/trip/${encodeURIComponent(r.id)}`,
            data: r,
            respMarshaller: api.ETrip.fromObject,
        })
    } 
}