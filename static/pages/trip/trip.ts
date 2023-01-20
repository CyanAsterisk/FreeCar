import { formatDuration, formatFee ,formatDate} from "../../utils/format"
import { api } from "../../service/codegen/api_pb"
import { TripService } from "../../service/trip"
import { CarService } from "../../service/car"


interface Trip {
    start: string
    end: string
    date: string
    duration: string
    fee: string
    distance: string
    carPlateMum: string
    status: string
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
        if(resp.code != 10000){
          wx.hideLoading()
          wx.showToast({
            title: '获取行程失败',
            icon:'none',
            duration: 2000,
          })
        }
        let ts = resp.data!.trips!
        let  trips: Trip[] = []
        for(let trip of ts){
          const t: Trip = {
            start: trip.trip?.start?.poiName||'未知',
            end: '',
            date: formatDate(trip.trip?.start?.timestampSec! * 1000) || '未知',
            distance: '',
            duration: '',
            fee: '',
            carPlateMum: '',
            status: tripStatusMap.get(trip.trip?.status!)||'未知',
          }
          CarService.getCar(trip.trip!.carId!).then((car)=>{
            t.carPlateMum = car.plateNum!
          })
          const end = trip.trip?.end
          if(end){
            t.end = end.poiName || '未知',
            t.distance = end.kmDriven?.toFixed(1) + '公里',
            t.fee = formatFee(end.feeCent||0)
            const dur = formatDuration((end.timestampSec||0)-(trip.trip?.start?.timestampSec||0))
            t.duration = `${dur.hh}时${dur.mm}分`
          }
          
          trips.unshift(t)
        }
        this.setData({
          trips,
        })
        wx.hideLoading()
      })
    }
})
