<template>
  <div
    class="fixed top-4 right-4 w-[50px] h-[50px] active:opacity-60"
    @click="togglePlayBgm"
  >
    <svg-icon
      v-if="preloadStore.bgmPlaying"
      class="w-[100%] h-[100%] text-[50px] absolute top-0 left-0 animate-spin"
      name="music-on"
    />
    <svg-icon
      v-else
      class="w-[100%] h-[100%] text-[50px] absolute top-0 left-0"
      name="music-off"
    />
  </div>
</template>

<script setup>
import { usePreloadStore } from '@/store'

const preloadStore = usePreloadStore()

let test = true

const togglePlayBgm = () => {
  preloadStore.toggleBgm()

  if (test) {
    test = false
    setTimeout(() => {
      preloadStore.stopBgm()
    }, 3000)
  }
}
</script>
