<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-26 17:43:24
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-06 10:43:31
 * @FilePath: \hello-uniapp\src\pages\detail\detail.vue
 * @Description: 商品详情
-->
<script setup lang="ts">
import type { IDetailGoodResult } from '@/types/detail'

const props = defineProps<{
	id: string
}>()

getGoodDetailData(props.id)

const detailData = ref<IDetailGoodResult>()

async function getGoodDetailData(id: string) {
	const { result } = await getDetailAPI(id)
	console.log(result, 'result')
	detailData.value = result
}
</script>

<template>
	<view class="h-[calc(100vh-50px)] overflow-hidden" v-if="detailData">
		<app-scroll-view class="h-full" :refresher-enabled="false" :padding-bottom="50">
			<detail-swiper :urls="detailData?.mainPictures" />
			<detail-content :goods="detailData" />
			<detail-desc :desc="detailData?.details?.properties" :pictures="detailData?.details?.pictures" />
			<detail-recommend :goods="detailData?.similarProducts" />
		</app-scroll-view>
	</view>
</template>

<style lang="scss">
page {
	height: 100vh;
	background-color: #f4f4f4;
	flex-direction: column;
	overflow: hidden;
}
</style>
