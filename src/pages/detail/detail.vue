<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-26 17:43:24
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-03 10:26:40
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

const options = ref<UniHelper.UniGoodsNavOption[]>([
	{
		icon: 'chat',
		text: '客服'
	},
	{
		icon: 'shop',
		text: '店铺',
		info: 2,
		infoBackgroundColor: '#007aff',
		infoColor: '#f5f5f5'
	},
	{
		icon: 'cart',
		text: '购物车',
		info: 2
	}
])

const buttonGroup = ref([
	{
		text: '加入购物车',
		backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
		color: '#fff'
	},
	{
		text: '立即购买',
		backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
		color: '#fff'
	}
])
</script>

<template>
	<view class="h-[calc(100vh-50px)] overflow-hidden" v-if="detailData">
		<app-scroll-view class="h-full" :refresher-enabled="false" :padding-bottom="50">
			<detail-swiper :urls="detailData?.mainPictures" />
			<detail-content :goods="detailData" />
			<detail-desc :desc="detailData?.details?.properties" :pictures="detailData?.details?.pictures" />
			<detail-recommend :goods="detailData?.similarProducts" />
		</app-scroll-view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" />
		</view>
	</view>
</template>

<style scoped lang="scss">
page {
	height: 100vh;
	background-color: #f4f4f4;
	flex-direction: column;
	overflow: hidden;
}
.goods-carts {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	/* #ifdef H5 */
	left: var(--window-left);
	right: var(--window-right);
	/* #endif */
	bottom: 0;
}
</style>
@/a/detail
