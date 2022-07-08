<template>
  <svg class="icon" aria-hidden="true" :style="{ width: `${realSize}vw`, height: `${realSize}vw` }">
    <use :xlink:href="`#i-${icon}`" :fill="color ? color : '#333'" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon'
}
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 32
  }
})

const realSize = computed(() => props.size / 750 * 100)
</script>

<style scoped>
/* 涓讳綋閬僵灞� */
.popup {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}


/* alert鍜宑onfirm鐨勭洅瀛� */
.popup .pop-box {
  position: absolute;
  background-color: #fafafa;
  border-radius: 2vw;
  width: 80vw;
  height: 22vh;
  top: 39vh;
  left: 10vw;
}

.popup .pop-box .pop-title {
    text-align: center;
    color: #1aad19;
    font-size: 3vh;
    width: 100%;
    height: 6vh;
    line-height: 6vh;
    font-weight: bold;
}

.popup .pop-box .pop-tip {
    color: #4d4d4d;
    font-size: 2.4vh;
    width: 100%;
    padding: 0 4vw;
    text-align: center;
    height: 9vh;
    line-height: 4vh;
}

.popup .pop-box .pop-btns {
    width: 100%;
    height: 7vh;
    border-radius: 0 0 2vw 2vw;
    border-top: 1px solid #f1f1f1;
    display: flex;
    overflow: hidden;
}

.popup .pop-box .pop-btn {
    height: calc(7vh - 1px);
    border: none;
    appearance: none;
    outline: none;
    background-color: transparent;
    text-align: center;
    font-size: 2.4vh;
}

.popup .pop-box .pop-btn:active {
    background-color: rgba(0, 0, 0, .2);
}

.popup .pop-box.alert .pop-ok {
    width: 100%;
    color: #1aad19;
}

.popup .pop-box.confirm .pop-ok,
.popup .pop-box.confirm .pop-cl {
    width: 50%;
}

.popup .pop-box.confirm .pop-ok {
    color: #1aad19;
    border-right: 1px solid #f1f1f1;
}

.popup .pop-box.confirm .pop-cl {
    color: #f76260;
}

.popup .toast { 
  width: 120px;
  height: 120px;
  border-radius: 5px;
  padding: 25px 35px 20px;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: calc(50% - 60px);
  left: calc(50% - 60px);
}

.popup .loading {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}

.popup .toast .pop-icon {
  width: 10vw;
  height: 10vw;
  position: absolute;
  top: 8vw;
  left: 10vw;
}

/* toast銆乴oading鎻愮ず瀛楃8涓瓧浠ュ唴锛屾渶浣�4-6涓瓧 */

.popup .toast .pop-tip,
.popup .loading .pop-tip {
  width: 100%;
  text-align: center;
  color: #fff;
  position: absolute;
  top: calc(40% + 23px);
  left: 0;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
  font-size: 12px;
}

.popup .toast .pop-tip {
  top: calc(40% + 38px);
}

.popup .loading .pop-icon {
  width: 25px;
  height: 25px;
  position: absolute;
  top: calc(40% - 25px / 2);
  left: calc(50% - 25px / 2);
}

.popup .toast .pop-icon.success {
  background: url(../img/success.svg) no-repeat 50%;
  background-size: 10vw 10vw;
}

.popup .toast .pop-icon.warn {
  background: url(../img/warn.svg) no-repeat 50%;
  background-size: 10vw 10vw;
}

.popup .toast .pop-icon.error {
  background: url(../img/error.svg) no-repeat 50%;
  background-size: 10vw 10vw;
}

.toastSvg{
  display: block;
  width: 50px;
  margin: 0 auto;
}

circle{
  transition: stroke-dasharray 600ms ease-in-out;
  transform-origin: center center;
}

.toastCircleM{
  stroke-dasharray:125 15;
  transform: rotate(-20deg);
}
.failLineLeft{
  -webkit-transition: all 400ms ease-in-out;
  transition: all 400ms ease-in-out;
  transform-origin: center center;
}
.failLineRight{
  -webkit-transition: all 400ms ease-in-out;
  transition: all 400ms ease-in-out;
  transition-delay: 200ms;
  transform-origin: center center;
}
.sucLineLeft{
  -webkit-transition: all 100ms linear;
  transition: all 100ms linear;
  transition-delay: 200ms;
  transform-origin: center center;
}
.sucLineRight{
  -webkit-transition: all 200ms ease-in;
  transition: all 200ms ease-in;
  transition-delay: 300ms;
  transform-origin: center center;
}
.failLineM{
  stroke-width:2!important;
  stroke-dasharray:20 0;
}
.sucLineM{
  stroke-width:2!important;
  stroke-dasharray:30 0;
}
.tipLineTop{
  -webkit-transition: all 200ms ease-in;
  transition: all 200ms ease-in;
  transition-delay: 100ms;
  transform-origin: center center;
}
.tipLineBottom{
  -webkit-transition: all 200ms ease-in;
  transition: all 200ms ease-in;
  transition-delay: 300ms;
  transform-origin: center center;
}
.tipLineM{
  stroke-width:2!important;
  stroke-dasharray:3 0;
}
.tipLineM2{
  stroke-width:2!important;
  stroke-dasharray:40 0;
}
</style>

