<script setup lang="ts">
import type { IHomeCategory } from '@/types/user'
defineProps<{
	categories: IHomeCategory[]
}>()
</script>

<template>
	<view class="home-category grid grid-cols-5 gap-2 my-4">
		<view flex flex-col justify-center items-center v-for="category in categories" :key="category.id">
			<image w-12 h-12 :src="category.icon" />
			<view text-gray>{{ category.name }}</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
