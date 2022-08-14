import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import type { ConfigEnv, UserConfigExport } from 'vite'
import { loadEnv } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/proxy'

// 跨域代理重写
// const regExps = (value: string, reg: string): string => {
//   return value.replace(new RegExp(`^${reg}`, 'g'), '')
// }
function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 根据项目配置。可以配置在.env文件
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      // 配置别名
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    // 解决process is not defined的问题
    // define: { 'process.env': process.env },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 4000,
    },
    server: {
      // Listening on all local IPs
      host: true,
      // 端口
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },

    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/],
      }),
      DefineOptions(),
      Unocss(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vitest',
        ],
        dts: 'src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),

      viteMockServe({
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      }),
    ],
  }
}

