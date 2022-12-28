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

    export function getCar(id: string): Promise<api.ICar> {
        return FreeCar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/v1/car/${encodeURIComponent(id)}`,
            respMarshaller: api.Car.fromObject,
        })
    }
}