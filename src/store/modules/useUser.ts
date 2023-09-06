/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-11 11:03:55
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-30 17:01:40
 * @FilePath: \hello-uniapp\src\store\modules\useUser.ts
 * @Description:
 */
import { defineStore } from 'pinia'
import type { ILoginInfo } from '@/types/login'

export const useUserStore = defineStore(
	'user',
	() => {
		const user = ref<ILoginInfo>()
		const setUser = (info: ILoginInfo) => {
			user.value = info
		}

		return {
			user,
			setUser
		}
	},
	{
		persist: true
	}
)
