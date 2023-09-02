/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-01 19:44:52
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-02 17:55:32
 * @FilePath: \hello-uniapp\src\api\address.ts
 * @Description:
 */

import type { IAddress } from '@/types/address'

/**
 * 获取地址列表
 */
export const getAddressListAPI = () => {
	return get<IAddress[]>({
		url: '/member/address'
	})
}

/**
 * 删除地址
 * @param id 地址id
 * @returns
 */
export const deleteAddressAPI = (id: string) => {
	return deleteRequest({
		url: `/member/address/${id}`
	})
}

/**
 * 获取地址详情
 * @param id 地址id
 * @returns
 */
export const getAddressDetailAPI = (id: string) => {
	return get<IAddress>({
		url: `/member/address/${id}`
	})
}

/**
 * 添加新地址
 */
export const postAddressAPI = (data: Omit<IAddress, 'id' | 'fullLocation'>) => {
	return post({
		url: '/member/address',
		data
	})
}

/**
 * 修改地址
 */
export const putAddressAPI = (id: string, data: Omit<IAddress, 'id' | 'fullLocation'>) => {
	return put({
		url: `/member/address/${id}`,
		data
	})
}
