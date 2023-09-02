<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-27 17:47:15
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-02 20:24:57
 * @FilePath: \hello-uniapp\src\pages\login\login.vue
 * @Description: 
-->
<script setup lang="ts">
const handleWeixinLogin = () => {
	uni.showToast({
		title: '暂未开放',
		icon: 'none'
	})
}
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const handleMockLogin = async () => {
	//18600000000
	const res = await postLoginAPI('13123456789')
	user.value = res.result
	uni.showToast({
		title: '登录成功',
		icon: 'success',
		complete: () => {
			uni.switchTab({
				url: '/pages/home/home'
			})
		}
	})
}
</script>

<template>
	<view class="center flex-col">
		<view class="mt-20vh">
			<image class="w-40" mode="widthFix" src="@/static/images/logo.png" />
		</view>
		<view class="mt-10vh w-92% bg-[#fbb957] center py-3 rounded-full text-[#fff] font-bold" @click="handleWeixinLogin">
			<view class="i-carbon-mobile w-[16px] h-[16px]"></view>
			<view class="ml-1">手机号快捷登录</view>
		</view>
		<view class="center mt-4vh">
			<view class="h-1px w-20 bg-[#eee]"></view>
			<view class="text-[#999] text-xs"> 其他方式登录 </view>
			<view class="h-1px w-20 bg-[#eee]"></view>
		</view>
		<view class="mt-2vh h-10 w-10 border-solid border-[#999] border-1 rounded-full center" @click="handleMockLogin">
			<view class="i-carbon-mobile text-xl text-[#999]"></view>
		</view>
		<view class="text-xs text-[#999] mt-1vh text-center">模拟登录</view>
		<view class="absolute left-0 right-0 bottom-10 text-xs text-[#999] text-center">
			登录/注册即视为你同意《服务条款》和《坤坤商城隐私协议》
		</view>
	</view>
</template>

<style lang="scss">
page {
	background-color: white;
}
</style>
