<template>
	<view class="min-h-screen bg-[#FFF5F0] pb-[40rpx] px-[32rpx] pt-[20rpx]">
		<!-- 家庭信息卡片 -->
		<view class="bg-white rounded-[24rpx] p-[32rpx] mb-[32rpx] border-2 border-black flex items-center justify-between" @click="goToPersonalInfo">
			<view class="flex items-center">
				<view class="w-[120rpx] h-[120rpx] rounded-full bg-[#FFD8D8] flex items-center justify-center mr-[24rpx] border-2 border-black overflow-hidden">
					<image src="/static/home/个人 (1).png@3x.png" class="w-[100rpx] h-[100rpx]" mode="aspectFit" />
				</view>
				<view>
					<view class="flex items-center mb-[16rpx]">
						<text class="text-[32rpx] font-bold text-[#333] mr-[16rpx]">爸爸妈妈 的家庭</text>
						<text class="text-[#999] text-[24rpx]">编辑</text>
					</view>
					<view class="flex gap-[32rpx]">
						<view class="flex flex-col items-center">
							<text class="text-[32rpx] font-bold text-[#333]">326</text>
							<text class="text-[24rpx] text-[#666]">动态</text>
						</view>
						<view class="w-[2rpx] h-[40rpx] bg-[#E5E5E5] mt-[10rpx]"></view>
						<view class="flex flex-col items-center">
							<text class="text-[32rpx] font-bold text-[#333]">4526</text>
							<text class="text-[24rpx] text-[#666]">点赞</text>
						</view>
						<view class="w-[2rpx] h-[40rpx] bg-[#E5E5E5] mt-[10rpx]"></view>
						<view class="flex flex-col items-center">
							<text class="text-[32rpx] font-bold text-[#333]">4526</text>
							<text class="text-[24rpx] text-[#666]">记录天数</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 财务概览 -->
		<view class="flex justify-between mb-[32rpx]">
			<view class="w-[48%] bg-white rounded-[24rpx] p-[24rpx] flex flex-col items-center justify-center border-2 border-transparent shadow-sm">
				<text class="text-[40rpx] font-bold text-[#FF6B6B] mb-[8rpx]">¥86,52</text>
				<text class="text-[24rpx] text-[#666]">存款余额</text>
			</view>
			<view class="w-[48%] bg-white rounded-[24rpx] p-[24rpx] flex flex-col items-center justify-center border-2 border-transparent shadow-sm">
				<text class="text-[40rpx] font-bold text-[#4D9BF5] mb-[8rpx]">¥86,52</text>
				<text class="text-[24rpx] text-[#666]">退休目标</text>
			</view>
		</view>

		<!-- 我的孩子 -->
		<ProfileCard title="我的孩子" :highlight="true" :showArrow="true">
			<view class="bg-white border-2 border-[#333] rounded-[16rpx] p-[24rpx] mb-[24rpx] flex items-center justify-between" @click="goToChildInfo">
				<view class="flex items-center">
					<image src="/static/home/形象1.png" class="w-[80rpx] h-[80rpx] rounded-[12rpx] mr-[24rpx] bg-[#FFF5F0]" mode="aspectFit" />
					<view>
						<view class="flex items-center mb-[8rpx]">
							<text class="text-[32rpx] font-bold text-[#333] mr-[12rpx]">奶龙</text>
							<text class="text-[24rpx] text-[#FF6B6B]">♀</text>
						</view>
						<text class="text-[24rpx] text-[#666]">婴幼儿期 | 出生于2023年3月1日</text>
					</view>
				</view>
				<text class="text-[28rpx] text-[#666]">编辑</text>
			</view>

			<view class="h-[88rpx] border-2 border-dashed border-[#333] rounded-[44rpx] flex items-center justify-center" @click="goToChildInfo">
				<text class="text-[32rpx] text-[#333] mr-[8rpx]">+</text>
				<text class="text-[28rpx] text-[#333]">添加孩子</text>
			</view>
		</ProfileCard>

		<!-- 伴侣管理 -->
		<ProfileCard title="伴侣管理" :highlight="true">
			<view class="bg-white border-2 border-[#333] rounded-[16rpx] p-[24rpx] mb-[24rpx] flex items-center justify-between">
				<view class="flex items-center">
					<view class="w-[80rpx] h-[80rpx] rounded-[12rpx] mr-[24rpx] bg-[#FFD8D8] flex items-center justify-center border-2 border-[#333]">
						<image src="/static/home/个人 (1).png@3x.png" class="w-[60rpx] h-[60rpx]" mode="aspectFit" />
					</view>
					<view>
						<text class="text-[32rpx] font-bold text-[#333] block mb-[8rpx]">爸爸</text>
						<view class="flex items-center">
							<view class="w-[12rpx] h-[12rpx] rounded-full bg-[#52C41A] mr-[8rpx]"></view>
							<text class="text-[24rpx] text-[#666]">在线</text>
						</view>
					</view>
				</view>
				<text class="text-[40rpx] text-[#333] font-bold">-</text>
			</view>

			<view class="h-[88rpx] border-2 border-dashed border-[#333] rounded-[44rpx] flex items-center justify-center">
				<text class="text-[32rpx] text-[#333] mr-[8rpx]">+</text>
				<text class="text-[28rpx] text-[#333]">邀请伴侣</text>
			</view>
		</ProfileCard>

		<!-- 设置列表 -->
		<view class="bg-white rounded-[24rpx] border-2 border-black overflow-hidden mb-[32rpx]">
			<view class="flex items-center justify-between p-[32rpx] border-b border-[#F0F0F0]">
				<view class="flex items-center">
					<text class="text-[32rpx] mr-[16rpx]">⚙️</text>
					<text class="text-[30rpx] text-[#333]">设置</text>
				</view>
				<text class="text-[#999] text-[24rpx]">编辑</text>
			</view>
			<view class="flex items-center justify-between p-[32rpx] border-b border-[#F0F0F0]">
				<view class="flex items-center">
					<text class="text-[32rpx] mr-[16rpx]">🛡️</text>
					<text class="text-[30rpx] text-[#333]">隐私中心</text>
				</view>
				<text class="text-[#999] text-[24rpx]">编辑</text>
			</view>
			<view class="flex items-center justify-between p-[32rpx]">
				<view class="flex items-center">
					<text class="text-[32rpx] mr-[16rpx]">❓</text>
					<text class="text-[30rpx] text-[#333]">问题反馈</text>
				</view>
				<text class="text-[#999] text-[24rpx]">编辑</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import ProfileCard from './components/ProfileCard.vue'

const goToPersonalInfo = () => {
	uni.navigateTo({
		url: '/pages/profile/personalInfo'
	})
}

const goToChildInfo = () => {
	uni.navigateTo({
		url: '/pages/profile/childInfo'
	})
}
</script>

<style scoped lang="scss">
</style>