import { api } from "../../service/codegen/api_pb"
import { CarService } from "../../service/car"
import { CalculDistance } from "../../utils/pos"
import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"
import { ProfileService } from "../../service/profile"

interface Marker {
  iconPath: string
  id: number
  latitude: number
  longitude: number
  width: number
  height: number
}
interface Car {
    id: string
    position:{
      latitude: number,
      longitude: number
    }
    canlock: boolean
    distance: string,
}

const initialLat = 29.53832
const initialLng = 106.613922

Page({
    data: {
        cars: [] as Car[],
        location:{
          latitude: initialLat,
          longitude: initialLng,
        },
        setting:{
          skew: 0,
          rotate: 0,
          showLocation: true,
          showScale: true,
          subKey: '',
          layerStyle: 1,
          enableZoom: true,
          enableScroll: true,
          enableRotate: false,
          showCompass: false,
          enable3D: false,
          enableOverlooking: false,
          enableSatellite: false,
          enableTraffic: false,
        },
        scale:12,
        markers: [] as Marker[],
    },
    onLoad() {
      this.syscars()
      console.log(this.data.cars)
    },
    async onShow() {
      const res = await TripService.getTrips({status:api.TripStatus.IN_PROGRESS})
      if(res.code != 10000){
        wx.showToast({
          title: '获取行程失败', 
          duration: 2000
        })
      }
      const trips = res.data!.trips!
      if ((trips.length || 0) > 0) {
        wx.navigateTo({
          url: routing.driving({
            trip_id: trips[0].id!,
          }),
        })
        return
      }
      const resp = await ProfileService.getProfile()
      if(resp.code != 10000){
        wx.showToast({
          title:'获取资格失败',
          duration: 20000
        })
      }
      if(resp.data!.identityStatus !== api.IdentityStatus.VERIFIED){
        wx.showToast({
          title: '请先完成认证',
          icon: 'none',
          duration: 1000,
          mask: true,
        }).then(()=>{
          wx.redirectTo({
            url:routing.license({
              redirectURL: routing.cars(),
            }),
          })
        })      
      }
    },

    onReady() {
    },

    onMyLocationTap() {
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          this.setData({
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
          })
        }, 
        fail: () => {
          wx.showToast({
            icon: 'none',
            title: '请前往设置页授权',
          })
        }
      })
    },
    
    goMap(event: any) {
      const pos = event.currentTarget.dataset.car_pos
      wx.openLocation({
        latitude:pos.latitude,
        longitude:pos.longitude,
        scale: 28
      })
    },

    onPullDownRefresh(){
      this.syscars()
      wx.stopPullDownRefresh()
    },
    syscars(){
      wx.showLoading({
        title: '获取周边车辆',
      })
      CarService.getCars().then((resp)=>{
      if(resp.code != 10000){
        wx.hideLoading()
        wx.showToast({
          title: '服务器出错',
          icon:'none',
          duration:1000
        })
        return
      }
      let cs = resp.data!.cars!
      let  cars: Car[] = []
      let markers: Marker[] = []
      for(let car of cs){
        if(car.car?.status != api.CarStatus.LOCKED) continue;
        const c: Car = {
          id: car.id!,
          position: {
            latitude:car.car.position!.latitude! || initialLat,
            longitude: car.car.position!.longitude! || initialLng,
          },
          canlock: false,
          distance: '',
        }
        let dist = CalculDistance(c.position,this.data.location)/1e7
        c.distance = dist.toFixed(2) + '公里'
        if(cars.length < 2){
          c.canlock = true;
        } 
        cars.push(c)
        markers.push({
          id:markers.length,
          latitude:car.car.position!.latitude! || initialLat,
          longitude: car.car.position!.longitude! || initialLng,
          iconPath: '/images/cars/car-pos.svg',
          width: 20,
          height:20,
        })
      }
        wx.hideLoading()
        this.setData({
          cars,
          markers,
        })
        console.log(markers)
      })
    },
    async unlockCar(event: any){
      const carId = event.currentTarget.dataset.carid
      console.log(carId);
    //   wx.getLocation({
    //     type: 'gcj02',
    //     success: async loc => {
    //         console.log('starting a trip', {
    //             location: {
    //                 latitude: loc.latitude,
    //                 longitude: loc.longitude,
    //             },
    //             avatarURL: ""
    //         })
    //         let trip: api.IETripEntity
    //         try {
               
    //             trip =  await TripService.createTrip({
    //                 start: {
    //                     latitude : loc.latitude,
    //                     longitude : loc.longitude
    //                 },
    //                 carId: carId,
    //                 avatarUrl: "/images/car.svg"
    //             })
    //             if (!trip.data!.id) {
    //                 console.error('no tripID in response', trip)
    //                 return
    //             }
    //         } catch(err) {
    //             wx.showToast({
    //                 title: '创建行程失败',
    //                 icon: 'none',
    //             })
    //             return
    //         }

    //         wx.showLoading({
    //             title: '开锁中',
    //             mask: true,
    //         })
    //         setTimeout(() => {
    //             wx.redirectTo({
    //                 url: routing.driving({
    //                     trip_id: trip.data!.id!,
    //                 }),
    //                 complete: () => {
    //                     wx.hideLoading()
    //                 }
    //             })
    //         }, 2000);
    //     },
    //     fail: () => {
    //         wx.showToast({
    //             icon: 'none',
    //             title: '请前往设置页授权位置信息',
    //         })
    //     }
    // })
    }
})