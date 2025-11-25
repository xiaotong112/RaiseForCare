<template>
  <view class="container gap-2">
    <!-- Tab切换 -->
    <view class="w-full flex gap-8">
      <view
        class="border-2 p-2 flex-1 text-center rounded-lg"
        :class="{ active: currentTab === 'records' }"
        @click="switchTab('records')"
      >
        记录
      </view>
      <view
        class="border-2 p-2 flex-1 text-center rounded-lg"
        :class="{ active: currentTab === 'statistics' }"
        @click="switchTab('statistics')"
      >
        统计
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="w-full">
      <!-- 记录Tab内容 -->
      <view v-if="currentTab === 'records'" class="records-content">
        <!-- 日历 -->
        <SimpleCalendar
          v-model="selectedDate"
          :records="records"
          @change="handleDateChange"
        />

        <!-- 当日记录列表 -->
        <view class="w-full mt-4">
          <view
            v-for="record in todayRecords"
            :key="record.id"
            class="border-card p-4 mb-4 flex justify-between items-center"
            :style="{ borderLeftColor: record.color }"
          >
            <view class="flex flex-col gap-2">
              <text class="">{{ record.category }}</text>
              <text class="text-gray text-sm">{{ record.time }}</text>
            </view>
            <text class="record-amount">¥{{ Math.abs(record.amount) }}</text>
          </view>

          <!-- 空状态 -->
          <view v-if="todayRecords.length === 0" class="empty-state">
            <text class="empty-text">今日暂无记录</text>
          </view>
        </view>
      </view>

      <!-- 统计Tab内容 -->
      <view v-else class="statistics-content">
        <StatisticsContrent />
      </view>
    </view>

    <!-- 添加记录按钮 -->
    <view
      class="fixed bottom-[140rpx] right-[40rpx] w-[100rpx] h-[100rpx] bg-[#FFD8D8] rounded-full border-2 border-[#333] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
      @click="addRecord"
    >
      <text class="text-[60rpx] text-[#333] mb-[8rpx]">+</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import SimpleCalendar from "./components/SimpleCalendar.vue";
import { useRecordsStore } from "@/store/records";
import StatisticsContrent from "./components/StatisticsContent.vue";

// 使用记录store
const recordsStore = useRecordsStore();

// 响应式数据
const currentTab = ref("records");
const selectedDate = ref(new Date());

// 计算属性
const records = computed(() => recordsStore.records);
const todayRecords = [
  // 示例数据
  {
    id: 1,
    date: "2024-08-08",
    time: "08:00",
    category: "刷牙",
    amount: -300,
    type: "expense",
    color: "#FFD700",
  },
  {
    id: 2,
    date: "2024-08-08",
    time: "08:20",
    category: "泡奶粉",
    amount: -300,
    type: "expense",
    color: "#FFD700",
  },
  {
    id: 3,
    date: "2024-08-08",
    time: "11:00",
    category: "更换新的尿不湿",
    amount: -300,
    type: "expense",
    color: "#FF6B6B",
  },
  {
    id: 4,
    date: "2024-08-08",
    time: "16:30",
    category: "出门带大人去医院体检",
    amount: -300,
    type: "expense",
    color: "#9B59B6",
  },
  {
    id: 5,
    date: "2024-08-08",
    time: "18:00",
    category: "给火火背准甲",
    amount: -300,
    type: "expense",
    color: "#3498DB",
  },
];

// 方法
function switchTab(tab) {
  currentTab.value = tab;
  recordsStore.setCurrentTab(tab);
}

function handleDateChange(data) {
  selectedDate.value = data.date;
  recordsStore.setSelectedDate(data.date);
}

function addRecord() {
  // 这里应该打开添加记录的弹窗或页面
  console.log("添加记录");
  uni.showToast({
    title: "功能开发中",
    icon: "none",
  });
}

// 生命周期
onMounted(() => {
  recordsStore.setSelectedDate(selectedDate.value);
  recordsStore.loadRecords();
});
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
}

.empty-state {
  text-align: center;
  padding: 80rpx 24rpx;

  .empty-text {
    color: #999;
    font-size: 28rpx;
  }
}
</style>
