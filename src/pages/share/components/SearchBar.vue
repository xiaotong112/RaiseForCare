<template>
	<view class="bg-white rounded-[44rpx] h-[88rpx] flex items-center px-[32rpx] border-2 border-[#333]">
		<text class="iconfont icon-search text-[#999] text-[32rpx] mr-[16rpx]">🔍</text>
		<input 
			class="flex-1 text-[28rpx] text-[#333]" 
			placeholder="输入你想搜索的内容" 
			placeholder-class="text-[#999]"
			confirm-type="search"
			@confirm="handleSearch"
		/>
	</view>
</template>

<script setup>
const emit = defineEmits(['search'])

const handleSearch = (e) => {
	emit('search', e.detail.value)
}
</script>

<style scoped>
</style>
