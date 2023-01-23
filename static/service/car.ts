import camelcaseKeys = require("camelcase-keys");
import { api } from "./codegen/api_pb";
import { FreeCar } from "./request";

export namespace CarService {
    export function subscribe(onMsg: (c: api.ICarEntity) => void) {
        const socket = wx.connectSocket({
            url: FreeCar.wsAddr + '/ws',
        })
        socket.onMessage(msg => {
            const obj = JSON.parse(msg.data as string)
            onMsg(api.CarEntity.fromObject(
                camelcaseKeys(obj, {
                    deep: true,
                })))
        })
        return socket
    }

    export function getCar(req: api.IGetCarRequest): Promise<api.IECar> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/car`,
            data:req,
            respMarshaller: api.ECar.fromObject,
        })
    }

    export function getCars(): Promise<api.EGetCarsResponse> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/cars`,
            respMarshaller: api.EGetCarsResponse.fromObject,
        })
    }
}