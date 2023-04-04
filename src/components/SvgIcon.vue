<template>
  <svg
    class="fill-current w-[1em] h-[1em] leading-[1em]"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>
