<script setup lang="ts">
const props = defineProps<{
	urls: string[]
}>()
const currentBannerIndex = ref(0)
/**
 * 设置轮播图当前索引
 * @param
 */
const handleSwiperChange: UniHelper.SwiperOnChange = (e) => {
	currentBannerIndex.value = e.detail.current
}

/**
 * 点击轮播图 查看大图
 * @param pic
 */
const handleBannerClick = (pic: string) => {
	uni.previewImage({
		current: pic,
		urls: props.urls
	})
}
</script>

<template>
	<view class="relative">
		<swiper class="h-90" autoplay circular :current="currentBannerIndex" @change="handleSwiperChange">
			<swiper-item v-for="pic in urls" :key="pic">
				<image :src="pic" class="w-full h-full" mode="aspectFill" @click="handleBannerClick(pic)"></image>
			</swiper-item>
		</swiper>
		<view
			class="absolute right-2 bottom-3 center text-sm px-3 py-0.5 w-fit rounded-full bg-[#000] text-white opacity-40"
		>
			<view>{{ currentBannerIndex + 1 }}</view>
			<view class="mx-0.5">/</view>
			<view>{{ urls?.length }}</view>
		</view>
	</view>
</template>

<style scoped lang="scss"></style>
