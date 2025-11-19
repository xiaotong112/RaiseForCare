<template>
	<view class="mb-[32rpx]">
		<text class="text-[32rpx] font-bold text-[#333] mb-[24rpx] block">常见问题</text>
		<view class="flex flex-wrap gap-[24rpx]">
			<view 
				v-for="(question, index) in questions" 
				:key="index"
				class="w-[48%] bg-white rounded-[24rpx] p-[24rpx] shadow-sm border-2 border-transparent active:border-[#FFD8D8]"
				@click="askQuestion(question)">
				<text class="text-[26rpx] text-[#333] font-semibold">{{ question }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
defineProps({
	questions: {
		type: Array,
		default: () => [
			'如何培养孩子的独立性？',
			'宝宝不爱吃饭怎么办？',
			'如何进行早期理财教育？',
			'适合3岁宝宝的游戏有哪些？'
		]
	}
})

const emit = defineEmits(['ask'])

const askQuestion = (question) => {
	emit('ask', question)
}
</script>

<style scoped>
</style>
