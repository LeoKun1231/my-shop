<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-30 17:42:49
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-02 12:04:42
 * @FilePath: \hello-uniapp\src\sub-pages\setting\setting.vue
 * @Description: 设置页
-->
<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

/**
 * 去登录页
 */
const goToLogin = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	})
}

/**
 * 退出登录
 */
const handleLogout = () => {
	uni.showModal({
		content: '确定退出登录吗？',
		confirmColor: '#fbb957',
		success: (res) => {
			if (res.confirm) {
				user.value = undefined
				uni.showToast({
					title: '退出登录成功',
					icon: 'none',
					complete: () => {
						uni.navigateBack()
					}
				})
			}
		}
	})
}

/**
 * 前往地址页
 */
const handleGoToAddress = () => {
	uni.navigateTo({
		url: '/sub-pages/address/address'
	})
}
</script>

<template>
	<view class="setting p-3 text-[#666]">
		<view v-if="user" class="mb-3 rounded-2 bg-white between px-3 py-3.5" @click="handleGoToAddress">
			<view>我的收获地址</view>
			<view class="bg-[#999] text-lg i-carbon-chevron-right"></view>
		</view>

		<view class="rounded-2 mb-3 overflow-hidden px-3 bg-white">
			<view class="b-bottom border-b-[#ddd] between py-3.5">
				<view>授权管理</view>
				<view class="bg-[#999] text-lg i-carbon-chevron-right"></view>
			</view>
			<view class="b-bottom border-b-[#ddd] between py-3.5">
				<view>问题反馈</view>
				<view class="bg-[#999] text-lg i-carbon-chevron-right"></view>
			</view>
			<view class="between py-3.5">
				<view>联系我们</view>
				<view class="bg-[#999] text-lg i-carbon-chevron-right"></view>
			</view>
		</view>
		<view class="mb-6 rounded-2 bg-white between px-3 py-3.5">
			<view>关于坤坤商城</view>
			<view class="bg-[#999] text-lg i-carbon-chevron-right"></view>
		</view>
		<view v-if="user" class="rounded-2 bg-white px-3 py-3.5 text-center" @click="handleLogout"> 退出登录 </view>
		<view v-else class="rounded-2 bg-white px-3 py-3.5 text-center" @click="goToLogin"> 立即登录 </view>
	</view>
</template>

<style lang="scss">
page {
	background-color: #f4f4f4;
	view {
		box-sizing: border-box;
	}
}
</style>
