<template>
	<view class="mb-[32rpx] flex" :class="isUser ? 'flex-row-reverse' : 'flex-row'">
		<!-- Avatar -->
		<image 
			:src="avatar" 
			class="w-[80rpx] h-[80rpx] rounded-full border-2 border-[#333] flex-shrink-0"
			:class="isUser ? 'ml-[24rpx]' : 'mr-[24rpx]'"
			mode="aspectFill" 
		/>

		<!-- Message Content -->
		<view class="max-w-[70%]">
			<!-- Name & Time -->
			<view class="flex items-center mb-[8rpx]" :class="isUser ? 'justify-end' : 'justify-start'">
				<text v-if="!isUser" class="text-[28rpx] font-bold text-[#333] mr-[16rpx]">{{ name }}</text>
				<text class="text-[24rpx] text-[#999]">{{ time }}</text>
			</view>

			<!-- Bubble -->
			<view 
				class="p-[24rpx] rounded-[24rpx] text-[28rpx] leading-[1.6] text-[#333]"
				:class="isUser ? 'bg-[#FFD8D8] rounded-tr-none' : 'bg-[#F8F8F8] rounded-tl-none'">
				<text>{{ content }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
defineProps({
	isUser: {
		type: Boolean,
		default: false
	},
	avatar: {
		type: String,
		required: true
	},
	name: {
		type: String,
		default: ''
	},
	time: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		required: true
	}
})
</script>

<style scoped>
</style>
