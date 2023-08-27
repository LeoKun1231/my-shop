<script setup lang="ts">
const currentIndex = ref(0)

const addresses = [
	{ name: '李明', phone: '13824686868', address: '北京市顺义区后沙峪地区安平北街6号院' },
	{ name: '张三', phone: '13824686868', address: '北京市顺义区后沙峪地区安平北街6号院' },
	{ name: '王五', phone: '13824686868', address: '北京市顺义区后沙峪地区安平北街6号院' }
]

const handleSelect = (index: number) => {
	currentIndex.value = index
}
</script>

<template>
	<view class="address">
		<view class="flex items-center py-2" v-for="(address, index) in addresses" :key="address.name">
			<view class="w-10 center">
				<image src="@/static/images/location.png" class="h-5 w-5" />
			</view>
			<view class="flex-1 text-[#666]">
				<view class="user">{{ address.name }} {{ address.phone }}</view>
				<view class="text-xs">{{ address.address }}</view>
			</view>
			<view class="w-10 center" @click="handleSelect(index)">
				<image v-if="currentIndex == index" src="@/static/images/select.png" class="h-5 w-5" />
				<image v-else src="@/static/images/unselect.png" class="h-5 w-5" />
			</view>
		</view>
		<view class="mt-5 bg-[#fbb957] rounded-full py-2 text-white text-center"> 新建地址 </view>
	</view>
</template>

<style scoped lang="scss"></style>
