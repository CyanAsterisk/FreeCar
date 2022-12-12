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
const initiLat = 29.761267625855936;
const initiLng = 121.87264654736123;
Page({
    isPageShowing: false,
    data: {
        avatarURL: '',
        setting: {
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
            location: {
                latitude: initiLat,
                longitude: initiLng,
            },
        },
        scale: 10,
        markers: [
            {
                iconPath: "/resources/car.jpeg",
                id: 0,
                latitude: 23.099994,
                longitude: 113.324520,
                width: 50,
                height: 50
            },
            {
                iconPath: "/resources/car.jpeg",
                id: 1,
                latitude: 23.099994,
                longitude: 114.324520,
                width: 50,
                height: 50
            },
        ],
    },
    onLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield getApp().globalData.userInfo;
            this.setData({
                avatarURL: userInfo.avatarUrl,
            });
        });
    },
    onScanTap() {
        wx.scanCode({
            success: () => __awaiter(this, void 0, void 0, function* () {
                yield this.selectComponent('#licModal').showModal();
                //TODO: get car if from scan result
                const carID = 'car123';
                const redirectURL = routing_1.routing.lock({
                    car_id: carID
                });
                wx.navigateTo({
                    url: routing_1.routing.register({
                        redirectURL: redirectURL
                    }),
                });
            }),
            fail: console.error,
        });
    },
    onMyTripsTap() {
        wx.navigateTo({
            url: routing_1.routing.mytrips()
        });
    },
    onShow() {
        this.isPageShowing = true;
    },
    onHide() {
        this.isPageShowing = false;
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
                });
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请前往设置页授权',
                });
            }
        });
    },
    moveCars() {
        const map = wx.createMapContext("map");
        const dest = {
            latitude: 23.099994,
            longitude: 113.324520,
        };
        const moveCar = () => {
            dest.latitude += 0.1;
            dest.longitude += 0.1;
            map.translateMarker({
                destination: {
                    latitude: dest.latitude,
                    longitude: dest.longitude,
                },
                markerId: 0,
                autoRotate: false,
                rotate: 0,
                duration: 5000,
                animationEnd: moveCar,
            });
            moveCar();
        };
    }
});
