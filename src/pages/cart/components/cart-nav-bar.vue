<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-06 20:19:14
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-07 10:38:19
 * @FilePath: \hello-uniapp\src\pages\cart\components\cart-nav-bar.vue
 * @Description: 
-->
<script setup lang="ts">
import type { ICartListItem } from '@/types/cart'

const props = defineProps<{
	cartList: ICartListItem[]
}>()

const emits = defineEmits<{
	(e: 'select-all', isSelected: boolean): void
}>()

/**
 * 被选择的商品
 */
const selectedShops = computed(() => {
	return props.cartList.filter((cart) => cart.selected)
})

/**
 * 已选商品总金额
 */
const selectedShopTotalMoney = computed(() => {
	return selectedShops.value.reduce((total, cart) => {
		return total + parseFloat(cart.nowPrice) * cart.count
	}, 0)
})

/**
 * 判断是否选择所有
 */
const isSelectedAll = computed(() => {
	return props.cartList.length != 0 && selectedShops.value.length == props.cartList.length
})

/**
 * 已选择数量
 */
const selectedCount = computed(() => {
	return selectedShops.value.reduce((total, cart) => {
		return total + cart.count
	}, 0)
})

/**
 * 全选
 */
const handleSelectAllClick = () => {
	emits('select-all', !isSelectedAll.value)
}

/**
 * 去订单页面
 */
const goToOrderPages = () => {
	if (selectedCount.value == 0) return
	uni.navigateTo({
		url: '/sub-pages/order/order'
	})
}
</script>

<template>
	<view
		class="fixed shadow-2xl b-bottom left-0 right-0 bottom-[var(--window-bottom)] h-[50px] bg-white box-border px-2 between"
	>
		<view class="flex items-center">
			<radio
				style="transform: scale(0.9)"
				:disabled="cartList.length == 0"
				color="#fbb957"
				:checked="isSelectedAll"
				@click="handleSelectAllClick"
			>
				全选
			</radio>
			<view class="flex ml-2 items-center">
				<view class="mr-2">合计: </view>
				<view class="mr-0.5 text-[#f00]"> ¥ </view>
				<view class="text-[#f00] text-lg">{{ selectedShopTotalMoney.toFixed(2) }}</view>
			</view>
		</view>
		<view
			class="text-white bg-[#fbb957] px-6 py-1.5 rounded-full text-sm"
			:class="{ 'opacity-50': selectedCount == 0 }"
			@click="goToOrderPages"
		>
			去结算 {{ selectedCount > 0 ? `(${selectedCount})` : '' }}
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
