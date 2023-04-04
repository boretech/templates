import axios from 'axios'
// import { Buffer } from 'buffer'
import { pinia, usePreloadStore } from '@/store'

// export const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

const preloadStore = usePreloadStore(pinia)

export const loadResource = (complete, mark) => {
  if (mark) {
    const downloadList = preloadStore.sourceList.filter(item => !(item.blob || item.loading))
    if (downloadList.length) {
      const item = downloadList[0]
      console.log('🚀 ~ file: preload.js:14 ~ loadResource ~ item:', item)
      const index = preloadStore.sourceList.findIndex(source => source.id === item.id)
      preloadStore.setLoading(index)
      axios.get(item.src, {
        responseType: 'blob'
      }).then(res => {
        console.log('🚀 ~ file: preload.js:20 ~ loadResource ~ res:', res)
        preloadStore.setResourceBlob({ index, blob: res.data })
        preloadStore.sourceLoaded()
        if (downloadList.length === 1) {
          // console.log('2,complete')
          complete && complete()
        } else {
          loadResource(complete, true)
        }
      })
    }
  } else {
    const downloadList = preloadStore.sourceList.filter(item => !(item.blob || item.loading)).filter((item, index) => index < preloadStore.concurrent)
    const taskList = []
    downloadList.forEach(item => {
      console.log('🚀 ~ file: preload.js:27 ~ loadResource ~ item:', item)
      const index = preloadStore.sourceList.findIndex(source => source.id === item.id)
      preloadStore.setLoading(index)
      taskList.push(
        axios.get(item.src, {
          responseType: 'blob'
        }).then(res => {
          console.log('🚀 ~ file: preload.js:33 ~ loadResource ~ res:', res)
          preloadStore.setResourceBlob({ index, blob: res.data })
          preloadStore.sourceLoaded()
          loadResource(complete, true)
        })
      )
    })
    if (downloadList.length < preloadStore.concurrent) {
      Promise.all(taskList).then(() => {
        // console.log('1,complete')
        complete && complete()
      })
    }
  }
}
