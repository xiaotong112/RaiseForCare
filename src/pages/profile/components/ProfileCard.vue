<template>
	<view class="bg-white rounded-[24rpx] p-[32rpx] mb-[24rpx] border-2 border-black">
		<view class="flex items-center justify-between mb-[24rpx]" v-if="title">
			<view class="flex items-center">
                <view v-if="highlight" class="bg-[#FFD8D8] px-[12rpx] py-[4rpx] rounded-[4rpx] mr-[16rpx]">
                    <text class="text-[28rpx] font-bold text-[#333]">{{ title }}</text>
                </view>
				<text v-else class="text-[32rpx] font-bold text-[#333]">{{ title }}</text>
			</view>
			<!-- <view v-if="showArrow" class="text-[#999]">
				<text>编辑</text>
			</view> -->
		</view>
		<slot></slot>
	</view>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: ''
	},
	showArrow: {
		type: Boolean,
		default: false
	},
    highlight: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
</style>
