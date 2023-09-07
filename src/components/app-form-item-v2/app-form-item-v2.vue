<script setup lang="ts">
defineProps<{
	label: string
}>()
</script>

<template>
	<view class="p-3 between text-sm">
		<view class="w-fit">{{ label }}</view>
		<view class="flex-1 text-right">
			<slot></slot>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
