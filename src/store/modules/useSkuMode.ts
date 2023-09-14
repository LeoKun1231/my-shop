/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-06 09:27:29
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-14 16:51:09
 * @FilePath: \hello-uniapp\src\store\modules\useMode.ts
 * @Description:
 */
export enum SkuMode {
	/**
	 * 显示加入购物车和立即购买按钮
	 */
	Both = 1,
	/**
	 * 只显示加入购物车按钮
	 */
	Cart = 2,
	/**
	 * 只显示立即购买按钮
	 */
	Buy = 3
}
export const useSkuModeStore = defineStore(
	'mode',
	() => {
		const skuMode = ref<SkuMode>(1)

		const setSkuMode = (value: SkuMode) => {
			skuMode.value = value
		}

		return {
			skuMode,
			setSkuMode
		}
	},
	{
		persist: true
	}
)
