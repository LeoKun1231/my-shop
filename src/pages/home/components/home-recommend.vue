<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-13 19:36:17
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-21 21:37:24
 * @FilePath: \hello-uniapp\src\pages\home\components\home-recommend.vue
 * @Description:首页热门推荐
-->
<script setup lang="ts">
import type { IHomeHotRecommend } from '@/types/user'

defineProps<{
	recommends: IHomeHotRecommend[]
}>()

function goToRecommend(index: number) {
	uni.navigateTo({
		url: `/pages/hot/hot?type=${index}`
	})
}
</script>

<template>
	<view class="home-recommend grid grid-cols-2 gap-2 bg-white py-3">
		<view v-for="(recommend, index) in recommends" :key="recommend.id" @click="goToRecommend(index + 1)">
			<view mb-1>
				<text text-lg font-bold ml-2 mr-3>{{ recommend.title }}</text>
				<text text-gray-400>{{ recommend.alt }}</text>
			</view>
			<view flex items-center justify-around>
				<image h-20 w-20 :src="pic" v-for="pic in recommend.pictures" :key="pic" />
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
