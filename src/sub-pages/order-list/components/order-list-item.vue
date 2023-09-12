<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-10 20:16:23
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-12 19:30:09
 * @FilePath: \hello-uniapp\src\sub-pages\order-list\components\order-list-item.vue
 * @Description: 
-->
<script setup lang="ts">
import type { LoadingStatus } from '@/types/global'
import type { IOrderList } from '@/types/order'

const props = defineProps<{
	type?: string
}>()

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

const orderState = {
	[OrderState.PendingPayment]: '待付款',
	[OrderState.PendingShipment]: '待发货',
	[OrderState.PendingDelivery]: '待收货',
	[OrderState.PendingReview]: '待评价',
	[OrderState.Completed]: '已完成',
	[OrderState.Cancelled]: '已取消'
}
const loadingStatus = ref<LoadingStatus>('more')
const orderStore = useOrderStore()
const { currentType } = storeToRefs(orderStore)
const orderList = ref<IOrderList[]>([])
const page = ref(1)
const pageSize = ref(10)

watch(
	currentType,
	() => {
		page.value == 0
		orderList.value = []
		getOrderListData(Number(props.type))
	},
	{
		immediate: true
	}
)

async function getOrderListData(orderState: number) {
	loadingStatus.value = 'loading'
	uni.showLoading({
		title: '加载中...'
	})
	if (currentType.value !== props.type) return
	const { result } = await getOrderListAPI({
		page: page.value,
		pageSize: pageSize.value,
		orderState
	})
	if (page.value >= result.pages) {
		loadingStatus.value = 'noMore'
		uni.hideLoading()
		return
	}
	orderList.value = [...orderList.value, ...result.items]
	page.value++
	loadingStatus.value = 'more'
	uni.hideLoading()
}

const handleScollToLower = async () => {
	if (loadingStatus.value != 'loading') {
		await getOrderListData(Number(props.type))
	}
}

//删除订单
const handleRemoveOrder = async (id: string) => {
	uni.showModal({
		content: '确定要删除该订单吗？',
		confirmColor: '#fbb957',
		success: async (res) => {
			if (res.confirm) {
				const { result } = await deleteOrderAPI([id])
				if (result) {
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
					getOrderListData(Number(props.type))
				}
			}
		}
	})
}

//去支付
const goToPay = (id: string) => {
	uni.showModal({
		content: '确认支付？',
		confirmColor: '#fbb957',
		async success(res) {
			if (res.confirm) {
				await getMockPayAPI(id)
				await getOrderListData(Number(props.type))
			}
		}
	})
}

//确认收货
const comfirmDelivery = (id: string) => {
	uni.showModal({
		content: '确认收货？',
		confirmColor: '#fbb957',
		async success(res) {
			if (res.confirm) {
				await putOrderConfirmOrderDeliveryAPI(id)
				await getOrderListData(Number(props.type))
			}
		}
	})
}

const goToOrderDetail = (id: string) => {
	uni.navigateTo({
		url: `/sub-pages/order-detail/order-detail?id=${id}`
	})
}
</script>

<template>
	<app-scroll-view class="p-2" :scrolltolower="handleScollToLower" :refresher-enabled="false">
		<view class="bg-white rounded-1 mb-2 p-2" v-for="order in orderList" :key="order.id">
			<view @click="goToOrderDetail(order.id)">
				<view class="text-[#999] between text-sm">
					<view>{{ order.createTime }}</view>
					<view class="center-y">
						<view>{{ orderState[order.orderState] }}</view>
						<view
							class="ml-1 center-y before:(content-['|'] inline-block mr-1 text-[#ddd])"
							v-if="order.orderState == OrderState.Cancelled || order.orderState == OrderState.PendingReview"
						>
							<view class="i-carbon-delete" @click="handleRemoveOrder(order.id)"></view>
						</view>
					</view>
				</view>
				<view class="center-y py-2" v-for="sku in order.skus" :key="sku.id">
					<image :src="sku.image" class="h-20 w-20 mr-2" />
					<view class="flex-1 h-16 flex justify-between flex-col">
						<view class="text-[#333] text-xs">{{ sku.name }}</view>
						<view class="text-[#999] rounded-1 text-xs bg-[#f4f4f4] p-1 w-fit">{{ sku.attrsText }}</view>
					</view>
				</view>
				<view class="mt-1 text-[#999] text-sm flex justify-end b-bottom pb-2">
					<view class="mr-2">共{{ order.totalNum }}件商品</view>
					<view>
						<text>实付</text>
						<text class="text-xs">¥</text>
						<text>{{ order.totalMoney }}</text>
					</view>
				</view>
			</view>
			<view class="flex justify-end pt-2">
				<view
					v-if="order.orderState == OrderState.PendingPayment"
					class="px-5 py-1 rounded-full text-white bg-[#fbb957]"
					@click="goToPay(order.id)"
				>
					去支付
				</view>
				<view
					v-if="order.orderState != OrderState.PendingPayment"
					class="px-4 py-1 rounded-full text-[#fbb957] border-1 border-solid border-[#fbb957]"
					>再次购买
				</view>
				<view
					v-if="order.orderState == OrderState.PendingDelivery"
					class="px-4 ml-2 py-1 rounded-full text-white bg-[#fbb957]"
					@click="comfirmDelivery(order.id)"
				>
					确认收货
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingStatus" />
	</app-scroll-view>
</template>

<style scoped lang="scss"></style>
