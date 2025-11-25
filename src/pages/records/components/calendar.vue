<template>
  <div class="border-2 rounded-2xl overflow-hidden h-[600rpx] bg-white pt-2">
    <wd-calendar-view
      v-model="value"
      :first-day-of-week="1"
      @change="handleChange"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
const value = ref(Date.now());

function handleChange({ value }) {
  console.log(value);
}
</script>

<style scoped></style>
