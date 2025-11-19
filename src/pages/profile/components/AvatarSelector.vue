<template>
	<view>
		<view class="mb-[60rpx]">
			<text class="text-[28rpx] text-[#333] mb-[24rpx] block font-semibold">{{ label }}</text>
			<view class="flex gap-[24rpx] justify-center">
				<view 
					v-for="avatar in avatars" 
					:key="avatar.value"
					class="w-[200rpx] h-[200rpx] bg-[#FFF5F0] rounded-[24rpx] flex items-center justify-center relative border-4"
					:class="modelValue === avatar.value ? 'border-primary' : 'border-transparent'"
					@click="handleSelect(avatar.value)">
					<image class="w-[160rpx] h-[160rpx]" :src="avatar.src" mode="aspectFit" />
				</view>
			</view>
		</view>

		<view v-if="showUpload" class="flex justify-center">
			<view 
				class="w-[200rpx] h-[200rpx] bg-[#FFF5F0] rounded-[24rpx] flex flex-col items-center justify-center border-4 border-dashed border-[#E5E5E5]"
				@click="handleUpload">
				<text class="text-[80rpx] text-[#D9D9D9] mb-[8rpx]">+</text>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		default: '选择宝宝形象'
	},
	modelValue: {
		type: String,
		default: ''
	},
	avatars: {
		type: Array,
		default: () => [
			{ value: 'avatar1', src: '/static/home/形象1.png' },
			{ value: 'avatar2', src: '/static/home/形象2.png' }
		]
	},
	showUpload: {
		type: Boolean,
		default: true
	}
})

const emit = defineEmits(['update:modelValue', 'upload'])

const handleSelect = (value) => {
	emit('update:modelValue', value)
}

const handleUpload = () => {
	emit('upload')
}
</script>

<style scoped lang="scss">
</style>
