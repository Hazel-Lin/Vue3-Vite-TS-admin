import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    DefineOptions(),
    Unocss(),
  ],
  resolve: {
    // 配置别名
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  // 解决process is not defined的问题
  define: { 'process.env': {} },
})

