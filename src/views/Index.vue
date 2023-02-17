<template>
  <van-config-provider :theme-vars="themeVars">
    <van-button @click="showLoading">
      测试
    </van-button>
  </van-config-provider>
</template>

<script setup>
import { showToast } from 'vant'

const themeVars = {

}

const showLoading = () => {
  showToast({
    // type: 'loading',
    type: 'error',
    message: '测试一下',
    // icon: 'wechat',
    duration: 3000,
    overlay: true
  })
}

</script>
