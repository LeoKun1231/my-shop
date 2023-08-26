<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-13 18:08:41
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-26 11:01:13
 * @FilePath: \hello-uniapp\src\pages\home\components\home-category.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IHomeCategory } from '@/types/home'
defineProps<{
	categories: IHomeCategory[]
}>()
</script>

<template>
	<view class="home-category grid grid-cols-5 gap-2 my-4">
		<view class="flex-col center" v-for="category in categories" :key="category.id">
			<image class="w-12 h-12" :src="category.icon" />
			<view class="text-gray">{{ category.name }}</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
@/types/home
