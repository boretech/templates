<template>
  <svg class="icon" aria-hidden="true" :style="{ width: `${realSize}vw`, height: `${realSize}vw` }">
    <use :xlink:href="`#i-${icon}`" :fill="color ? color : '#333'" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon'
}
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 32
  }
})

const realSize = computed(() => props.size / 750 * 100)
</script>

