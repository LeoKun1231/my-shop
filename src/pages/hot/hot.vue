<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-21 19:31:35
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-25 20:11:49
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

const titles = ref<string[]>([])
const bannerPic = ref<string>('')
const subTypes = ref<IHotSubType[]>([])
/**
 * 获取当前数据
 */
const isLoading = ref(true)
async function getHotData() {
	isLoading.value = true
	const { result } = await getHotDataAPI(currentHotRecommend!.url, {
		page: 1,
		pageSize: 10
	})
	bannerPic.value = result.bannerPicture
	titles.value = result.subTypes.map((item) => item.title)
	subTypes.value = result.subTypes
	isLoading.value = false
}
/**
 * 防止滚动到底部 发送太多请求
 */
const isRequestDone = ref(true) //判断请求是否结束
const loadingStatus = ref<LoadingStatus>('more')

/**
 * 下拉刷新
 */
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
	loadingStatus.value = 'more'
	isRequestDone.value = true
	const newCurrentSubTypesItem = result.subTypes[currentIndex.value]
	currentSubType.goodsItems.items.push(...newCurrentSubTypesItem.goodsItems.items)
}
</script>

<template>
	<hot-skeletion v-if="isLoading" />
	<view v-else class="hot">
		<view class="h-fit">
			<view class="rounded-bl-10 rounded-br-10 overflow-hidden">
				<image class="w-full h-30" :src="bannerPic"></image>
			</view>
			<view class="relative z-10 w-full center mt-[-2.5rem]">
				<app-tab v-model:current-index="currentIndex" :titles="titles" />
			</view>
		</view>

		<template v-for="(subType, index) in subTypes" :key="subType.id">
			<app-scroll-view
				class="flex-1 h-full overflow-hidden"
				v-show="currentIndex == index"
				:refresher-enabled="false"
				:scrolltolower="handleScrollToLower"
			>
				<view class="flex-wrap around">
					<app-shop-item-v1
						v-for="shop in subType?.goodsItems?.items"
						:guess-like="shop"
						:key="shop.id + Math.random()"
					/>
				</view>
				<app-load-more class="py-2" :status="loadingStatus" />
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
	background-color: #f4f4f4;
}
</style>
