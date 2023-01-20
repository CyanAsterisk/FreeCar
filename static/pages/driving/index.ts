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
    timer: undefined as NodeJS.Timer|undefined,
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
                iconPath: "/images/shared/car.svg",
                id: 0,
                latitude: initialLat,
                longitude: initialLng,
                width: 20,
                height: 20,
            },
        ],
    },

    async onLoad(opt: Record<'trip_id', string>) {
        const o: routing.DrivingOpts = opt
        this.tripID = o.trip_id
        if(!this.tripID){
            const trips = await TripService.getTrips({
                status: api.TripStatus.IN_PROGRESS,
              })
              if (trips.data!.trips?.length === 0) {
                 routing.trip()
              }
              this.tripID = trips.data!.trips![0].id!
        }
        this.setupLocationUpdator()
        this.setupTimer(this.tripID)
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
        if (trip.data!.status !== api.TripStatus.IN_PROGRESS) {
            console.error('trip not in progress')
            return
        }
        let secSinceLastUpdate = 0
        let lastUpdateDurationSec = trip.data!.current!.timestampSec! - trip.data!.start!.timestampSec!
        const toLocation = (trip: api.IETrip) => ({
            latitude: trip.data!.current?.location?.latitude || initialLat,
            longitude: trip.data!.current?.location?.longitude || initialLng,
        })
        const location = toLocation(trip)
        this.data.markers[0].latitude = location.latitude
        this.data.markers[0].longitude = location.longitude
        this.setData({
            elapsed: durationStr(lastUpdateDurationSec),
            fee: formatFee(trip.data!.current!.feeCent!),
            location,
            markers: this.data.markers,
        })

        this.timer = setInterval(() => {
            secSinceLastUpdate++
            if (secSinceLastUpdate % updateIntervalSec === 0) {
                TripService.getTrip(tripID).then(trip => {
                    lastUpdateDurationSec = trip.data!.current!.timestampSec! - trip.data!.start!.timestampSec!
                    secSinceLastUpdate = 0
                    const location = toLocation(trip)
                    console.log(location)
                    this.data.markers[0].latitude = location.latitude
                    this.data.markers[0].longitude = location.longitude
                    this.setData({
                        fee: formatFee(trip.data!.current!.feeCent!),
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
        TripService.finishTrip(this.tripID,this.data.location).then(() => {
            wx.redirectTo({
                url: routing.trip(),
            })
        }).catch(err => {
            console.error(err)
            wx.showToast({
                title: '结束行程失败',
                icon: 'none',
            })
        })
    },

    onHangUpTap(){
        wx.redirectTo({
            url: routing.index(),
        })
    }
})