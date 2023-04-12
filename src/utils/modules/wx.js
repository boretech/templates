import { usePreloadStore, useShareStore, pinia } from '@/store'
import { request } from './request'
const preloadStore = usePreloadStore(pinia)
const shareStore = useShareStore(pinia)

export const wxConfig = (wx, debug = false) => {
  request({
    // change to the real link for wechat auth
    url: '',
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
      ]
    })
  })
}

export const wxReady = (wx, regFunc) => {
  wx.ready(() => {
    if (preloadStore.autoplay) {
      preloadStore.toggleBgm()
    }

    shareStore.wxReady = true

    shareStore.setShare()

    regFunc && regFunc()
  })
}

