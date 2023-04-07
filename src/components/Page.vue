<template>
  <div class="w-screen h-screen overflow-hidden">
    <slot />
    <bgm-player />
    <loading>
      <slot name="loading" />
    </loading>
  </div>
</template>

<script setup>
import BgmPlayer from './BgmPlayer.vue'
import Loading from './Loading.vue'
import { loadResource, wxConfig } from '@/utils'
// import wxLegacy from 'wx~v1.2.0'
import wxModern from 'wx~v1.6.0'

const emit = defineEmits(['complete'])

onMounted(() => {
  loadResource(() => {
    emit('complete')
    wxConfig(wxModern, {
      debug: false
    })
  })
})
</script>
