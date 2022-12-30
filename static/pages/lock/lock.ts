import { IAppOption } from "../../appoption"
import { api } from "../../service/codegen/api_pb"
import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"

const shareLocationKey = "share_location"

Page({
    carID: '',

    data: {
        shareLocation: false,
        avatarURL: '',
    },

    async onLoad(opt: Record<'car_id', string>) {
        const o: routing.LockOpts = opt
        this.carID = o.car_id
        const userInfo = await getApp<IAppOption>().globalData.userInfo
        this.setData({
            avatarURL: userInfo.avatarUrl,
            shareLocation: wx.getStorageSync(shareLocationKey) || false,
        })
    },

    onGetUserInfo(e: any) {
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        if (userInfo) {
            getApp<IAppOption>().resolveUserInfo(userInfo)
            this.setData({
                shareLocation: true,
            })
            wx.setStorageSync(shareLocationKey, true)
        }
    },

    onShareLocation(e: any) {
        const shareLocation:boolean = e.detail.value
        wx.setStorageSync(shareLocationKey, shareLocation)
    },

    onUnlockTap() {
        wx.getLocation({
            type: 'gcj02',
            success: async loc => {
                console.log('starting a trip', {
                    location: {
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    },
                    // TODO: 需要双向绑定
                    avatarURL: this.data.shareLocation 
                        ? this.data.avatarURL : '', 
                })
                if (!this.carID) {
                    console.error('no carID specified')
                    return
                }
                let trip: api.IETripEntity
                try {
                   
                    trip =  await TripService.createTrip({
                        start: {
                            latitude : loc.latitude,
                            longitude : loc.longitude
                        },
                        carId: this.carID,
                        avatarUrl: "/resources/man.jpg"
                    })
                    if (!trip.data!.id) {
                        console.error('no tripID in response', trip)
                        return
                    }
                } catch(err) {
                    wx.showToast({
                        title: '创建行程失败',
                        icon: 'none',
                    })
                    return
                }

                wx.showLoading({
                    title: '开锁中',
                    mask: true,
                })
                setTimeout(() => {
                    wx.redirectTo({
                        url: routing.driving({
                            trip_id: trip.data!.id!,
                        }),
                        complete: () => {
                            wx.hideLoading()
                        }
                    })
                }, 2000);
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请前往设置页授权位置信息',
                })
            }
        })
    },
})