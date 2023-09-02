<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-01 19:40:23
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-02 20:12:38
 * @FilePath: \hello-uniapp\src\sub-pages\address-form\address-form.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IAddress } from '@/types/address'

const query = defineProps<{
	id?: string
}>()

// 设置标题
uni.setNavigationBarTitle({ title: query.id ? '编辑地址' : '新增地址' })

onLoad(() => {
	if (query.id) {
		getAddressDetailData(query.id)
	}
})

/**
 * 获取地址详情
 * @param id
 */
const addressForm = ref<IAddress>({} as IAddress)
async function getAddressDetailData(id: string) {
	const { result } = await getAddressDetailAPI(id)
	addressForm.value = { ...result }
}

// #ifdef MP-WEIXIN
/**
 * 处理城市选择
 */
const handleRegionPickerChange: UniHelper.RegionPickerOnChange = (e) => {
	console.log(e.detail.value)
	const fullLocation = e.detail.value.join(' ')
	const [provinceCode, cityCode, countyCode] = e.detail.code!
	addressForm.value = {
		...addressForm.value,
		provinceCode,
		cityCode,
		countyCode,
		fullLocation
	}
}
// #endif

// #ifdef APP-PLUS || H5
/**
 * 处理城市选择
 */
const handleCityPickerChange: UniHelper.UniDataPickerOnChange = (e) => {
	//地址字符串
	const fullLocation = e.detail.value.map((item) => item.text).join('/')
	//省市区编码
	const [provinceCode, cityCode, countyCode] = e.detail.value.map((item) => item.value)
	addressForm.value = {
		...addressForm.value,
		provinceCode,
		cityCode,
		countyCode,
		fullLocation
	}
}
// #endif

/**
 * 处理默认地址切换
 * @param e
 */
const handleIsDefaultAddressChange: UniHelper.SwitchOnChange = (e) => {
	addressForm.value.isDefault = e.detail.value ? 1 : 0
}

/**
 * 处理地址保存
 */
const uniFormsRef = ref<UniHelper.UniFormsInstance>()
const handleSaveAddressDetail = async () => {
	try {
		await uniFormsRef.value?.validate?.()
		if (!query.id) {
			await postAddressAPI({ ...addressForm.value })
			uni.showToast({
				title: '新增成功',
				icon: 'none',
				complete: () => {
					uni.navigateBack()
				}
			})
		} else {
			await putAddressAPI(query.id, { ...addressForm.value })
			uni.showToast({
				title: '修改成功',
				icon: 'none',
				complete: () => {
					uni.navigateBack()
				}
			})
		}
	} catch (error) {
		console.log(error)
		uni.showToast({
			title: '请完善信息',
			icon: 'fail'
		})
	}
}

const uniFormsRules: UniHelper.UniFormsRules = {
	receiver: {
		rules: [{ required: true, errorMessage: '请输入收货人姓名' }]
	},
	contact: {
		rules: [
			{ required: true, errorMessage: '请输入联系方式' },
			{ pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' }
		]
	},
	fullLocation: {
		rules: [{ required: true, errorMessage: '请选择所在地区' }]
	},
	address: {
		rules: [{ required: true, errorMessage: '请选择详细地址' }]
	}
}
</script>

<template>
	<view class="m-3 bg-white text-xs">
		<uni-forms :model="addressForm" ref="uniFormsRef" :rules="uniFormsRules">
			<app-form-item label="收货人">
				<uni-forms-item name="receiver">
					<input v-model="addressForm.receiver" placeholder="请填写收货人姓名" />
				</uni-forms-item>
			</app-form-item>
			<app-form-item label="手机号码">
				<uni-forms-item name="contact">
					<input v-model="addressForm.contact" placeholder="请填写收货人手机号码" />
				</uni-forms-item>
			</app-form-item>
			<app-form-item label="所在地区">
				<uni-forms-item name="fullLocation">
					<!-- #ifdef MP-WEIXIN -->
					<picker mode="region" @change="handleRegionPickerChange">
						<view v-if="addressForm.fullLocation">{{ addressForm.fullLocation }}</view>
						<view v-else class="text-[#808080] text-sm">请选择地址</view>
					</picker>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS || H5 -->
					<uni-data-picker
						placeholder="请选择地址"
						popup-title="请选择城市"
						collection="opendb-city-china"
						field="code as value, name as text"
						orderby="value asc"
						:step-searh="true"
						:border="false"
						self-field="code"
						parent-field="parent_code"
						@change="handleCityPickerChange"
					>
						<view v-if="addressForm.fullLocation">{{ addressForm.fullLocation }}</view>
						<view v-else class="text-[#808080] text-sm">请选择地址</view>
					</uni-data-picker>
					<!-- #endif -->
				</uni-forms-item>
			</app-form-item>
			<app-form-item label="详细地址">
				<uni-forms-item name="address">
					<input v-model="addressForm.address" placeholder="街道、楼牌号等信息" />
				</uni-forms-item>
			</app-form-item>
			<app-form-item label="设置默认地址" class="border-b-transparent">
				<uni-forms-item name="isDefault">
					<view class="flex justify-end">
						<switch
							:checked="!!addressForm.isDefault"
							color="#fbb957"
							style="transform: scale(0.8)"
							@change="handleIsDefaultAddressChange"
						/>
					</view>
				</uni-forms-item>
			</app-form-item>
		</uni-forms>
	</view>
	<view class="m-3 bg-[#fbb957] py-2 text-white text-center rounded-full" @click="handleSaveAddressDetail">保存并使用 </view>
</template>

<style lang="scss">
page {
	background-color: #f4f4f4;
	height: 100%;
}
:deep(.uni-input-wrapper) {
	font-size: 14px !important;
}
:deep(.uni-forms-item__content) {
	height: fit-content !important;
}
:deep(.uni-forms-item) {
	margin-bottom: 0 !important;
	height: 22px;
}
</style>
