import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import { pinia } from '@/store'
import { setupGlobalComponents } from '@/components/global'

import 'virtual:svg-icons-register'

import '@/styles/common.scss'
import '@/styles/tailwind.css'
import 'vant/lib/index.css'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

const app = createApp(App)

setupGlobalComponents(app)

app
  .use(router)
  .use(pinia)
  .mount('#app')
