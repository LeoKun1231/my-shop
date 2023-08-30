/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-30 15:23:34
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-30 15:24:02
 * @FilePath: \hello-uniapp\src\composables\userAppGuessLike.ts
 * @Description:
 */
import type AppGuessLike from '@/components/app-guess-like/app-guess-like.vue'

export default function () {
	const appGuessLikeRef = ref<InstanceType<typeof AppGuessLike>>()

	function getMore() {
		appGuessLikeRef.value?.getGuessLikeData()
	}

	function refreshData() {
		return appGuessLikeRef.value?.refreshData
	}

	return {
		appGuessLikeRef,
		getMore,
		refreshData
	}
}
