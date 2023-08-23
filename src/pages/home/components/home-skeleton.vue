<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-21 17:48:36
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-21 18:01:14
 * @FilePath: \hello-uniapp\src\pages\home\components\home-skeleton.vue
 * @Description: 
-->
<script setup lang="ts"></script>

<!--
此文件为开发者工具生成，生成时间: 2023/8/21下午5:50:42
使用方法：
在 C:\Users\86173\Documents\资料\uni\hello-uniapp\dist\dev\mp-weixin\pages\home\home.wxml 引入模板

```
<import src="home.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 C:\Users\86173\Documents\资料\uni\hello-uniapp\dist\dev\mp-weixin\pages\home\home.wxss 中引入样式
```
@import "./home.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template>
	<view class="sk-container">
		<view>
			<scroll-view
				:refresher-enabled="true"
				:scroll-with-animation="true"
				:scroll-y="true"
				class="overflow-hidden view--overflow-hidden data-v-82a606f5 view--data-v-82a606f5"
				scroll-top="0"
			>
				<view id="appSwiper">
					<view>
						<view class="uni-swiper__warp dot--uni-swiper__warp">
							<swiper :autoplay="false" :circular="true" class="h-40 swiper--h-40" :current="0">
								<swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px)">
									<image class="h-full swiper--h-full w-full swiper--w-full sk-image" mode="aspectFill"></image>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
				<view class="mx-2">
					<view>
						<view
							class="home-category category--home-category grid category--grid grid-cols-5 category--grid-cols-5 gap-2 category--gap-2 my-4 category--my-4"
						>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-524 sk-text">居家</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-176 sk-text">锦鲤</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-611 sk-text">服饰</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-395 sk-text">母婴</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-977 sk-text">个护</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-781 sk-text">严选</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-511 sk-text">数码</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-187 sk-text">运动</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-30 sk-text">杂项</view>
							</view>
							<view
								class="flex category--flex flex-col category--flex-col justify-center category--justify-center items-center category--items-center"
							>
								<image class="w-12 category--w-12 h-12 category--h-12 sk-image"></image>
								<view class="text-gray category--text-gray sk-transparent sk-text-14-2857-165 sk-text">品牌</view>
							</view>
						</view>
					</view>
					<view>
						<view
							class="home-recommend recommend--home-recommend grid recommend--grid grid-cols-2 recommend--grid-cols-2 gap-2 recommend--gap-2 bg-white recommend--bg-white py-3 recommend--py-3"
						>
							<view>
								<view class="mb-1 recommend--mb-1">
									<text
										class="text-lg recommend--text-lg font-bold recommend--font-bold ml-2 recommend--ml-2 mr-3 recommend--mr-3 sk-transparent sk-text-17-8571-645 sk-text"
										>特惠推荐</text
									>
									<text class="text-gray-400 recommend--text-gray-400 sk-transparent sk-text-14-2857-127 sk-text">精选全攻略</text>
								</view>
								<view class="flex recommend--flex items-center recommend--items-center justify-around recommend--justify-around">
									<image class="h-20 recommend--h-20 w-20 recommend--w-20 sk-image"></image>
									<image class="h-20 recommend--h-20 w-20 recommend--w-20 sk-image"></image>
								</view>
							</view>
							<view>
								<view class="mb-1 recommend--mb-1">
									<text
										class="text-lg recommend--text-lg font-bold recommend--font-bold ml-2 recommend--ml-2 mr-3 recommend--mr-3 sk-transparent sk-text-17-8571-662 sk-text"
										>爆款推荐</text
									>
									<text class="text-gray-400 recommend--text-gray-400 sk-transparent sk-text-14-2857-562 sk-text">最受欢迎</text>
								</view>
								<view class="flex recommend--flex items-center recommend--items-center justify-around recommend--justify-around">
									<image class="h-20 recommend--h-20 w-20 recommend--w-20 sk-image"></image>
									<image class="h-20 recommend--h-20 w-20 recommend--w-20 sk-image"></image>
								</view>
							</view>
							<view>
								<view class="mb-1 recommend--mb-1">
									<text
										class="text-lg recommend--text-lg font-bold recommend--font-bold ml-2 recommend--ml-2 mr-3 recommend--mr-3 sk-transparent sk-text-17-8571-469 sk-text"
										>一站买全</text
									>
									<text class="text-gray-400 recommend--text-gray-400 sk-transparent sk-text-14-2857-34 sk-text">精心优选</text>
								</view>
								<view class="flex recommend--flex items-center recommend--items-center justify-around recommend--justify-around">
									<image class="h-20 recommend--h-20 w-20 recommend--w-20 sk-image"></image>
									<image class="h-20 recommend--h-20 w-20 recommend--w-20 sk-image"></image>
								</view>
							</view>
							<view>
								<view class="mb-1 recommend--mb-1">
									<text
										class="text-lg recommend--text-lg font-bold recommend--font-bold ml-2 recommend--ml-2 mr-3 recommend--mr-3 sk-transparent sk-text-17-8571-496 sk-text"
										>新鲜好物</text
									>
									<text class="text-gray-400 recommend--text-gray-400 sk-transparent sk-text-14-2857-738 sk-text">生活加分项</text>
								</view>
								<view class="flex recommend--flex items-center recommend--items-center justify-around recommend--justify-around">
									<image class="h-20 recommend--h-20 w-20 recommend--w-20 sk-image"></image>
									<image class="h-20 recommend--h-20 w-20 recommend--w-20 sk-image"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<style scoped>
