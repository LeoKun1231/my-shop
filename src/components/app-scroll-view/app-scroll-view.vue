<script setup lang="ts">
import { throttle } from 'lodash'
withDefaults(
	defineProps<{
		refresherEnabled?: boolean
		refresherTriggered?: boolean
		refresherrefresh?: () => void
		scrolltolower: () => void
	}>(),
	{
		refresherEnabled: true
	}
)

const isShowFabWithAnimation = ref(false)
const isShowFab = ref(false)
const scrollTop = ref<number>(0)

const { windowBottom } = useSystem()

/**
 * 监听scrollView滚动
 */
const handleScroll = throttle<UniHelper.ScrollViewOnScroll>((e) => {
	console.log(e.detail.scrollTop)
	isShowFab.value = isShowFab.value || e.detail.scrollTop >= 1200
	isShowFabWithAnimation.value = e.detail.scrollTop >= 1200
}, 100)

/**
 * 返回顶部
 */
const handleFabClick = () => {
	if (isShowFabWithAnimation.value) {
		//确保每次都能返回顶部
		scrollToTop()
	}
	isShowFabWithAnimation.value = false
	isShowFab.value = false
}

/**
 * 滑动到顶部
 */
function scrollToTop() {
	scrollTop.value = scrollTop.value ? 0 : 0.1
}

/**
 * 第一次会做一次动画 得去掉
 */
onShow(() => {
	isShowFab.value = false
})

defineExpose({
	scrollToTop
})
</script>
<template>
	<scroll-view
		scroll-y
		scroll-with-animation
		class="flex-1 h-full overflow-hidden"
		:refresher-enabled="refresherEnabled"
		:scroll-top="scrollTop"
		:refresher-triggered="refresherTriggered"
		@scroll="handleScroll"
		@refresherrefresh="refresherrefresh"
		@scrolltolower="scrolltolower"
	>
		<slot></slot>
	</scroll-view>
	<view
		v-if="isShowFab"
		:class="{
			disapper: !isShowFabWithAnimation,
			show: isShowFabWithAnimation,
			'h-12 w-12 rounded-full fab fixed bg-[#fbb957] right-4 center': true
		}"
		:style="{ bottom: windowBottom + 30 + 'px' }"
		@click="handleFabClick"
	>
		<view class="i-carbon-arrow-up text-7 text-white"></view>
	</view>
</template>

<style lang="scss" scoped>
.disapper {
	animation: out ease-in-out 500ms forwards;
}

.show {
	animation: in ease-in-out 500ms;
}
.fab {
	box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.3);
}

@keyframes out {
	0% {
		opacity: 1;
		transform: scale(1, 1);
	}
	100% {
		opacity: 0;
		transform: scale(0, 0);
	}
}

@keyframes in {
	0% {
		opacity: 0;
		transform: scale(0, 0);
	}

	100% {
		opacity: 1;
		transform: scale(1, 1);
	}
}
</style>
