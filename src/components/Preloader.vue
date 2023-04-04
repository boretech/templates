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
  autoSize: {
    type: Boolean,
    default: true
  }
})

const state = reactive({
  index: -1,
  imageSize: {
    width: 0,
    height: 0
  }
})

const sourceURL = computed(() => {
  if (state.index !== -1) {
    return preloadStore.sourceList[state.index].blobURL
  }
  return ''
})

const onImageLoad = (e) => {
  // console.log('🚀 ~ file: Preloader.vue:58 ~ onImageLoad ~ e:', e)
  // console.log(e.target.naturalWidth)
  // console.log(e.target.naturalHeight)
  const { naturalWidth, naturalHeight } = e.currentTarget
  if (props.autoSize) {
    state.imageSize = {
      width: naturalWidth,
      height: naturalHeight
    }
  }
}

onMounted(() => {
  // console.log('preload')
  if (preloadStore.sourceList.some(item => item.src === props.src)) {
    state.index = preloadStore.sourceList.findIndex(item => item.src === props.src)
  } else {
    state.index = preloadStore.sourceList.length
    preloadStore.regSource(props.src)
  }
})
</script>
