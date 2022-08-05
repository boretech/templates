<template>
    <div class="container loading"
        :class="{ 'animate-[fade-out_.5s_linear_forwards]': state.total && state.total === state.loaded }"
        v-if="state.show" @animationend="onAnimationEnd">

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

defineProps({
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

    sourceData.forEach((source) => {
        // console.log(source.src)
        if (!originData.value.filter(item => item.src === source.src).length) {
            store.commit('PUSH_ORIGIN_DATA', {
                ids: [source.id],
                width: source.width,
                height: source.height,
                src: source.src,
                local: source.local
            })
        } else {
            let newOriginData = originData.value
            for (let i = 0; i < originData.value.length; i++) {
                if (originData.value[i].src === source.src) {
                    newOriginData[i].ids.push(source.id)
                    break
                }
            }
            store.commit('UPDATE_ORIGIN_DATA', newOriginData)
        }
    })

    return Promise.all(originData.value.map((source) => new Promise((resolve, reject) => {
        const { src } = source
        // console.log(src)
        const ext = src.split('.')[src.split('.').length - 1]
        axios({
            url: src,
            method: 'get',
            responseType: 'blob'
        }).then(res => {
            if (/gif|png|jpe?g|svg/.test(ext)) {
                const img = new Image()
                img.onload = () => {

                    for (let i = 0; i < sourceData.length; i++) {
                        if (sourceData[i].src === src) {
                            store.commit('UPDATE_SOURCE_DATA', {
                                index: i,
                                value: {
                                    ...sourceData[i],
                                    width: img.width,
                                    height: img.height,
                                    local: URL.createObjectURL(res.data),
                                    loaded: true
                                }
                            })

                            state.loaded += 1
                            emits('file-loaded', {
                                id: sourceData[i].id
                            })
                        }
                    }
                }
                img.src = URL.createObjectURL(res.data)

            }
            else if (/mp3/.test(ext)) {
                for (let i = 0; i < sourceData.length; i++) {
                    if (sourceData[i].src === src) {
                        const localUrl = URL.createObjectURL(res.data)
                        store.commit('UPDATE_SOURCE_DATA', {
                            index: i,
                            value: {
                                ...sourceData[i],
                                local: localUrl,
                                loaded: true

                            }
                        })

                        state.loaded += 1
                        emits('file-loaded', {
                            id: sourceData[i].id
                        })
                    }
                }
            }

            // console.log(state.loaded)
            state.rate = Math.round(state.loaded / state.total * 100)
            if (state.rate === 1) {

            }
            // console.log(state.rate)
            resolve(source)

        }).catch(err => {
            state.loaded += 1
            state.rate = Math.round(state.loaded / state.total * 100)
            console.error(`load error: ${source.src} which id is ${source.id}`)
            reject(err)
        })

    })))
    
}

const onAnimationEnd = (e) => {
    console.log(e)
    state.show = false
}

onMounted(() => {

    state.total = store.state.preloader.sourceData.length
    loadSources(store.state.preloader.sourceData)
        .then((res) => {
            emits('complete')
            store.commit('SET_LOADED')
            console.log(store.state.preloader.sourceData)
        })
})

</script>
