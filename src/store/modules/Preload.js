import { defineStore } from 'pinia'

export const usePreloadStore = defineStore('preload', {
  state() {
    return {
      show: true, // 显示 loading
      autoplay: false,
      customLoading: false, // 是否自定义 loading 页
      loadingBgColor: '#333', // 默认 loading 背景色
      loaded: 0,
      sourceList: [],
      bgmMode: 'loop',
      bgmList: [],
      currentBgmIndex: -1,
      bgmPlaying: false,
      icon: 30, // 1~30
      progressBar: true,
      progressBarBgColor: '#ffffcb',
      progressBarBorderColor: '#ff7c81',
      concurrent: 10 // 资源下载的并发数
    }
  },
  getters: {
    bgm() {
      return Boolean(this.bgmList.length)
    },
    animate() {
      return this.show
    },
    percent() {
      return Math.floor(this.loaded / this.sourceList.length * 100)
    }
  },
  actions: {
    setProps(props) {
      Object.keys(props).map(key => {
        this[key] = props[key]
      })
    },
    updatePercent(percent = 0) {
      this.percent = percent
    },
    regSource({ src, id }) {
      if (!this.sourceList.some(item => item.URL === src)) {
        this.sourceList.push({
          id: id || `r${this.sourceList.length}`,
          src: src,
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
      this.sourceList[index].targets = []
    },
    sourceLoaded() {
      this.loaded++
      console.log(`Resource loaded: ${this.loaded}/${this.sourceList.length}`)
      if (this.loaded === this.sourceList.length) {
        this.show = false
      }
    },
    toggleSound(id) {
      const index = this.sourceList.findIndex(item => item.id === id)
      if (index !== -1) {
        const target = this.sourceList[index].target
        if (target.paused) {
          target.play()
        } else {
          target.pause()
        }
      } else {
        console.warn(`Can't find resource by id <${id}>`)
      }
    },
    stopSound(id) {
      const index = this.sourceList.findIndex(item => item.id === id)
      if (index !== -1) {
        const target = this.sourceList[index].target
        target.pause()
        target.currentTime = 0
      } else {
        console.warn(`Can't find resource by id <${id}>`)
      }
    },
    toggleBgm(targetId) {
      if (targetId) {
        this.bgmMode = 'singleLoop'
        const index = this.bgmList.findIndex(item => item.id === targetId)
        if (this.bgmPlaying) {
          if (this.currentBgmIndex !== index) {
            this.bgmList[this.currentBgmIndex].target.stop()
            this.currentBgmIndex = index
            this.bgmList[this.currentBgmIndex].target.play()
          } else {
            this.bgmPlaying = false
            this.bgmList[this.currentBgmIndex].target.pause()
          }
        } else {
          this.bgmPlaying = true
          this.currentBgmIndex = index
          this.bgmList[this.currentBgmIndex].target.play()
        }
      } else {
        this.bgmMode = 'loop'
        if (this.currentBgmIndex === -1) {
          this.bgmPlaying = true
          this.currentBgmIndex = 0
          this.bgmList[this.currentBgmIndex].target.play()
        } else {
          if (this.bgmPlaying) {
            this.bgmPlaying = false
            this.bgmList[this.currentBgmIndex].target.pause()
          } else {
            this.bgmPlaying = true
            this.bgmList[this.currentBgmIndex].target.play()
          }
        }
      }
    },
    stopBgm() {
      this.bgmPlaying = false
      this.bgmList[this.currentBgmIndex].target.pause()
      this.bgmList[this.currentBgmIndex].target.currentTime = 0
      this.currentBgmIndex = -1
    }
  }
})
