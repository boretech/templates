<template>
  <div class="w-full h-[40px] flex relative rounded-[20px] overflow-hidden">
    <div
      class="w-full h-[40px] absolute top-0 left-0 rounded-[20px]"
      :style="{left: `-${100 - preloadStore.percent}%`, backgroundColor: preloadStore.progressBarBgColor}"
    />
    <div
      class="h-full w-full absolute top-0 left-0 border-2 border-solid rounded-[20px]"
      :style="{borderColor: preloadStore.progressBarBorderColor}"
    />
  </div>
</template>

<script setup>
import { usePreloadStore } from '@/store'
const preloadStore = usePreloadStore()
</script>
