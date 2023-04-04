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
import { loadResource } from '@/utils'

const emit = defineEmits(['complete'])

onMounted(() => {
  loadResource(() => {
    emit('complete')
  })
})
</script>
