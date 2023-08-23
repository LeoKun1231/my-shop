<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-21 19:31:35
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-23 20:10:25
 * @FilePath: \hello-uniapp\src\pages\hot\hot.vue
 * @Description: 
-->
<script setup lang="ts">
import type { LoadingStatus } from '@/types/global'
import type { IHotSubType } from '@/types/hot'

const query = defineProps<{
	type: string
}>()

const hotRecommendData = [
	{ type: '1', title: '特惠推荐', url: '/hot/preference' },
	{ type: '2', title: '爆款推荐', url: '/hot/inVogue' },
	{ type: '3', title: '一站买全', url: '/hot/oneStop' },
	{ type: '4', title: '新鲜好物', url: '/hot/new' }
]

const currentHotRecommend = hotRecommendData.find((item) => item.type == query.type)

//设置标题
uni.setNavigationBarTitle({ title: currentHotRecommend!.title })
const currentIndex = ref(0)

onLoad(() => {
	getHotData()
})

console.log(11, ',,,')

const titles = ref<string[]>([])
const bannerPic = ref<string>('')
const subTypes = ref<IHotSubType[]>([])
/**
 * 获取当前数据
 */
async function getHotData() {
	const { result } = await getHotDataAPI(currentHotRecommend!.url, {
		page: 1,
		pageSize: 10
	})
	bannerPic.value = result.bannerPicture
	titles.value = result.subTypes.map((item) => item.title)
	subTypes.value = result.subTypes
}
/**
 * 防止滚动到底部 发送太多请求
 */
const isRequestDone = ref(true) //判断请求是否结束
const loadingStatus = ref<LoadingStatus>('more')

async function handleScrollToLower() {
	const currentSubType = subTypes.value[currentIndex.value]
	if (!isRequestDone.value) return
	if (currentSubType.goodsItems.page >= currentSubType.goodsItems.pages) {
		loadingStatus.value = 'noMore'
		uni.showToast({ icon: 'none', title: '没有更多了~' })
		return
	}
	loadingStatus.value = 'loading'
	const { result } = await getHotDataAPI(currentHotRecommend!.url, {
		subType: currentSubType.id,
		page: currentSubType.goodsItems.page++,
		pageSize: currentSubType.goodsItems.pageSize
	})
	isRequestDone.value = true
	const newCurrentSubTypesItem = result.subTypes[currentIndex.value]
	currentSubType.goodsItems.items.push(...newCurrentSubTypesItem.goodsItems.items)
}
</script>

<template>
	<view class="hot">
		<view class="h-fit">
			<view class="rounded-bl-10 rounded-br-10">
				<image w-full h-30 :src="bannerPic"></image>
			</view>
			<view class="w-full center mt-[-1.5rem]">
				<app-tab v-model:current-index="currentIndex" :titles="titles" />
			</view>
		</view>

		<template v-for="(subType, index) in subTypes" :key="subType.id">
			<app-scroll-view v-show="currentIndex == index" :refresher-enabled="false" :scrolltolower="handleScrollToLower">
				<view class="flex flex-wrap items-center justify-around">
					<app-shop-item-v1 v-for="shop in subType?.goodsItems?.items" :guess-like="shop" :key="shop.id + Math.random()" />
				</view>
				<uni-load-more py-2 :status="loadingStatus" />
			</app-scroll-view>
		</template>
	</view>
</template>

<style lang="scss">
.hot {
	height: 100%;
	display: flex;
	flex-direction: column;
}
page {
	height: 100%;
	background-color: #f7f7f7;
}
</style>
