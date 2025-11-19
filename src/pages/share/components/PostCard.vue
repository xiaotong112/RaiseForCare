<template>
	<view class="bg-white rounded-[24rpx] p-[24rpx] mb-[24rpx] border-2 border-[#333]">
		<!-- User Info -->
		<view class="flex justify-between items-start mb-[24rpx]">
			<view class="flex items-center">
				<image :src="post.avatar" class="w-[80rpx] h-[80rpx] rounded-full border-2 border-[#333] mr-[16rpx]" mode="aspectFill" />
				<view>
					<text class="text-[28rpx] font-bold text-[#333] block">{{ post.username }}</text>
					<text class="text-[24rpx] text-[#999]">{{ post.tags }}</text>
				</view>
			</view>
			<text class="text-[24rpx] text-[#999]">{{ post.time }}</text>
		</view>

		<!-- Content -->
		<view class="mb-[24rpx]">
			<text class="text-[28rpx] text-[#333] leading-[1.6]">{{ post.content }}</text>
		</view>

		<!-- Images -->
		<view class="flex gap-[16rpx] mb-[24rpx] overflow-hidden rounded-[16rpx]">
			<image 
				v-for="(img, index) in post.images" 
				:key="index"
				:src="img" 
				class="flex-1 h-[200rpx] object-cover bg-[#F8F8F8]"
				mode="aspectFill" 
			/>
		</view>

		<!-- Actions -->
		<view class="flex justify-end gap-[40rpx]">
			<view class="flex items-center">
				<text class="iconfont icon-share text-[#666] text-[32rpx] mr-[8rpx]">↗</text>
				<text class="text-[24rpx] text-[#666]">{{ post.shares }}</text>
			</view>
			<view class="flex items-center">
				<text class="iconfont icon-comment text-[#666] text-[32rpx] mr-[8rpx]">💬</text>
				<text class="text-[24rpx] text-[#666]">{{ post.comments }}</text>
			</view>
			<view class="flex items-center">
				<text class="iconfont icon-like text-[#666] text-[32rpx] mr-[8rpx]">👍</text>
				<text class="text-[24rpx] text-[#666]">{{ post.likes }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
defineProps({
	post: {
		type: Object,
		required: true
	}
})
</script>

<style scoped>
</style>
