<template>
	<view class="min-h-screen bg-[#FFF5F0] pb-[40rpx]">
		<!-- 头部导航 -->
		<view class="relative flex items-center justify-center h-[88rpx] bg-white">
			<text v-if="currentStep > 0" class="absolute left-[32rpx] text-[28rpx] text-[#666]" @click="prevStep">
				返回
			</text>
			<text class="text-[32rpx] font-semibold text-[#333]">完善家庭信息</text>
			<text v-if="currentStep < 3" class="absolute right-[32rpx] text-[28rpx] text-[#666]" @click="nextStep">
				跳过
			</text>
			<text v-else class="absolute right-[32rpx] text-[28rpx] text-primary" @click="complete">
				完成
			</text>
		</view>

		<!-- 表单容器 -->
		<view class="px-[32rpx] pt-[40rpx]">
			<!-- 个人信息表单 -->
			<view v-if="currentStep === 0" class="bg-white rounded-[24rpx] p-[40rpx]">
				<FormHeader 
					icon="/static/home/个人 (1).png@3x.png"
					title="个人信息"
					description="帮助我们更好的了解您"
				/>

				<FormInput
					label="姓名"
					placeholder="小林"
					v-model="personalInfo.nickname"
				/>

				<GenderRadio
					label="性别"
					v-model="personalInfo.gender"
				/>

				<DatePicker
					label="出生日期"
					placeholder="1997年12月24日"
					v-model="personalInfo.birthday"
				/>

				<DatePicker
					label="退休日期"
					placeholder="2025年10月23日"
					v-model="personalInfo.retireDate"
					containerClass=""
				/>
			</view>

			<!-- 财务信息表单 -->
			<view v-if="currentStep === 1" class="bg-white rounded-[24rpx] p-[40rpx]">
				<FormHeader 
					icon="/static/home/财务信息.png@3x.png"
					title="财务信息"
					description="帮助我们更好的为您规划养娃和防老"
				/>

				<FormInput
					label="月净收入"
					placeholder="¥ 每月可支配收入（元）"
					type="number"
					v-model="financialInfo.monthlyIncome"
				/>

				<FormInput
					label="存款金额"
					placeholder="¥ 当前存款总额（元）"
					type="number"
					v-model="financialInfo.savings"
				/>

				<FormInput
					label="目标退休金额"
					placeholder="¥ 期望退休时存款（元）"
					type="number"
					v-model="financialInfo.targetRetirement"
					containerClass=""
				/>
			</view>

			<!-- 孩子信息表单 -->
			<view v-if="currentStep === 2" class="bg-white rounded-[24rpx] p-[40rpx]">
				<FormHeader 
					icon="/static/home/爬行的婴儿.png@3x.png"
					title="孩子信息"
					description="记录孩子的成长点滴"
				/>

				<FormInput
					label="孩子姓名"
					placeholder="请输入孩子姓名"
					v-model="childInfo.name"
				/>

				<AvatarSelector
					label="选择宝宝形象"
					v-model="childInfo.avatar"
					@upload="uploadAvatar"
				/>
			</view>

			<!-- 邀请伴侣表单 -->
			<view v-if="currentStep === 3" class="bg-white rounded-[24rpx] p-[40rpx]">
				<FormHeader 
					icon="/static/home/伴侣.png@3x.png"
					title="邀请伴侣"
					description="共同管理家庭，一起规划未来"
				/>

				<FormInput
					label="伴侣邮箱/手机号"
					placeholder="输入伴侣的联系方式"
					v-model="partnerInfo.contact"
					containerClass="mb-[40rpx]"
				/>

				<button class="w-full h-[88rpx] bg-primary rounded-[44rpx] text-white text-[32rpx] font-semibold flex items-center justify-center mb-[24rpx]"
					@click="sendInvite">
					发送邀请
				</button>

				<view class="text-center">
					<text class="text-[28rpx] text-[#999]">完成收集跳入首页</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import FormHeader from './components/FormHeader.vue'
import FormInput from './components/FormInput.vue'
import GenderRadio from './components/GenderRadio.vue'
import DatePicker from './components/DatePicker.vue'
import AvatarSelector from './components/AvatarSelector.vue'

const currentStep = ref(0)

// 个人信息
const personalInfo = ref({
	nickname: '',
	gender: 'male',
	birthday: '',
	retireDate: ''
})

// 财务信息
const financialInfo = ref({
	monthlyIncome: '',
	savings: '',
	targetRetirement: ''
})

// 孩子信息
const childInfo = ref({
	name: '',
	avatar: ''
})

// 伴侣信息
const partnerInfo = ref({
	contact: ''
})

const prevStep = () => {
	if (currentStep.value > 0) {
		currentStep.value--
	}
}

const nextStep = () => {
	if (currentStep.value < 3) {
		currentStep.value++
	}
}

const uploadAvatar = () => {
	uni.chooseImage({
		count: 1,
		sizeType: ['compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			console.log('上传头像', res)
			// 这里处理图片上传逻辑
		}
	})
}

const sendInvite = () => {
	console.log('发送邀请', partnerInfo.value.contact)
	uni.showToast({
		title: '邀请已发送',
		icon: 'success'
	})
}

const complete = () => {
	// 完成后跳转到首页
	uni.switchTab({
		url: '/pages/home/home'
	})
}
</script>

<style scoped lang="scss">
button::after {
	border: none;
}
</style>