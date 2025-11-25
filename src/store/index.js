// 使用 Pinia 替代 Vuex
import { defineStore } from "pinia";

// 定义用户状态 store
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null,
    openid: null,
    token: null,
    isNewUser: false,
  }),

  getters: {
    // 计算属性
    getUserId: (state) => state.userInfo?.id,
    getNickName: (state) => state.userInfo?.nickName || "未登录",
    hasToken: (state) => !!state.token,
  },

  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },

    // 设置token
    setToken(token) {
      this.token = token;
      if (token) {
        uni.setStorageSync("token", token);
      } else {
        uni.removeStorageSync("token");
      }
    },

    // 登录成功
    login(loginData) {
      const { token, userInfo } = loginData;
      this.setToken(token);
      this.setUserInfo(userInfo);
      // 同步到本地存储
      if (userInfo) {
        uni.setStorageSync("userInfo", JSON.stringify(userInfo));
      }
    },

    // 退出登录
    logout() {
      this.token = null;
      this.userInfo = null;
      this.isNewUser = false;
      // 清除本地存储
      uni.removeStorageSync("token");
      uni.removeStorageSync("userInfo");
    },

    // 从本地存储恢复登录状态
    restoreLoginState() {
      try {
        const token = uni.getStorageSync("token");
        const userInfo = uni.getStorageSync("userInfo");

        if (token) {
          this.setToken(token);
        }

        if (userInfo) {
          this.setUserInfo(JSON.parse(userInfo));
        }
      } catch (error) {
        console.error("恢复登录状态失败:", error);
        this.logout();
      }
    },
  },
});
