<template>
    <div v-if="popupStatus.show" class="pages z-[99] bg-[rgba(0,0,0,0.3)]" :class="{'animate-[fade-in_.5s_linear_forwards]' : popupStatus.show}">
        <div v-if="popupStatus.type && popupStatus.type != 'modal'"
            class="w-[150px] h-[160px] m-auto absolute inset-0 rounded-[10px] bg-[rgba(0,0,0,0.5)] flex flex-col items-center">
            <div :class="{ load: popupStatus.type == 'loading' }" class="mt-[15px]">
                <svg-icon :icon="popupStatus.type" :size="70" />
            </div>
            <div class="h-[70px] text-[#fff] text-[15px] flex flex-col justify-center">
                <span>{{ popupStatus.text }}</span>
            </div>

        </div>
        <div v-else-if="popupStatus.type == 'modal'"
            class="w-[500px] h-[300px] bg-[#fff] rounded-[10px] m-[auto] absolute inset-0">
            <div class="h-[240px] p-[20px] flex flex-col justify-center text-center">{{ popupStatus.text }}</div>
            <div class="flex text-center leading-[60px] text-[#000] text-[22px] border-t-[1px] border-[#ccc]">
                <div @click="onRemove" class="h-[60px] flex-1 border-r-[1px] border-[#ccc]">取消</div>
                <div @click="onDefine" class="h-[60px] flex-1">确定</div>
            </div>
        </div>
        <div v-else
            class="bg-[rgba(0,0,0,0.5)] text-[#fff] text-[16px] inline-block py-[5px] px-[20px] rounded-[10px] absolute top-[49vh] left-[50vw] transform translate-x-[-50%]">
            {{ popupStatus.text }}</div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex'

defineProps({

})

let delay = null

const store = useStore()
let popupStatus = computed(() => store.state.preloader.popupStatus)

watch(() => store.state.preloader.popupStatus.time, () => {
    clearTimeout(delay)

    if (store.state.preloader.popupStatus.type != 'modal') {
        delay = setTimeout(() => {
            store.commit('SET_POPUP_STATUS', { time: true })
            console.log('关闭弹窗')

        }, store.state.preloader.popupStatus.duration || 1500)

    }

})



const onRemove = () => {
    store.state.preloader.popupStatus.removeCallback()
    store.commit('SET_POPUP_STATUS', { time: true })
}
const onDefine = () => {
    store.state.preloader.popupStatus.defineCallback()
    store.commit('SET_POPUP_STATUS', { time: true })
}
</script>

<style scoped>
@keyframes load {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}

.load {
    animation-name: load;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
</style>