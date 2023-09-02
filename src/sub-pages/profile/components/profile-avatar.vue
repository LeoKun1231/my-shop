<script setup lang="ts">
import type { Data } from '@/types/global'
import type { IAvatar } from '@/types/profile'

const { safeAreaTop } = useSystem()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

/**
 * 返回
 */
const goBack = () => {
	uni.navigateBack()
}

/**
 * 更新用户头像
 */
const changeAvatar = async () => {
	// 上传单张图片
	const { result } = await uploadSingleImage<Data<IAvatar>>()
	user.value!.avatar = result.avatar
}
</script>

<template>
	<view class="bg-[#fbb957]" :style="{ paddingTop: safeAreaTop + 12 + 'px' }">
		<view class="flex text-white items-center">
			<view class="w-10 center" @click="goBack">
				<view class="i-carbon-chevron-left text-lg"> </view>
			</view>
			<view class="flex-1 text-center text-lg">个人中心</view>
			<view class="w-10"></view>
		</view>
		<view class="center flex-col py-5">
			<image class="w-20 h-20 rounded-full" :src="user?.avatar" @click="changeAvatar" />
			<view class="text-white mt-2 text-sm" @click="changeAvatar">点击更换头像</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
