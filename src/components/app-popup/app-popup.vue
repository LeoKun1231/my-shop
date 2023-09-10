<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-27 08:49:53
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-08 09:12:48
 * @FilePath: \hello-uniapp\src\components\app-popup\app-popup.vue
 * @Description: 
-->
<script setup lang="ts">
const popupRef = ref<UniHelper.UniPopupInstance>()

defineProps<{
	title?: string
}>()

function open() {
	popupRef.value?.open!()
}

function close() {
	popupRef.value?.close!()
}

defineExpose({
	open,
	close
})
</script>

<template>
	<uni-popup ref="popupRef" background-color="#fff" type="bottom">
		<view class="mx-3">
			<view class="center b-bottom py-3">
				<view class="w-10"></view>
				<view class="flex-1 text-center text-[#333]">{{ title }}</view>
				<view class="i-carbon-close w-10 text-gray text-lg" @click="close"></view>
			</view>
		</view>
		<view class="px-4 py-6">
			<slot></slot>
		</view>
	</uni-popup>
</template>

<style scoped lang="scss"></style>
