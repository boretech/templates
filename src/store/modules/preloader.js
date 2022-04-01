const state = {
  sourceData: [],
  loaded: false,
}

const mutations = {
  PUSH_SOURCE_DATA(state, data) {
    state.sourceData.push(data)
  },
  UPDATE_SOURCE_DATA(state, data) {
    state.sourceData[data.index] = data.value
  },
  SET_LOADED(state) {
    state.loaded = true
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions,
}
