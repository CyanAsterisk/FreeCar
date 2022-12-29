import { ProfileService } from "../../service/profile"
import { api } from "../../service/codegen/api_pb"
import { FreeCar } from "../../service/request"
import { padString } from "../../utils/format"
import { routing } from "../../utils/routing"

function formatDate(millis: number) {
    const dt = new Date(millis)
    const y = dt.getFullYear()
    const m = dt.getMonth() + 1
    const d = dt.getDate()
    return `${padString(y)}-${padString(m)}-${padString(d)}`
}

Page({
    redirectURL: '',
    profileRefresher: 0,

    data: {
        licNo: '1024',
        name: 'FreeCar',
        genderIndex: 0,
        genders: ['未知', '男', '女'],
        birthDate: '1990-01-01',
        licImgURL: '',
        state: api.IdentityStatus[api.IdentityStatus.UNSUBMITTED],
    },

    renderProfile(p: api.IProfile) {
        this.renderIdentity(p.identity!)
        this.setData({
            state: api.IdentityStatus[p.identityStatus||0],
        })
    },

    renderIdentity(i?: api.IIdentity) {
        this.setData({
            licNo: i?.licNumber||'',
            name: i?.name||'',
            genderIndex: i?.gender||0,
            birthDate: formatDate(i?.birthDateMillis||0),
        })
    },

    onLoad(opt: Record<'redirect', string>) {
        const o: routing.RegisterOpts = opt
        if(o.redirect) {
            this.redirectURL = decodeURIComponent(o.redirect)
        }
        ProfileService.getProfile().then(p => this.renderProfile(p.data!))
        ProfileService.getProfilePhoto().then(p => {
            this.setData({
                licImgURL: p.data!.url||'',
            })
        })
    },

    onUploadLic() {
        wx.chooseMedia({
            success: async res => {
                if (res.tempFiles.length === 0){
                    return
                }
                this.setData({
                    licImgURL:res.tempFiles[0].tempFilePath
                })
                const photoRes = await ProfileService.createProfilePhoto()
                if (!photoRes.data!.uploadUrl) {
                    return
                }
                await FreeCar.uploadfile({
                    localPath: res.tempFiles[0].tempFilePath,
                    url: photoRes.data!.uploadUrl,
                })
                const identity = await ProfileService.completeProfilePhoto()
                this.renderIdentity(identity.data!)
            }
        })
    },

    onGenderChange(e: any) {
        this.setData({
            genderIndex: parseInt(e.detail.value),
        })
    },

    onBirthDateChange(e: any) {
        this.setData({
            birthDate: e.detail.value,
        })
    },

    onSubmit() {
        ProfileService.submitProfile({
                identity : {
                    licNumber: this.data.licNo,
                    name: this.data.name,
                    gender: this.data.genderIndex,
                    birthDateMillis: Date.parse(this.data.birthDate),
                }
            }
        ).then(p => {
            this.renderProfile(p.data!)
            this.scheduleProfileRefresher()
        })
    },

    onUnload() {
        this.clearProfileRefresher()
    },

    scheduleProfileRefresher() {
        this.profileRefresher = setInterval(() => {
            ProfileService.getProfile().then(p => {
                this.renderProfile(p.data!)
                if (p.data!.identityStatus !== api.IdentityStatus.PENDING) {
                    this.clearProfileRefresher()
                }
                if (p.data!.identityStatus === api.IdentityStatus.VERIFIED) {
                    this.onLicVerified()
                }
            })
        }, 1000)
    },

    clearProfileRefresher() {
        if (this.profileRefresher) {
            clearInterval(this.profileRefresher)
            this.profileRefresher = 0
        }
    },

    onResubmit() {
        ProfileService.clearProfile().then(p => this.renderProfile(p.data!))
        ProfileService.clearProfilePhoto().then(() => {
            this.setData({
                licImgURL: '',
            })
        })
    },

    onLicVerified() {
        if (this.redirectURL) {
            wx.redirectTo({
                url: this.redirectURL,
            })
        }
    }
})