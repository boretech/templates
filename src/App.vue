<template>
  <page @complete="loadComplete">
    <template #loading>
      <div class="bg-white w-full h-full">
        这是一个自定义的loading
      </div>
    </template>
    <div>this is content</div>
    <svg-icon name="music-on" />
    <preloader
      type="audio"
      :bgm="true"
      :src="music"
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
      class="w-[100px] h-[100px]"
      :src="img2"
    />
    <preloader
      class="w-[100px] h-[100px]"
      :src="img2"
    />
    <preloader
      class="w-[100px] h-[100px]"
      :src="img3"
    />
    <preloader
      class="w-[100px] h-[100px]"
      :src="img4"
    />
    <van-button type="primary">
      测试
    </van-button>
  </page>
</template>

<script setup>
import img1 from '@/assets/images/1.jpg'
import img2 from '@/assets/images/2.jpg'
import img3 from '@/assets/images/3.jpg'
import img4 from '@/assets/images/4.jpg'
import music from '@/assets/audio/music.mp3'
import video from '@/assets/video/simple.mp4'
import Preloader from '@/components/Preloader.vue'
import Page from '@/components/Page.vue'

const loadComplete = () => {
  console.log('app,complete')
}

</script>

<style scoped lang="scss">
</style>
