import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'


export default defineConfig({
    plugins: [ 
        Vue({
            include: [/\.vue$/, /\.md$/],
        })],
    resolve: {
        // 配置别名
        alias: {
          '@/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
})

