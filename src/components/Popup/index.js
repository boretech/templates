import { createApp } from 'vue'
import Popup from './Popup.vue'

export const createPopup = (option = {
  message: '提示',
  title: '提示',
  icon: ''
}) => {
  const mountNode = document.createElement('div')
  const Instance = createApp(Popup, {
    show: true
  })

  document.body.appendChild(mountNode)
  Instance.mount(mountNode)
}

export { default as Popup } from './Popup.vue'

export default createPopup
