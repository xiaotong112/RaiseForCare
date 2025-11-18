<template>
	<view class="login-page">
		<!-- 背景装饰 -->
		<view class="bg-decoration">
			<image class="footprint footprint-1" src="/static/home/脚印.png@3x.png" mode="aspectFit" />
			<image class="footprint footprint-2" src="/static/home/脚印.png@3x.png" mode="aspectFit" />
			<image class="footprint footprint-3" src="/static/home/脚印.png@3x.png" mode="aspectFit" />
		</view>
		
		<!-- 主要内容区域 -->
		<view class="content-wrapper">
			<!-- Logo和欢迎语 -->
			<view class="logo-section">
				<view class="logo-container">
					<image class="logo-image" src="/static/home/宝宝 (4).png@3x.png" mode="aspectFit" />
				</view>
				<text class="welcome-text">欢迎来到------!</text>
			</view>
			
			<!-- 登录按钮 -->
			<view class="login-button-section">
				<button class="wechat-login-btn" open-type="getUserInfo" @getuserinfo="">
					<image class="wechat-icon" src="/static/home/路径 1@3x.png" mode="aspectFit" />
					<text class="btn-text">微信登录</text>
				</button>
			</view>
			
			<!-- 协议勾选 -->
			<view class="agreement-section">
				<checkbox-group @change="">
					<label class="agreement-label">
						<checkbox value="agree" :checked="isAgreed" color="#ff9999" style="transform:scale(0.8)" />
						<text class="agreement-text">我已阅读并同意</text>
						<text class="agreement-link" @click.stop="viewAgreement('user')">《用户协议》</text>
						<text class="agreement-text">和</text>
						<text class="agreement-link" @click.stop="viewAgreement('privacy')">《隐私政策》</text>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
let isAgreed = ref(true)

</script>

<style scoped lang="scss">
.login-page{
	position:relative;
	height:100vh;
	width: 100vw;
	overflow: hidden;
}
.bg-decoration{
	position:absolute;
	inset: 0;
}
.footprint{
	position:absolute;
	width: 300rpx;
	height: 300rpx;
}
.footprint-1 { left: -10%; top: 0%; transform: rotate(-10deg); }
.footprint-2 { right: -30rpx; bottom: 50%; transform: rotate(10deg); }
.footprint-3 { left: -10%; bottom: 10%; transform: rotate(30deg); }
/* 主内容竖直布局，水平居中 */
.content-wrapper{
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;     
	justify-content: flex-start;
	padding-top: 50%;
}

.logo-section{
	display: flex;
	flex-direction: column;
	align-items: center;
	transform: translateY(-20%);
	pointer-events: auto;
}
.logo-container{
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
	height: auto;
	padding: 20rpx;
}
.logo-image{
	width: 40vw;
	height: 40vw;
}

.welcome-text{
	margin-top: 18rpx;
	font-size: 34rpx;
	color: #111;
	font-weight: 600;
}

.login-button-section{
	width: 90%;
	display: flex;
	justify-content: center;
	margin-top: 36rpx;
	pointer-events: auto;
}
.wechat-login-btn{
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
	border: 4rpx solid rgba(0,0,0,0.12);
	box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08);
	color: #4a2317;
	font-size: 34rpx;
}
.wechat-login-btn .wechat-icon{
	width: 56rpx;
	height: 56rpx;
	margin-right: 18rpx;
}
.wechat-login-btn .btn-text{
	font-size: 34rpx;
	color: #4a2317;
	font-weight: 600;
}

.agreement-section{
	padding: 10rpx;
	width: 86%;
	max-width: 90%;
	margin-top: 18rpx;
	display: flex;
	justify-content: center;
	color: #9b7b74;
	font-size: 24rpx;
}
.agreement-label{
	display: flex;
	align-items: center;
	gap: 12rpx;
}
.agreement-text{
	color: #9b7b74;
}
.agreement-link{
	color: #ff8b88;
	margin: 0 6rpx;
}

</style>