import { Iconify, SvgIcon } from './Icon'
import Loading from './Loading.vue'


export const globalComponents = [
  {
    name: 'Loading',
    component: Loading,
  },
  {
    name: 'Iconify',
    component: Iconify
  },
  {
    name: 'SvgIcon',
    component: SvgIcon
  }
]

export const setupGlobalComponents = (app) => {
  globalComponents.forEach(item => {
    const { name, component } = item
    app.component(name, component)
  })
}
