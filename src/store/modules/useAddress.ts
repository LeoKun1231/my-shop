import type { IAddress } from '@/types/address'

/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-07 13:26:17
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-10 18:08:24
 * @FilePath: \hello-uniapp\src\store\modules\useAddress.ts
 * @Description:
 */
export const useAddressStore = defineStore(
	'address',
	() => {
		const address = ref<IAddress>()
		const addressList = ref<IAddress[]>()

		const setAddress = (payload: IAddress | undefined) => {
			address.value = payload
		}

		const getAddressListData = async () => {
			const res = await getAddressListAPI()
			addressList.value = res.result
			setAddress(addressList.value.find((item) => item.isDefault))
		}
		return {
			address,
			addressList,
			setAddress,
			getAddressListData
		}
	},
	{
		persist: true
	}
)
