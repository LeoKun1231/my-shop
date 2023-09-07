<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-07 16:12:32
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-07 21:02:56
 * @FilePath: \hello-uniapp\src\sub-pages\order-detail\order-detail.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IOrderDetailResult } from '@/types/order'

const query = defineProps<{
	id: string
}>()

getOrderDetailData(query.id)

const orderDetail = ref<IOrderDetailResult>()
async function getOrderDetailData(id: string) {
	const { result } = await getOrderDetailAPI(id)
	orderDetail.value = result
}

const { appGuessLikeRef, getMore } = useAppGuessLike()
</script>

<template>
	<view class="h-full pb-[50px]">
		<app-scroll-view class="h-[calc(100%-50px)]" :padding-bottom="50" :refresher-enabled="false" :scrolltolower="getMore">
			<view class="bg-[#fbb957] h-40 mb-2">
				<view class="py-2">
					<view class="px-2">
						<view class="i-carbon-chevron-left h-7 w-7 text-white"></view>
					</view>
				</view>
				<view class="text-white center relative bottom-6">
					<view class="i-carbon-chart-pie h-5 w-5 mr-1"></view>
					<view class="text-lg">等待付款</view>
				</view>
				<view class="center text-white text-sm">
					<view class="mr-0.25">应付金额:</view>
					<view class="mr-2">¥ {{ orderDetail?.totalMoney }}</view>
					<view class="text-sm">支付剩余</view>
					<uni-countdown
						splitor-color="#fff"
						color="#fff"
						:showColon="false"
						:show-day="false"
						:second="orderDetail?.countdown"
						start
					></uni-countdown>
				</view>
				<view class="center mt-3">
					<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full">去支付</view>
				</view>
			</view>
			<view class="bg-white p-3 center-y rounded-1 mx-2">
				<image class="w-7 h-7" src="@/static/images/location.png" />
				<view class="ml-2 between flex-1">
					<view class="text-sm">
						<view class="text-[#666]">{{ orderDetail?.receiverContact }} {{ orderDetail?.receiverMobile }}</view>
						<view class="text-[#999]">{{ orderDetail?.receiverAddress }}</view>
					</view>
				</view>
			</view>

			<view class="bg-white mx-2 px-2 py-3 my-2 rounded-1">
				<view class="py-3 center-y" v-for="sku in orderDetail?.skus" :key="sku.id">
					<image class="w-20 h-20 rounded-2 mr-2" :src="sku.image" />
					<view class="flex-1 between h-20 flex-col items-start">
						<view class="text-sm">{{ sku.name }}</view>
						<view class="w-full">
							<view class="bg-[#f7f7f8] text-xs px-2 py-0.25 text-[#999] mb-1 w-fit max-w-200px truncate">{{ sku.attrsText }}</view>
							<view class="between w-full">
								<view class="flex items-end">
									<view class="mr-0.5 text-xs text-[#f00]"> ¥ </view>
									<view class="text-[#f00]">{{ sku.realPay }}</view>
								</view>
								<view class="text-sm">x{{ sku.quantity }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="mt-4 text-sm border-t-1 border-t-[#f2f2f2] border-t-solid">
					<view class="between py-1 mt-3">
						<view>商品总价:</view>
						<view class="center-y text-[#666]">
							<view class="text-xs">¥</view>
							<view>{{ orderDetail?.totalMoney }}</view>
						</view>
					</view>
					<view class="between py-1">
						<view>运费:</view>
						<view class="center-y text-[#666]">
							<view class="text-xs">¥</view>
							<view>{{ orderDetail?.postFee }}</view>
						</view>
					</view>
					<view class="between py-1">
						<view>应付金额:</view>
						<view class="center-y text-[#f00]">
							<view>¥</view>
							<view class="text-base">{{ orderDetail?.payMoney }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white mx-2 px-2 py-3 rounded-1">
				<view class="text-[#333]">订单信息</view>
				<view class="center-y text-[#666] py-2 text-sm">
					<view>订单编号: {{ orderDetail?.id }}</view>
					<view class="ml-1 text-[#666] w-fit py-0.25 px-2 border-1 border-solid border-[#e2e2e2] text-xs rounded-full">复制</view>
				</view>
				<view class="center-y text-[#666] text-sm">
					<view>下单时间: {{ orderDetail?.createTime }}</view>
				</view>
			</view>
			<view class="fixed z-1 left-0 right-0 bottom-0 h-50px bg-white shadow-2xl center-y justify-end px-3">
				<view class="w-fit py-2 px-5 rounded-full border-1 border-solid border-[#ddd] mr-4 text-[#666]">取消订单</view>
				<view class="text-white bg-[#fbb957] w-fit py-2 px-7 rounded-full">去支付</view>
			</view>

			<view class="mx-2">
				<app-guess-like ref="appGuessLikeRef" />
			</view>
		</app-scroll-view>
	</view>
</template>

<style lang="scss">
page {
	background-color: #f4f4f4;
	height: 100%;
}
</style>
