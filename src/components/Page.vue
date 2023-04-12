<template>
  <div class="w-screen h-screen overflow-hidden">
    <slot />
    <bgm-player v-if="preloadStore.bgmList.length" />
    <loading>
      <slot name="loading" />
    </loading>
  </div>
</template>

<script setup>
import BgmPlayer from './BgmPlayer.vue'
import Loading from './Loading.vue'
import { loadResource, wxConfig, wxReady } from '@/utils'
import { usePreloadStore } from '@/store'
// import wxLegacy from 'wx~v1.2.0'
import wxModern from 'wx~v1.6.0'

const preloadStore = usePreloadStore()

const props = defineProps({
  autoplay: {
    type: Boolean,
    default: false
  },
  customLoading: {
    type: Boolean,
    default: false
  },
  loadingBgColor: {
    type: String,
    default: '#333',
    validator: (value) => /^#*/.test(value)
  },
  icon: {
    type: Number,
    default: 30,
    validator: (value) => value <= 30
  },
  progressBar: {
    type: Boolean,
    default: false
  },
  progressBarBgColor: {
    type: String,
    default: '#ffffcb',
    validator: (value) => /^#*/.test(value)
  },
  progressBarBorderColor: {
    type: String,
    default: '#ff7c81',
    validator: (value) => /^#*/.test(value)
  },
  concurrent: {
    type: Number,
    default: 10
  }
})

preloadStore.setProps(props)

const emit = defineEmits(['complete'])

// when wx.config
wxReady(wxModern, () => {
  // register function for wx.ready event
})

onMounted(() => {
  loadResource(() => {
    emit('complete')
    wxConfig(wxModern)
  })
})
</script>
