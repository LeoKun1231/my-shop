<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-31 11:21:02
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-02 20:14:32
 * @FilePath: \hello-uniapp\src\components\app-form-item\app-form-item.vue
 * @Description: 
-->

<script setup lang="ts">
defineProps<{
	label: string
}>()
</script>

<!-- uniapp转微信小程序端会多一层view，所以需要设置virtualHost为true -->
<script lang="ts">
export default {
	options: {
		virtualHost: true
	}
}
</script>

<template>
	<view class="flex items-center mx-3 py-5 b-bottom border-b-[#ddd]">
		<view class="w-24 ml-2 text-[#333] text-sm">{{ label }}</view>
		<view class="flex-1">
			<slot></slot>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
