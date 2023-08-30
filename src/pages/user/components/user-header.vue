<script setup lang="ts">
const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const icons = [
	{ title: '待付款', src: '/static/images/payment.png' },
	{ title: '待发货', src: '/static/images/delivery.png' },
	{ title: '待收货', src: '/static/images/receiving.png' },
	{ title: '待评价', src: '/static/images/payment.png' },
	{ title: '售后', src: '/static/images/chat.png' }
]

const { safeAreaTop } = useSystem()
</script>

<template>
	<view>
		<view class="bg-[#fbb957] rounded-bl-10 rounded-br-10 px-4 pb-20" :style="{ paddingTop: 30 + safeAreaTop + 'px' }">
			<view class="between">
				<view class="flex items-center">
					<image :src="user?.avatar" class="w-16 h-16 rounded-full" />
					<view class="flex-col around h-14 ml-2 text-white">
						<view>{{ user?.nickname || user?.account }}</view>
						<view class="text-center border-1 border-white border-solid px-1 py-0.5 rounded-full text-xs">更新头像昵称</view>
					</view>
				</view>
				<view class="h-14 flex items-end text-white">设置</view>
			</view>
		</view>
		<view class="m-auto bg-white w-94vw shadow-lg px-3 py-5 rounded-3 box-border order-box">
			<view class="between">
				<view>我的订单</view>
				<view class="center text-sm text-[#999]">
					<view>查看全部订单</view>
					<view class="i-carbon-chevron-right"></view>
				</view>
			</view>
			<view class="around mt-4">
				<view class="flex-col center" v-for="icon in icons" :key="icon.title">
					<image :src="icon.src" class="w-6 h-6" />
					<view class="mt-1 text-[#333]">{{ icon.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
.order-box {
	margin-top: -8vh;
}
</style>
