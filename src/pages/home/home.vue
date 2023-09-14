<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-11 18:59:32
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-14 10:32:46
 * @FilePath: \hello-uniapp\src\pages\home\home.vue
 * @Description: 首页
-->
<script setup lang="ts">
import type { IHomeCategory, IHomeHotRecommend } from '@/types/home'
const isLoading = ref(false)

const { appGuessLikeRef, getMore, refreshData } = useAppGuessLike()

loadData()

/**
 * 同步发送请求
 * @param fn
 */
async function loadData(fn?: () => Promise<void>) {
	isLoading.value = true
	await Promise.all([getBannerData(), getCategoryData(), getRecommendData(), fn && fn()])
	isLoading.value = false
}

/**
 * 下拉刷新
 */
const isRefresh = ref<boolean>(false)
const handleRefresh = async () => {
	isRefresh.value = true
	await loadData(refreshData())
	isRefresh.value = false
}

/**
 * 上拉加载
 */
const handleScrollToLower = () => {
	getMore()
}

/**
 * 获取轮播图数据
 */
const bannerURLs = ref<string[]>([])
async function getBannerData() {
	const { result } = await getGlobalBannersAPI()
	bannerURLs.value = result.map((item) => item.imgUrl)
}

/**
 * 获取分类数据
 */
const categories = ref<IHomeCategory[]>([])
async function getCategoryData() {
	const { result } = await getHomeCategoryAPI()
	categories.value = result
}
/**
 * 获取热门推荐数据
 */
const recommends = ref<IHomeHotRecommend[]>([])
async function getRecommendData() {
	const { result } = await getHomeHotRecommendAPI()
	recommends.value = result
}
</script>

<template>
	<home-header />
	<home-skeleton v-if="isLoading" />
	<app-scroll-view
		class="home-app-scroll-view flex-1 overflow-hidden"
		v-else
		:refresher-triggered="isRefresh"
		:refresherrefresh="handleRefresh"
		:scrolltolower="handleScrollToLower"
	>
		<app-swiper id="appSwiper" :urls="bannerURLs" />
		<view class="mx-2">
			<home-category :categories="categories" />
			<home-recommend :recommends="recommends" />
			<app-guess-like ref="appGuessLikeRef" />
		</view>
	</app-scroll-view>
</template>
<style lang="scss">
/* #ifdef APP-PLUS */
app,
/* #endif */
page {
	height: 100%;
	background-color: #f4f4f4;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.home-app-scroll-view {
	/* #ifdef APP-PLUS */
	height: calc(100% - 206rpx);
	/* #endif */
	/* #ifndef APP-PLUS */
	height: 100%;
	/* #endif */
}
</style>
