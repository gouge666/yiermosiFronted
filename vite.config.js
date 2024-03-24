/*
 * @Author: 苟培烜 3541037829@qq.com
 * @Date: 2023-12-10 22:18:08
 * @LastEditors: 苟培烜 3541037829@qq.com
 * @LastEditTime: 2023-12-21 22:35:21
 * @FilePath: \basic\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    proxy: {
      // business-server的地址
      "/api": {
        target: "http://172.17.0.2:5888/",
        ws: true, //代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        rewrite: (path) => path.replace(RegExp("^/api"), ""),
      },
    },
  },
});
