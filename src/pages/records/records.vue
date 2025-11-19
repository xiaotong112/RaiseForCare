<template>
  <view class="container gap-4">
    <wd-tabs v-model="tab">
      <block v-for="item in 4" :key="item">
        <wd-tab :title="`标签${item}`">
          <view class="content">内容{{ item }}</view>
        </wd-tab>
      </block>
    </wd-tabs>
    <calendar />

    <view class="border-card w-full">框测试</view>
    <button class="btn-primary w-full">按钮</button>
  </view>
</template>

<script setup>
import { ref } from "vue";
import calendar from "./components/calendar.vue";
const tab = ref(0);
</script>

<style lang="scss" scoped></style>
