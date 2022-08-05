<template>

    <Loading @complete="loadComplete" @file-loaded="fileLoaded" />

    <music />

    <!-- modal || loading || error || success || warn -->
    <popup />

    <div class="container">
        <home @switching="switching" :show="pagesShow.home" />
        <rules @switching="switching" :show="pagesShow.rules" />
    </div>

</template>

<script setup>
import { shareOption } from './utils/wx.config'
import { disablePageDragging } from './utils/index'
import { title, cdn } from './config'

import Loading from '@/components/Loading.vue'
import music from '@/components/music.vue'
import popup from '@/components/popup.vue'
import home from '@/pages/home.vue'
import rules from '@/pages/rules.vue'

import { ref, markRaw, reactive } from 'vue'
import { useStore } from 'vuex'

disablePageDragging()
shareOption({
    title: title,
    desc: cdn,
    link: '',
    imgUrl: '',
    success() {
        console.log('分享成功');
    }
})

const store = useStore()

const pagesShow = reactive({
    home : false,
    rules : true,
})

const switching = (data) => {
    for(const k in pagesShow){ pagesShow[k] = false }
    for(const k of data){ pagesShow[k] = true }
    console.log(data)
}

const loadComplete = () => {
    console.log('complete')
}

const fileLoaded = ({ id }) => {
    // console.log(id)
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
