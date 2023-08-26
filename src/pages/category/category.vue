<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-11 19:04:14
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-25 20:38:11
 * @FilePath: \hello-uniapp\src\pages\category\category.vue
 * @Description: 
-->
<script setup lang="ts">
import type { ICategoryResult } from '@/types/category'

uni.setNavigationBarTitle({ title: '商品分类' })

loadData()

async function loadData() {
	await Promise.all([getCategoryData(), getCategoryBanners()])
}

const banners = ref<string[]>([])
async function getCategoryBanners() {
	const { result } = await getGlobalBannersAPI(2)
	banners.value = result.map((item) => item.imgUrl)
}

const firstCatrgories = ref<string[]>([])
const currentCategory = ref<ICategoryResult>()
const currentIndex = ref(0)
async function getCategoryData() {
	const { result } = await getCategroyDataAPI()
	firstCatrgories.value = result.map((item) => item.name)
	currentCategory.value = result[currentIndex.value]
}
</script>

<template>
	<uni-search-bar radius="100" readonly placeholder="女靴" />
	<app-category v-model="currentIndex" :categories="firstCatrgories">
		<view class="mx-2">
			<app-swiper class="h-30 rounded-2 overflow-hidden" :urls="banners" />
		</view>
	</app-category>
</template>

<style lang="scss">
page {
	--uno: flex h-full overflow-hidden flex-col;
	:deep(.uni-searchbar__box) {
		justify-content: start;
	}
}
</style>
