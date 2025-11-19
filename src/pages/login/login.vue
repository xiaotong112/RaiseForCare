<template>
	<view class="relative h-screen w-screen overflow-hidden">
		<!-- 背景装饰 -->
		<view class="absolute inset-0">
			<image class="footprint-1" src="/static/home/脚印.png@3x.png" mode="aspectFit" />
			<image class="footprint-2" src="/static/home/脚印.png@3x.png" mode="aspectFit" />
			<image class="footprint-3" src="/static/home/脚印.png@3x.png" mode="aspectFit" />
		</view>
		
		<!-- 主要内容区域 -->
		<view class="relative h-full flex flex-col items-center justify-start pt-[50%]">
			<!-- Logo和欢迎语 -->
			<view class="flex flex-col items-center -translate-y-[20%] pointer-events-auto">
				<view class="flex items-center justify-center w-auto h-auto p-[20rpx]">
					<image class="w-[40vw] h-[40vw]" src="/static/home/宝宝 (4).png@3x.png" mode="aspectFit" />
				</view>
				<text class="mt-[18rpx] text-[34rpx] text-[#111] font-semibold">欢迎来到------!</text>
			</view>
			
			<!-- 登录按钮 -->
			<view class="w-[90%] flex justify-center mt-[36rpx] pointer-events-auto">
				<button class="wechat-login-btn" open-type="getUserInfo" @getuserinfo="">
					<image class="w-[56rpx] h-[56rpx] mr-[18rpx]" src="/static/home/路径 1@3x.png" mode="aspectFit" />
					<text class="text-[34rpx] text-[#4a2317] font-semibold">微信登录</text>
				</button>
			</view>
			
			<!-- 协议勾选 -->
			<view class="p-[10rpx] w-[86%] max-w-[90%] mt-[18rpx] flex justify-center text-[#9b7b74] text-[24rpx]">
				<checkbox-group @change="">
					<label class="flex items-center gap-[12rpx]">
						<checkbox value="agree" :checked="isAgreed" color="#ff9999" style="transform:scale(0.8)" />
						<text class="text-[#9b7b74]">我已阅读并同意</text>
						<text class="text-[#ff8b88] mx-[6rpx]" @click.stop="viewAgreement('user')">《用户协议》</text>
						<text class="text-[#9b7b74]">和</text>
						<text class="text-[#ff8b88] mx-[6rpx]" @click.stop="viewAgreement('privacy')">《隐私政策》</text>
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


</style>