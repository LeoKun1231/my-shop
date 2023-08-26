<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-11 19:04:14
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-26 17:29:38
 * @FilePath: \hello-uniapp\src\pages\category\category.vue
 * @Description: 商品分类
-->
<script setup lang="ts">
import type { ICategoryResult } from '@/types/category'

uni.setNavigationBarTitle({ title: '商品分类' })
const isLoading = ref(false)
loadData()

async function loadData() {
	isLoading.value = true
	await Promise.all([getCategoryData(), getCategoryBanners()])
	isLoading.value = false
}

/**
 * 获取轮播图数据
 */
const banners = ref<string[]>([])
async function getCategoryBanners() {
	const { result } = await getGlobalBannersAPI(2)
	banners.value = result.map((item) => item.imgUrl)
}

/**
 * 获取分类数据
 */
const firstCatrgories = ref<string[]>([])
const currentIndex = ref(0)
const categoryData = ref<ICategoryResult[]>([])

/**
 *获取当前选项卡的数据
 */
const currentCategory = computed(() => {
	return categoryData.value[currentIndex.value]
})

async function getCategoryData() {
	const { result } = await getCategroyDataAPI()
	categoryData.value = result
	firstCatrgories.value = result.map((item) => item.name)
}
</script>

<template>
	<category-skeleton v-if="isLoading" />
	<template v-else>
		<uni-search-bar radius="100" readonly placeholder="女靴" />
		<view class="h-[calc(100%-56px)]">
			<app-category v-model="currentIndex" :categories="firstCatrgories">
				<view class="mx-2 h-full">
					<view class="rounded-3 overflow-hidden">
						<app-swiper height="8rem" :urls="banners" />
					</view>
					<view>
						<view v-for="item in currentCategory?.children" :key="item.id">
							<view class="between py-3 mb-2 border-b-1 border-b-solid border-b-[#f7f7f7]">
								<view>{{ item.name }}</view>
								<view class="text-gray-300 center text-xs">
									<view>全部</view>
									<view class="ml-[-0.1rem] w-[28rpx] h-[28rpx] i-carbon-chevron-right"></view>
								</view>
							</view>
							<view class="grid grid-cols-3 gap-4">
								<view v-for="good in item.goods.slice(0, 6)" :key="good.id">
									<image class="w-160rpx h-160rpx" mode="aspectFill" :src="good.picture"></image>
									<view class="line-clamp-2 text-sm py-0.5 text-[#333]"> {{ good.name }} </view>
									<view class="flex items-center text-sm text-[#f00]">
										<view class="symbol">¥</view>
										<view class="ml-0.25">{{ good.price }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</app-category>
		</view>
	</template>
</template>

<style lang="scss">
page {
	display: flex;
	height: 100%;
	overflow: hidden;
	flex-direction: column;
	:deep(.uni-searchbar__box) {
		justify-content: start;
	}
	image {
		will-change: transform;
	}
}
</style>
