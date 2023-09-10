import type { IAddress } from '@/types/address'

/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-07 13:26:17
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-09 18:23:42
 * @FilePath: \hello-uniapp\src\store\modules\useAddress.ts
 * @Description:
 */
export const useAddressStore = defineStore(
	'address',
	() => {
		const address = ref<IAddress>()

		const setAddress = (payload: IAddress | undefined) => {
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
