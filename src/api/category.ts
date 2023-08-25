/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-24 11:08:04
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-24 11:16:31
 * @FilePath: \hello-uniapp\src\api\category.ts
 * @Description:
 */

import type { ICategoryResult } from '@/types/category'

/**
 * 获取分类数据
 * @returns
 */
export const getCategroyDataAPI = () => {
	return get<ICategoryResult[]>({
		url: '/category/top'
	})
}
