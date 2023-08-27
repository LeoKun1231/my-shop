<script setup lang="ts">
import type { IGlobalGuessLike } from '@/types/global'

defineProps<{
	goods: IGlobalGuessLike[]
}>()
</script>

<template>
	<view class="mt-3 bg-white px-3 py-4">
		<view class="px-1 border-l-3 border-l-solid border-l-[#fbb957]">详情</view>
	</view>
	<view class="around flex-wrap w-full py-3">
		<app-shop-item-v1 v-for="good in goods" :key="good.id" :guess-like="good" />
	</view>
</template>

<style scoped lang="scss"></style>
