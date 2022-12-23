import { resolve } from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import mkcert from 'vite-plugin-mkcert'

const generateEnv = (env) => Object.keys(env).reduce((acc, key) => {
  const valueString = env[key]

  let realValue = valueString

  if (/^(0|[1-9][0-9]*)$/.test(valueString)) {
    realValue = +valueString
  }

  if (valueString === 'true') {
    realValue = true
  }

  if (valueString === 'false') {
    realValue = false
  }

  if (/^(\{*\}|[*])$/.test(valueString)) {
    realValue = JSON.parse(valueString)
  }

  acc[key] = realValue

  return acc
}, {})

export default defineConfig(({ mode }) => {

  process.env.NODE_ENV = mode

  const root = process.cwd()

  const { VITE_PORT, VITE_BASE, VITE_PROXY, VITE_OPEN, VITE_HTTPS, VITE_DROP_CONSOLE } = generateEnv(loadEnv(mode, root))

  let config = {
    root,
    base: VITE_BASE || '/',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(process.cwd(), 'src')
        }
      ]
    }
  }

  let plugins = [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia'
      ],
      // resolvers: [VantResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [
        IconsResolver(),
        VantResolver()
      ]
    }),
    Icons({ autoInstall: true }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'i-[dir]-[name]',
      customDomId: 'svg_icons_dom'
    })
  ]

  if (mode === 'development') {
    config.server = {
      https: VITE_HTTPS,
      host: true,
      open: VITE_OPEN,
      port: VITE_PORT || 5173,
      proxy: Object.keys(VITE_PROXY).reduce((acc, item) => {
        const target = VITE_PROXY[item]
        acc[item] = {
          target,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp(`^${item}`), ''),
          secure: /^https:\/\//.test(target)
        }
        return acc
      }, {})
    }

    if (VITE_HTTPS) {
      plugins = plugins.concat([mkcert()])
    }
  }

  if (mode === 'production') {
    config.esbuild = {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    }

    config.build = {
      target: 'es2015',
      chunkSizeWarningLimit: 2000,
      sourcemap: true,
    }
  }

  config.plugins = plugins

  return config
})
