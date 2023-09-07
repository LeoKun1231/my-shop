/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-07 10:42:29
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-07 16:55:44
 * @FilePath: \hello-uniapp\src\api\order.ts
 * @Description:
 */
import type { IOrderDetailResult, IOrderPostParams, IOrderPreResult } from '@/types/order'

/**
 * 获取订单预付信息
 * @returns
 */
export const getOrderPreAPI = () => {
	return get<IOrderPreResult>({
		url: '/member/order/pre'
	})
}

/**
 * 提交订单
 */
export const postOrderAPI = (data: IOrderPostParams) => {
	return post<{ id: string }>({
		url: '/member/order',
		data
	})
}

/**
 * 获取订单详情
 * @param id 订单id
 * @returns
 */
export const getOrderDetailAPI = (id: string) => {
	return get<IOrderDetailResult>({
		url: `/member/order/${id}`
	})
}
