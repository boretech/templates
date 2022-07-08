<template>
    <div v-show="show" class="pages" :class="{'animate-[fade-in_.5s_linear_forwards]' : show}">
        <h1>{{ count }}</h1>

        <button type='button' @click='count++'>count is: {{ count }}</button>

        <div @click="onOpen">打开规则页</div>

    </div>

</template>

<script setup>
import { ref, reactive, watch } from 'vue'


const props = defineProps({
    show: Boolean

})

// 监听页面显示关闭
watch(() => props.show, () => {
    console.log('home', props.show)
})

const emits = defineEmits(['switching'])

const onOpen = () => {
    // 打开页面
    emits('switching', ['rules'])
}

const count = ref(0)
</script>
