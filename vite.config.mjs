import { resolve } from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Imagemin from 'unplugin-imagemin/vite'
import mkcert from 'vite-plugin-mkcert'
import Legacy from '@vitejs/plugin-legacy'
import { viteObfuscateFile } from 'vite-plugin-obfuscator'

import { genEnv, genProxy } from './scripts/viteUtils.mjs'

export default defineConfig(({ mode }) => {
  const root = process.cwd()

  // console.log(loadEnv(mode, root))

  const { VITE_BASE, VITE_OPEN, VITE_PORT, VITE_HTTPS, VITE_PROXY, VITE_DROP_CONSOLE, VITE_SOURCEMAP, VITE_UGLIFY, VITE_LEGACY } = genEnv(loadEnv(mode, root))

  const config = {
    root,
    base: VITE_BASE || './',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(root, 'src')
        }
      ]
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        resolvers: [
          VantResolver(),
          IconsResolver({
            prefix: 'i'
          })
        ]
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(root, 'src/assets/icons')],
        symbolId: '[name]',
        customDomId: 'svg_icons_dom'
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        iconCustomizer(collection, icon, props) {
          props.width = '1em'
          props.height = '1em'
          props.class = 'leading-[1em]'
        }
      })
    ]
  }

  if (mode === 'development') {
    config.server = {
      host: true,
      https: VITE_HTTPS,
      open: VITE_OPEN,
      port: VITE_PORT || 5173,
      proxy: genProxy(VITE_PROXY)
    }

    if (VITE_HTTPS) {
      config.plugins = config.plugins.concat(mkcert())
    }
  }

  if (mode === 'production') {
    config.esbuild = {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    }

    config.build = {
      chunkSizeWarningLimit: 2000,
      sourcemap: VITE_SOURCEMAP
    }

    if (VITE_UGLIFY) {
      config.plugins = config.plugins.concat([
        viteObfuscateFile({
          rotateUnicodeArray: true
        })
      ])
    }

    if (VITE_LEGACY) {
      config.plugins = config.plugins.concat([
        Legacy({
          targets: ['iOS >= 11', 'Chrome >= 64'],
          modernPolyfills: true
        })
      ])
    } else {
      config.build.target = 'es2015'
    }

    config.plugins = config.plugins.concat([
      Imagemin()
    ])
  }

  return config
})
