import { ProfileService } from "../../service/profile"
import { AuthService } from "../../service/auth"
import { api } from "../../service/codegen/api_pb"
import { FreeCar } from "../../service/request"

const licStatusMap = new Map([
  [api.IdentityStatus.UNSUBMITTED, '未认证'],
  [api.IdentityStatus.PENDING, '未认证'],
  [api.IdentityStatus.VERIFIED, '已认证'],
])

Page({
	data: {
    username: '',
    accountID: 0,
    avatarURL: '',
    phoneNum: 0,
    licStatus: licStatusMap.get(api.IdentityStatus.UNSUBMITTED),
  },
	async onLoad() {
    let resp = await AuthService.getUserInfo()
    if (resp.code !== 0){
      wx.showToast({
        title:"获取用户信息失败",
        icon: "none",
        duration: 2000,
      })
      return
    }
    this.setData({
      username: resp.data?.username!,
      accountID: resp.data?.accountId!,
      avatarURL: resp.data?.avatarUrl!,
      phoneNum: resp.data?.phoneNumber!
    })
	},
  onShow() {
    ProfileService.getProfile().then(p => {
      this.setData({
          licStatus: licStatusMap.get(p.data!.identityStatus||0),
      })
  })
  },

  async onChooseAvatar(e:any) {
    const localPath = e.detail.avatarUrl
    this.setData({
      avatarURL: localPath
    })
    const resp = await AuthService.uploadAvatar()
    if(resp.code !== 10000){
      wx.showToast({
        title: '获取上传链接失败',
        icon: 'none',
        duration: 1000,
      })
      return
    }
    await FreeCar.uploadfile({
      localPath: localPath,
      url: resp.data!.uploadUrl!,
    })
    
  },
  clearStorage(){
    wx.clearStorageSync()
    wx.showToast({
      title: '已清除',
      icon: 'success'
    })
  },
  editNick() {
    this.setData({
      nickShow: true
    })
  },
  async _editNick() {
    if (!this.data.username) {
      wx.showToast({
        title: '请填写昵称',
        icon: 'none'
      })
      return
    }
    const res = await AuthService.updateUserInfo({
      username: this.data.username
    })

    if (res.code != 10000){
      wx.showToast({
        title: res.message!,
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '设置成功',
    })
    }
})