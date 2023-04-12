<template>
  <img
    v-if="type === 'image'"
    v-bind="$attrs"
    :src="sourceURL"
    :style="{width: autoSize ? `${state.imageSize.width / 750 * 100}vw` : '', height: autoSize ? `${state.imageSize.height / 750 * 100}vw` : ''}"
    @load="onImageLoad"
  >
  <audio
    v-if="type==='audio'"
    :src="sourceURL"
    :loop="bgm && preloadStore.bgmList.length === 1 && false"
    @loadeddata="onLoadeddata"
    @ended="onAudioEnded"
  />
  <video
    v-if="type==='video'"
    v-bind="$attrs"
    :src="sourceURL"
    x5-video-player-type="h5"
  />
</template>

<script setup>
import { usePreloadStore } from '@/store'
import { computed, onMounted, reactive } from 'vue'

const preloadStore = usePreloadStore()

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'image',
    validator(value) {
      return ['image', 'audio', 'video', 'bgm'].includes(value)
    }
  },
  bgm: {
    type: Boolean,
    default: false
  },
  autoSize: {
    type: Boolean,
    default: true
  },
  customId: {
    type: String,
    default: ''
  }
})

const state = reactive({
  index: -1,
  imageSize: {
    width: 0,
    height: 0
  }
})

const sourceURL = computed(() => state.index !== -1 ? preloadStore.sourceList[state.index].blobURL : '')

const onImageLoad = (e) => {
  // console.log('🚀 ~ file: Preloader.vue:58 ~ onImageLoad ~ e:', e)
  // console.log(e.target.naturalWidth)
  // console.log(e.target.naturalHeight)
  e.currentTarget.setAttribute('id', `${preloadStore.sourceList[state.index].id}-${preloadStore.sourceList[state.index].targets.length}`)
  preloadStore.sourceList[state.index].targets.push(e.currentTarget)
  const { naturalWidth, naturalHeight } = e.currentTarget
  if (props.autoSize) {
    state.imageSize = {
      width: naturalWidth,
      height: naturalHeight
    }
  }
}

const onLoadeddata = (e) => {
  // console.log('🚀 ~ file: Preloader.vue:82 ~ onAudioLoad ~ e:', e)
  // console.log(e.currentTarget)
  if (props.bgm && !preloadStore.bgmList.some(item => item.id === preloadStore.sourceList[state.index].id)) {
    preloadStore.bgmList.push({
      ...preloadStore.sourceList[state.index],
      target: e.currentTarget
    })
  } else {
    if (preloadStore.bgmList.some(item => item.id === preloadStore.sourceList[state.index].id)) {
      // console.warn(`Preloader multiple instances for the same audio resource id:${preloadStore.sourceList[state.index].id}`)
      const index = preloadStore.bgmList.findIndex(item => item.id === preloadStore.sourceList[state.index].id)
      preloadStore.bgmList[index].target = e.currentTarget
    } else {
      preloadStore.sourceList[state.index].target = e.currentTarget
    }
  }
}

const onAudioEnded = (e) => {
  console.log('🚀 ~ file: Preloader.vue:95 ~ onAudioEnded ~ e:', e)
  if (props.bgm) {
    if (preloadStore.bgmMode === 'loop') {
      if (preloadStore.currentBgmIndex < preloadStore.bgmList.length - 1) {
        preloadStore.currentBgmIndex++
      } else {
        preloadStore.currentBgmIndex = 0
      }
      preloadStore.bgmList[preloadStore.currentBgmIndex].target.play()
    }

    if (preloadStore.bgmMode === 'singleLoop') {
      preloadStore.bgmList[preloadStore.currentBgmIndex].target.play()
    }
  } else {
    // [ ] TODO: 这里是非 bgm 逻辑
  }
}

onMounted(() => {
  // console.log('preload')
  if (preloadStore.sourceList.some(item => item.src === props.src)) {
    state.index = preloadStore.sourceList.findIndex(item => item.src === props.src)
  } else {
    state.index = preloadStore.sourceList.length
    preloadStore.regSource({ src: props.src, id: props.customId })
  }
})
</script>
