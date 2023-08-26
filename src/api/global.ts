import type { IGlobalGuessLike, IGlobalPageParams, IGlobalPageResult, IGlobalBanner } from '@/types/global'

/**
 * distributionSite: 1 为首页(默认值) 2为分类
 * @description: 获取轮播图数据
 * @return {*}
 */
export const getGlobalBannersAPI = (distributionSite?: number) => {
	return get<IGlobalBanner[]>({
		url: '/home/banner',
		data: {
			distributionSite
		}
	})
}

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
