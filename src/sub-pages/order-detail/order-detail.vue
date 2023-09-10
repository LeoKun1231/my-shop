<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-07 16:12:32
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-10 18:38:52
 * @FilePath: \hello-uniapp\src\sub-pages\order-detail\order-detail.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IOrderDetailResult, IOrderLogisticsResult, IOrderLogisticsList } from '@/types/order'
import type AppPopup from '@/components/app-popup/app-popup.vue'

const query = defineProps<{
	id: string
}>()

getOrderDetailData(query.id)

/** 订单状态枚举 */
enum OrderState {
	/** 待付款 */
	PendingPayment = 1,
	/** 待发货 */
	PendingShipment = 2,
	/** 待收货 */
	PendingDelivery = 3,
	/** 待评价 */
	PendingReview = 4,
	/** 已完成 */
	Completed = 5,
	/** 已取消 */
	Cancelled = 6
}

/**
 * 获取订单详情
 */
const orderDetail = ref<IOrderDetailResult>()
async function getOrderDetailData(id: string) {
	const { result } = await getOrderDetailAPI(id)
	orderDetail.value = result
}

const { appGuessLikeRef, getMore } = useAppGuessLike()

const reasonList = ['商品无货', '不想要了', '商品信息填错', '地址信息填写错误', '商品降价', '其他']

const appPopupRef = ref<InstanceType<typeof AppPopup>>()

//判断是否已经发货
const isAlreadyShipment = computed(() => {
	return [OrderState.PendingDelivery, OrderState.Completed, OrderState.PendingReview, OrderState].includes(
		orderDetail.value?.orderState || 0
	)
})

/**
 * 判断订单状态
 */
const judgeState = (orderState: OrderState) => {
	return orderDetail.value?.orderState === orderState
}

//返回
const handleBack = () => {
	uni.navigateBack()
}

//监听倒计时结束
const onTimeUp = () => {
	orderDetail.value!.orderState = OrderState.Cancelled
}

//支付
const goToPay = async () => {
	await getOrderMockPayAPI(query.id)
	uni.showToast({
		title: '支付成功',
		icon: 'success',
		mask: true
	})
	orderDetail.value!.orderState = OrderState.PendingShipment
}

//取消订单
const cancelOrder = () => {
	appPopupRef.value?.open()
}
//当前原因
const currentReason = ref(0)
const cancelRadioChange: UniHelper.RadioGroupOnChange = (e) => {
	currentReason.value = Number(e.detail.value)
}
const cancelReason = () => {
	appPopupRef.value?.close()
}
//确定取消订单
const confirmReason = async () => {
	try {
		appPopupRef.value?.close()
		await putCancelOrderAPI(query.id, reasonList[currentReason.value])
		uni.showToast({
			title: '取消订单成功'
		})
		orderDetail.value!.orderState = OrderState.Cancelled
	} catch (error) {
		appPopupRef.value?.close()
		console.error(error)
	}
}

//删除订单
const deleteOrder = () => {
	uni.showModal({
		content: '确认删除此订单？',
		async success(result) {
			if (result.confirm) {
				await deleteOrderAPI([query.id])
				uni.showToast({
					title: '删除成功',
					icon: 'success',
					success: () => {
						uni.redirectTo({
							url: '/pages/home/home'
						})
					}
				})
			}
		}
	})
}

//再次购买
const handleBuyAgain = async () => {
	uni.navigateTo({
		url: `/sub-pages/order/order?id=${query.id}`
	})
}

//模拟发货
const logisticsResult = ref<IOrderLogisticsResult>()
const logisticsList = ref<IOrderLogisticsList[]>([])
const getOrderLogisticsData = async () => {
	const { result } = await getOrderLogisticsAPI(query.id)
	logisticsResult.value = result
	logisticsList.value = result.list.sort((a, b) => Number(b.id) - Number(a.id))
}

//模拟发货
const handleMockShipment = async () => {
	await getOrderMockShipmentAPI(query.id)
	await getOrderLogisticsData()
	orderDetail.value!.orderState = OrderState.PendingDelivery
}

watch(isAlreadyShipment, async (val) => {
	if (val) {
		await getOrderLogisticsData()
	}
})

