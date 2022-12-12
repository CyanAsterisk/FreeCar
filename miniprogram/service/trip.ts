import { rental } from "./proto_gen/rental/rental_pb";
import { FreeCar } from "./request";

export namespace TripService{
    export function createTrip(req:rental.v1.ICreateTripRequest):Promise<rental.v1.ITripEntity>{
        return FreeCar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/trip',
            data: req,
            respMarshaller: rental.v1.TripEntity.fromObject,
        })
    }

    export function getTrip(id: string): Promise<rental.v1.ITrip> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/v1/trip/${encodeURIComponent(id)}`,
            respMarshaller: rental.v1.Trip.fromObject,
        })
    }

    export function getTrips(s?: rental.v1.TripStatus): Promise<rental.v1.IGetTripsResponse> {
        let path = '/v1/trips'
        if (s) {
            path += `?status=${s}`
        }
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path,
            respMarshaller: rental.v1.GetTripsResponse.fromObject,
        })
    }

    export function updateTripPos(id: string, loc?: rental.v1.ILocation) {
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

    function updateTrip(r: rental.v1.IUpdateTripRequest): Promise<rental.v1.ITrip> {
        if (!r.id) {
            return Promise.reject("must specify id")
        }
        return FreeCar.sendRequestWithAuthRetry({
            method: 'PUT',
            path: `/v1/trip/${encodeURIComponent(r.id)}`,
            data: r,
            respMarshaller: rental.v1.Trip.fromObject,
        })
    } 
}