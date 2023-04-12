<template>
  <page
    :autoplay="false"
    :custom-loading="false"
    loading-bg-color="#333"
    :icon="30"
    :progress-bar="true"
    progress-bar-bg-color="#ffffcb"
    progress-bar-border-color="#ff7c81"
    :concurrent="1"
    @complete="loadComplete"
  >
    <preloader
      type="audio"
      custom-id="sound"
      :src="sound"
    />
    <preloader
      type="audio"
      :bgm="true"
      custom-id="bgm"
      :src="bgm"
    />
    <preloader
      class="w-full"
      type="video"
      controls
      :src="video"
    />
    <preloader
      :src="img1"
    />
    <preloader
      :src="img2"
    />
    <preloader
      :src="img3"
    />
    <preloader
      :src="img4"
    />
    <van-button
      type="primary"
      @click="preloadStore.toggleSound('sound')"
    >
      测试
    </van-button>
  </page>
</template>

<script setup>
import img1 from '@/assets/images/1.jpg'
import img2 from '@/assets/images/2.jpg'
import img3 from '@/assets/images/3.jpg'
import img4 from '@/assets/images/4.jpg'
import sound from '@/assets/audio/music.mp3'
import bgm from '@/assets/audio/bgm.mp3'
import video from '@/assets/video/simple.mp4'
import Preloader from '@/components/Preloader.vue'
import Page from '@/components/Page.vue'

import { usePreloadStore } from '@/store'

const preloadStore = usePreloadStore()

// preloadStore.custom = true

const loadComplete = () => {
  // console.log('app,complete')
}

</script>
