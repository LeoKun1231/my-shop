/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-04 16:12:56
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-06 20:01:34
 * @FilePath: \hello-uniapp\src\api\cart.ts
 * @Description:
 */
import type { ICartAddResult, ICartAddBody, ICartListItem } from '@/types/cart'

/**
 * 添加购物车
 */
export const postAddCartAPI = (data: ICartAddBody) => {
	return post<ICartAddResult>({
		url: '/member/cart',
		data
	})
}

/**
 * 获取购物车列表
 * @returns
 */
export const getCartListAPI = () => {
	return get<ICartListItem[]>({
		url: '/member/cart'
	})
}

/**
 * 删除购物车
 * @param id
 * @returns
 */
export const deleteCartAPI = (id: string) => {
	return deleteRequest({
		url: '/member/cart',
		data: {
			ids: [id]
		}
	})
}

/**
 * 修改购物车单品
 * @param id
 * @param data
 * @returns
 */
export const putCartAPI = (id: string, data: { selected?: boolean; count?: number }) => {
	return put({
		url: `/member/cart/${id}`,
		data
	})
}

/**
 * 全选购物车
 * @returns
 */
export const putCartAllSelectedAPI = (selected: boolean) => {
	return put({
		url: '/member/cart/selected',
		data: {
			selected
		}
	})
}
