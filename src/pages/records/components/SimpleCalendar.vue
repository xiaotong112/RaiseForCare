<template>
  <view class="border-card">
    <!-- 月份切换 -->
    <view class="calendar-header">
      <button class="nav-btn" @click="prevMonth">
        <text class="arrow">←</text>
      </button>
      <text class="month-title">{{ currentMonthText }}</text>
      <button class="nav-btn" @click="nextMonth">
        <text class="arrow">→</text>
      </button>
    </view>

    <!-- 日历网格 -->
    <view class="calendar-grid">
      <!-- 星期标题 -->
      <view class="weekdays">
        <text class="weekday">M</text>
        <text class="weekday">T</text>
        <text class="weekday">W</text>
        <text class="weekday">T</text>
        <text class="weekday">F</text>
        <text class="weekday">S</text>
        <text class="weekday">S</text>
      </view>

      <!-- 日期网格 -->
      <view class="days">
        <view
          v-for="day in calendarDays"
          :key="day.key"
          class="day"
          :class="{
            'other-month': !day.isCurrentMonth,
            selected: day.isSelected,
            today: day.isToday,
            'has-record': day.hasRecord,
          }"
          @click="selectDate(day)"
        >
          <text class="day-number">{{ day.day }}</text>
          <view v-if="day.hasRecord" class="record-indicator">
            <text class="amount">¥{{ day.amount }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: Date,
    default: () => new Date(),
  },
  records: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emit = defineEmits(["update:modelValue", "change"]);

// 响应式数据
const currentDate = ref(new Date(props.modelValue));
const selectedDate = ref(new Date(props.modelValue));

// 当前月份文本
const currentMonthText = computed(() => {
  const months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  return `${currentDate.value.getFullYear()}年${
    months[currentDate.value.getMonth()]
  }`;
});

// 生成日历天数
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  // 当月第一天和最后一天
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 获取第一天是星期几 (调整为周一开始)
  let firstDayWeek = firstDay.getDay();
  firstDayWeek = firstDayWeek === 0 ? 6 : firstDayWeek - 1;

  const days = [];

  // 上个月的日期
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push(createDayObject(date, false));
  }

  // 当月日期
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    days.push(createDayObject(date, true));
  }

  // 下个月的日期（补齐42天）
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    days.push(createDayObject(date, false));
  }

  return days;
});

// 创建日期对象
function createDayObject(date, isCurrentMonth) {
  const today = new Date();
  const dateStr = formatDate(date);

  // 查找当天的记录
  const dayRecords = props.records.filter((record) => record.date === dateStr);
  const totalAmount = dayRecords.reduce(
    (sum, record) => sum + Math.abs(record.amount),
    0
  );

  return {
    key: `${date.getTime()}`,
    date: new Date(date),
    day: date.getDate(),
    isCurrentMonth,
    isToday: isSameDay(date, today),
    isSelected: isSameDay(date, selectedDate.value),
    hasRecord: dayRecords.length > 0,
    amount: totalAmount,
    records: dayRecords,
  };
}

// 格式化日期为字符串
function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

// 判断是否是同一天
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// 上一月
function prevMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

// 下一月
function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}

// 选择日期
function selectDate(day) {
  if (!day.isCurrentMonth) return;

  selectedDate.value = new Date(day.date);
  emit("update:modelValue", selectedDate.value);
  emit("change", {
    date: selectedDate.value,
    records: day.records,
  });
}

// 监听外部值变化
watch(
  () => props.modelValue,
  (newVal) => {
    selectedDate.value = new Date(newVal);
    currentDate.value = new Date(newVal.getFullYear(), newVal.getMonth(), 1);
  }
);
</script>

<style lang="scss" scoped>
.calendar-container {
  background: white;
  border-radius: 16rpx;
  margin: 24rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 0;
  margin-bottom: 24rpx;
}

.nav-btn {
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow {
  font-size: 32rpx;
  color: #666;
}

.month-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

.calendar-grid {
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8rpx;
    margin-bottom: 16rpx;

    .weekday {
      text-align: center;
      font-size: 24rpx;
      color: #999;
      padding: 16rpx 0;
    }
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8rpx;
  }
}

.day {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12rpx;
  cursor: pointer;
  transition: all 0.2s ease;

  &.other-month {
    .day-number {
      color: #ccc;
    }
  }

  &.today {
    background: #fff3e0;
    .day-number {
      color: #ff8a65;
      font-weight: 600;
    }
  }

  &.selected {
    background: #ff8a65;
    .day-number {
      color: white;
      font-weight: 600;
    }
  }

  &.has-record {
    &::after {
      content: "";
      position: absolute;
      bottom: 4rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 8rpx;
      height: 8rpx;
      border-radius: 50%;
      background: #ff8a65;
    }

    &.selected::after {
      background: rgba(255, 255, 255, 0.8);
    }
  }

  &:hover {
    background: #f5f5f5;
  }
}

.day-number {
  font-size: 28rpx;
  color: #333;
}

.record-indicator {
  position: absolute;
  top: 8rpx;
  right: 8rpx;

  .amount {
    font-size: 20rpx;
    color: #ff8a65;
    background: rgba(255, 138, 101, 0.1);
    padding: 2rpx 8rpx;
    border-radius: 8rpx;
  }
}
</style>
