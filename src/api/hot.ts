/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-22 10:46:35
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-22 11:09:08
 * @FilePath: \hello-uniapp\src\api\hot.ts
 * @Description:
 */

import type { IHotData, IHotQuery } from '@/types/hot'

/**
 * 获取热门推荐详情数据
 * @param url
 * @param data
 * @returns
 */
export const getHotDataAPI = (url: string, data?: IHotQuery) => {
	return get<IHotData>({
		url,
		data
	})
}
