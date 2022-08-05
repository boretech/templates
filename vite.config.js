
const fs = require('fs')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { cdn, title, indexData, aspx } from './src/config'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'


const commonPlugins = [
    vue(),
    createHtmlPlugin({
        minify: false,
        inject: {
            data: {
                aspx: aspx,
                title: title,
                indexData: '<script>' + indexData.map(v => `var ${v}='<%=${v} %>';`).join(' ') + '</script>'
            },
        },
    }),
    createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/icons')],
        symbolId: 'i-[name]',
        customDomId: 'vite-svg-icons',
    }),
]

const common = {
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    define: {
        'process.platform': {},
    }

}

export default defineConfig(({ command, mode }) => {
    if (command === 'serve') {
        return {
            ...common,
            plugins: [
                ...commonPlugins,

            ],
            base: './',
            server: {
                open: true,
            },
        }
    } else if (command === 'build') {
        return {
            ...common,
            plugins: [
                ...commonPlugins,
                {
                    closeBundle() {
                        fs.rename('./dist/index.html', './dist/index.aspx', (err) => {
                            console.log(err)
                            // throw err;
                        })

                    }
                },
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
                }),
            ],
            base: cdn,
            // base: './',

        }
    }
})
