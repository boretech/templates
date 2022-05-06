<template>
  <img :id="state.id" :src="state.local" v-if="state.loaded"
    :style="{ width: `${state.width / 7.5}vw`, height: 'auto' }" @load="onload" />
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<script setup>
import {cdn} from '../config'
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'

const mode = import.meta.env.MODE

const store = useStore()

const props = defineProps({
  type: {
    type: String,
    default: 'image'
  },
  src: {
    type: String,
    default: ''
  }
})

const state = reactive({
  id: `${props.type}-${new Date().getTime()}${`${Math.random()}`.substring(2, 6)}`,
  src: mode === 'production' ? `${cdn}${props.src}` : `/${props.src}`,
  local: '',
  loaded: false,
  width: 0,
  height: 0
})

store.commit('PUSH_SOURCE_DATA', state)

const index = store.state.preloader.sourceData.length - 1

watch(() => store.state.preloader.sourceData[index].loaded, (newVal) => {
  const current = store.state.preloader.sourceData[index]
  if (current.loaded) {
    state.loaded = true
    state.local = current.local
    state.width = current.width
    state.height = current.height
  }
})

// created

</script>