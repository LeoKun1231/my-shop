<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-30 20:05:48
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-02 12:10:45
 * @FilePath: \hello-uniapp\src\sub-pages\profile\profile.vue
 * @Description: 
-->
<script setup lang="ts">
import type { IProfile } from '@/types/profile'

getUserProfileData()

/**
 * 获取用户信息
 */
const profileData = ref<IProfile>({} as IProfile)
async function getUserProfileData() {
	const { result } = await getUserProfileAPI()
	profileData.value = result
}
</script>

<template>
	<profile-avatar />
	<profile-edit :profile="profileData" />
</template>

<style lang="scss">
page {
	background-color: #f4f4f4;
}
</style>
