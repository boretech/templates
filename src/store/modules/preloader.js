import { Data } from "phaser"

const state = {
  originData: [],
  sourceData: [],
  loaded: false,
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
}

const actions = {}

export default {
  name: 'preloader',
  state,
  mutations,
  actions,
}
