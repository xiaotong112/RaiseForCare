<template>
	<view class="bg-[#FFFFFF] rounded-[24rpx] p-[32rpx] w-full">
		<view class="flex items-center mb-[32rpx]">
			<text class="text-[32rpx] font-semibold text-[#333] mr-[12rpx]">📊</text>
			<text class="text-[32rpx] font-semibold text-[#333]">{{ title }}</text>
		</view>

		<!-- 图表区域 -->
		<view class="relative h-[400rpx] mb-[24rpx]">
			<!-- Y轴刻度 -->
			<view class="absolute left-0 top-0 bottom-0 w-[80rpx] flex flex-col justify-between py-[20rpx]">
				<text 
					v-for="(label, index) in yAxisLabels" 
					:key="index"
					class="text-[20rpx] text-[#999]">
					{{ label }}
				</text>
			</view>

			<!-- 图表内容区域 -->
			<view class="absolute left-[80rpx] right-0 top-0 bottom-0">
				<!-- 背景网格线 -->
				<view class="absolute inset-0 flex flex-col justify-between py-[20rpx]">
					<view 
						v-for="i in 5" 
						:key="i"
						class="h-[1rpx] bg-[#F0F0F0]">
					</view>
				</view>

				<!-- 折线图模拟 -->
				<canvas :canvas-id="canvasId" class="w-full h-full"></canvas>
			</view>

			<!-- X轴标签 -->
			<view class="absolute left-[80rpx] right-0 -bottom-[40rpx] flex justify-between px-[20rpx]">
				<text 
					v-for="(label, index) in xAxisLabels" 
					:key="index"
					class="text-[20rpx] text-[#999]">
					{{ label }}
				</text>
			</view>
		</view>

		<!-- 图例 -->
		<view class="flex items-center justify-center gap-[40rpx] mt-[60rpx]">
			<view 
				v-for="(legend, index) in legends" 
				:key="index"
				class="flex items-center">
				<view 
					class="w-[24rpx] h-[24rpx] rounded-full mr-[12rpx]" 
					:style="`background-color: ${legend.color}`">
				</view>
				<text class="text-[24rpx] text-[#666]">{{ legend.label }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
	title: {
		type: String,
		default: '养娃开销与存款预测'
	},
	canvasId: {
		type: String,
		default: 'chartCanvas'
	},
	yAxisLabels: {
		type: Array,
		default: () => ['¥1000', '¥2000', '¥4000', '¥6000', '¥8000']
	},
	xAxisLabels: {
		type: Array,
		default: () => ['2024', '2026', '2028', '2030', '2032', '2034']
	},
	legends: {
		type: Array,
		default: () => [
			{ label: '累计养娃开销', color: '#FF9D8F' },
			{ label: '存款数预', color: '#4FC3F7' }
		]
	}
})

onMounted(() => {
	drawChart()
})

const drawChart = () => {
	// 图表绘制逻辑（使用 uni.createCanvasContext 或引入图表库）
	// 暂时留空，等待后续实现
}
</script>

<style scoped lang="scss">
</style>
