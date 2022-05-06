<template>
  <Loading @complete="loadComplete" @file-loaded="fileLoaded" />
  <div class="container">
    <preloader src="images/logo.png" />
    <preloader src="images/logo.png" />
    <preloader src="images/logo.png" />
    <preloader src="images/logo.png" />
    <preloader src="images/logo.png" />
    <preloader src="images/logo.png" v-show="test" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Loading from '@/components/Loading.vue'
import Preloader from '@/components/Preloader.vue'

const test = ref(false)

const loadComplete = () => {
  console.log('complete')
}

const fileLoaded = ({ id }) => {
  console.log(id)
}

</script>
