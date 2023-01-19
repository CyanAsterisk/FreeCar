import { formatDuration, formatFee } from "../../utils/format"
import { api } from "../../service/codegen/api_pb"
import { TripService } from "../../service/trip"

interface Trip {
    id: string
    start: string
    end: string
    duration: string
    fee: string
    distance: string
    status: string
    inProgress: boolean
}

const tripStatusMap = new Map([
    [api.TripStatus.IN_PROGRESS, '进行中'],
    [api.TripStatus.FINISHED, '已完成'],
])

Page({
    data: {
        trips: [] as Trip[] ,
        avatarURL: '',
        tripsHeight: 0,
    },

    onLoad() {
      this.sysTrips()
    },

    onShow() {
    },

    onReady() {
    },

    onPullDownRefresh(){
      this.sysTrips()
      wx.stopPullDownRefresh()
    },
    sysTrips(){
      wx.showLoading({
        title: '',
      })
      TripService.getTrips({}).then((resp)=>{
        let ts = resp.data!.trips!
        let  trips: Trip[] = []
        for(let trip of ts){
          const t: Trip = {
            id: trip.id!,
            start: trip.trip?.start?.poiName||'未知',
            end: '',
            distance: '',
            duration: '',
            fee: '',
            status: tripStatusMap.get(trip.trip?.status!)||'未知',
            inProgress: trip.trip?.status ===  api.TripStatus.IN_PROGRESS,
          }
          const end = trip.trip?.end
          if(end){
            t.end = end.poiName || '未知',
            t.distance = end.kmDriven?.toFixed(1) + '公里',
            t.fee = formatFee(end.feeCent||0)
            const dur = formatDuration((end.timestampSec||0)-(trip.trip?.start?.timestampSec||0))
            t.duration = `${dur.hh}时${dur.mm}分`
          }
          
          trips.push(t)
        }
        this.setData({
          trips,
        })
        wx.hideLoading()
      })
    }
})