//确认收货
const handleConfirmDelivery = async () => {
	await putOrderConfirmOrderDeliveryAPI(query.id)
	uni.showToast({
		title: '确认收货成功',
		icon: 'success',
		success: async () => {
			await getOrderLogisticsData()
			orderDetail.value!.orderState = OrderState.PendingReview
		}
	})
}

//复制订单编号
const copyOrderID = () => {
	SetClipboardData(orderDetail.value!.id, true)
}
</script>

<template>
	<view class="h-full pb-[50px]">
		<app-scroll-view
			class="h-[calc(100%-50px)]"
			:padding-bottom="50"
			:refresher-enabled="false"
			:scrolltolower="getMore"
		>
			<view class="bg-[#fbb957] h-40 mb-2">
				<view class="py-2">
					<view class="px-2" @click="handleBack">
						<view class="i-carbon-chevron-left h-7 w-7 text-white"></view>
					</view>
				</view>
				<template v-if="judgeState(OrderState.PendingPayment)">
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
							@timeup="onTimeUp"
						></uni-countdown>
					</view>
					<view class="center mt-3">
						<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full" @click="goToPay">去支付</view>
					</view>
				</template>
				<template v-else-if="judgeState(OrderState.Cancelled)">
					<view class="text-white center relative bottom-6">
						<view class="text-xl font-bold">已取消</view>
					</view>
					<view class="center mt-3">
						<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full" @click="handleBuyAgain">再次购买</view>
					</view>
				</template>
				<template v-else-if="judgeState(OrderState.PendingShipment)">
					<view class="text-white center relative bottom-6">
						<view class="text-xl font-bold">待发货</view>
					</view>
					<view class="around mt-3 px-7">
						<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full" @click="handleBuyAgain">再次购买</view>
						<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full" @click="handleMockShipment">模拟发货</view>
					</view>
				</template>
				<template v-else-if="judgeState(OrderState.PendingDelivery)">
					<view class="text-white center relative bottom-6">
						<view class="text-xl font-bold">待收货</view>
					</view>
					<view class="around mt-3 px-7">
						<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full" @click="handleBuyAgain">再次购买</view>
						<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full" @click="handleConfirmDelivery"
							>确认收货</view
						>
					</view>
				</template>
				<template v-else-if="judgeState(OrderState.PendingReview)">
					<view class="text-white center relative bottom-6">
						<view class="text-xl font-bold">待评价</view>
					</view>
					<view class="around mt-3 px-7">
						<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full" @click="handleBuyAgain">再次购买</view>
						<view class="bg-white py-1.5 px-10 text-[#fbb957] rounded-full">去评价</view>
					</view>
				</template>
			</view>
			<template v-if="isAlreadyShipment">
				<view class="bg-white p-3 rounded-1 mx-2">
					<view class="center-y py-2" v-for="(address, index) in logisticsList" :key="address.id">
						<view class="w-10 center">
							<image v-if="index == logisticsList.length - 1" class="w-7 h-7" src="@/static/images/location.png" />
							<image
								v-else-if="index == 0 && orderDetail?.orderState == OrderState.Completed"
								class="w-7 h-7"
								src="@/static/images/deliver.png"
							/>
							<image v-else class="w-8 h-8" src="@/static/images/onRoad.png" />
						</view>

						<view class="ml-2 flex-1 text-sm text-[#666]">
							<view>{{ address.text }}</view>
							<view>{{ address.time }}</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="bg-white p-3 center-y rounded-1 mx-2">
					<image class="w-7 h-7" src="@/static/images/location.png" />
					<view class="ml-2 between flex-1">
						<view class="text-sm">
							<view class="text-[#666]">{{ orderDetail?.receiverContact }} {{ orderDetail?.receiverMobile }}</view>
							<view class="text-[#999]">{{ orderDetail?.receiverAddress }}</view>
						</view>
					</view>
				</view>
			</template>

			<view class="bg-white mx-2 px-2 py-3 my-2 rounded-1">
				<view class="py-3 center-y" v-for="sku in orderDetail?.skus" :key="sku.id">
					<image class="w-20 h-20 rounded-2 mr-2" :src="sku.image" />
					<view class="flex-1 between h-20 flex-col items-start">
						<view class="text-sm">{{ sku.name }}</view>
						<view class="w-full">
							<view class="bg-[#f7f7f8] text-xs px-2 py-0.25 text-[#999] mb-1 w-fit max-w-200px truncate">{{
								sku.attrsText
							}}</view>
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
				<view class="flex justify-end items-center">
					<view
						v-if="orderDetail?.orderState == OrderState.PendingReview"
						class="text-xs text-[#666] border-1 border-solid border-[#ddd] w-fit py-1 px-5.5 mr-2 rounded-full"
					>
						去评价
					</view>
					<view
						v-if="orderDetail?.orderState || 0 > OrderState.PendingShipment"
						class="text-xs text-[#fbb957] border-1 border-solid border-[#fbb957] w-fit py-1 px-4 rounded-full"
					>
						申请售后
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
						<view class="text-[#f00] center-y">
							<view>¥</view>
							<view class="text-lg">{{ orderDetail?.payMoney }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white mx-2 px-2 py-3 rounded-1">
				<view class="text-[#333]">订单信息</view>
				<view class="center-y text-[#666] py-2 text-sm">
					<view>订单编号: {{ orderDetail?.id }}</view>
					<view
						class="ml-1 text-[#666] w-fit py-0.25 px-2 border-1 border-solid border-[#e2e2e2] text-xs rounded-full"
						@click="copyOrderID"
						>复制</view
					>
				</view>
				<view class="center-y text-[#666] text-sm">
					<view>下单时间: {{ orderDetail?.createTime }}</view>
				</view>
			</view>
			<view class="fixed z-1 left-0 text-sm right-0 bottom-0 h-50px bg-white shadow-2xl center-y justify-end px-3">
				<template v-if="judgeState(OrderState.PendingPayment)">
					<view
						class="w-fit py-2 px-6 rounded-full border-1 border-solid border-[#ddd] mr-4 text-[#666]"
						@click="cancelOrder"
					>
						取消订单
					</view>
					<view class="text-white bg-[#fbb957] w-fit py-2 px-7 rounded-full" @click="goToPay">去支付</view>
				</template>

				<template v-else-if="judgeState(OrderState.Cancelled)">
					<view
						class="w-fit py-2 px-6 rounded-full border-1 border-solid border-[#ddd] mr-4 text-red"
						@click="deleteOrder"
					>
						删除订单
					</view>
					<view
						class="text-[#fbb957] border-1 border-solid border-[#fbb957] w-fit py-2 px-6 rounded-full"
						@click="handleBuyAgain"
					>
						再次购买
					</view>
				</template>
				<template v-else-if="isAlreadyShipment || OrderState.PendingShipment == orderDetail?.orderState">
					<view
						class="text-[#fbb957] border-1 border-solid border-[#fbb957] w-fit py-2 px-6 rounded-full"
						@click="handleBuyAgain"
					>
						再次购买
					</view>
				</template>
			</view>

			<view class="mx-2">
				<app-guess-like ref="appGuessLikeRef" />
			</view>
		</app-scroll-view>
	</view>
	<app-popup ref="appPopupRef" title="取消订单原因">
		<view class="mb-2 text-[#333]">请选择取消订单的原因:</view>
		<radio-group @change="cancelRadioChange">
			<view class="py-1.5 text-[#999]" v-for="(reason, index) in reasonList" :key="reason">
				<label class="between">
					<view>{{ reason }}</view>
					<radio class="scale-70" color="#fbb957" :value="index + ''" :checked="index === currentReason" />
				</label>
			</view>
		</radio-group>

		<view class="center mt-3">
			<view
				class="w-fit py-2 px-13 rounded-full border-1 border-solid border-[#ddd] mr-4 text-[#666]"
				@click="cancelReason"
				>取消</view
			>
			<view class="text-white bg-[#fbb957] w-fit py-2 px-13 rounded-full" @click="confirmReason">确定</view>
		</view>
	</app-popup>
</template>

<style lang="scss">
page {
	background-color: #f4f4f4;
	height: 100%;
}
</style>
