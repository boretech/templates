<template>
    <div v-if="isPopup" class="pages z-[99] bg-[rgba(0,0,0,0.3)]"
        :class="{ 'animate-[fade-in_.3s_linear_forwards]' : isPopup }">

        <div v-if="['loading', 'error', 'success', 'warn'].includes(state.type)"
            class="w-[200px] h-[200px] m-auto absolute inset-0 rounded-[10px] bg-[rgba(0,0,0,0.5)] flex flex-col items-center">
            <div class="pt-[30px] h-[100px]">
                <svg-icon :icon="state.type" :size="80" />
            </div>
            <div class="h-[100px] text-[#fff] text-[15px] mx-[5px] flex flex-col justify-center">
                <span>{{ state.text }}</span>
            </div>

        </div>

        <div v-else-if="['modal'].includes(state.type)"
            class="w-[500px] h-[300px] bg-[#fff] rounded-[10px] m-[auto] absolute inset-0">
            <div class="h-[240px] p-[20px] flex flex-col justify-center text-center">{{ state.text }}</div>
            <div class="flex text-center leading-[60px] text-[#000] text-[22px] border-t-[1px] border-[#ccc]">
                <div @click="onRemove" class="h-[60px] flex-1 border-r-[1px] border-[#ccc]">取消</div>
                <div @click="onDefine" class="h-[60px] flex-1">确定</div>
            </div>
        </div>

        <div v-else
            class="bg-[rgba(0,0,0,0.5)] text-[#fff] text-[21px] inline-block py-[5px] px-[20px] rounded-[10px] absolute top-[49vh] left-[50vw] transform translate-x-[-50%]">
            {{ state.text }}
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { popup } from '../utils/mitt'

const defaulState = {
    type: 'none',
    duration: 1500,
    removeCallback() { console.log('取消') },
    defineCallback() { console.log('确定') },
    hideCallback() { console.log('关闭') },


}
const type = ['modal', 'loading', 'error', 'success', 'warn']
let delay = null
const state = reactive({ ...defaulState })
const isPopup = ref(false)

popup.on('show', (data = {}) => {

    data.text = data.text + ''

    Object.assign(state, data)
    isPopup.value = true

    if (['error', 'success', 'warn'].includes(state.type)) {
        clearTimeout(delay)

        delay = setTimeout(() => {
            popup.emit('hide')
        }, state.duration)
    }

})
popup.on('hide', (data) => {
    state.hideCallback()
    Object.assign(state, defaulState)
    isPopup.value = false
})

const onRemove = () => {
    state.removeCallback()
    popup.emit('hide')
}
const onDefine = () => {
    state.defineCallback()
    popup.emit('hide')
}
</script>

<style scoped>

</style>