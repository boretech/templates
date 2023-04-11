import { usePreloadStore, pinia } from '@/store'
import { request } from './request'
const preloadStore = usePreloadStore(pinia)

export const wxConfig = (wx, debug = false) => {
  request({
    url: '/weixin/GetSign.aspx',
    method: 'post',
    data: {
      url: window.location.href.split('#')[0], // 此时的链接
      v: ('' + Math.random()).replace('.', '')
    }
  }).then(res => {
    const { appid: appId, timestamp, noncestr: nonceStr, sign: signature } = res
    wx.config({
      debug,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ] // 必填，需要使用的JS接口列表
    })
  })
}

export const wxReady = (wx, regFunc) => {
  wx.ready(() => {
    if (preloadStore.autoplay) {
      preloadStore.toggleBgm()
    }
    regFunc && regFunc()
  })
}

