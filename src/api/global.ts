/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-13 20:15:18
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-26 10:13:05
 * @FilePath: \hello-uniapp\src\api\global.ts
 * @Description:
 */
import type { IGlobalGuessLike, IGlobalPageParams, IGlobalPageResult, IGlobalBanner } from '@/types/global'

/**
 * distributionSite: 1 为首页(默认值) 2为分类
 * @description: 获取轮播图数据
 * @return {*}
 */
export const getGlobalBannersAPI = (distributionSite = 1) => {
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
