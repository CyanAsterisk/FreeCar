"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("../../utils/routing");
const initialLat = 29.531873;
const initialLng = 106.607808;
const centPerSec = 0.7;
function formatDuration(sec) {
    const padString = (n) => n < 10 ? '0' + n.toFixed(0) : n.toFixed(0);
    const h = Math.floor(sec / 3600);
    sec -= 3600 * h;
    const m = Math.floor(sec / 60);
    sec -= 60 * m;
    const s = Math.floor(sec);
    return `${padString(h)}:${padString(m)}:${padString(s)}`;
}
function formatFee(cents) {
    return (cents / 100).toFixed(2);
}
Page({
    timer: undefined,
    data: {
        location: {
            latitude: initialLat,
            longitude: initialLng,
        },
        scale: 12,
        elapsed: '00:00:00',
        fee: '0.00',
    },
    onLoad(opt) {
        const o = opt;
        console.log('current trip:', o.trip_id);
        this.setupLocationUpdator();
        this.setupTimer();
    },
    onUnload() {
        wx.stopLocationUpdate();
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    setupLocationUpdator() {
        wx.startLocationUpdate({
            fail: console.error,
        });
        wx.onLocationChange(loc => {
            console.log('location : ', loc);
            this.setData({
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
            });
        });
    },
    setupTimer() {
        let elapsedSec = 0;
        let cents = 0;
        this.timer = setInterval(() => {
            elapsedSec++;
            cents += centPerSec;
            this.setData({
                elapsed: formatDuration(elapsedSec),
                fee: formatFee(cents)
            });
        }, 1000);
    },
    onEndTripTap() {
        wx.redirectTo({
            url: routing_1.routing.mytrips(),
        });
    }
});
