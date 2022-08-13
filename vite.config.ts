import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { loadEnv } from 'vite'
// import type { ConfigEnv, UserConfig } from 'vite'
// import dayjs from 'dayjs'
// import pkg from './package.json'

// const CWD = process.cwd()
// const __APP_INFO__ = {
//   pkg,
//   lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
// }
// export default ({ command, mode }: ConfigEnv): UserConfig => {
//   const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD)
//   return {
//     base: VITE_BASE_URL,
//     define: {
//       __APP_INFO__: JSON.stringify(__APP_INFO__),
//     },
//   }
// }
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    viteMockServe({
      // default
      mockPath: 'mock',
      localEnabled: true,
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
  ],
  resolve: {
    // 配置别名
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  // 解决process is not defined的问题
  // define: { 'process.env': {} },
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },
  build: {
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 4000,
  },

})

