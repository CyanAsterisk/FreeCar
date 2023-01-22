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
  }
})