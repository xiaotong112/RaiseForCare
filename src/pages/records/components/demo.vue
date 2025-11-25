<template>
	<view class="bg-white rounded-[32rpx] p-[32rpx] border-2 border-[#333] relative">
		<!-- Header -->
		<view class="flex items-center justify-between mb-[40rpx]">
			<view class="p-[10rpx]" @click="prevMonth">
				<text class="iconfont icon-left text-[32rpx] font-bold">←</text>
			</view>
			<text class="text-[36rpx] font-bold text-[#333]">{{ currentYear }}年{{ currentMonth }}月</text>
			<view class="p-[10rpx]" @click="nextMonth">
				<text class="iconfont icon-right text-[32rpx] font-bold">→</text>
			</view>
		</view>

		<!-- Weekdays -->
		<view class="grid grid-cols-7 mb-[20rpx]">
			<view v-for="day in weekDays" :key="day" class="flex justify-center items-center h-[60rpx]">
				<text class="text-[28rpx] text-[#999]">{{ day }}</text>
			</view>
		</view>

		<!-- Days Grid -->
		<view class="grid grid-cols-7 gap-y-[20rpx]">
			<!-- Empty cells for start of month -->
			<view v-for="n in firstDayOfWeek" :key="`empty-${n}`" class="h-[100rpx]"></view>
			
			<!-- Days -->
			<view 
				v-for="day in daysInMonth" 
				:key="day" 
				class="flex flex-col items-center justify-start h-[100rpx] relative"
				@click="selectDay(day)">
				
				<!-- Day Number -->
				<view 
					class="w-[60rpx] h-[60rpx] flex items-center justify-center rounded-[20rpx] mb-[4rpx]"
					:class="isSelected(day) ? 'bg-[#FF9F88] text-white shadow-md' : 'text-[#333]'">
					<text class="text-[30rpx] font-medium">{{ day }}</text>
				</view>

				<!-- Data Indicators -->
				<view v-if="hasData(day)" class="flex flex-col items-center scale-75">
					<text v-if="getData(day).income" class="text-[20rpx] text-[#333] font-bold">+{{ getData(day).income }}</text>
					<text v-if="getData(day).expense" class="text-[20rpx] text-[#52C41A] font-bold">-{{ getData(day).expense }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	records: {
		type: Object,
		default: () => ({})
	}
})

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth() + 1)
const selectedDay = ref(today.getDate())

// Helper to get days in month
const getDaysInMonth = (year, month) => {
	return new Date(year, month, 0).getDate()
}

// Helper to get first day of week (0-6, 0 is Sunday)
// Adjusting to make Monday 0, Sunday 6 for our grid
const getFirstDayOfWeek = (year, month) => {
	const day = new Date(year, month - 1, 1).getDay()
	return day === 0 ? 6 : day - 1
}

const daysInMonth = computed(() => getDaysInMonth(currentYear.value, currentMonth.value))
const firstDayOfWeek = computed(() => getFirstDayOfWeek(currentYear.value, currentMonth.value))

const prevMonth = () => {
	if (currentMonth.value === 1) {
		currentMonth.value = 12
		currentYear.value--
	} else {
		currentMonth.value--
	}
}

const nextMonth = () => {
	if (currentMonth.value === 12) {
		currentMonth.value = 1
		currentYear.value++
	} else {
		currentMonth.value++
	}
}

const selectDay = (day) => {
	selectedDay.value = day
}

const isSelected = (day) => {
	return selectedDay.value === day
}

const getDateString = (day) => {
	return `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const hasData = (day) => {
	return !!props.records[getDateString(day)]
}

const getData = (day) => {
	return props.records[getDateString(day)] || {}
}
</script>

<style scoped>
</style>
