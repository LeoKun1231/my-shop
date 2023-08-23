<script setup lang="ts">
defineProps<{
	currentIndex: number
	titles: string[]
}>()

const emits = defineEmits<{
	(e: 'update:currentIndex', value: number): void
}>()

const handleTabClick = (index: number) => {
	emits('update:currentIndex', index)
}
</script>

<template>
	<view class="bg-white shadow-lg w-[720rpx] h-12 center rounded-2 mb-3">
		<view
			v-for="(item, index) in titles"
			:key="item"
			class="flex-1 center text mb-1"
			:class="{ active: currentIndex == index }"
			@click="handleTabClick(index)"
		>
			{{ item }}
		</view>
	</view>
</template>

<style scoped lang="scss">
.text {
	position: relative;
}
.active {
	&::after {
		content: ' ';
		position: absolute;
		background-color: $app-primary-color;
		width: 60rpx;
		height: 6rpx;
		left: 50%;
		transform: translate(-50%);
		bottom: -14rpx;
	}
}
</style>
