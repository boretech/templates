<template>
  <div class="w-screen h-screen overflow-hidden">
    <slot />
    <loading>
      <slot name="loading" />
    </loading>
  </div>
</template>

<script setup>
import Loading from './Loading.vue'
import { loadResource } from '@/utils'

const emit = defineEmits(['complete'])

onMounted(() => {
  loadResource(() => {
    emit('complete')
  })
})
</script>
