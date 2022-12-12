export function getSetting(): Promise<WechatMiniprogram.GetSettingSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: resolve,
      fail: reject,
    })
  })
}

export function getUserInfo(): Promise<WechatMiniprogram.GetUserInfoSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res=>{
        res.userInfo={
          avatarUrl: '/resources/man.jpg', 
          city: '重庆',
          country: '中国',  
          gender: 1,
          language: "zh_CN",
          nickName: '测试号',
          province: '重庆',
        }
        resolve(res)
      },
      fail: reject,
    })
  })
}