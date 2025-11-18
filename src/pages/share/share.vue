<template>
  <view class="login-container">
    <!-- 头像区域 -->
    <view class="avatar-section">
      <!-- <image class="avatar" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="aspectFill"></image> -->
      <text class="welcome">您好，欢迎登录！</text>
    </view>

    <!-- 用户名和密码 -->
    <view class="login-form">
      <view class="login-input">
        <input type="text" placeholder="请输入用户名" />
      </view>
      <view class="login-input">
        <input type="password" placeholder="请输入密码" />
      </view>
    </view>

    <!-- 注册 -->
    <view class="register-button">
      <text>还没有账号？</text>
      <text class="register-link" @click="goToRegister">立即注册</text>
    </view>

    <!-- 登录按钮 -->
    <view class="login-button-section">
      <button class="wechat-login-btn" @click="handleWechatLogin">登录</button>
    </view>

    <!-- 协议勾选 -->
    <view class="agreement-section">
      <checkbox-group>
        <label class="agreement-label">
          <checkbox
            value="1"
            :checked="ischecked"
            color="#3b8686"
            style="transform: scale(0.7)"
          />
          <text class="agreement-text">我已阅读并同意</text>
          <text class="agreement-link">《用户协议》</text>
          <text class="agreement-text">和</text>
          <text class="agreement-link">《隐私政策》</text>
        </label>
      </checkbox-group>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ischecked = ref(false);

const goToRegister = () => {
  console.log("注册");
  uni.navigateTo({
    url: "/subpkg/test/test",
  });
};

const handleWechatLogin = () => {
  // if (!ischecked.value) {
  // 	uni.showToast({
  // 		title: '请先同意用户协议和隐私政策',
  // 		icon: 'none',
  // 		duration: 2000
  // 	})
  // 	return
  // 	}
  //  uni.showToast({
  //    title: '登录成功',
  //    icon: 'success',
  //    duration: 2000
  //  })
  uni.navigateTo({
    url: "/subpkg/test/test",
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  padding: 0 30px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // align-items: center;
}

.avatar-section {
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .welcome {
    font-size: 26px;
    font-weight: bold;
    color: #3b8686;
    font-family: "STSong";
    font-weight: bold;
  }
}

.register-button {
  display: flex;
  justify-content: flex-end;

  .register-link {
    color: #3b8686;
  }
}

.login-form {
  width: 100%;
  margin-top: 60px;

  .login-input {
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #b7b8ba;

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ebedf0;
      border-radius: 5px;
      font-size: 16px;
      outline: none;
    }
  }
}

.login-button-section {
  margin-top: 30px;
  width: 100%;

  .wechat-login-btn {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 25px;
    border: none;
    height: 50px;
    background: linear-gradient(to right, #a8dba8, #79bd9a);

    .wechat-icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}

.agreement-section {
  margin-top: 20px;
  margin: auto;

  .agreement-label {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .agreement-text {
    color: #666;
  }

  .agreement-link {
    color: #3b8686;
  }
}
</style>
