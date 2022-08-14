import type { Plugin } from 'vite';
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock';

export function createVitePlugins(viteEnv: any, isBuild: boolean) {
  const {
    VITE_USE_MOCK,
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
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
  ];
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(
    viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: true,
    injectCode: `
      import { setupProdMockServer } from './mockProdServer';
      setupProdMockServer();
      `,
  })
  );
  

  return vitePlugins;
}
