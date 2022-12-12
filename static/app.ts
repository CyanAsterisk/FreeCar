import { getSetting, getUserInfo } from "./utils/wxapi"
import {IAppOption} from "./appoption"
import { FreeCar } from "./service/request"
let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void

// app.ts
App<IAppOption>({
  globalData: {
    userInfo:new Promise((resolve,reject)=>{
        resolveUserInfo = resolve
        rejectUserInfo = reject
    })
  },
  async onLaunch() {

    //登录
    FreeCar.login()
    

    // 获取用户信息
    try {
      const setting = await getSetting()
      if (setting.authSetting['scope.userInfo']) {
        const userInfoRes = await getUserInfo()
        resolveUserInfo(userInfoRes.userInfo)
      }
    } catch (err) {
      rejectUserInfo(err)
    }
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    resolveUserInfo(userInfo)
  }
})