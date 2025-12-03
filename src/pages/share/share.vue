<template>
	<view class="min-h-screen bg-[#FFF5F0] pb-[40rpx] flex flex-col">
		<!-- Custom Tabbar -->
		<view class="bg-[#FFF5F0] sticky top-0 z-50">
			<CustomTabbar :currentTab="currentTab" @change="handleTabChange" />
		</view>

		<!-- Square Content -->
		<view v-if="currentTab === 0" class="flex-1 px-[32rpx]">
			<SearchBar @search="handleSearch" class="mb-[24rpx]" />
			
			<CategoryTabs 
				:currentTab="currentCategory" 
				@change="handleCategoryChange" 
				class="mb-[24rpx]"
			/>

			<view class="pb-[120rpx]">
				<PostCard 
					v-for="(post, index) in posts" 
					:key="index" 
					:post="post" 
				/>
			</view>

			<!-- Floating Action Button -->
			<view 
				class="fixed bottom-[140rpx] right-[40rpx] w-[100rpx] h-[100rpx] bg-[#FFD8D8] rounded-full border-2 border-[#333] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
				@click="createPost">
				<text class="text-[60rpx] text-[#333] mb-[8rpx]">+</text>
			</view>
		</view>

		<!-- AI Assistant Content -->
		<view v-if="currentTab === 1" class="flex-1 px-[32rpx] flex flex-col h-[calc(100vh-180rpx)]">
			<!-- AI Intro Card -->
			<view class="bg-white rounded-[24rpx] p-[32rpx] mb-[32rpx] border-2 border-[#333] flex items-center">
				<view class="w-[100rpx] h-[100rpx] rounded-full bg-[#E6F7FF] flex items-center justify-center mr-[24rpx]">
					<text class="text-[60rpx]">🤖</text>
				</view>
				<view>
					<text class="text-[32rpx] font-bold text-[#333] block mb-[8rpx]">AI育儿助手</text>
					<text class="text-[24rpx] text-[#666]">24小时在线，为你解答育儿和理财问题</text>
				</view>
			</view>

			<!-- Chat Area -->
			<scroll-view scroll-y class="flex-1 mb-[32rpx]" :scroll-into-view="scrollIntoView">
				<view id="msg-list">
					<ChatMsgItem 
						v-for="(msg, index) in messages" 
						:key="index"
						v-bind="msg"
					/>
				</view>
			</scroll-view>

			<!-- FAQ Section -->
			<FAQSection @ask="handleAsk" />

			<!-- Input Area -->
			<view class="bg-white rounded-[44rpx] h-[88rpx] flex items-center px-[32rpx] border-2 border-[#333] mb-[20rpx]">
				<input 
					class="flex-1 text-[28rpx] text-[#333]" 
					placeholder="问AI育儿问题，如：宝宝挑食怎么办？" 
					placeholder-class="text-[#999]"
					v-model="inputText"
					@confirm="sendMessage"
				/>
				<view class="ml-[16rpx]" @click="sendMessage">
					<text class="iconfont icon-send text-[#333] text-[40rpx]">➤</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import CustomTabbar from './components/CustomTabbar.vue'
import SearchBar from './components/SearchBar.vue'
import CategoryTabs from './components/CategoryTabs.vue'
import PostCard from './components/PostCard.vue'
import ChatMsgItem from './components/ChatMsgItem.vue'
import FAQSection from './components/FAQSection.vue'

const currentTab = ref(0)
const currentCategory = ref(0)
const inputText = ref('')
const scrollIntoView = ref('')

// Mock Data for Square
const posts = ref([
	{
		username: '喵星人',
		avatar: '/static/home/形象1.png',
		tags: '布偶猫 | 呱呱',
		time: '刚刚',
		content: '布偶是一只仙女喵哦~🐾 💕💕布偶猫轻轻地走来，那优雅的姿态仿佛是一位绅士，让人无法抗拒它的可爱魅力。',
		images: [
			'/static/home/形象1.png',
			'/static/home/形象2.png',
			'/static/home/形象1.png'
		],
		shares: 2631,
		comments: 2631,
		likes: 2631
	},
	{
		username: '汪汪大队',
		avatar: '/static/home/形象2.png',
		tags: '金毛 | 呼呼',
		time: '12:30',
		content: '好喜欢我的呼呼~~ 事事有回应件件有着落的',
		images: [
			'/static/home/形象2.png',
			'/static/home/形象1.png',
			'/static/home/形象2.png'
		],
		shares: 2631,
		comments: 2631,
		likes: 2631
	}
])

// Mock Data for AI Chat
const messages = ref([
	{
		isUser: false,
		avatar: '/static/images/机器人.png',
		name: 'AI育儿助手',
		time: '09:00',
		content: '你好！我是AI育儿助手，很高兴为你服务。你可以问我任何关于育儿、教育和理财规划的问题。'
	},
	{
		isUser: true,
		avatar: '/static/home/个人 (1).png@3x.png',
		time: '09:00',
		content: '宝宝不爱吃饭怎么办？'
	}
])

const handleTabChange = (index) => {
	currentTab.value = index
}

const handleCategoryChange = (index) => {
	currentCategory.value = index
}

const handleSearch = (value) => {
	console.log('Search:', value)
}

const createPost = () => {
	uni.showToast({
		title: '发布功能开发中',
		icon: 'none'
	})
}

const handleAsk = (question) => {
	inputText.value = question
	sendMessage()
}

const sendMessage = () => {
	if (!inputText.value.trim()) return

	// Add user message
	messages.value.push({
		isUser: true,
		avatar: '/static/home/个人 (1).png@3x.png',
		time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
		content: inputText.value
	})

	const question = inputText.value
	inputText.value = ''
	
	// Scroll to bottom
	setTimeout(() => {
		scrollIntoView.value = 'msg-list'
	}, 100)

	// Simulate AI response
	setTimeout(() => {
		messages.value.push({
			isUser: false,
			avatar: '/static/images/机器人.png',
			name: 'AI育儿助手',
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			content: `关于"${question}"，建议您可以尝试以下方法...`
		})
		setTimeout(() => {
			scrollIntoView.value = 'msg-list'
		}, 100)
	}, 1000)
}
</script>

<style scoped lang="scss">
</style>
