import { defineStore } from 'pinia'
import wx from 'weixin-js-sdk'

export const useShareStore = defineStore('share', {
  state() {
    return {
      wxReady: false,
      shareOption: {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success() {}
      }
    }
  },
  getters: {},
  actions: {
    setShare(option) {
      if (this.wxReady) {
        this.shareOption = option || this.shareOption
        const { title, link, imgUrl, success } = this.shareOption

        wx.onMenuShareTimeline({
          title,
          link,
          imgUrl,
          success
        })

        wx.onMenuShareAppMessage(this.shareOption)
      } else {
        this.shareOption = option || this.shareOption
      }
    }
  }
})
