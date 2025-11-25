<template>
  <!-- 简化的日历视图 -->
  <view class="border-card flex justify-center items-center space-between mb-4">
    <button class="nav-btn" @click="prevMonth">←</button>
    <text class="month-text">{{ currentMonthText }}</text>
    <button class="nav-btn" @click="nextMonth">→</button>
  </view>

  <!-- 收支统计卡片 -->
  <view class="stats-cards">
    <view class="stat-card expense-card">
      <text class="stat-amount">¥{{ monthlyStats.expense.toFixed(2) }}</text>
      <text class="stat-label">今日支出</text>
    </view>
    <view class="stat-card income-card">
      <text class="stat-amount">¥{{ monthlyStats.income.toFixed(2) }}</text>
      <text class="stat-label">今日收入</text>
    </view>
  </view>

  <!-- 本月开销分类 -->
  <view class="category-section">
    <view class="section-header">
      <text class="section-title">📊 本月开销分类</text>
    </view>

    <view class="category-list">
      <view
        v-for="category in categoryStats"
        :key="category.name"
        class="category-item"
      >
        <view class="category-info">
          <view
            class="category-indicator"
            :style="{ backgroundColor: category.color }"
          ></view>
          <text class="category-name">{{ category.name }}</text>
        </view>
        <view class="category-amount">
          <view class="amount-bar">
            <view
              class="amount-fill"
              :style="{
                width: `${(category.amount / maxCategoryAmount) * 100}%`,
                backgroundColor: category.color,
              }"
            ></view>
          </view>
          <text class="amount-text">¥{{ category.amount }}</text>
        </view>
      </view>
    </view>

    <!-- 月度统计 -->
    <view class="monthly-total">
      <view class="total-item">
        <text class="total-label">本月总计</text>
        <text class="total-amount">¥{{ monthlyStats.total.toFixed(2) }}</text>
      </view>
    </view>
  </view>

  <!-- 养娃开销和存款预测图表 -->
  <view class="prediction-section">
    <text class="section-title">📈 养娃开销与存款预测</text>
    <view class="chart-placeholder">
      <!-- 这里应该是图表组件，暂时用模拟数据 -->
      <view class="chart-legend">
        <view class="legend-item">
          <view class="legend-color expense-color"></view>
          <text class="legend-text">养娃开销</text>
        </view>
        <view class="legend-item">
          <view class="legend-color savings-color"></view>
          <text class="legend-text">养娃存款</text>
        </view>
      </view>
      <view class="chart-content">
        <text class="chart-placeholder-text">图表区域</text>
        <text class="chart-note">数据显示预测趋势</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useRecordsStore } from "@/store/records";
import { ref, computed, onMounted } from "vue";

const recordsStore = useRecordsStore();

// 响应式数据
const selectedDate = ref(new Date());

const monthlyStats = computed(() => recordsStore.getMonthlyStats);
const categoryStats = computed(() => recordsStore.categories.expense);

// 获取最大分类金额用于进度条计算
const maxCategoryAmount = computed(() => {
  return Math.max(...categoryStats.value.map((cat) => cat.amount), 1);
});

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
  return `${selectedDate.value.getFullYear()}年${
    months[selectedDate.value.getMonth()]
  }`;
});

function prevMonth() {
  const newDate = new Date(
    selectedDate.value.getFullYear(),
    selectedDate.value.getMonth() - 1,
    1
  );
  selectedDate.value = newDate;
  recordsStore.setSelectedDate(newDate);
}

function nextMonth() {
  const newDate = new Date(
    selectedDate.value.getFullYear(),
    selectedDate.value.getMonth() + 1,
    1
  );
  selectedDate.value = newDate;
  recordsStore.setSelectedDate(newDate);
}
</script>

<style scoped lang="scss">
.mini-calendar {
  background: white;
  border-radius: 16rpx;
  padding: 24rpx;

  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .nav-btn {
      background: #f5f5f5;
      border: none;
      border-radius: 50%;
      width: 64rpx;
      height: 64rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32rpx;
      color: #666;
    }

    .month-text {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
    }
  }
}

.stats-cards {
  display: flex;
  gap: 24rpx;
  margin: 0 24rpx 24rpx 24rpx;
}

.stat-card {
  flex: 1;
  background: white;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  text-align: center;

  .stat-amount {
    display: block;
    font-size: 48rpx;
    font-weight: 600;
    margin-bottom: 12rpx;
  }

  .stat-label {
    font-size: 24rpx;
    color: #999;
  }

  &.expense-card .stat-amount {
    color: #ff6b6b;
  }

  &.income-card .stat-amount {
    color: #4ecdc4;
  }
}

.category-section {
  background: white;
  margin: 0 24rpx 24rpx 24rpx;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
}

.section-header {
  margin-bottom: 24rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
  }
}

.category-list {
  .category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.category-info {
  display: flex;
  align-items: center;

  .category-indicator {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    margin-right: 16rpx;
  }

  .category-name {
    font-size: 28rpx;
    color: #333;
  }
}

.category-amount {
  display: flex;
  align-items: center;
  gap: 16rpx;

  .amount-bar {
    width: 120rpx;
    height: 8rpx;
    background: #f0f0f0;
    border-radius: 4rpx;
    overflow: hidden;

    .amount-fill {
      height: 100%;
      border-radius: 4rpx;
      transition: width 0.3s ease;
    }
  }

  .amount-text {
    font-size: 24rpx;
    color: #666;
    min-width: 80rpx;
    text-align: right;
  }
}

.monthly-total {
  margin-top: 32rpx;
  padding-top: 24rpx;
  border-top: 2rpx solid #f0f0f0;

  .total-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .total-label {
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
    }

    .total-amount {
      font-size: 32rpx;
      font-weight: 600;
      color: #ff6b6b;
    }
  }
}

.prediction-section {
  background: white;
  margin: 0 24rpx;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 24rpx;
    display: block;
  }
}

.chart-placeholder {
  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 32rpx;
    margin-bottom: 24rpx;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8rpx;

      .legend-color {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;

        &.expense-color {
          background: #ff6b6b;
        }

        &.savings-color {
          background: #4ecdc4;
        }
      }

      .legend-text {
        font-size: 24rpx;
        color: #666;
      }
    }
  }

  .chart-content {
    height: 300rpx;
    background: #f8f9fa;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .chart-placeholder-text {
      font-size: 28rpx;
      color: #999;
      margin-bottom: 16rpx;
    }

    .chart-note {
      font-size: 24rpx;
      color: #ccc;
    }
  }
}

.fab-container {
  position: fixed;
  bottom: 120rpx;
  right: 32rpx;
  z-index: 1000;
}

.fab {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8a65 0%, #ff7043 100%);
  border: none;
  box-shadow: 0 8rpx 24rpx rgba(255, 138, 101, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  .fab-icon {
    color: white;
    font-size: 48rpx;
    font-weight: 300;
  }
}
</style>
