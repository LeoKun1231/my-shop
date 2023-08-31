<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-31 11:03:02
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-31 17:09:36
 * @FilePath: \hello-uniapp\src\sub-pages\profile\components\profile-edit.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IProfile } from '@/types/profile'
import { cloneDeep } from 'lodash'
import CityData from '@/static/data/city.json'

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

const handleCityChange: UniHelper.UniDataPickerOnChange = (e) => {
	const cityData = e.detail.value.map((item) => item.text)
	componentProfile.value.fullLocation = cityData.join(',')
}

// 处理保存profile
const handleSaveProfile = async () => {
	const { birthday, fullLocation, gender, nickname, profession } = componentProfile.value
	await putUserProfileAPI({
		birthday,
		gender,
		nickname,
		profession,
		cityCode: fullLocation[1],
		provinceCode: fullLocation[0]
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
			<uni-data-checkbox v-model="componentProfile.gender" selectedColor="#fbb957" :localdata="sexRange"></uni-data-checkbox>
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
			<uni-data-picker
				:model="componentProfile.fullLocation"
				placeholder="请选择地址"
				popup-title="请选择城市"
				:localdata="CityData as any"
				:map="{ text: 'text', value: 'text' }"
				:border="false"
				@change="handleCityChange"
			>
			</uni-data-picker>
		</app-form-item>
		<app-form-item class="border-b-transparent" label="职业">
			<input v-model="componentProfile.profession" placeholder="请填写职业" />
		</app-form-item>
	</view>
	<view class="bg-[#fbb957] text-white py-3 center w-94% rounded-full text-center m-auto" @click="handleSaveProfile">保&nbsp;存</view>
</template>

<style scoped lang="scss">
:deep(.uni-data-tree-input) {
	& > .input-value {
		padding: 0;
	}
}
</style>
