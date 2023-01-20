import { CarService } from "../../service/car"
interface Marker {
  iconPath: string
  id: number
  latitude: number
  longitude: number
  width: number
  height: number
}

const defaultAvatar = '/images/shared/car.svg'
const initialLat = 29.53832
const initialLng = 106.613922

Page({
  isPageShowing: false,
  socket: undefined as WechatMiniprogram.SocketTask | undefined,
  data: {
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
    location:{
      latitude: initialLat,
      longitude: initialLng,
    },
    scale:10,
    markers: [] as Marker[],
  },
  
  onShow() {
    this.isPageShowing = true;
    if (!this.socket) {
      this.setData({
        markers: []
      }, () => {
        this.setupCarPosUpdater()
      })
    }
  },

  onHide() {
    this.isPageShowing = false;
    if (this.socket) {
      this.socket.close({
        success: () => {
          this.socket = undefined
        }
      })
  }
  },

  
  setupCarPosUpdater(){
    const map = wx.createMapContext("map")
    const markersByCarID = new Map<string, Marker>()
    let translationInProgress = false
    const endTranslation = () => {
      translationInProgress = false
    }
    this.socket = CarService.subscribe(car => {
      if (!car.id || translationInProgress || !this.isPageShowing) {
        console.log('dropped')
        return
      }
      const marker = markersByCarID.get(car.id)
      if (!marker) {
        // Insert new marker.
        const newMarker: Marker = {
          id: this.data.markers.length,
          iconPath: car.car?.driver?.avatarUrl || defaultAvatar,
          latitude: car.car?.position?.latitude || initialLat,
          longitude: car.car?.position?.longitude || initialLng,
          height: 20,
          width: 20,
        }
        markersByCarID.set(car.id, newMarker)
        this.data.markers.push(newMarker)
        translationInProgress = true
        this.setData({
          markers: this.data.markers,
        }, endTranslation)
        return
      }

      const newAvatar = car.car?.driver?.avatarUrl || defaultAvatar
      const newLat = car.car?.position?.latitude || initialLat
      const newLng = car.car?.position?.longitude || initialLng
      if (marker.iconPath !== newAvatar) {
        // Change iconPath and possibly position.
        marker.iconPath = newAvatar
        marker.latitude = newLat
        marker.longitude = newLng
        translationInProgress = true
        this.setData({
          markers: this.data.markers,
        }, endTranslation)
        return
      }

      if (marker.latitude !== newLat || marker.longitude !== newLng) {
        // Move marker.
        translationInProgress = true
        map.translateMarker({
          markerId: marker.id,
          destination: {
            latitude: newLat,
            longitude: newLng,
          },
          autoRotate: false,
          rotate: 0,
          duration: 80,
          animationEnd: endTranslation,
        })
      }
    })
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
});
