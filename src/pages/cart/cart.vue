<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-11 19:02:23
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-06 21:18:22
 * @FilePath: \hello-uniapp\src\pages\cart\cart.vue
 * @Description: 
-->
<script setup lang="ts">
import type { InputNumberBoxEvent } from '@/components/vk-data-input-number-box/vk-data-input-number-box'
import type { ICartListItem } from '@/types/cart'

const userStore = useUserStore()
const { appGuessLikeRef, getMore } = useAppGuessLike()

const { user } = storeToRefs(userStore)

onShow(() => {
	getCartListData()
})

/**
 * 去登录
 */
const goToLogin = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	})
}

/**
 * 去首页
 */
const goToHomePage = () => {
	uni.switchTab({
		url: '/pages/home/home'
	})
}

/**
 * 删除购物车商品
 * @param skuId
 */
function handleDeleteCartItem(skuId: string) {
	uni.showModal({
		content: '确定删除该商品吗？',
		confirmColor: '#fbb957',
		success: async (res) => {
			if (res.confirm) {
				await deleteCartAPI(skuId)
				await getCartListData()
				uni.showToast({
					title: '删除成功',
					icon: 'none'
				})
			}
		}
	})
}

/**
 * 购物车商品数量变化
 * @param e
 */
async function handleDataInputChange(e: InputNumberBoxEvent) {
	await putCartAPI(e.index, {
		count: e.value
	})
}

/**
 * 购物车列表
 */
const cartList = ref<ICartListItem[]>([])
async function getCartListData() {
	const { result } = await getCartListAPI()
	cartList.value = result
}

/**
 * 购物车商品选中状态变化
 * @param cartItem
 */
const handleRadioChange = (cartItem: ICartListItem) => {
	putCartAPI(cartItem.skuId, {
		selected: !cartItem.selected
	})
	cartList.value.forEach((item) => {
		if (item.id == cartItem.id) {
			item.selected = !cartItem.selected
		}
	})
}

/**
 * 全选
 */
const handleSelectedAll = (isSelectedAll: boolean) => {
	cartList.value.forEach((cart) => {
		cart.selected = isSelectedAll
	})
	putCartAllSelectedAPI(isSelectedAll)
}
</script>

<template>
	<app-scroll-view :refresher-enabled="false" :scrolltolower="getMore">
		<view class="h-50vh center flex-col" v-if="!user">
			<view class="mb-4 text-sm">登录后可查看购物车中的商品</view>
			<view class="bg-[#fbb957] text-center px-12 py-1.5 w-fit rounded-full text-white" @click="goToLogin">去登录</view>
		</view>
		<view class="center py-4 flex-col mx-3" v-else>
			<template v-if="cartList.length > 0">
				<view class="w-full pb-4">
					<view class="flex items-center text-xs w-full">
						<view class="bg-[#fbb957] w-fit text-white px-2 mr-2">满减</view>
						<view class="text-[#666]">满1件,即可享受9折优惠</view>
					</view>
				</view>
				<view class="w-full">
					<uni-swipe-action>
						<uni-swipe-action-item class="mb-2 rounded-2" v-for="cart in cartList" :key="cart.skuId">
							<view>
								<view class="bg-white py-2 w-full flex items-center rounded-2">
									<view class="w-10 center">
										<radio @click="handleRadioChange(cart)" style="transform: scale(0.8)" color="#fbb957" :checked="cart.selected" />
									</view>
									<view class="between flex-1 box-border">
										<image class="w-24 h-24" mode="aspectFill" :src="cart.picture" />
										<view class="flex-1 text-sm flex-col between items-start h-24 w-full box-border px-4">
											<view class="line-clamp-2">{{ cart.name }}</view>
											<view class="w-full">
												<view class="bg-[#f7f7f8] px-2 py-0.25 text-[#999] mb-1 w-fit max-w-200px truncate">{{ cart.attrsText }}</view>
												<view class="between w-full">
													<view class="text-[#f00] flex items-center">
														<view class="mr-0.5 text-xs"> ¥ </view>
														<view>{{ cart.nowPrice }}</view>
													</view>
													<vk-data-input-number-box
														@change="handleDataInputChange"
														v-model="cart.count"
														:index="cart.skuId"
														:min="1"
														:max="cart.stock"
														:step="1"
														:step-strictly="true"
													/>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<template #right>
								<view class="bg-[#f00] text-white center px-4" @click="handleDeleteCartItem(cart.skuId)">删除</view>
							</template>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</template>
			<template v-else>
				<view class="h-50vh center flex-col">
					<view class="mb-4 text-sm">购物车还是空的，快来挑选好货吧</view>
					<view class="bg-[#fbb957] text-center px-12 py-1.5 w-fit rounded-full text-white" @click="goToHomePage">去首页看看</view>
				</view>
			</template>
		</view>
		<view class="mx-2"><app-guess-like ref="appGuessLikeRef" /></view>
	</app-scroll-view>
	<cart-nav-bar @select-all="handleSelectedAll" :cartList="cartList" />
</template>

<style lang="scss">
page {
	height: 100%;
	background-color: $app-bg-color;
}
</style>
