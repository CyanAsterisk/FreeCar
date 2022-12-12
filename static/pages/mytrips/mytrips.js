"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("../../utils/routing");
Page({
    scrollStates: {
        mainItems: [],
    },
    data: {
        promotionItems: [
            {
                img: 'https://i0.hdslb.com/bfs/banner/93cdd2d9c1a6a2c02b407090164f8fdc99658f1a.jpg@976w_550h_1c.webp',
                promotionID: 1,
            },
            {
                img: 'https://i0.hdslb.com/bfs/banner/0cdf10d9501d28156b479cfe24c634dd8eb222d1.jpg@976w_550h_1c.webp'
            },
            {
                img: 'https://i0.hdslb.com/bfs/banner/4115a245830d32634b9fe5127749ec06af450e38.png@976w_550h_1c.webp',
                promotionID: 3,
            },
            {
                img: 'https://i0.hdslb.com/bfs/banner/3504a32e6eb3588dcca1b07585160dfcee78af45.png@976w_550h_1c.webp',
                promotionID: 4,
            },
        ],
        avatarURL: '',
        tripsHeight: 0,
        navCount: 0,
        mainItems: [],
        mainScroll: '',
        navItems: [],
        navSel: '',
        navScroll: '',
    },
    onLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.populateTrips();
            const userInfo = yield getApp().globalData.userInfo;
            this.setData({
                avatarURL: userInfo.avatarUrl,
            });
        });
    },
    onReady() {
        wx.createSelectorQuery().select('#heading')
            .boundingClientRect(rect => {
            const height = wx.getSystemInfoSync().windowHeight - rect.height;
            this.setData({
                tripsHeight: height,
                navCount: Math.round(height / 50),
            });
        }).exec();
    },
    populateTrips() {
        const mainItems = [];
        const navItems = [];
        let navSel = '';
        let prevNav = '';
        for (let i = 0; i < 100; i++) {
            const mainId = 'main-' + i;
            const navId = 'nav-' + i;
            const tripId = (10001 + i).toString();
            if (!prevNav) {
                prevNav = navId;
            }
            mainItems.push({
                id: mainId,
                navId: navId,
                navScrollId: prevNav,
                data: {
                    id: tripId,
                    start: '东方明珠',
                    end: '迪士尼',
                    distance: '27.0公里',
                    duration: '0时44分',
                    fee: '128.00元',
                    status: '已完成',
                },
            });
            navItems.push({
                id: navId,
                mainId: mainId,
                label: tripId,
            });
            if (i === 0) {
                navSel = navId;
            }
            prevNav = navId;
        }
        this.setData({
            mainItems,
            navItems,
            navSel,
        }, () => {
            this.prepareScrollStates();
        });
    },
    prepareScrollStates() {
        wx.createSelectorQuery().selectAll('.main-item')
            .fields({
            id: true,
            dataset: true,
            rect: true,
        }).exec(res => {
            this.scrollStates.mainItems = res[0];
        });
    },
    onPromotionItemTap(e) {
        const promotionID = e.currentTarget.dataset.promotionId;
        if (promotionID) {
            console.log('claiming promotion', promotionID);
        }
    },
    onGetUserInfo(e) {
        const userInfo = e.detail.userInfo;
        if (userInfo) {
            getApp().resolveUserInfo(userInfo);
            this.setData({
                avatarURL: userInfo.avatarUrl,
            });
        }
    },
    onRegisterTap() {
        wx.navigateTo({
            url: routing_1.routing.register(),
        });
    },
    onNavItemTap(e) {
        var _a, _b, _c;
        const mainId = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.mainId;
        const navId = (_c = e.currentTarget) === null || _c === void 0 ? void 0 : _c.id;
        if (mainId && navId) {
            this.setData({
                mainScroll: mainId,
                navSel: navId,
            });
        }
    },
    onMainScroll(e) {
        var _a, _b;
        console.log(e);
        const top = ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.offsetTop) + ((_b = e.detail) === null || _b === void 0 ? void 0 : _b.scrollTop);
        if (top === undefined) {
            return;
        }
        const selItem = this.scrollStates.mainItems.find(v => v.top >= top);
        if (!selItem) {
            return;
        }
        this.setData({
            navSel: selItem.dataset.navId,
            navScroll: selItem.dataset.navScrollId,
        });
    }
});
