import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './base.css'
import { title } from './config'

document.title = title

console.log(import.meta.env)

createApp(App).use(store).mount('#app')
