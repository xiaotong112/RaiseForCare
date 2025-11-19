<template>
	<view class="flex justify-center gap-[40rpx] pt-[20rpx] pb-[20rpx]">
		<view 
			class="relative flex flex-col items-center"
			@click="switchTab(0)">
			<!-- Hanging String -->
			<view class="w-[2rpx] h-[20rpx] bg-[#333] absolute -top-[10rpx] left-[50%] -translate-x-[50%]"></view>
			<view class="w-[16rpx] h-[16rpx] rounded-full bg-[#333] absolute -top-[16rpx] left-[50%] -translate-x-[50%] z-10"></view>
            <!-- Sign Board -->
			<view 
				class="px-[32rpx] py-[12rpx] rounded-[12rpx] border-2 border-[#333] transition-all duration-300 transform origin-top"
				:class="currentTab === 0 ? 'bg-[#FFD8D8] rotate-[-2deg] scale-110' : 'bg-white rotate-[2deg]'">
				<text class="text-[32rpx] font-bold text-[#333]">广场</text>
			</view>
		</view>

		<view 
			class="relative flex flex-col items-center"
			@click="switchTab(1)">
			<!-- Hanging String -->
			<view class="w-[2rpx] h-[20rpx] bg-[#333] absolute -top-[10rpx] left-[50%] -translate-x-[50%]"></view>
			<view class="w-[16rpx] h-[16rpx] rounded-full bg-[#333] absolute -top-[16rpx] left-[50%] -translate-x-[50%] z-10"></view>
            <!-- Sign Board -->
			<view 
				class="px-[32rpx] py-[12rpx] rounded-[12rpx] border-2 border-[#333] transition-all duration-300 transform origin-top"
				:class="currentTab === 1 ? 'bg-[#FFD8D8] rotate-[2deg] scale-110' : 'bg-white rotate-[-2deg]'">
				<text class="text-[32rpx] font-bold text-[#333]">AI助手</text>
			</view>
		</view>
	</view>
</template>

<script setup>
defineProps({
	currentTab: {
		type: Number,
		default: 0
	}
})

const emit = defineEmits(['change'])

const switchTab = (index) => {
	emit('change', index)
}
</script>

<style scoped>
</style>
