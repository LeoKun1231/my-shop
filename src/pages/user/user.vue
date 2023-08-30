<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-11 19:03:23
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-30 10:37:34
 * @FilePath: \hello-uniapp\src\pages\user\user.vue
 * @Description: 
-->
<script setup lang="ts">
const { appGuessLikeRef, getMore } = useAppGuessLike()
onReachBottom(() => {
	getMore()
})
</script>

<template>
	<user-header />
	<view class="mt-2 px-2">
		<app-guess-like ref="appGuessLikeRef" />
	</view>
</template>

<style scoped lang="scss"></style>
