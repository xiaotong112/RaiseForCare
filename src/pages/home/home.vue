<template>
  <view class="min-h-screen pb-[120rpx]">
    <!-- 头部问候 -->
    <view class="px-[32rpx] pt-[40rpx] pb-[24rpx]">
      <text class="text-[40rpx] font-bold text-[#333] block mb-[8rpx]"
        >嗨，宝爸宝妈</text
      >
      <text class="text-[28rpx] text-[#666]">今天也要为未来加油！</text>
    </view>

    <!-- 养娃开销卡片 -->
    <view class="mx-[32rpx] mb-[32rpx]">
      <BudgetCard
        :currentAmount="budgetData.currentAmount"
        :targetAmount="budgetData.targetAmount"
        :timeRemaining="budgetData.timeRemaining"
        :progressPercent="budgetData.progressPercent"
        @edit="handleEditBudget"
      />
    </view>

    <!-- 动态卡片列表 -->
    <view class="mx-[32rpx] rounded-[24rpx]">
      <!-- 孩子动态卡片 -->
      <view v-for="(child, index) in children" :key="index" class="mb-[24rpx]">
        <ChildCard
          :name="child.name"
          :age="child.age"
          :avatar="child.avatar"
          :description="child.description"
          :stage="child.stage"
          :daysLeft="child.daysLeft"
          :progress="child.progress"
          :progressClass="child.progressClass"
        />
      </view>

      <!-- 图表卡片 -->
      <ChartCard />
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import BudgetCard from "./components/BudgetCard.vue";
import ChildCard from "./components/ChildCard.vue";
import ChartCard from "./components/ChartCard.vue";

// 养娃开销数据
const budgetData = ref({
  currentAmount: "86,526.88",
  targetAmount: "86,526.88",
  timeRemaining: "距离退休还有一万年",
  progressPercent: 9,
});

// 孩子列表数据
const children = ref([
  {
    name: "火火",
    age: "3岁2个月",
    avatar: "/static/home/形象1.png",
    description: "人类幼崽初始版本，饿了哭、困了哭、无聊了也哭。",
    stage: "成长时期·幼儿期",
    daysLeft: 342,
    progress: 45,
    progressClass: "bg-[#4F57FF]",
  },
  {
    name: "火火",
    age: "3岁2个月",
    avatar: "/static/home/形象2.png",
    description: "说东偏往西，吃饭像打仗，变脸速度比川剧快。",
    stage: "成长时期·幼儿期",
    daysLeft: 342,
    progress: 60,
    progressClass: "bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6]",
  },
]);

// 编辑预算
const handleEditBudget = () => {
  console.log("编辑预算");
  // 跳转到编辑页面或打开弹窗
};
</script>

<style lang="scss" scoped></style>
