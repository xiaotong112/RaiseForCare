<template>
  <view class="relative h-screen w-screen overflow-hidden">
    <!-- 背景装饰 -->
    <view class="absolute inset-0">
      <image
        class="footprint-1"
        src="/static/home/脚印.png@3x.png"
        mode="aspectFit"
      />
      <image
        class="footprint-2"
        src="/static/home/脚印.png@3x.png"
        mode="aspectFit"
      />
      <image
        class="footprint-3"
        src="/static/home/脚印.png@3x.png"
        mode="aspectFit"
      />
    </view>

    <!-- 主要内容区域 -->
    <view
      class="relative h-full flex flex-col items-center justify-start pt-[50%]"
    >
      <!-- Logo和欢迎语 -->
      <view
        class="flex flex-col items-center -translate-y-[20%] pointer-events-auto"
      >
        <view class="flex items-center justify-center w-auto h-auto p-[20rpx]">
          <image
            class="w-[40vw] h-[40vw]"
            src="/static/home/宝宝 (4).png@3x.png"
            mode="aspectFit"
          />
        </view>
        <text class="mt-[18rpx] text-[34rpx] text-[#111] font-semibold"
          >欢迎来到养娃防老小程序!</text
        >
      </view>

      <!-- 登录按钮 -->
      <view class="w-[90%] flex justify-center mt-[36rpx] pointer-events-auto">
        <button
          class="wechat-login-btn"
          :disabled="!isAgreed || isLoading"
          open-type="getUserInfo"
          @getuserinfo="handleWechatLogin"
        >
          <image
            v-if="!isLoading"
            class="w-[56rpx] h-[56rpx] mr-[18rpx]"
            src="/static/home/路径 1@3x.png"
            mode="aspectFit"
          />
          <view v-if="isLoading" class="loading-spinner mr-[18rpx]"></view>
          <text class="text-[34rpx] text-[#4a2317] font-semibold">
            {{ isLoading ? "登录中..." : "微信登录" }}
          </text>
        </button>
      </view>

      <!-- 协议勾选 -->
      <view
        class="p-[10rpx] w-[86%] max-w-[90%] mt-[18rpx] flex justify-center text-[#9b7b74] text-[24rpx]"
      >
        <checkbox-group @change="onAgreementChange">
          <label class="flex items-center gap-[12rpx]">
            <checkbox
              value="agree"
              :checked="isAgreed"
              color="#ff9999"
              style="transform: scale(0.8)"
            />
            <text class="text-[#9b7b74]">我已阅读并同意</text>
            <text
              class="text-[#ff8b88] mx-[6rpx]"
              @click.stop="viewAgreement('user')"
              >《用户协议》</text
            >
            <text class="text-[#9b7b74]">和</text>
            <text
              class="text-[#ff8b88] mx-[6rpx]"
              @click.stop="viewAgreement('privacy')"
              >《隐私政策》</text
            >
          </label>
        </checkbox-group>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { login } from "@/api/login";
import { useUserStore } from "@/store/user.js";

const userStore = useUserStore();

// 响应式数据
const isAgreed = ref(false);
const isLoading = ref(false);

/**
 * 微信一键登录
 */
const handleWechatLogin = async (e) => {
  // 检查是否同意协议
  if (!isAgreed.value) {
    uni.showToast({
      title: "请先同意用户协议和隐私政策",
      icon: "error",
      duration: 3000,
      mask: true,
    });
  }

  // 设置加载状态
  isLoading.value = true;

  /**
   * 调用微信登录 - Promise封装
   */
  const uniLogin = () => {
    return new Promise((resolve, reject) => {
      uni.login({
        provider: "weixin",
        success: (res) => {
          if (res.code) {
            resolve(res);
            console.log("微信登录成功，code:", res.code);
          } else {
            reject(new Error("获取微信登录凭证失败"));
          }
        },
        fail: (err) => {
          console.error("微信登录失败:", err);
          reject(new Error("微信登录失败"));
        },
      });
    });
  };

  // 获取微信登录凭证
  try {
    const loginRes = await uniLogin();
    const code = loginRes.code;

    // 调用后端登录接口
    const res = await login(code);
    console.log("登录成功:", res);

    // 更新 store
    userStore.login(res);

    uni.showToast({
      title: "登录成功",
      icon: "success",
      duration: 1500,
    });

    // 延迟跳转
    setTimeout(() => {
      uni.switchTab({
        url: "/pages/home/home",
      });
    }, 1500);

  } catch (error) {
    console.error("登录失败:", error);
    uni.showToast({
      title: error.message || "登录失败",
      icon: "none",
      duration: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

/**
 * 协议勾选状态改变
 */
const onAgreementChange = (e) => {
  isAgreed.value = e.detail.value.includes("agree");
};

/**
 * 查看协议
 */
const viewAgreement = (type) => {
  // 这里可以跳转到具体的协议页面
  if (type === "user") {
    // 跳转到用户协议页面
    console.log("查看用户协议");
    // uni.navigateTo({
    // 	url: '/pages/agreement/user'
    // })
  } else if (type === "privacy") {
    // 跳转到隐私政策页面
    console.log("查看隐私政策");
    // uni.navigateTo({
    // 	url: '/pages/agreement/privacy'
    // })
  }
};
</script>

<style scoped lang="scss">
.footprint-1 {
  position: absolute;
  width: 300rpx;
  height: 300rpx;
  left: -10%;
  top: 0%;
  transform: rotate(-10deg);
}
.footprint-2 {
  position: absolute;
  width: 300rpx;
  height: 300rpx;
  right: -30rpx;
  bottom: 50%;
  transform: rotate(10deg);
}
.footprint-3 {
  position: absolute;
  width: 300rpx;
  height: 300rpx;
  left: -10%;
  bottom: 10%;
  transform: rotate(30deg);
}

.wechat-login-btn {
  width: 86%;
  max-width: 90%;
  height: 6vh;
  border-radius: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 28rpx;
  box-sizing: border-box;
  background: linear-gradient(90deg, #ffd6c4 0%, #ffc7b1 100%);
  border: 4rpx solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  color: #4a2317;
  font-size: 34rpx;
  transition: opacity 0.3s ease;
}

.wechat-login-btn:disabled {
  opacity: 0.6;
}

.loading-spinner {
  width: 56rpx;
  height: 56rpx;
  border: 4rpx solid #ffc7b1;
  border-top: 4rpx solid #4a2317;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