.sk-transparent {
	color: transparent !important;
}
.sk-text-14-2857-92 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 56rpx;
	position: relative !important;
}
.sk-text {
	background-origin: content-box !important;
	background-clip: content-box !important;
	background-color: transparent !important;
	color: transparent !important;
	background-repeat: repeat-y !important;
}
.sk-text-12-5000-208 {
	background-image: linear-gradient(transparent 12.5%, #eeeeee 0%, #eeeeee 87.5%, transparent 0%) !important;
	background-size: 100% 32rpx;
	position: relative !important;
}
.sk-text-12-5000-488 {
	background-image: linear-gradient(transparent 12.5%, #eeeeee 0%, #eeeeee 87.5%, transparent 0%) !important;
	background-size: 100% 32rpx;
	position: relative !important;
}
.sk-text-14-2857-524 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-176 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-611 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-395 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-977 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-781 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-511 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-187 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-30 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-14-2857-165 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-17-8571-645 {
	background-image: linear-gradient(transparent 17.8571%, #eeeeee 0%, #eeeeee 82.1429%, transparent 0%) !important;
	background-size: 100% 56rpx;
	position: relative !important;
}
.sk-text-14-2857-127 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-17-8571-662 {
	background-image: linear-gradient(transparent 17.8571%, #eeeeee 0%, #eeeeee 82.1429%, transparent 0%) !important;
	background-size: 100% 56rpx;
	position: relative !important;
}
.sk-text-14-2857-562 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-17-8571-469 {
	background-image: linear-gradient(transparent 17.8571%, #eeeeee 0%, #eeeeee 82.1429%, transparent 0%) !important;
	background-size: 100% 56rpx;
	position: relative !important;
}
.sk-text-14-2857-34 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-text-17-8571-496 {
	background-image: linear-gradient(transparent 17.8571%, #eeeeee 0%, #eeeeee 82.1429%, transparent 0%) !important;
	background-size: 100% 56rpx;
	position: relative !important;
}
.sk-text-14-2857-738 {
	background-image: linear-gradient(transparent 14.2857%, #eeeeee 0%, #eeeeee 85.7143%, transparent 0%) !important;
	background-size: 100% 44.8rpx;
	position: relative !important;
}
.sk-image {
	background: #efefef !important;
}
.sk-container {
	width: 100%;
	height: 100%;
	flex: 1;
	overflow: hidden;
	background-color: transparent;
}
</style>
