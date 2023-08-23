/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-12 16:49:11
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-13 18:02:42
 * @FilePath: \hello-uniapp\src\api\user.ts
 * @Description:
 */
import type { IHomeBanner, IHomeCategory, IHomeHotRecommend } from '@/types/user'

/**
 * @description: 获取轮播图数据
 * @return {*}
 */
export const getHomeBannersAPI = () => {
	return get<IHomeBanner[]>({
		url: '/home/banner'
	})
}

/**
 * @description 获取首页分类数据
 * @returns
 */
export const getHomeCategoryAPI = () => {
	return get<IHomeCategory[]>({
		url: '/home/category/mutli'
	})
}

/**
 * @description:首页热门推荐
 * @return {*}
 */
export const getHomeHotRecommendAPI = () => {
	return get<IHomeHotRecommend[]>({
		url: '/home/hot/mutli'
	})
}
