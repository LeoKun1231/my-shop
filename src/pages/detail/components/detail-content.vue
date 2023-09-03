<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-27 11:43:58
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-03 10:30:28
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

const handleOpenPopup = (type: PopupType) => {
	if (type == '选购') {
		detailSkuRef.value?.openOrClose(true)
	} else {
		popupRef.value?.open!()
	}
	currentPopupType.value = type
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
			<view class="flex">
				<view class="text-gray mr-3 w-10">选择</view>
				<view class="truncate text-[#666]">请选择商品规格</view>
			</view>
			<view class="i-carbon-chevron-right text-gray-300 text-lg"></view>
		</view>
		<view class="between px-4 py-3 b-bottom" @click="handleOpenPopup('配送至')">
			<view class="flex">
				<view class="text-gray mr-3 w-10">送至</view>
				<view class="truncate text-[#666]">请选择收获地址</view>
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
			<detail-address v-if="currentPopupType == '配送至'" />
			<detail-service v-if="currentPopupType == '服务说明'" />
		</app-popup>
		<detail-sku :goods="goods" ref="detailSkuRef" />
	</view>
</template>

<style scoped lang="scss"></style>
