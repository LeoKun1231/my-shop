<script setup lang="ts">
import { postAddCartAPI } from '@/api/cart'
import type {
	SkuPopupEvent,
	SkuPopupInstanceType,
	SkuPopupLocaldata,
	SkuPopupSkuItem
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import type { IDetailGoodResult } from '@/types/detail'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps<{
	goods: IDetailGoodResult
	modelValue: string
}>()

const emits = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

enum SkuMode {
	/**
	 * 显示加入购物车和立即购买按钮
	 */
	Both = 1,
	/**
	 * 只显示加入购物车按钮
	 */
	Cart = 2,
	/**
	 * 只显示立即购买按钮
	 */
	Buy = 3
}

const skuOpen = ref(false)
const skuMode = ref<SkuMode>(SkuMode.Both)
const goodInfo = ref<SkuPopupLocaldata>()
const skuPopupRef = ref<SkuPopupInstanceType>()

const goods = cloneDeep(props.goods)

/**对数据进行操作 */
watch(
	() => props.goods,
	() => {
		const spec_list = goods.specs.map((item) => ({ name: item.name, list: item.values }))
		for (const item of spec_list) {
			item.list.sort((a, b) => a.name.localeCompare(b.name))
		}
		goodInfo.value = {
			_id: goods.id,
			name: goods.name,
			goods_thumb: goods.mainPictures[0],
			spec_list,
			sku_list: goods.skus.map((item) => ({
				_id: item.id,
				goods_id: goods.id,
				goods_name: goods.name,
				image: item.picture,
				price: parseInt(item.price),
				stock: item.inventory,
				sku_name_arr: item.specs.map((spec) => spec.valueName)
			}))
		}
	},
	{
		immediate: true
	}
)

/**
 * 打开时的回显操作
 */
const openOrClose = (isOpen: boolean) => {
	skuOpen.value = isOpen
	nextTick(() => {
		if (skuOpen.value) {
			console.log(skuPopupRef.value)
			skuPopupRef.value?.selectSku?.({
				sku: goodInfo.value?.spec_list.map((item) => item.list[0].name) || [],
				num: 1
			})
		}
	})
}

/**
 * 关闭时的回调
 */
const handleClose = () => {
	const selectShop = skuPopupRef.value?.selectArr?.join('/').trim()
	if (selectShop == '/') {
		emits('update:modelValue', '')
	} else {
		emits('update:modelValue', selectShop!)
	}
}

// 加入购物车前的判断
async function addCartFn(obj: SkuPopupEvent) {
	const { selectShop } = obj
	await postAddCartAPI({
		count: selectShop.buy_num,
		skuId: selectShop._id
	})
	uni.showToast({
		title: '加入购物车成功',
		icon: 'none'
	})
	skuOpen.value = false
}
// 加入购物车按钮
function addCart(selectShop: any) {
	console.log('监听 - 加入购物车')
	addCartFn({
		selectShop: selectShop,
		success: function (res: any) {
			// 实际业务时,请替换自己的加入购物车逻辑
			toast(res.msg)
			setTimeout(function () {
				skuOpen.value = false
			}, 300)
		}
	})
}

// 立即购买
function buyNow(selectShop: any) {
	console.log('监听 - 立即购买')
	addCartFn({
		selectShop: selectShop,
		success: function () {
			// 实际业务时,请替换自己的立即购买逻辑
			toast('立即购买')
		}
	})
}

function toast(msg: string) {
	uni.showToast({
		title: msg,
		icon: 'none'
	})
}

defineExpose({
	openOrClose
})
</script>

<template>
	<view class="app">
		<vk-data-goods-sku-popup
			ref="skuPopupRef"
			v-model="skuOpen"
			border-radius="20"
			:localdata="goodInfo"
			:mode="skuMode"
			:amount-type="0"
			@close="handleClose"
			@add-cart="addCart"
			@buy-now="buyNow"
		></vk-data-goods-sku-popup>
	</view>
</template>

<style scoped lang="scss"></style>
