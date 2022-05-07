import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { cdn } from './src/config'

const common = {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      ...common,
      base: './',
      server: {
        open: true,
      },
    }
  } else if (command === 'build') {
    return {
      ...common,
      base: cdn
    }
  }
})
