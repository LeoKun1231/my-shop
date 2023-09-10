<script setup lang="ts">
const emits = defineEmits<{
	(e: 'change', value: string): void
}>()

const addressStore = useAddressStore()
addressStore.getAddressListData()
const { addressList } = storeToRefs(addressStore)

const handleGoToNewAddress = () => {
	uni.navigateTo({
		url: `/sub-pages/address-form/address-form`
	})
}

const currentIndex = ref(0)
const radioChange: UniHelper.RadioGroupOnChange = (e) => {
	emits('change', e.detail.value)
}
</script>

<template>
	<view class="address">
		<scroll-view scroll-y class="cart-address">
			<radio-group @change="radioChange">
				<view class="flex items-center py-2" v-for="(address, index) in addressList" :key="address.id">
					<view class="w-10 center">
						<image src="@/static/images/location.png" class="h-5 w-5" />
					</view>
					<view class="flex-1 text-[#666]">
						<view class="user">{{ address.receiver }} {{ address.contact }}</view>
						<view class="text-xs">{{ address.fullLocation }}</view>
					</view>
					<radio color="#fbb957" style="transform: scale(0.8)" :value="address.id" :checked="index === currentIndex" />
				</view>
			</radio-group>
		</scroll-view>
		<view class="mt-5 bg-[#fbb957] rounded-full py-2 text-white text-center" @click="handleGoToNewAddress">
			新建地址
		</view>
	</view>
</template>

<style scoped lang="scss">
.cart-address {
	max-height: 400rpx;
}
</style>
