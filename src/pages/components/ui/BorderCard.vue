<template>
  <view class="card">
    <slot></slot>
  </view>
</template>

<script setup></script>

<style scoped>
.card {
  border: 2px solid #34d399; /* Tailwind's emerald-400 color */
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}
</style>
