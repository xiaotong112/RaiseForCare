<template>
	<view class="bg-[#FFFFFF] rounded-[24rpx] p-[32rpx] w-full">
		<view class="flex items-center mb-[24rpx]">
        <view class="flex flex-col items-center gap-[20rpx]">
            <image class="w-[100rpx] h-[100rpx] rounded-full mr-[20rpx] " 
				:src="avatar" 
				mode="aspectFit" />
            <text class="text-[32rpx] font-semibold text-[#333] mr-[16rpx]">{{ name }}</text>
        </view>
        <view>
            <view class="flex-1">
				<text class="text-[28rpx] text-[#666] leading-[1.6]">
					{{ description }}
				</text>
			</view>
            <view class="flex gap-[16rpx] mb-[16rpx] items-center">
                <view class="px-[20rpx] py-[8rpx] bg-[#FFF5F0] rounded-full">
                    <text class="text-[24rpx] text-primary">{{ stage }}</text>
                </view>
                <text class="text-[24rpx] text-[#999]">{{ age }}</text>
            </view>

            <view class="flex justify-between items-center">
                <text class="text-[24rpx] text-[#999]">成长进度</text>
                <text class="text-[24rpx] text-[#999]">距离上学还有 {{ daysLeft }} 天</text>
            </view>
            <view class="w-full h-[8rpx] bg-[#F5F5F5] rounded-full overflow-hidden mt-[12rpx]">
                <view 
                    class="h-full rounded-full" 
                    :class="progressClass"
                    :style="`width: ${progress}%`">
                </view>
            </view>
        </view>
        </view>
	</view>
</template>

<script setup>
defineProps({
	name: {
		type: String,
		default: '火火'
	},
	age: {
		type: String,
		default: '3岁2个月'
	},
	avatar: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ''
	},
	stage: {
		type: String,
		default: '成长时期·幼儿期'
	},
	daysLeft: {
		type: Number,
		default: 342
	},
	progress: {
		type: Number,
		default: 45
	},
	progressClass: {
		type: String,
		default: 'bg-[#4F57FF]'
	}
})
</script>

<style scoped lang="scss">
</style>
