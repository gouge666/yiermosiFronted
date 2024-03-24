/*
 * @Author: 苟培烜 3541037829@qq.com
 * @Date: 2023-12-11 00:56:00
 * @LastEditors: 苟培烜 3541037829@qq.com
 * @LastEditTime: 2023-12-21 22:37:06
 * @FilePath: \ai-inv-web\src\routes\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from "vue-router";
import home from "../pages/home.vue";
import des from "../pages/des.vue";
import use from "../pages/use.vue";
import output from "../pages/output.vue";
import connect from "../pages/connect.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/", redirect: "/home", name: "/" },
  {
    path: "/home",
    component: home,
    name: "home",
    meta: { keepAlive: true, componentName: "home" },
  },
  {
    path: "/des",
    component: des,
    name: "des",
    meta: { keepAlive: true, componentName: "des" },
  },
  {
    path: "/use",
    component: use,
    name: "use",
    meta: { keepAlive: true, componentName: "use" },
  },
  {
    path: "/output",
    component: output,
    name: "output",
    meta: { keepAlive: true, componentName: "output" },
  },
  {
    path: "/connect",
    component: connect,
    name: "connect",
    meta: { keepAlive: true, componentName: "connect" },
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
