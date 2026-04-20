import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path, {resolve} from 'path'
import {createHtmlPlugin} from 'vite-plugin-html'
import PostcssPxToRem from 'postcss-pxtorem'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vite.dev/config/
export default defineConfig((config) => {
    const env = loadEnv(config.mode, process.cwd())
    return {
        build: {

            chunkSizeWarningLimit: 100000, // 将警告阈值调整为1000 kB
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    },
                    format:'es'
                }
            }
        },
        plugins: [
            vue(),
            createHtmlPlugin({
                inject: {
                    data: {
                        title: env.VITE_APP_TITLE,
                    },
                },
            }),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            createSvgIconsPlugin({
                iconDirs: [resolve(__dirname, 'public/svg')],
                symbolId: 'icon-[name]',
            })
        ],
        css: {
            postcss: {
                plugins: [
                    PostcssPxToRem({
                        rootValue: 192, // 根元素字体大小，根据设计稿尺寸和实际情况调整
                        propList: ['*'], // 需要转换的属性，'*' 表示所有属性都转换
                        selectorBlackList: ['.ignore-to-rem'], // 不进行转换的选择器列表
                        //转换成rem后保留的小数点位数
                        unitPrecision: 5,
                        //replace: true, // 是否替换原有的 px 值
                        mediaQuery: true, // 是否在媒体查询中也进行转换
                        minPixelValue: 0 // 最小的转换像素值，小于该值的 px 不进行转换
                    })
                ]
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, "src"), // 路径别名
                '@th4': path.resolve(__dirname, "src/th4"), // 路径别名
            },
        },
        server: {
            port: 8080,
            host: '0.0.0.0'
        }
    }
})
