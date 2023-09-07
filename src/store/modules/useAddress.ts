import type { IAddress } from '@/types/address'

/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-07 13:26:17
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-07 13:32:28
 * @FilePath: \hello-uniapp\src\store\modules\useAddress.ts
 * @Description:
 */
export const useAddressStore = defineStore(
	'address',
	() => {
		const address = ref<IAddress>()

		const setAddress = (payload: IAddress) => {
			address.value = payload
		}
		return {
			address,
			setAddress
		}
	},
	{
		persist: true
	}
)
