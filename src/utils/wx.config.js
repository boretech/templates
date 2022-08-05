import axios from 'axios'
import wx from 'weixin-js-sdk'

axios({
    url: '/weixin/GetSign2.aspx',
    method: 'post',
    data: {
      url: window.location.href.split('#')[0], //此时的链接
      v: ('' + Math.random()).replace('.', '') //随机数，意义不明？
    },
}).then(res => {
    console.log(res)
    const {appid, timestamp, noncestr, sign} = res.data
    wx.config({
      debug: false,
      appId: appid,
      timestamp: timestamp,
      nonceStr: noncestr,
      signature: sign,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'],
      openTagList: ['wx-open-launch-weapp']
    })
})


const finalSuccess = () => {
    axios({
        url: '/weixin/UpdateShareCount.aspx',
        method: 'post',
        data: {
            url: window.location.href.split('?')[0]
        },
    })
}

// 分享配置
const shareOption = (opt) => {
    const {title, link, desc, pic, success} = opt

    wx.ready(() => {
        wx.onMenuShareTimeline({
            title: title,
            desc: desc,
            link: link,
            imgUrl: pic,
            success() {
              success()
              finalSuccess()
            }
        })

        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: pic,
            success() {
                success()
                finalSuccess()
            }
        })

    })
}

// 隐藏所有分享信息
const hideAll = () => {
    wx.ready(() => {
        wx.hideAllNonBaseMenuItem()
    })
}

// 隐藏分享链接的明文
const hideCopyUrl = () => {
    wx.ready(() => {
        wx.hideMenuItems({
            menuList: ['menuItem:copyUrl']
        })
    })
}

// 禁用分享到朋友圈
const hideTimeLine = () => {
    wx.ready(() => {
        wx.hideMenuItems({
            menuList: ['menuItem:share:timeline']
        })
    })
}

// 禁用分享给朋友
const hideAppMessage = () => {
    wx.ready(() => {
        wx.hideMenuItems({
            menuList: ['menuItem:share:appMessage']
        })
    })
}

export {
    shareOption,
    hideAll,
    hideCopyUrl,
    hideTimeLine,
    hideAppMessage,
}