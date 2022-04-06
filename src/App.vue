<template>
  <Loading @complete="loadComplete" @file-loaded="fileLoaded" />
  <div class="container">
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" v-show="test" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue'
import Preloader from '@/components/Preloader.vue'

const test = ref(false)

const store = useStore()

const loaded = computed(() => store.state.preloader.loaded)

const loadComplete = () => {
  console.log('complete')
}

const fileLoaded = ({ id }) => {
  console.log(id)
}

</script>
