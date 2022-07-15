<template>
    <div v-if="audioData.bgm && audioBtn.music_open" @click="onMusicBtn" :class="{ music: isPlay }" class="flex fixed top-[10px] right-[10px] z-50">
        <Preloader v-show="isPlay" :src="audioBtn.music_open" />
        <Preloader v-show="!isPlay" :src="audioBtn.music_close" />

        <Preloader type="audio" :src="audioData.bgm.src" />
    </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import { useStore } from 'vuex'
import { audioBtn, audioData } from '@/config'

const store = useStore()
const isPlay = ref(true)

const onMusicBtn = () => {
    isPlay.value = !isPlay.value
    isPlay.value ? audioData.bgm.control.loop(true).play() : audioData.bgm.control.pause()
}

watch(() => store.state.preloader.loaded, () => {
    audioData.bgm?.control.loop(true).play()
})

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