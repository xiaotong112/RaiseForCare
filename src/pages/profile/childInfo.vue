<template>
	<view class="min-h-screen bg-[#FFF5F0] pb-[40rpx] px-[32rpx] pt-[20rpx]">
		<!-- 头部头像 -->
		<view class="flex flex-col items-center justify-center mb-[60rpx] pt-[40rpx]">
			<view class="relative">
				<view class="w-[200rpx] h-[200rpx] rounded-full bg-[#FFD8D8] flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
					<image src="/static/home/形象1.png" class="w-[160rpx] h-[160rpx]" mode="aspectFit" />
				</view>
				<view class="absolute bottom-0 right-0 w-[64rpx] h-[64rpx] bg-[#FF5733] rounded-full flex items-center justify-center border-4 border-white" @click="uploadAvatar">
					<text class="iconfont icon-edit text-white text-[32rpx]">✎</text>
				</view>
			</view>
		</view>

		<view class="bg-white rounded-[24rpx] p-[40rpx] mb-[40rpx]">
			<view class="mb-[40rpx] flex items-center gap-[24rpx]">
				<text class="text-[36rpx] font-bold text-[#333]">孩子信息</text>
				<view class="bg-[#FFF5F0] px-[16rpx] py-[4rpx] rounded-[8rpx]">
					<text class="text-[24rpx] text-[#FF5733]">当前阶段：幼儿期</text>
				</view>
			</view>

			<FormInput
				label="姓名"
				placeholder="林雨晴"
				v-model="form.name"
			/>

			<GenderRadio
				label="性别"
				v-model="form.gender"
			/>

			<DatePicker
				label="出生日期"
				placeholder="1997年12月24日"
				v-model="form.birthday"
			/>

			<view class="mb-[32rpx]">
				<text class="text-[28rpx] text-[#333] mb-[16rpx] block font-semibold">性格</text>
				<view class="flex flex-wrap gap-[24rpx]">
					<view v-for="(tag, index) in tags" :key="index" 
						class="px-[24rpx] py-[12rpx] rounded-[32rpx] bg-[#FFD8D8] text-[#333] text-[28rpx]">
						{{ tag }}
					</view>
					<view class="w-[80rpx] h-[60rpx] rounded-[32rpx] border-2 border-[#999] flex items-center justify-center" @click="addTag">
						<text class="text-[32rpx] text-[#999]">+</text>
					</view>
				</view>
			</view>

			<view class="mb-[32rpx]">
				<text class="text-[28rpx] text-[#333] mb-[16rpx] block font-semibold">上传照片</text>
				<view class="flex gap-[24rpx] overflow-x-auto pb-[20rpx]">
					<view v-for="(photo, index) in photos" :key="index" class="flex-shrink-0 w-[160rpx] h-[160rpx] rounded-[16rpx] overflow-hidden relative">
						<image :src="photo" class="w-full h-full" mode="aspectFill" />
					</view>
					<view class="flex-shrink-0 w-[160rpx] h-[160rpx] rounded-[16rpx] border-2 border-[#999] flex items-center justify-center" @click="uploadPhoto">
						<text class="text-[60rpx] text-[#999]">+</text>
					</view>
				</view>
			</view>
		</view>

		<view class="flex justify-between gap-[32rpx] mt-[60rpx]">
			<button class="flex-1 h-[88rpx] bg-[#FFF5F0] rounded-[44rpx] text-[#FF5733] text-[32rpx] font-semibold flex items-center justify-center border-none" @click="cancel">
				取消
			</button>
			<button class="flex-1 h-[88rpx] bg-[#FF5733] rounded-[44rpx] text-white text-[32rpx] font-semibold flex items-center justify-center border-none" @click="save">
				保存
			</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import FormInput from './components/FormInput.vue'
import GenderRadio from './components/GenderRadio.vue'
import DatePicker from './components/DatePicker.vue'

const form = ref({
	name: '林雨晴',
	gender: 'female',
	birthday: '1997-12-24'
})

const tags = ref(['活泼', '可爱', '傲娇'])
const photos = ref([
	'/static/home/形象1.png',
	'/static/home/形象2.png',
	'/static/home/形象1.png'
])

const uploadAvatar = () => {
	uni.chooseImage({
		count: 1,
		success: (res) => {
			console.log('Upload avatar', res)
		}
	})
}

const addTag = () => {
	// 实际场景可能弹窗输入
	tags.value.push('新性格')
}

const uploadPhoto = () => {
	uni.chooseImage({
		count: 1,
		success: (res) => {
			console.log('Upload photo', res)
			photos.value.push(res.tempFilePaths[0])
		}
	})
}

const cancel = () => {
	uni.navigateBack()
}

const save = () => {
	uni.showToast({
		title: '保存成功',
		icon: 'success'
	})
	setTimeout(() => {
		uni.navigateBack()
	}, 1500)
}
</script>

<style scoped lang="scss">
button::after {
	border: none;
}
</style>
