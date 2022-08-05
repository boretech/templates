<template>
    <div v-show="show" class="pages bg-[#ccc]" :class="{'animate-[fade-in_.5s_linear_forwards]' : show}">

        <h1>规则{{ count }}</h1>

        <button type='button' @click='count++'>count is: {{ count }}</button>
        <div @click="onOpen">打开首页</div>

    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import {popup} from '../utils/mitt'


const props = defineProps({
    show: Boolean

})

// 监听页面显示关闭
watch(() => props.show, () => {
    console.log('rules', props.show)
    // <!-- modal || loading || error || success || warn -->
    popup.emit('show', {text : '弹窗', type : 'loading', hideCallback(){console.log(1233);}})
    // popup.emit('show', {text : '弹窗', type : 'warn', hideCallback(){console.log(1233);}})
})

const emits = defineEmits(['switching'])

const onOpen = () => {
    // 打开页面
    emits('switching', ['home'])
}

const count = ref(0)
</script>
