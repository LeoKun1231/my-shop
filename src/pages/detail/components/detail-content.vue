<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-27 11:43:58
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-14 17:12:07
 * @FilePath: \hello-uniapp\src\pages\detail\components\detail-content.vue
 * @Description: 
-->
<script setup lang="ts">
import type AppPopup from '@/components/app-popup/app-popup.vue'
import type { IDetailGoodResult } from '@/types/detail'
import type detailSku from './detail-sku.vue'

defineProps<{
	goods: IDetailGoodResult
}>()

/**
 * 弹窗部分
 */
type AppPopupType = InstanceType<typeof AppPopup>
const popupRef = ref<AppPopupType>()
type PopupType = '选购' | '配送至' | '服务说明'
const currentPopupType = ref<PopupType>('选购')
const detailSkuRef = ref<InstanceType<typeof detailSku>>()
const skuModeStore = useSkuModeStore()
const handleOpenPopup = (type: PopupType) => {
	if (type == '选购') {
		skuModeStore.setSkuMode(SkuMode.Both)
		detailSkuRef.value?.openOrClose(true)
	} else {
		popupRef.value?.open!()
	}
	currentPopupType.value = type
}

//选中的商品规格回显
const selectShop = ref('')

const handleButtonClick: UniHelper.UniGoodsNavOnButtonClick = (e) => {
	detailSkuRef.value?.openOrClose(true)
	if (e.index == 0) {
		skuModeStore.setSkuMode(SkuMode.Cart)
	} else if (e.index == 1) {
		skuModeStore.setSkuMode(SkuMode.Buy)
	}
}

const handleUniGoodsNavClick: UniHelper.UniGoodsNavOnClick = (e) => {
	if (e.index != 2) {
		uni.showToast({
			title: '暂未开发',
			icon: 'none'
		})
		return
	} else {
		uni.switchTab({
			url: '/pages/cart/cart'
		})
	}
}

/**
 * 底部购物导航栏配置
 */
const options = ref<UniHelper.UniGoodsNavOption[]>([
	{
		icon: 'chat',
		text: '客服'
	},
	{
		icon: 'shop',
		text: '店铺',
		infoBackgroundColor: '#007aff',
		infoColor: '#f5f5f5'
	},
	{
		icon: 'cart',
		text: '购物车'
	}
])
const buttonGroup = [
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
]

const addressStore = useAddressStore()
const { addressList } = storeToRefs(addressStore)
const currentAddress = ref('')
const addressId = ref('')
const handleAddressChange = (value: string) => {
	addressId.value = value
	currentAddress.value = addressList.value?.find((c) => c.id == value)!.fullLocation || ''
}
</script>

<template>
	<view class="bg-[#fff]">
		<view class="flex items-center px-4 py-2 bg-[#fbb957] text-white">
			<view>¥</view>
			<view class="text-2xl ml-0.5">{{ goods.price }}</view>
		</view>
		<view class="px-2 py-3 b-bottom">
			<view class="text-[#333] truncate">{{ goods.name }}</view>
			<view class="mt-1 text-[#f00] text-sm truncate">{{ goods.desc }}</view>
		</view>
		<view class="between px-4 py-3 b-bottom" @click="handleOpenPopup('选购')">
			<view class="flex w-[calc(100%-23px)]">
				<view class="text-gray mr-3 w-10">选择</view>
				<view class="truncate text-[#666] w-[calc(100%-40px)]">{{ selectShop || '请选择商品规格' }}</view>
			</view>
			<view class="i-carbon-chevron-right text-gray-300 text-lg"></view>
		</view>
		<view class="between px-4 py-3 b-bottom" @click="handleOpenPopup('配送至')">
			<view class="flex">
				<view class="text-gray mr-3 w-10">送至</view>
				<view class="truncate text-[#666]">{{ currentAddress == '' ? '请选择收获地址' : currentAddress }}</view>
			</view>
			<view class="i-carbon-chevron-right text-gray-300 text-lg"></view>
		</view>
		<view class="between px-4 py-3 b-bottom" @click="handleOpenPopup('服务说明')">
			<view class="flex">
				<view class="text-gray mr-3 w-10">服务</view>
				<view class="truncate text-[#666]">无忧退 快速退款 免费包邮 </view>
			</view>
			<view class="i-carbon-chevron-right text-gray-300 text-lg"></view>
		</view>
		<app-popup ref="popupRef" :title="currentPopupType">
			<view v-if="currentPopupType == '选购'" class="h-20 bg-blue"></view>
			<detail-address v-if="currentPopupType == '配送至'" @change="handleAddressChange" />
			<detail-service v-if="currentPopupType == '服务说明'" />
		</app-popup>
	</view>
	<view class="goods-carts">
		<uni-goods-nav
			@click="handleUniGoodsNavClick"
			:options="options"
			:fill="true"
			:button-group="buttonGroup"
			@button-click="handleButtonClick"
		/>
	</view>
	<detail-sku v-model="selectShop" :goods="goods" ref="detailSkuRef" :addressId="addressId" />
</template>

<style lang="scss">
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
	z-index: 1;
}
</style>
