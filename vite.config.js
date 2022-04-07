import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { cdn } from './src/config'

export default defineConfig((command, mode) => {
  let base = ''
  if (command === 'dev') {
    base = './'
  }

  if (command === 'build') {
    base = cdn
  }

  console.log(base)
  return {
    plugins: [vue()],
    base,
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    server: {
      open: true,
    },
  }
})
