<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-21 17:00:04
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-26 10:59:55
 * @FilePath: \hello-uniapp\src\components\app-shop-item-v1\app-shop-item-v1.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IGlobalGuessLike } from '@/types/global'

const props = defineProps<{
	guessLike: IGlobalGuessLike
}>()

const handleGoToDetail = () => {
	uni.navigateTo({
		url: '/pages/detail/detail?id=' + props.guessLike.id
	})
}
</script>

<template>
	<view class="w-40vw bg-white p-3 mb-2 rounded-3 shadow-md" @click="handleGoToDetail">
		<image class="rounded-3 w-full h-42" mode="aspectFill" :src="guessLike.picture" />
		<view class="line-clamp-1 my-1 text-dark-100">{{ guessLike.name }}</view>
		<!-- 在scroll-view中 view里面嵌套text 添加新数据会导致scroll-view 重回顶部 -->
		<view class="flex items-center">
			<view class="text-[#f00]">¥</view>
			<view class="text-[#f00] ml-0.25 font-blod">{{ guessLike.price }}</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
