<template>
	<view class="flex flex-col items-center mb-[40rpx]">
		<image class="w-[120rpx] h-[120rpx] mb-[20rpx]" :src="icon" mode="aspectFit" />
		<text class="text-[36rpx] font-semibold text-[#333] mb-[8rpx]">{{ title }}</text>
		<text class="text-[24rpx] text-[#999]">{{ description }}</text>
	</view>
</template>

<script setup>
defineProps({
	icon: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ''
	}
})
</script>

<style scoped lang="scss">
</style>
