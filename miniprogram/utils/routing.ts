
//设置命名空间
 export namespace routing {
    export interface DrivingOpts {
        trip_id: string
    }

    export function driving(o: DrivingOpts) {
        return `/pages/driving/driving?trip_id=${o.trip_id}`
    }

    export interface LockOpts {
        car_id: string
    }

    export function lock(o: LockOpts) {
        return `/pages/lock/lock?car_id=${o.car_id}`
    }

    export interface RegisterOpts {
        redirect?: string
    }

    export interface RegisterParams {
        redirectURL: string
    }

    export function register(p?: RegisterParams) {
        const page = '/pages/register/register'
        if (!p) {
            return page
        }
        return `${page}?redirect=${encodeURIComponent(p.redirectURL)}`
    }

    export function mytrips() {
        return '/pages/mytrips/mytrips'
    }
}

