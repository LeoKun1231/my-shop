/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-12 16:49:11
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-25 20:47:26
 * @FilePath: \hello-uniapp\src\api\home.ts
 * @Description:
 */
import type { IHomeCategory, IHomeHotRecommend } from '@/types/home'

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
