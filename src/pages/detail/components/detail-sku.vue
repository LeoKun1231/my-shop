<script setup lang="ts">
import { postAddCartAPI } from '@/api/cart'
import type {
	SkuPopupEvent,
	SkuPopupInstanceType,
	SkuPopupLocaldata
} from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup'
import type { IDetailGoodResult } from '@/types/detail'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps<{
	goods: IDetailGoodResult
	modelValue: string
	addressId: string
}>()

const emits = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const skuOpen = ref(false)
const goodInfo = ref<SkuPopupLocaldata>()
const skuPopupRef = ref<SkuPopupInstanceType>()

const modeStore = useSkuModeStore()
const { skuMode } = storeToRefs(modeStore)

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
	// nextTick(() => {
	// 	if (skuOpen.value) {
	// 		console.log(skuPopupRef.value)
	// 		skuPopupRef.value?.selectSku?.({
	// 			sku: goodInfo.value?.spec_list.map((item) => item.list[0].name) || [],
	// 			num: 1
	// 		})
	// 	}
	// })
}

/**
 * 关闭时的回调
 */
const handleClose = () => {
	const selectShop = skuPopupRef.value?.selectArr?.join(' ').trim()
	if (selectShop == '/') {
		emits('update:modelValue', '')
	} else {
		emits('update:modelValue', selectShop!)
	}
}

// 加入购物车前的判断
async function addCartFn(selectShop: SkuPopupEvent) {
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
function addCart(selectShop: SkuPopupEvent) {
	addCartFn(selectShop)
}

// 立即购买
async function buyNow(selectShop: SkuPopupEvent) {
	if (props.addressId) {
		uni.navigateTo({
			url: `/sub-pages/order/order?id=${selectShop._id}&count=${selectShop.buy_num}&addressId=${props.addressId}`
		})
	} else {
		uni.navigateTo({
			url: `/sub-pages/order/order?id=${selectShop._id}&count=${selectShop.buy_num}`
		})
	}

	skuOpen.value = false
}

defineExpose({
	openOrClose
})
</script>

<template>
	<vk-data-goods-sku-popup
		ref="skuPopupRef"
		v-model="skuOpen"
		border-radius="20"
		:localdata="goodInfo"
		:mode="skuMode"
		:amount-type="0"
		buy-now-background-color="linear-gradient(90deg, #FE6035, #EF1224)"
		add-cart-background-color="linear-gradient(90deg, #FFCD1E, #FF8A18)"
		@close="handleClose"
		@add-cart="addCart"
		@buy-now="buyNow"
	></vk-data-goods-sku-popup>
</template>

<style scoped lang="scss"></style>
