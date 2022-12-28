import { api } from "../../service/codegen/api_pb"
import { TripService } from "../../service/trip"
import { formatDuration, formatFee } from "../../utils/format"
import { routing } from "../../utils/routing"

const updateIntervalSec = 1
const initialLat = 30
const initialLng = 120

function durationStr(sec: number) {
    const dur = formatDuration(sec)
    return `${dur.hh}:${dur.mm}:${dur.ss}`
}

Page({
    timer: undefined as number|undefined,
    tripID: '',

    data: {
        location: {
            latitude: initialLat,
            longitude: initialLng,
        },
        scale: 12,
        elapsed: '00:00:00',
        fee: '0.00',
        markers: [
            {
                iconPath: "/resources/car.png",
                id: 0,
                latitude: initialLat,
                longitude: initialLng,
                width: 20,
                height: 20,
            },
        ],
    },

    onLoad(opt: Record<'trip_id', string>) {
        const o: routing.DrivingOpts = opt
        this.tripID = o.trip_id
        this.setupLocationUpdator()
        this.setupTimer(o.trip_id)
    },

    onUnload() {
        wx.stopLocationUpdate()
        if (this.timer) {
            clearInterval(this.timer)
        }
    },

    setupLocationUpdator() {
        wx.startLocationUpdate({
            fail: console.error,
        })
        wx.onLocationChange(loc => {
            this.setData({
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
            })
        })
    },

    async setupTimer(tripID: string) {
        const trip = await TripService.getTrip(tripID)
        if (trip.status !== api.TripStatus.IN_PROGRESS) {
            console.error('trip not in progress')
            return
        }
        let secSinceLastUpdate = 0
        let lastUpdateDurationSec = trip.current!.timestampSec! - trip.start!.timestampSec!
        const toLocation = (trip: api.ITrip) => ({
            latitude: trip.current?.location?.latitude || initialLat,
            longitude: trip.current?.location?.longitude || initialLng,
        })
        const location = toLocation(trip)
        this.data.markers[0].latitude = location.latitude
        this.data.markers[0].longitude = location.longitude
        this.setData({
            elapsed: durationStr(lastUpdateDurationSec),
            fee: formatFee(trip.current!.feeCent!),
            location,
            markers: this.data.markers,
        })

        this.timer = setInterval(() => {
            secSinceLastUpdate++
            if (secSinceLastUpdate % updateIntervalSec === 0) {
                TripService.getTrip(tripID).then(trip => {
                    lastUpdateDurationSec = trip.current!.timestampSec! - trip.start!.timestampSec!
                    secSinceLastUpdate = 0
                    const location = toLocation(trip)
                    console.log(location)
                    this.data.markers[0].latitude = location.latitude
                    this.data.markers[0].longitude = location.longitude
                    this.setData({
                        fee: formatFee(trip.current!.feeCent!),
                        location,
                        markers: this.data.markers,
                    })
                }).catch(console.error)
            }
            this.setData({
                elapsed: durationStr(lastUpdateDurationSec + secSinceLastUpdate),
            })
        }, 1000)
    },

    onEndTripTap() {
        TripService.finishTrip(this.tripID).then(() => {
            wx.redirectTo({
                url: routing.mytrips(),
            })
        }).catch(err => {
            console.error(err)
            wx.showToast({
                title: '结束行程失败',
                icon: 'none',
            })
        })
    }
})