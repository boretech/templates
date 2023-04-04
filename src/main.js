import { createApp } from 'vue'
import App from './App.vue'

import { pinia } from '@/store'
// import router from '@/router'

import '@/style/reset.css'
import '@/style/tailwind.css'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

import 'virtual:svg-icons-register'

import Eruda from 'eruda'

import { globalComponents } from '@/components'

document.title = import.meta.env.VITE_PROJECT_NAME

if (JSON.parse(import.meta.env.VITE_ERUDA)) {
  Eruda.init()
}

const app = createApp(App)

globalComponents.forEach(item => {
  const { name, component } = item
  app.component(name, component)
})

app
  .use(pinia)
  // .use(router)
  .mount('#app')
