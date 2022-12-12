import { IAppOption } from "../../appoption"
import { ProfileService } from "../../service/profile"
import { rental } from "../../service/proto_gen/rental/rental_pb"
import { TripService } from "../../service/trip"
import { formatDuration, formatFee } from "../../utils/format"
import { routing } from "../../utils/routing"

interface Trip {
    id: string
    shortId: string
    start: string
    end: string
    duration: string
    fee: string
    distance: string
    status: string
    inProgress: boolean
}

interface MainItem {
    id: string
    navId: string
    navScrollId: string
    data: Trip
}

interface NavItem {
    id: string
    mainId: string
    label: string
}

interface MainItemQueryResult {
    id: string
    top: number
    dataset: {
        navId: string
        navScrollId: string
    }
}

const tripStatusMap = new Map([
    [rental.v1.TripStatus.IN_PROGRESS, '进行中'],
    [rental.v1.TripStatus.FINISHED, '已完成'],
])

const licStatusMap = new Map([
    [rental.v1.IdentityStatus.UNSUBMITTED, '未认证'],
    [rental.v1.IdentityStatus.PENDING, '未认证'],
    [rental.v1.IdentityStatus.VERIFIED, '已认证'],
])

Page({
    scrollStates: {
        mainItems: [] as MainItemQueryResult[],
    },

    layoutResolver: undefined as ((unkown:any)=>void)|undefined,

    data: {
        promotionItems: [
            {
                img: 'https://i0.hdslb.com/bfs/banner/93cdd2d9c1a6a2c02b407090164f8fdc99658f1a.jpg@976w_550h_1c.webp',
                promotionID: 1,
            },            
            {
                img: 'https://i0.hdslb.com/bfs/banner/0cdf10d9501d28156b479cfe24c634dd8eb222d1.jpg@976w_550h_1c.webp',
                promotionID: 2,
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
        licStatus: licStatusMap.get(rental.v1.IdentityStatus.UNSUBMITTED),
        avatarURL: '',
        tripsHeight: 0,
        navCount: 0,
        mainItems: [] as MainItem[],
        mainScroll: '',
        navItems: [] as NavItem[],
        navSel: '',
        navScroll: '',
    },

    onLoad() {
        const layoutReady = new Promise((resolve) => {
            this.layoutResolver = resolve
        })
        Promise.all([TripService.getTrips(), layoutReady]).then(([trips]) => {
            this.populateTrips(trips.trips!)
        })
        getApp<IAppOption>().globalData.userInfo.then(userInfo => {
            this.setData({
                avatarURL: userInfo.avatarUrl,
            })
        })
    },

    onShow() {
        ProfileService.getProfile().then(p => {
            this.setData({
                licStatus: licStatusMap.get(p.identityStatus||0),
            })
        })
    },

    onReady() {
        wx.createSelectorQuery().select('#heading')
            .boundingClientRect(rect => {
                const height = wx.getSystemInfoSync().windowHeight - rect.height
                this.setData({
                    tripsHeight: height,
                    navCount: Math.round(height/50),
                }, () => {
                    if (this.layoutResolver) {
                        this.layoutResolver("")
                    }
                })
            }).exec()
    },

    populateTrips(trips: rental.v1.ITripEntity[]) {
        const mainItems: MainItem[] = []
        const navItems: NavItem[] = []
        let navSel = ''
        let prevNav = ''
        for (let i = 0; i < trips.length; i++) {
            const trip = trips[i]
            const mainId = 'main-' + i
            const navId = 'nav-' + i
            const shortId = trip.id?.substr(trip.id.length-6)
            if (!prevNav) {
                prevNav = navId
            }
            const tripData: Trip = {
                id: trip.id!,
                shortId: '****'+shortId,
                start: trip.trip?.start?.poiName||'未知',
                end: '',
                distance: '',
                duration: '',
                fee: '',
                status: tripStatusMap.get(trip.trip?.status!)||'未知',
                inProgress: trip.trip?.status ===  rental.v1.TripStatus.IN_PROGRESS,
            }
            const end = trip.trip?.end
            if (end) {
                tripData.end = end.poiName||'未知',
                tripData.distance = end.kmDriven?.toFixed(1)+'公里',
                tripData.fee = formatFee(end.feeCent||0)
                const dur = formatDuration((end.timestampSec||0) - (trip.trip?.start?.timestampSec||0))
                tripData.duration = `${dur.hh}时${dur.mm}分`
            }
            mainItems.push({
                id: mainId,
                navId: navId,
                navScrollId: prevNav,
                data: tripData,
            })
            navItems.push({
                id: navId,
                mainId: mainId,
                label: shortId||'',
            })
            if (i === 0) {
                navSel = navId
            }
            prevNav = navId
        }
        for (let i = 0; i < this.data.navCount-1; i++) {
            navItems.push({
                id: '',
                mainId: '',
                label: '',
            })
        }
        this.setData({
            mainItems,
            navItems,
            navSel,
        }, () => {
            this.prepareScrollStates()
        })
    },

    prepareScrollStates() {
        wx.createSelectorQuery().selectAll('.main-item')
            .fields({
                id: true,
                dataset: true,
                rect: true,
            }).exec(res => {
                this.scrollStates.mainItems = res[0]
            })
    },

    onPromotionItemTap(e: any) {
        const promotionID:number = e.currentTarget.dataset.promotionId
        if (promotionID) {
            console.log('claiming promotion', promotionID)
        }
    },

    onGetUserInfo(e: any) {
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        if (userInfo) {
            getApp<IAppOption>().resolveUserInfo(userInfo)
            this.setData({
                avatarURL: userInfo.avatarUrl,
            })
        }
    },

    onRegisterTap() {
        wx.navigateTo({
            url: routing.register(),
        })
    },

    onNavItemTap(e: any) {
        const mainId: string = e.currentTarget?.dataset?.mainId
        const navId: string = e.currentTarget?.id
        if (mainId && navId) {
            this.setData({
                mainScroll: mainId,
                navSel: navId,
            })
        }
    },

    onMainScroll(e: any) {
        const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
        if (top === undefined) {
            return
        }

        const selItem = this.scrollStates.mainItems.find(
            v => v.top >= top)
        if (!selItem) {
            return
        }

        this.setData({
            navSel: selItem.dataset.navId,
            navScroll: selItem.dataset.navScrollId,
        })
    },

    onMianItemTap(e: WechatMiniprogram.TapEvent) {
        if (!e.currentTarget.dataset.tripInProgress) {
            return
        }
        const tripId = e.currentTarget.dataset.tripId
        if (tripId) {
            wx.redirectTo({
                url: routing.driving({
                    trip_id: tripId,
                }),
            })
        }
    }
})
