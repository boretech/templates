import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { cdn } from './src/config'
import viteImagemin from 'vite-plugin-imagemin'

const common = {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
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
      plugins: [
        vue(),
        viteImagemin({
          gifsicle: {
            optimizationLevel: 7,
            interlaced: false,
          },
          optipng: {
            optimizationLevel: 7,
          },
          mozjpeg: {
            quality: 20,
          },
          pngquant: {
            quality: [0.8, 0.9],
            speed: 4,
          },
          svgo: {
            plugins: [
              {
                name: 'removeViewBox',
              },
              {
                name: 'removeEmptyAttrs',
                active: false,
              },
            ],
          },
        })
      ],
      base: cdn
    }
  }
})
