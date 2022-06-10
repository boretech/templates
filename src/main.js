import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './base.css'
import { title } from './config'

import SvgIcon from '@/components/SvgIcon.vue'

import 'virtual:svg-icons-register'

document.title = title

const app = createApp(App)

// console.log(import.meta.env)
app.component('SvgIcon', SvgIcon)

app.use(store).mount('#app')
