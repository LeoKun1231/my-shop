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
export const useModeStore = defineStore(
	'mode',
	() => {
		const mode = ref<SkuMode>(SkuMode.Both)

		const setMode = (value: SkuMode) => {
			mode.value = value
		}

		return {
			mode,
			setMode
		}
	},
	{
		persist: true
	}
)
