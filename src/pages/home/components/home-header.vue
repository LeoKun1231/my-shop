<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-12 20:23:36
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-19 10:43:00
 * @FilePath: \hello-uniapp\src\pages\home\components\home-header.vue
 * @Description: 
-->
<script setup lang="ts">
const { safeAreaTop } = useSystem()
</script>

<template>
	<view class="home-header" :style="{ paddingTop: safeAreaTop + 'px' }">
		<view class="flex items-center py-3 pl-6">
			<view class="text-white text-xl">坤坤商城</view>
			<view class="w-0.25 h-4 bg-white mx-2"></view>
			<view class="text-white text-xs">你值得放心</view>
		</view>
		<view class="center px-4 pb-3">
			<view class="h-6 w-full bg-orange-200 border-rounded-3 text-white text-xs between">
				<view class="center">
					<view class="i-carbon-search font-bold ml-3"></view>
					<view class="ml-1">搜索商品</view>
				</view>
				<view class="i-carbon-scan-alt mr-3"></view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
.home-header {
	background-color: $app-primary-color;
}
</style>
