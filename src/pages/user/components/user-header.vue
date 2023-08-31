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

/**
 * 前往个人资料页
 */
const goToProfile = () => {
	uni.navigateTo({
		url: '/sub-pages/profile/profile'
	})
}

/**
 * 查看头像
 */
const lookAvatar = () => {
	uni.previewImage({
		current: user.value!.avatar,
		urls: [user.value!.avatar]
	})
}

/**
 * 前往设置页面
 */
const handleGoToSetting = () => {
	uni.navigateTo({
		url: '/sub-pages/setting/setting'
	})
}
</script>

<template>
	<view>
		<view class="bg-[#fbb957] rounded-bl-10 rounded-br-10 px-4 pb-20" :style="{ paddingTop: 30 + safeAreaTop + 'px' }">
			<view class="between">
				<view class="flex items-center">
					<image
						:src="
							user?.avatar ||
							'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png'
						"
						class="w-16 h-16 rounded-full"
						@click="lookAvatar"
					/>
					<view class="flex-col around h-14 ml-2 text-white">
						<view>{{ user?.nickname || user?.account || '未登录' }}</view>
						<view class="text-center border-1 border-white border-solid px-1 py-0.5 rounded-full text-xs" @click="goToProfile">
							{{ user ? '更新头像昵称' : '点击登录账号' }}
						</view>
					</view>
				</view>

				<view class="h-14 flex items-end text-white" @click="handleGoToSetting">设置</view>
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
