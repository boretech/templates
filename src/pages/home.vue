<template>
    <div v-show="show" class="pages bg-[#ccc]" :class="{'animate-[fade-in_.5s_linear_forwards]' : show}" @animationend="animationend">
        <h1>{{ count }}</h1>

        <button type='button' @click='count++'>count is: {{ count }}</button>

        <div @click="onOpen">打开规则页</div>
        <div @click="onOpenU">打开弹窗</div>
        <Preloader type="image" :src="img1" />

    </div>

</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import img1 from '../assets/images/1.png'

const props = defineProps({
    show: Boolean

})

const store = useStore()

const onOpenU = () => {
    console.log(store.state.preloader.popupStatus)
    store.commit('SET_POPUP_STATUS', {text : '111', type : 'success', removeCallback(){console.log('removeCallback');}})
    
}

// 监听页面显示关闭
watch(() => props.show, () => {
    console.log('home', props.show)

})

const animationend = () => {
    onGetData()
}

const onGetData = () => {

return
    store.commit('SET_POPUP_STATUS', {text : '加载中...', type : 'loading'})
    axios({
        url : 'dal/dal.aspx?action=GetIndexData',
        type : 'post'
    }).then(res => {
        store.commit('SET_POPUP_STATUS')
        console.log(res)

    })
}

const emits = defineEmits(['switching'])

const onOpen = () => {
    // 打开页面
    emits('switching', ['rules'])
}

const count = ref(0)
</script>
