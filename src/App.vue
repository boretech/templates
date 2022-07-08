<template>
    <Loading @complete="loadComplete" @file-loaded="fileLoaded" />
    <music />
    <popup />
    <div class="container">
        <div @click="onOpenU">打开弹窗</div>
        <home @switching="switching" :show="pagesShow.home" />
        <rules @switching="switching" :show="pagesShow.rules" />
    </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue'
import music from '@/components/music.vue'
import popup from '@/components/popup.vue'
import home from '@/pages/home.vue'
import rules from '@/pages/rules.vue'

import { ref, markRaw, reactive } from 'vue'
import { useStore } from 'vuex'
import { audioData } from '@/config'

const store = useStore()

const pagesShow = reactive({
    home : true,
    rules : false,
})

const switching = (data) => {
    for(const k in pagesShow){ pagesShow[k] = false }
    for(const k of data){ pagesShow[k] = true }
    console.log(data);
}

const onOpenU = () => {
    console.log(store.state.preloader.popupStatus)
    store.commit('SET_POPUP_STATUS', {show : true, text : '111', type : 'modal', removeCallback(){console.log('removeCallback');}})
    
}

const loadComplete = () => {
    console.log('complete')
}

const fileLoaded = ({ id }) => {
    console.log(id)
}


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
