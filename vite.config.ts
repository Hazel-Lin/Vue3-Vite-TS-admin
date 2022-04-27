import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { UserConfig } from 'vite'
import { resolve } from 'path'

// 配置别名
const alias: Record<string, string> = {
	'@': resolve('/src/')
};
const viteConfig: UserConfig = {
    plugins: [vue(
    )],
    resolve: { alias },
}

export default viteConfig
