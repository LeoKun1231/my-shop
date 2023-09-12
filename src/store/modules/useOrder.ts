/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-11 20:44:45
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-11 20:49:35
 * @FilePath: \hello-uniapp\src\store\modules\useOrder.ts
 * @Description:
 */
export const useOrderStore = defineStore(
	'order',
	() => {
		const currentType = ref('0')

		const setCurrentType = (type: string) => {
			currentType.value = type
		}

		return {
			currentType,
			setCurrentType
		}
	},
	{
		persist: true
	}
)
