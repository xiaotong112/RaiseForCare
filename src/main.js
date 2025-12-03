import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { initPermission } from "./utils/permission";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  app.use(pinia);

  // 初始化权限拦截
  initPermission();

  return {
    app,
    pinia, // 需要返回 pinia 实例用于 SSR
  };
}
