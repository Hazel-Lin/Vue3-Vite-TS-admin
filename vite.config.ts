import { resolve } from 'path'
import { loadEnv } from 'vite'
import { warpperEnv } from './build'
import { getPluginsList } from './build/plugins'

// 当前执行node命令时文件夹的地址（工作目录）
const root = process.cwd()

export default ({ command, mode }) => {
  const {
    VITE_LEGACY,
    VITE_PUBLIC_PATH,
  } = warpperEnv(loadEnv(mode, root))
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      // 配置别名
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
      },
    },
    plugins: getPluginsList(command, VITE_LEGACY),
    build: {
      sourcemap: true,
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      // 消除 打包超过500kb警告问题
      chunkSizeWarningLimit: 4000,
    },
  }
}
