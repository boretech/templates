<template>
  <Loading v-if="!loaded" />
  <div class="container">
    <div class="w-[100px] h-[100px] bg-slate-500"></div>
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" />
    <preloader src="/images/logo.png" v-show="test"/>
  </div>
</template>

<script setup>
import {computed,ref} from 'vue'
import {useStore} from 'vuex'
import Loading from '@/components/Loading.vue'
import Preloader from '@/components/Preloader.vue'

const test = ref(false)

const store = useStore()

const loaded = computed(() => store.state.preloader.loaded)


</script>
