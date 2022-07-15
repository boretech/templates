import { Data } from "phaser"

const state = {
  originData: [],
  sourceData: [],
  loaded: false,
  popupStatus: {
    show : false,
    text : '',
    type : '',
    removeCallback : () => {},
    defineCallback : () => {},
    duration : 1500,
    time : new Date().getTime()

  }
}

const mutations = {
  UPDATE_ORIGIN_DATA(state, data) {
    state.originData = data
  },
  PUSH_ORIGIN_DATA(state, data) {
    state.originData.push(data)
  },
  PUSH_SOURCE_DATA(state, data) {
    state.sourceData.push(data)
  },
  UPDATE_SOURCE_DATA(state, data) {
    state.sourceData[data.index] = data.value
  },
  SET_LOADED(state) {
    state.loaded = true
  },
  SET_POPUP_STATUS(state, data = {}) {
    state.popupStatus.show = data.text || false,
    state.popupStatus.text = data.text || '',
    state.popupStatus.type = data.type || '',
    state.popupStatus.removeCallback = data.removeCallback || (() => {console.log('取消')}),
    state.popupStatus.defineCallback = data.defineCallback || (() => {console.log('确定')}),
    state.popupStatus.closeCallback = data.closeCallback || (() => {console.log('关闭')}),
    state.popupStatus.duration = data.duration || 1500,
    data.time || (state.popupStatus.time = new Date().getTime())
  }
}

const actions = {}

export default {
  name: 'preloader',
  state,
  mutations,
  actions,
}
