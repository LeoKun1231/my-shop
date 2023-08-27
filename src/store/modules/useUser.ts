import { defineStore } from 'pinia'
import type { ILoginInfo } from '@/types/login'

export const useUserStore = defineStore(
	'user',
	() => {
		const user = ref<ILoginInfo>()

		return {
			user
		}
	},
	{
		persist: true
	}
)
