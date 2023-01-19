
//设置命名空间
 export namespace routing {
    export interface DrivingOpts {
        trip_id: string
    }

    export function driving(o: DrivingOpts) {
        return `/pages/driving/index?trip_id=${o.trip_id}`
    }
    export interface RegisterOpts {
        redirect?: string
    }
    export interface RegisterParams {
        redirectURL: string
    }

    export function license(p?: RegisterParams) {
        const page = '/pages/license/license'
        if (!p) {
            return page
        }
        return `${page}?redirect=${encodeURIComponent(p.redirectURL)}`
    }

    export function trip() {
        return '/pages/trip/trip'
    }

    export function index(){
        return '/pages/index/index'
    }

    export function cars(){
        return '/pages/cars/index'
    }
}

