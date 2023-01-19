import WXAPI = require('apifm-wxapi/index')
import { ProfileService } from "../../service/profile"
import { api } from "../../service/codegen/api_pb"

const licStatusMap = new Map([
  [api.IdentityStatus.UNSUBMITTED, '未认证'],
  [api.IdentityStatus.PENDING, '未认证'],
  [api.IdentityStatus.VERIFIED, '已认证'],
])

Page({
	data: {
     licStatus: licStatusMap.get(api.IdentityStatus.UNSUBMITTED),
  },
	onLoad() {
	},
  onShow() {
    ProfileService.getProfile().then(p => {
      this.setData({
          licStatus: licStatusMap.get(p.data!.identityStatus||0),
      })
  })
  },

  toLicensePage(){
    wx.navigateTo({
      url: '/pages/license/license',
    })
  },
  async onChooseAvatar(e: { detail: { avatarUrl: any; }; }) {
    console.log(e);
    const avatarUrl = e.detail.avatarUrl
    let res = await WXAPI.default.uploadFile(wx.getStorageSync('token'), avatarUrl)
    if (res.code != 0) {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      return
    }
    res = await WXAPI.default.modifyUserInfo({
      token: wx.getStorageSync('token'),
      avatarUrl: res.data.url,
    })
    if (res.code != 0) {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '设置成功',
    })
    
  }
})