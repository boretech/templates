import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './base.css'
import {shareOption} from './utils/wx.config'

import SvgIcon from '@/components/SvgIcon.vue'
import Preloader from '@/components/Preloader.vue'

import 'virtual:svg-icons-register'

shareOption()

const app = createApp(App)

// console.log(import.meta.env)
app.component('SvgIcon', SvgIcon)
app.component('Preloader', Preloader)

app.use(store).mount('#app')
