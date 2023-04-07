import { usePreloadStore, pinia } from '@/store'

const preloadStore = usePreloadStore(pinia)

export const wxConfig = (wx, options) => {
  wx.config(options || {
    debug: true
  })
}

export const wxReady = (wx, regFunc) => {
  wx.ready(() => {
    if (preloadStore.autoPlay) {
      preloadStore.toggleBgm()
    }
    regFunc && regFunc()
  })
}

