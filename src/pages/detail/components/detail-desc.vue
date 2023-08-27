<script setup lang="ts">
import type { IDetailsPropertyItem } from '@/types/detail'

defineProps<{
	desc: IDetailsPropertyItem[]
	pictures: string[]
}>()
</script>

<template>
	<view class="mt-3 bg-white px-3 py-4">
		<view class="px-1 mb-3 border-l-3 border-l-solid border-l-[#fbb957]">详情</view>
		<view
			class="grid grid-cols-4 gap-2 py-2 font-thin text-[#000] text-sm border-b-1 border-b-dashed border-b-gray-300"
			v-for="item in desc"
			:key="item.name"
		>
			<view classs="px-1">{{ item.name }}</view>
			<view class="col-span-3">{{ item.value }}</view>
		</view>
	</view>
	<image class="w-full" v-for="pic in pictures" :key="pic" :src="pic" mode="widthFix" />
</template>

<style scoped lang="scss"></style>
