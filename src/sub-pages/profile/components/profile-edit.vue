<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-31 11:03:02
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-02 20:16:40
 * @FilePath: \hello-uniapp\src\sub-pages\profile\components\profile-edit.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IProfile } from '@/types/profile'
import cloneDeep from 'lodash/cloneDeep'

// 定义props
const props = defineProps<{
	profile: IProfile
}>()

// 使用useUserStore
const userStore = useUserStore()
// 获取userStore中的user
const { user } = storeToRefs(userStore)

// 定义sexRange
const sexRange: UniHelper.UniDataCheckboxLocaldata = [
	{ text: '男', value: '男' },
	{ text: '女', value: '女' }
]

// 定义componentProfile
const componentProfile = ref({} as IProfile)
// 监听profile的变化
watch(
	() => props.profile,
	() => {
		componentProfile.value = cloneDeep(props.profile)
	}
)

// 计算出user的birthday
const endDate = computed(() => {
	return formatDate(new Date())
})
// 监听datePicker的变化
const handleDatePickerChange: UniHelper.DatePickerOnChange = (e) => {
	componentProfile.value.birthday = e.detail.value
}

const cityCodes = ref<[string, string, string]>(['', '', ''])

// #ifdef MP-WEIXIN
/**
 * 处理城市选择
 */
const handleRegionPickerChange: UniHelper.RegionPickerOnChange = (e) => {
	console.log(e.detail.value)
	const fullLocation = e.detail.value.join(' ')
	const [provinceCode, cityCode, countyCode] = e.detail.code!
	cityCodes.value = [provinceCode, cityCode, countyCode]
	componentProfile.value.fullLocation = fullLocation
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
	cityCodes.value = [provinceCode, cityCode, countyCode]
	componentProfile.value.fullLocation = fullLocation
}
// #endif

// 处理保存profile
const handleSaveProfile = async () => {
	const { birthday, gender, nickname, profession } = componentProfile.value
	const [provinceCode, cityCode, countyCode] = cityCodes.value
	await putUserProfileAPI({
		birthday,
		gender,
		nickname,
		profession,
		countyCode,
		cityCode,
		provinceCode
	})
	user.value!.nickname = nickname
	uni.showToast({
		title: '保存成功',
		icon: 'success',
		success: () => {
			uni.navigateBack()
		}
	})
}
</script>

<template>
	<view class="mx-3 bg-white mt-3 mb-6">
		<app-form-item label="账号">
			<view class="text-gray">{{ user?.account }}</view>
		</app-form-item>
		<app-form-item label="昵称">
			<input v-model="componentProfile.nickname" placeholder="请填写昵称" />
		</app-form-item>
		<app-form-item label="性别">
			<uni-data-checkbox
				v-model="componentProfile.gender"
				selectedColor="#fbb957"
				:localdata="sexRange"
			></uni-data-checkbox>
		</app-form-item>
		<app-form-item label="生日">
			<picker
				placeholder="请选择生日时间"
				:value="componentProfile.birthday"
				mode="date"
				start="1900-01-01"
				:end="endDate"
				@change="handleDatePickerChange"
			>
				<view class="text-[#333]">{{ componentProfile.birthday }}</view>
			</picker>
		</app-form-item>
		<app-form-item label="城市">
			<!-- #ifdef MP-WEIXIN -->
			<picker mode="region" @change="handleRegionPickerChange">
				<view v-if="componentProfile.fullLocation">{{ componentProfile.fullLocation }}</view>
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
				<view v-if="componentProfile.fullLocation">{{ componentProfile.fullLocation }}</view>
				<view v-else class="text-[#808080] text-sm">请选择地址</view>
			</uni-data-picker>
			<!-- #endif -->
		</app-form-item>
		<app-form-item class="border-b-transparent" label="职业">
			<input v-model="componentProfile.profession" placeholder="请填写职业" />
		</app-form-item>
	</view>
	<view class="bg-[#fbb957] text-white py-3 center w-94% rounded-full text-center m-auto" @click="handleSaveProfile"
		>保&nbsp;存</view
	>
</template>

<style scoped lang="scss">
:deep(.uni-data-tree-input) {
	& > .input-value {
		padding: 0;
	}
}
</style>
