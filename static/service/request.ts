import camelcaseKeys = require("camelcase-keys")
import { auth } from "./api/codegen/auth/auth_pb"

export namespace FreeCar {
    export const serverAddr = 'http://localhost:9900'
    export const wsAddr = 'ws://localhost:9090'
    const AUTH_ERR = 'AUTH_ERR'

    const authData = {
        token: '',
        expiresAt: 0
    }

    export interface RequestOption<REQ, RES> {
        method: 'GET'|'PUT'|'POST'|'DELETE'
        path: string
        data?: REQ
        respMarshaller: (r: object)=>RES
    }

    export interface AuthOption {
        attachAuthHeader: boolean
        retryOnAuthError: boolean
    }

    export async function sendRequestWithAuthRetry<REQ, RES>(o: RequestOption<REQ, RES>, a?: AuthOption): Promise<RES> {
        const authOpt = a || {
            attachAuthHeader: true,
            retryOnAuthError: true,
        }
        try {
            await login()
            return sendRequest(o, authOpt)
        } catch(err) {
            if (err === AUTH_ERR && authOpt.retryOnAuthError) {
                authData.token = ''
                authData.expiresAt = 0
                return sendRequestWithAuthRetry(o, {
                    attachAuthHeader: authOpt.attachAuthHeader,
                    retryOnAuthError: false,
                })
            } else {
                throw err
            }
        }
    }

    export async function login() {
        if (authData.token && authData.expiresAt >= Date.now()) {
            return
        }
        const wxResp = await wxLogin()
        const resp = await sendRequest<auth.v1.ILoginRequest, auth.v1.ILoginResponse> ({
            method: 'POST',
            path: '/v1/auth/login',
            data: {
                code: wxResp.code,
            },
            respMarshaller: auth.v1.LoginResponse.fromObject,
        }, {
            attachAuthHeader: false,
            retryOnAuthError: false,
        })

        if (resp.data){
            authData.token = resp.data.token!
            authData.expiresAt = resp.data.expiredAt!
        }
    }

    function sendRequest<REQ, RES>(o: RequestOption<REQ, RES>, a: AuthOption): Promise<RES> {
        return new Promise((resolve, reject) => {
            const header: Record<string, any> = {}
            if (a.attachAuthHeader) {
                if (authData.token && authData.expiresAt >= Date.now()) {
                    header.authorization = 'Bearer ' + authData.token
                } else {
                    reject(AUTH_ERR)
                    return
                }
            }
            wx.request({
                url: serverAddr + o.path,
                method: o.method,
                data: o.data,
                header,
                success: res => {
                    if (res.statusCode === 401) {
                        reject(AUTH_ERR)
                    } else if (res.statusCode >= 400) {
                        reject(res)
                    } else {
                        resolve(o.respMarshaller(
                            camelcaseKeys(res.data as object, {
                                deep: true,
                            })))
                    }
                },
                fail: reject,
            })
        })
    }

    function wxLogin(): Promise<WechatMiniprogram.LoginSuccessCallbackResult> {
        return new Promise((resolve, reject) => {
            wx.login({
                success: resolve,
                fail: reject,
            })
        })
    }

    export interface UploadFileOpts {
        localPath: string
        url: string
    }
    export function uploadfile(o: UploadFileOpts): Promise<void> {
        const data = wx.getFileSystemManager().readFileSync(o.localPath)
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'PUT',
                url: o.url,
                data,
                success: res => {
                    if (res.statusCode >= 400) {
                        reject(res)
                    } else {
                        resolve()
                    }
                },
                fail: reject,
            })
        })
    }
}