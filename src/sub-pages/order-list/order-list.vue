<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-10 17:29:28
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-12 17:30:28
 * @FilePath: \hello-uniapp\src\sub-pages\order-list\order-list.vue
 * @Description: 
-->
<script setup lang="ts">
const props = defineProps<{
	type?: string
}>()
const orderStateList = [
	{ type: '0', title: '全部' },
	{ type: '1', title: '待付款' },
	{ type: '2', title: '待发货' },
	{ type: '3', title: '待收货' },
	{ type: '4', title: '待评价' }
]

const currentType = ref(props.type || '0')
const orderStore = useOrderStore()

watchEffect(() => {
	console.log(currentType.value)
	orderStore.setCurrentType(currentType.value)
})

const handleSwiperChange: UniHelper.SwiperOnChange = (e) => {
	currentType.value = e.detail.current + ''
}
const handleTitleClick = (e: string) => {
	currentType.value = e
}
</script>

<template>
	<view class="relative">
		<view class="flex bg-white">
			<view
				class="flex-1 py-3 center"
				@click="handleTitleClick(orderState.type)"
				v-for="orderState in orderStateList"
				:key="orderState.type"
			>
				{{ orderState.title }}
			</view>
		</view>
		<view
			class="absolute left-0 bottom-0 w-20% h-0.75 px-10 bg-[#fbb957] transition-all duration-400"
			:style="{ left: Number(currentType) * 20 + '%' }"
		></view>
	</view>
	<swiper class="h-[calc(100%-45px)]" :current="Number(currentType)" circular @change="handleSwiperChange">
		<swiper-item class="h-full" v-for="item in orderStateList" :key="item.type">
			<order-list-item v-show="currentType == item.type" :type="item.type" />
		</swiper-item>
	</swiper>
</template>

<style lang="scss">
page {
	background: #f4f4f4;
	height: 100%;
}
</style>
