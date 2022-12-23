import { createPinia } from 'pinia'

export const pinia = createPinia()

export { default as usePreloadStore } from './modules/preload'