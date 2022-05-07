<template>
  <div
    class="container loading"
    :class="{ 'animate-[fade-out_.5s_linear_forwards]': state.total && state.total === state.loaded }"
    v-if="state.show"
    @animationend="onAnimationEnd"
  >
    <div class="loading-box" v-if="!custom">
      <img class="loading-icon" :src="`https://cdn.pannacloud.com/img/loading/loading${icon}.svg`" />
      <div class="loading-text">{{ state.rate }}%</div>
    </div>
    <slot v-if="custom" />
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<script setup>
import { onMounted, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore()

const props = defineProps({
  icon: {
    type: Number,
    default: 18
  },
  custom: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  total: 0,
  loaded: 0,
  rate: 0,
  show: true
})

const originData = computed(() => store.state.preloader.originData)

const emits = defineEmits(['file-loaded', 'complete'])

const loadSources = (sourceData) => {
  console.log(sourceData)
  sourceData.forEach((source) => {
    if (originData.value.some(item => item.src !== source.src)) {

    }
  })
}
// Promise.all(sourceData.map((source, index) => new Promise((resolve, reject) => {
//   const { id, src } = source
//   const ext = src.split('.')[src.split('.').length - 1]
//   if (/gif|png|jpe?g|svg/.test(ext)) {
//     // images
//     axios({
//       url: source.src,
//       method: 'get',
//       responseType: 'blob'
//     }).then(res => {
//       const img = new Image()
//       img.onload = () => {
//         store.commit('UPDATE_SOURCE_DATA', {
//           index,
//           value: {
//             ...source,
//             loaded: true,
//             local: URL.createObjectURL(res.data),
//             width: img.width,
//             height: img.height
//           }
//         })
//         state.loaded += 1
//         state.rate = Math.round(state.loaded / state.total * 100)
//         // console.log(state.rate)
//         emits('file-loaded', {
//           id: source.id
//         })
//         resolve(source)
//       }
//       img.src = URL.createObjectURL(res.data)
//     }).catch(err => {
//       state.loaded += 1
//       state.rate = Math.round(state.loaded / state.total * 100)
//       console.error(`load error: ${source.src} which 
//     id is ${source.id}`)
//       reject(err)
//     })
//   }
//   if (/mp3/.test(ext)) {
//     // mp3
//     axios({
//       url: source.src,
//       method: 'get',
//       responseType: 'arraybuffer'
//     }).then(res => {
//       console.log(res)
//     })
//   }
// })))

const onAnimationEnd = (e) => {
  console.log(e)
  state.show = false
}

onMounted(() => {
  state.total = store.state.preloader.sourceData.length
  loadSources(store.state.preloader.sourceData)
  // .then(() => {
  //   emits('complete')
  //   store.commit('SET_LOADED')
  // })
})

</script>
