import { createStore } from 'vuex'
import preloader from './modules/preloader'

export default createStore({
  modules: {
    preloader
  }
})