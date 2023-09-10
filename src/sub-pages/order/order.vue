<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-07 10:28:10
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-10 18:34:05
 * @FilePath: \hello-uniapp\src\sub-pages\order\order.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IOrderPreResult } from '@/types/order'

const query = defineProps<{
	id?: string
	count?: string
	addressId?: string
}>()

getOrderPreData()
const addressStore = useAddressStore()
const { address } = storeToRefs(addressStore)
// 配送时间
const deliveryList = [
	{ type: 1, text: '时间不限 (周一至周日)' },
	{ type: 2, text: '工作日送 (周一至周五)' },
	{ type: 3, text: '周末配送 (周六至周日)' }
]

const orderPreData = ref<IOrderPreResult>()
async function getOrderPreData() {
	if (query.id && !query.count) {
		//再次购买
		const { result } = await getOrderAgainAPI(query.id)
		orderPreData.value = result
	} else if (query.id && query.count) {
		//立即购买
		const { result } = await getOrderPreNowAPI({
			skuId: query.id,
			count: query.count
		})
		orderPreData.value = result
	} else {
		//购物车结算
		const { result } = await getOrderPreAPI()
		orderPreData.value = result
	}
}
//获取地址
addressStore.getAddressListData()

// 默认地址
const selectedAddress = computed(() => {
	return Object.keys(address.value || {}).length > 0
		? address.value
		: orderPreData.value?.userAddresses.find((item) => item.isDefault)
})
//判断是否有地址
const isAddress = computed(() => {
	return Object.keys(selectedAddress.value || {}).length > 0
})

// 配送时间
const deliveryType = ref(0)
const handleDeliveryChange: UniHelper.SelectorPickerOnChange = (e) => {
	deliveryType.value = e.detail.value
}

//订单备注
const orderRemark = ref('')

//前往地址页选择地址
const handleGoToAddress = () => {
	uni.navigateTo({
		url: '/sub-pages/address/address'
	})
}

/**
 * 提交订单
 */
const postOrder = async () => {
	if (!isAddress.value) {
		uni.showToast({
			title: '请选择收货地址',
			icon: 'none'
		})
		return
	}
	const { result } = await postOrderAPI({
		addressId: selectedAddress.value!.id!,
		buyerMessage: orderRemark.value,
		deliveryTimeType: deliveryType.value,
		goods: orderPreData.value!.goods.map((item) => ({ count: item.count, skuId: item.skuId })),
		payChannel: 2,
		payType: 1
	})
	uni.showToast({
		title: '提交订单成功',
		icon: 'none',
		success: () => {
			uni.redirectTo({
				url: `/sub-pages/order-detail/order-detail?id=${result.id}`
			})
		}
	})
}
</script>

<template>
	<view class="m-3 pb-60px">
		<view class="bg-white p-3 center-y mb-2 rounded-1" @click="handleGoToAddress">
			<image class="w-7 h-7" src="@/static/images/location.png" />
			<view class="ml-2 between flex-1">
				<view class="text-sm" v-if="selectedAddress && Object.keys(selectedAddress).length > 0">
					<view class="text-[#666]">{{ selectedAddress?.receiver }} {{ selectedAddress?.contact }}</view>
					<view class="text-[#999]">{{ selectedAddress?.fullLocation }}</view>
				</view>
				<view class="text-[#666]" v-else>请选择收获地址</view>
				<view class="i-carbon-chevron-right w-6 h-6 text-[#999]"></view>
			</view>
		</view>
		<view class="bg-white mb-2 rounded-1">
			<view class="mx-3 py-3 b-bottom center-y" v-for="good in orderPreData?.goods" :key="good.id">
				<image class="w-20 h-20 rounded-2 mr-2" :src="good.picture" />
				<view class="flex-1 between h-20 flex-col items-start">
					<view class="text-sm">{{ good.name }}</view>
					<view class="w-full">
						<view class="bg-[#f7f7f8] text-xs px-2 py-0.25 text-[#999] mb-1 w-fit max-w-200px truncate">{{
							good.attrsText
						}}</view>
						<view class="between w-full">
							<view class="flex items-end">
								<view class="mr-0.5 text-xs text-[#f00]"> ¥ </view>
								<view class="text-[#f00]">{{ good.totalPayPrice }}</view>
								<view class="text-xs text-[#999] ml-1 line-through">¥{{ good.totalPrice }}</view>
							</view>
							<view class="text-sm">x{{ good.count }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-white text-sm mb-2 rounded-1">
			<app-form-item-v2 label="配送时间">
				<picker :range="deliveryList" mode="selector" range-key="text" @change="handleDeliveryChange">
					<view class="center-y text-[#666] justify-end w-full">
						<view>{{ deliveryList[deliveryType].text }}</view>
						<view class="i-carbon-chevron-right"></view>
					</view>
				</picker>
			</app-form-item-v2>
			<app-form-item-v2 label="订单备注">
				<input
					v-model="orderRemark"
					class="text-sm"
					:cursor-spacing="30"
					placeholder="选题，建议留言前先与商家沟通确认"
				/>
			</app-form-item-v2>
		</view>

		<view class="bg-white text-sm rounded-1">
			<app-form-item-v2 label="商品总价:">
				<view>¥{{ orderPreData?.summary.totalPrice.toFixed(2) }}</view>
			</app-form-item-v2>
			<app-form-item-v2 label="运费:">
				<view>¥{{ orderPreData?.summary.postFee.toFixed(2) }}</view>
			</app-form-item-v2>
		</view>

		<view class="fixed left-0 right-0 bottom-0 h-50px bg-white between px-3">
			<view class="text-[#f00] center-y">
				<view>¥</view>
				<view class="text-lg ml-0.25">{{ orderPreData?.summary.totalPayPrice.toFixed(2) }}</view>
			</view>
			<view
				class="bg-[#fbb957] text-white px-7 py-1.5 rounded-full text-sm"
				:class="{ 'opacity-50': !isAddress }"
				@click="postOrder"
				>提交订单</view
			>
		</view>
	</view>
</template>

<style lang="scss">
page {
	background: #f4f4f4;
	height: 100%;
}
</style>
