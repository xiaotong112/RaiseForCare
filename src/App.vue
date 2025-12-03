<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function (options) {
    console.log("App Show");
    this.checkLogin(options);
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    checkLogin(options) {
      const token = uni.getStorageSync("token");
      // 白名单，不需要登录的页面路径（不带开头的/）
      const whiteList = [
        "pages/login/login"
      ];

      if (!token) {
        // 获取当前打开的页面路径
        let path = options ? options.path : "";
        
        // 如果没有path（极少情况），尝试通过getCurrentPages获取
        if (!path) {
          const pages = getCurrentPages();
          if (pages.length > 0) {
            path = pages[pages.length - 1].route;
          }
        }

        // 如果路径存在且不在白名单中，跳转到登录页
        if (path && !whiteList.includes(path)) {
          // 使用 reLaunch 关闭所有页面，打开登录页
          uni.reLaunch({
            url: "/pages/login/login",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
@use "tailwindcss/base";
@use "tailwindcss/utilities";
@use "tailwindcss/components";

.container {
  @apply flex flex-col items-center justify-center h-full w-full p-4;
}

:root,
page {
  background-color: #fff5f0;
  min-height: 100vh;
  --wot-color-theme: #ff9d8f;
}

page-body {
  background-color: #fff5f0;
}
</style>
