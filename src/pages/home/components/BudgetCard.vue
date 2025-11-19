<template>
	<view class="bg-gradient-to-r from-[#FFB4AA] to-[#FF9D8F] rounded-[24rpx] p-[32rpx] relative overflow-hidden w-full">
		<!-- 编辑图标 -->
		<view class="absolute top-[24rpx] right-[24rpx] w-[48rpx] h-[48rpx] bg-white/30 rounded-full flex items-center justify-center"
			@click="handleEdit">
		</view>

		<!-- 金额显示 -->
		<view class="mb-[24rpx] flex items-center ">
			<text class="text-[24rpx] text-white/90 block mb-[8rpx]">¥</text>
			<text class="text-[56rpx] font-bold text-white">{{ currentAmount }}</text>
			<text class="text-[24rpx] text-white/90 ml-[16rpx]">当前存款</text>
		</view>

		<!-- 进度卡片 -->
		<view class="bg-white rounded-[16rpx] p-[24rpx]">
			<view class="flex justify-between items-center mb-[12rpx]">
				<text class="text-[24rpx] text-[#666]">{{ timeRemaining }}</text>
				<text class="text-[24rpx] text-primary font-semibold">{{ progressPercent }}%</text>
			</view>
			<view class="w-full h-[12rpx] bg-[#F5F5F5] rounded-full overflow-hidden mb-[12rpx]">
				<view class="h-full bg-primary rounded-full" :style="`width: ${progressPercent}%`"></view>
			</view>
			<view class="text-right">
				<text class="text-[24rpx] text-[#999]">目标：¥{{ targetAmount }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	currentAmount: {
		type: String,
		default: '86,526.88'
	},
	targetAmount: {
		type: String,
		default: '86,526.88'
	},
	timeRemaining: {
		type: String,
		default: '距离该伙伴制15年28天'
	},
	progressPercent: {
		type: Number,
		default: 9
	}
})

const emit = defineEmits(['edit'])

const handleEdit = () => {
	emit('edit')
}
</script>

<style scoped lang="scss">
</style>
