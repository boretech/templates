<template>
  <page
    :autoplay="false"
    :custom-loading="false"
    loading-bg-color="#333"
    :icon="30"
    :progress-bar="false"
    progress-bar-bg-color="#ffffcb"
    progress-bar-border-color="#ff7c81"
    :concurrent="1"
    @complete="loadComplete"
  />
</template>

<script setup>
import Page from '@/components/Page.vue'

const loadComplete = () => {
  // resource preload complete
  // code the next step code, enjoy 🚀
}

</script>
