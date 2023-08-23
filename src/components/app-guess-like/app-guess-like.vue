<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-13 20:12:43
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-21 17:06:30
 * @FilePath: \hello-uniapp\src\components\app-guess-like\app-guess-like.vue
 * @Description:猜你喜欢页面
-->
<script setup lang="ts">
import type { IGlobalGuessLike, IGlobalPageParams, LoadingStatus } from '@/types/global.d.ts'

const guessLikeLists = ref<IGlobalGuessLike[]>([])

const loadingStatus = ref<LoadingStatus>('more')

const params: Required<IGlobalPageParams> = reactive({
	page: 1,
	pageSize: 20
})

getGuessLikeData()

/**
 * 获取猜你喜欢数据
 */
async function getGuessLikeData() {
	if (loadingStatus.value == 'noMore') {
		uni.showToast({ icon: 'none', title: '没有更多数据了~' })
		return
	}
	loadingStatus.value = 'loading'
	const { result } = await getGlobalGuessLikeAPI(params)
	const { items, page: resultPage, pages } = result
	loadingStatus.value = resultPage >= pages ? 'noMore' : 'more'
	guessLikeLists.value = [...guessLikeLists.value, ...items]
	params.page++
}

/**
 * 重置页码以及数据
 */
async function refreshData() {
	params.page = 1
	params.pageSize = 20
	loadingStatus.value = 'more'
	guessLikeLists.value = []
	await getGuessLikeData()
}

defineExpose({
	refreshData,
	getGuessLikeData
})
</script>

<template>
	<view class="app-guess-like">
		<view center py-3>
			<image mode="aspectFill" w-3 h-3 src="@/static/images/bubble.png"></image>
			<view class="text-lg px-1 text-gray-600">猜你喜欢</view>
			<image mode="aspectFill" w-3 h-3 src="@/static/images/bubble.png"></image>
		</view>
		<view class="container flex flex-wrap justify-between">
			<app-shop-item-v1 :guess-like="guessLike" v-for="guessLike in guessLikeLists" :key="guessLike.id + Math.random()" />
		</view>
		<uni-load-more py-2 :status="loadingStatus" />
	</view>
</template>

<style scoped lang="scss"></style>
