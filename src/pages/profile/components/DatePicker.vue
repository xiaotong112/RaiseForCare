<template>
	<view :class="containerClass">
		<text class="text-[28rpx] text-[#333] mb-[16rpx] block font-semibold">{{ label }}</text>
		<view class="relative">
			<picker mode="date" :value="modelValue" @change="handleChange">
				<view class="w-full h-[88rpx] bg-[#F8F8F8] rounded-[16rpx] px-[24rpx] flex items-center border-2 border-[#E5E5E5]">
					<text class="text-[28rpx]" :class="modelValue ? 'text-[#333]' : 'text-[#999]'">
						{{ modelValue || placeholder }}
					</text>
				</view>
			</picker>
			<view class="absolute right-[24rpx] top-[50%] -translate-y-[50%] w-[40rpx] h-[40rpx] flex items-center justify-center pointer-events-none">
				<text class="text-[32rpx] text-[#999]">📅</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		required: true
	},
	placeholder: {
		type: String,
		default: '请选择日期'
	},
	modelValue: {
		type: String,
		default: ''
	},
	containerClass: {
		type: String,
		default: 'mb-[32rpx]'
	}
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (e) => {
	emit('update:modelValue', e.detail.value)
}
</script>

<style scoped lang="scss">
picker {
	width: 100%;
}
</style>
