import type { IGlobalGuessLike, IGlobalPageParams, IGlobalPageResult } from '@/types/global'

/**
 * 获取猜你喜欢数据
 * @param {IGlobalPageParams} data
 * @returns
 */
export const getGlobalGuessLikeAPI = (data: IGlobalPageParams) => {
	return get<IGlobalPageResult<IGlobalGuessLike>>({
		url: '/home/goods/guessLike',
		data
	})
}
