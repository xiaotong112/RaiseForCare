<template>
	<view class="min-h-screen bg-[#FFF5F0] pb-[40rpx] px-[32rpx] pt-[20rpx]">
		<!-- 头部头像 -->
		<view class="flex flex-col items-center justify-center mb-[60rpx] pt-[40rpx]">
			<view class="relative">
				<view class="w-[200rpx] h-[200rpx] rounded-full bg-[#FFD8D8] flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
					<image src="/static/home/个人 (1).png@3x.png" class="w-[160rpx] h-[160rpx]" mode="aspectFit" />
				</view>
				<view class="absolute bottom-0 right-0 w-[64rpx] h-[64rpx] bg-[#FF5733] rounded-full flex items-center justify-center border-4 border-white" @click="uploadAvatar">
					<text class="iconfont icon-edit text-white text-[32rpx]">✎</text>
				</view>
			</view>
		</view>

		<view class="bg-white rounded-[24rpx] p-[40rpx] mb-[40rpx]">
			<view class="mb-[40rpx]">
				<text class="text-[36rpx] font-bold text-[#333]">个人信息</text>
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

			<view class="flex justify-between gap-[24rpx]">
				<view class="flex-1">
					<FormInput
						label="存款余额"
						placeholder="¥ 94,136,567"
						type="number"
						v-model="form.savings"
					/>
				</view>
				<view class="flex-1">
					<FormInput
						label="退休目标"
						placeholder="¥ 594,136,567"
						type="number"
						v-model="form.targetRetirement"
					/>
				</view>
			</view>

			<view class="flex justify-between gap-[24rpx]">
				<view class="flex-1">
					<DatePicker
						label="出生日期"
						placeholder="1997年12月24日"
						v-model="form.birthday"
					/>
				</view>
				<view class="flex-1">
					<DatePicker
						label="退休日期"
						placeholder="2057年12月24日"
						v-model="form.retireDate"
					/>
				</view>
			</view>

			<FormInput
				label="月净收入"
				placeholder="¥ 每月可支配收入（元）"
				type="number"
				v-model="form.monthlyIncome"
				containerClass="mb-0"
			/>
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
	savings: '94136567',
	targetRetirement: '594136567',
	birthday: '1997-12-24',
	retireDate: '2057-12-24',
	monthlyIncome: ''
})

const uploadAvatar = () => {
	uni.chooseImage({
		count: 1,
		success: (res) => {
			console.log('Upload avatar', res)
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
