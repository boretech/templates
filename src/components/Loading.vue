<template>
  <div>{{ state.rate }}</div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<script setup>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore()

const state = reactive({
  total: 0,
  loaded: 0,
  rate: 0
})

const loadSources = (sourceData) => Promise.all(sourceData.map((source, index) => new Promise((resolve, reject) => {
  // console.log('load')
  axios({
    url: source.src,
    method: 'get',
    responseType: 'blob'
  }).then(res => {
    // console.log('111')
    const img = new Image()
    img.onload = () => {
      store.commit('UPDATE_SOURCE_DATA', {
        index,
        value: {
          ...source,
          loaded: true,
          local: URL.createObjectURL(res.data),
          width: img.width,
          height: img.height
        }
      })
      state.loaded += 1
      state.rate = Math.round(state.loaded / state.total * 100)
      console.log(state.rate)
      resolve(source)
    }
    img.src = URL.createObjectURL(res.data)
  }).catch(err => {
    reject(err)
  })
})))





onMounted(() => {
  // console.log(store.state.preloader.sourceData.length)
  state.total = store.state.preloader.sourceData.length

  loadSources(store.state.preloader.sourceData).then(() => {
    store.commit('SET_LOADED')
  })
})

</script>