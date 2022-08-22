import Unocss from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import DefineOptions from "unplugin-vue-define-options/vite";
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from "vite-svg-loader";
import { createSvg } from '../src/icons/index'

export function getPluginsList(command, VITE_LEGACY) {
  const prodMock = true;
  return [
    vue(),
    createSvg('src/icons/svg/'),
    Unocss(),
    DefineOptions(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vitest',
      ],

      dts: 'src/auto-imports.d.ts',
    }),
    svgLoader(),
    // mock支持
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && prodMock,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false
    }),
  ];
}
