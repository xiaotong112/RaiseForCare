<template>
	<view :class="containerClass">
		<text class="text-[28rpx] text-[#333] block font-semibold">{{ label }}</text>
		<input 
			class="w-full h-[88rpx] bg-[#F8F8F8] rounded-[16rpx] text-[28rpx] border-2 border-[#E5E5E5]" 
			:placeholder="placeholder" 
			:type="type"
			:value="modelValue"
			@input="handleInput" />
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
		default: ''
	},
	type: {
		type: String,
		default: 'text'
	},
	modelValue: {
		type: [String, Number],
		default: ''
	},
	containerClass: {
		type: String,
		default: 'mb-[32rpx]'
	}
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (e) => {
	emit('update:modelValue', e.detail.value)
}
</script>

<style scoped lang="scss">
input {
	&::placeholder {
		color: #BFBFBF;
	}
}
</style>
