<template>
    <div @click="onMusicBtn" :class="{ music: isPlay }"
        class="flex fixed top-[10px] right-[10px] z-50">
        <Preloader v-show="isPlay" :src="music_open" />
        <Preloader v-show="!isPlay" :src="music_close" />

        <Preloader type="audio" :src="audioSrc" @complete="complete" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Howl } from 'howler'

import audioSrc from '../assets/audio/bgm.mp3'
import music_open from '../assets/images/music-open.png'
import music_close from '../assets/images/music-close.png'

const isPlay = ref(true)

let bgm = {}

const onMusicBtn = () => {
    isPlay.value = !isPlay.value
    isPlay.value ? bgm.loop(true).play() : bgm.pause()
}

const complete = (data) => {
    bgm = new Howl({
        src: [data.local],
        format: 'mp3'
    })
    bgm.loop(true).play()
}

</script>

<style scoped>
@keyframes music {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.music {
    animation-name: music;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
</style>