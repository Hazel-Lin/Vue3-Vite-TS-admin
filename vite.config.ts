import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { UserConfig } from 'vite';
import { resolve } from 'path';


const alias: Record<string, string> = {
	'@': resolve('/src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};
const viteConfig: UserConfig = {
    plugins: [vue()],
    resolve: { alias },
}
// https://vitejs.dev/config/
export default viteConfig
