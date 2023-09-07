<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-31 17:48:50
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-07 14:33:11
 * @FilePath: \hello-uniapp\src\sub-pages\address\address.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IAddress } from '@/types/address'

const addressList = ref<IAddress[]>([])

onShow(() => {
	getAddressListData()
})

/**
 * 前往地址表单页
 */
const handleGoToAddressForm = (id?: string) => {
	uni.navigateTo({
		url: `/sub-pages/address-form/address-form?${typeof id == 'string' ? `id=${id}` : ''}`
	})
}

/**
 * @description: 右侧滑动菜单配置
 */
const rightOptions: UniHelper.UniSwipeActionItemOption[] = [
	{
		text: '删除',
		style: {
			backgroundColor: '#ff0000',
			color: '#fff',
			fontSize: '16px'
		}
	}
]

/**
 * 处理地址删除
 * @param e
 */
const handleSwipeDelete: UniHelper.UniSwipeActionItemOnClick = (e) => {
	if (e.position == 'right') {
		uni.showModal({
			content: '确定删除该地址吗？',
			confirmColor: '#fbb957',
			success: async (res) => {
				if (res.confirm) {
					await deleteAddressAPI(addressList.value[e.index].id)
					await getAddressListData()
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
				}
			}
		})
	}
}

/**
 * @description: 获取地址列表
 */
async function getAddressListData() {
	const res = await getAddressListAPI()
	addressList.value = res.result
}

const { safeAreaInsetsBottom } = useSystem()

//设置默认地址
const addressStore = useAddressStore()
const handleAddressClick = (address: IAddress) => {
	addressStore.setAddress(address)
	uni.navigateBack()
}
</script>

<template>
	<view class="p-3 h-full box-border" :style="{ paddingBottom: safeAreaInsetsBottom + 12 + 'px' }">
		<scroll-view class="h-[calc(100%-100rpx)]" scroll-y>
			<uni-swipe-action class="bg-white rounded-2">
				<view class="bg-white" @tap="handleAddressClick(address)" v-for="address in addressList" :key="address.id">
					<uni-swipe-action-item :right-options="rightOptions" auto-close @click="handleSwipeDelete">
						<view class="flex justify-between px-3 py-5 b-bottom">
							<view class="flex-1">
								<view class="flex items-center">
									<view class="text-[#333] mr-2">{{ address.receiver }}</view>
									<view class="text-[#333] mr-2">{{ address.contact }}</view>
									<view
										v-if="address.isDefault == 1"
										class="border-1 border-solid border-[#fbb957] text-[#fbb957] rounded-1 px-1.5 py-0.25 text-xs inline-block"
										>默认</view
									>
								</view>
								<view class="mt-3">{{ address.fullLocation }}</view>
							</view>
							<view class="w-10 text-sm flex text-[#999]">
								<view
									class="before:(content-[''] inline-block relative top-0.7 right-1 w-0.1 h-4 bg-[#999])"
									@click.stop="handleGoToAddressForm(address.id)"
								>
									修改
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</scroll-view>
		<view
			class="mt-20rpx bg-[#fbb957] text-white center py-2 rounded-full"
			:style="{ marginBottom: safeAreaInsetsBottom + 'px' }"
			@click="handleGoToAddressForm"
		>
			<view class="i-carbon-add"></view>
			<view class="ml-1">新增地址</view>
		</view>
	</view>
</template>

<style lang="scss">
page {
	background-color: #f4f4f4;
	height: 100%;
	overflow: hidden;
}
</style>
