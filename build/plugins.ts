import Unocss from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import DefineOptions from "unplugin-vue-define-options/vite";

export function getPluginsList(command, VITE_LEGACY) {
  const prodMock = true;
  return [
    vue(),
    Unocss(),
    DefineOptions(),
    // 线上环境删除console
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
