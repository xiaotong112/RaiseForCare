/** @type {import('tailwindcss').Config} */
module.exports = {
  // 配置需要扫描的文件类型--即src下的所有vue、js、ts文件
  content: ["./public/index.html", "./src/**/*.{html,js,ts,vue}"],
  // 自定义拓展配置
  theme: {
    // 覆盖默认配置
    colors: {
      blue: "#3c9cff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#41B883",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      background: "#FFFFFF",
      white: "#FFFFFF",
      black: "#000000",
      text: "#252525",
      border: "#E6E6E6",
      focus: "#4F57FF",
      primary: {
        DEFAULT: "#FF9D8F",
        foreground: "#ffffff",
        600: "#4F57FF",
      },
      default: {
        50: "#f3f3f3",
        100: "#F3F3F3",
        181: "#F3F3F3",
        300: "#252525",
        233: "#fcfcfc",
      },
    },
    // 新增额外配置
    extend: {
      // 扩展颜色
      colors: {
        "purple-pink": "#8135f5",
        "blue-light": "#9acafc",
      },
    },
  },
  // 配置插件
  plugins: [
    // 示例：自定义按钮样式：btn-primary <button class="btn-primary">点击我</button>
    function ({ addComponents }) {
      addComponents({
        ".btn-primary": {
          "@apply text-white font-bold rounded-2xl py-2": "",
          "background-image":
            "linear-gradient(90deg, #FF9D8F 0%, #F4B9A9 100%)",
          "box-shadow": "none",
          border: "0",
          cursor: "pointer",
        },
        ".btn-primary:hover": {
          filter: "brightness(0.98)",
        },
        ".border-card": {
          "@apply border-2 bg-white rounded-2xl p-4": "",
        },
        ".bg-gradient-horizontal": {
          "background-image":
            "linear-gradient(90deg, #FF9D8F 0%, #F4B9A9 100%)",
        },
      });
    },
  ],
  // ...
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: true,
  },
};
