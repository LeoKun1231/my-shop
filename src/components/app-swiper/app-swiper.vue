<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-12 18:33:07
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-26 12:16:09
 * @FilePath: \hello-uniapp\src\components\app-swiper\app-swiper.vue
 * @Description:
-->
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		urls: string[]
		height?: string
	}>(),
	{
		height: '10rem'
	}
)
const currentIndex = ref(0)

/**
 * 设置当前轮播图索引
 * @param e
 */
const onSwiperChange: UniHelper.SwiperOnChange = (e) => {
	currentIndex.value = e.detail!.current
}

/**
 * 轮播图预览
 */
function onImagePreview() {
	uni.previewImage({
		current: currentIndex.value,
		urls: props.urls,
		loop: true,
		indicator: 'number'
	})
}
</script>

<template>
	<uni-swiper-dot :info="urls" :current="currentIndex" field="content">
		<swiper :style="{ height: height }" @change="onSwiperChange" autoplay circular>
			<swiper-item v-for="item in urls" :key="item">
				<image class="h-full w-full" :src="item" mode="aspectFill" @click="onImagePreview()" />
			</swiper-item>
		</swiper>
	</uni-swiper-dot>
</template>

<style scoped lang="scss"></style>
