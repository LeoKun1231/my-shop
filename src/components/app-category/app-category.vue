<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-24 16:09:18
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-25 18:54:37
 * @FilePath: \hello-uniapp\src\components\app-category\app-category.vue
 * @Description: 
-->
<script setup lang="ts">
const props = defineProps<{
	modelValue: number
	categories: string[]
}>()

const emits = defineEmits<{
	(e: 'update:modelValue', value: number): void
}>()

const currentIndex = ref(props.modelValue)
const onChange = (index: number) => {
	currentIndex.value = index
	emits('update:modelValue', index)
}
</script>

<template>
	<view class="category h-[calc(100vh-56px)] flex flex-1">
		<view class="h-full bg-[#f6f6f6]">
			<scroll-view class="h-full" scroll-y :show-scrollbar="false">
				<view
					class="px-4 py-2"
					:class="{ active: currentIndex == index }"
					v-for="(category, index) in categories"
					:key="category"
					@click="onChange(index)"
				>
					<view class="text px-3 py-2 border-b-1 border-b-solid border-b-[#e2e2e2] text-black"> {{ category }} </view>
				</view>
			</scroll-view>
		</view>
		<view class="flex-1">
			<slot></slot>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.category {
	:deep(.uni-scroll-view) {
		&::-webkit-scrollbar {
			display: none !important;
		}
	}
}
.active {
	position: relative;
	background-color: white;
	&::before {
		position: absolute;
		content: '';
		width: 0.25rem;
		height: 100%;
		left: 0;
		top: 0;
		display: inline-block;
		background-color: $app-primary-color;
	}
	& > .text {
		border-bottom: 1px solid transparent;
	}
}
</style>
