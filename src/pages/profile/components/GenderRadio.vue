<template>
	<view class="mb-[32rpx]">
		<text class="text-[28rpx] text-[#333] mb-[16rpx] block font-semibold">{{ label }}</text>
		<view class="flex gap-[40rpx]">
			<view 
				v-for="option in options" 
				:key="option.value"
				class="flex items-center" 
				@click="handleSelect(option.value)">
				<view 
					class="w-[40rpx] h-[40rpx] rounded-full border-2 flex items-center justify-center mr-[12rpx]"
					:class="modelValue === option.value ? 'border-[#333] bg-[#333]' : 'border-[#D9D9D9]'">
					<view 
						v-if="modelValue === option.value" 
						class="w-[20rpx] h-[20rpx] rounded-full bg-white">
					</view>
				</view>
				<text class="text-[28rpx] text-[#333]">{{ option.label }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		default: '性别'
	},
	modelValue: {
		type: String,
		default: ''
	},
	options: {
		type: Array,
		default: () => [
			{ label: '男生', value: 'male' },
			{ label: '女生', value: 'female' }
		]
	}
})

const emit = defineEmits(['update:modelValue'])

const handleSelect = (value) => {
	emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
</style>
