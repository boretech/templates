<template>
  <div
    v-if="show"
    class="w-full h-full fixed top-0 left-0 z-999"
    :class="preloadStore.animate ? '' : 'fadeOut'"
    @animationend="show = false"
  >
    <slot v-if="preloadStore.customLoading" />
    <div
      v-else
      class="w-full h-full"
      :style="{backgroundColor: preloadStore.loadingBgColor}"
    >
      <div class="w-[300px] h-[300px] fixed top-[30%] left-0 right-0 m-auto flex flex-col items-center justify-between">
        <img
          class="max-w-[160px] max-h-[160px]"
          :src="`https://cdn.pannacloud.com/img/loading/loading${preloadStore.icon}.svg`"
        >
        <div class="text-white text-sm">
          {{ preloadStore.percent }}%
        </div>
        <Progress v-if="preloadStore.progress" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Progress from './Progress.vue'
import { usePreloadStore } from '@/store'

const preloadStore = usePreloadStore()

const show = ref(true)

</script>
