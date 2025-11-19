<template>
	<view class="flex gap-[32rpx] py-[24rpx] overflow-x-auto">
		<view 
			v-for="(tab, index) in tabs" 
			:key="index"
			class="relative flex flex-col items-center"
			@click="selectTab(index)">
			<text 
				class="text-[32rpx] transition-all duration-200"
				:class="currentTab === index ? 'font-bold text-[#333] text-[36rpx]' : 'text-[#666]'">
				{{ tab }}
			</text>
			<view 
				v-if="currentTab === index"
				class="w-[40rpx] h-[8rpx] bg-[#FFD8D8] rounded-full absolute -bottom-[4rpx] -z-10">
			</view>
		</view>
	</view>
</template>

<script setup>
defineProps({
	tabs: {
		type: Array,
		default: () => ['推荐', '生活日常', '宠物穿搭', '养护分享', '搞笑']
	},
	currentTab: {
		type: Number,
		default: 0
	}
})

const emit = defineEmits(['change'])

const selectTab = (index) => {
	emit('change', index)
}
</script>

<style scoped>
</style>
