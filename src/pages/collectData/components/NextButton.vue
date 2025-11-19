<template>
    <button 
        class="flex justify-center items-center text-white w-full mt-[36rpx] text-center"
        :class="`${bgClass} ${roundedClass} ${heightClass} ${textSizeClass}`"
        :style="{ backgroundColor: bgColor }"
        @touchstart="isHovered = true"
        @touchend="isHovered = false"
        @click="$emit('click')"
    >
        {{ text }}
    </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    text: {
        type: String,
        default: '下一步'
    },
    bgClass: {
        type: String,
        default: 'bg-primary'
    },
    roundedClass: {
        type: String,
        default: 'rounded-[24rpx]'
    },
    heightClass: {
        type: String,
        default: 'h-[88rpx]'
    },
    textSizeClass: {
        type: String,
        default: 'text-[28rpx]'
    }
})

const isHovered = ref(false)

defineEmits(['click'])
</script>