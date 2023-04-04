import { defineStore } from 'pinia'

export const usePreloadStore = defineStore('preload', {
  state() {
    return {
      show: true, // 显示 loading
      custom: false, // 是否自定义 loading 页
      bgColor: '#333', // 默认 loading 背景色
      loaded: 0,
      sourceList: [],
      icon: 30, // 1~30
      progress: true,
      progressBgColor: '#ffffcb',
      progressBorderColor: '#ff7c81',
      concurrent: 1 // 资源下载的并发数
    }
  },
  getters: {
    animate() {
      return this.show
    },
    percent() {
      return Math.floor(this.loaded / this.sourceList.length * 100)
    }
  },
  actions: {
    setBgColor(color = '#333') {
      this.bgColor = color
    },
    updatePercent(percent = 0) {
      this.percent = percent
    },
    setCustom(custom = false) {
      this.custom = custom
    },
    regSource(sourceURL) {
      if (!this.sourceList.some(item => item.URL === sourceURL)) {
        this.sourceList.push({
          id: `r${this.sourceList.length}`,
          src: sourceURL,
          blob: null,
          blobURL: '',
          loading: false
        })
      }
    },
    setLoading(index) {
      this.sourceList[index].loading = true
    },
    setResourceBlob({ index, blob }) {
      this.sourceList[index].blob = blob
      this.sourceList[index].blobURL = window.URL.createObjectURL(new Blob([blob]), { type: blob.type })
      this.sourceList[index].loading = false
    },
    sourceLoaded() {
      this.loaded++
      if (this.loaded === this.sourceList.length) {
        this.show = false
      }
    }
  }
})
