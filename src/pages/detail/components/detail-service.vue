<script setup lang="ts">
const data = [
	{ title: '无忧退货', content: '自收到商品之日起30天内，可在线申请无忧退货服务（食品等特殊商品除外）' },
	{
		title: '快速退款',
		content:
			'收到退货包裹并确认无误后，将在48小时内办理退款， 退款将原路返回，不同银行处理时间不同，预计1-5个工作日到账 '
	},
	{ title: '满88元免邮费', content: '单笔订单金额(不含运费)满88元可免邮费，不满88元， 单笔订单收取10元邮费' }
]
</script>

<template>
	<!-- 内容 -->
	<view class="px-2">
		<view class="item py-1.5" v-for="item in data" :key="item.title">
			<view class="before:(content-[''] inline-block w-1.5 h-1.5 bg-[#999] rounded-full mb-0.5 mr-1 ) text-[#666]">{{
				item.title
			}}</view>
			<view class="text-sm py-1 text-[#999] ml-2.5">{{ item.content }}</view>
		</view>
	</view>
</template>

<style lang="scss"></style>
