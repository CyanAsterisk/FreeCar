"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.getSetting = void 0;
function getSetting() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: resolve,
            fail: reject,
        });
    });
}
exports.getSetting = getSetting;
function getUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: res => {
                res.userInfo = {
                    avatarUrl: '/resources/man.jpg',
                    city: '重庆',
                    country: '中国',
                    gender: 1,
                    language: "zh_CN",
                    nickName: '测试号',
                    province: '重庆',
                };
                resolve(res);
            },
            fail: reject,
        });
    });
}
exports.getUserInfo = getUserInfo;
