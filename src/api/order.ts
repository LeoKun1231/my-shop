/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-07 10:42:29
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-11 20:12:44
 * @FilePath: \hello-uniapp\src\api\order.ts
 * @Description:
 */
import type { IGlobalPageParams, IGlobalPageResult } from '@/types/global'
import type {
	IOrderDetailResult,
	IOrderList,
	IOrderLogisticsResult,
	IOrderPostParams,
	IOrderPreResult
} from '@/types/order'

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
 * 获取立即购买订单
 * @param data
 * @returns
 */
export const getOrderPreNowAPI = (data: { skuId: string; count: string; addressId?: string }) => {
	return get<IOrderPreResult>({
		url: '/member/order/pre/now',
		data
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

/**
 * @description: 取消订单
 * @param id 订单id
 * @param cancelReason 订单原因
 * @returns
 */
export const putCancelOrderAPI = (id: string, cancelReason: string) => {
	return put({
		url: `/member/order/${id}/cancel`,
		data: {
			cancelReason
		}
	})
}

/**
 * @description: 删除订单
 * @param ids 订单id数组
 */
export const deleteOrderAPI = (ids: string[]) => {
	return deleteRequest({
		url: '/member/order',
		data: {
			ids
		}
	})
}

/**
 * 获取再次购买订单信息
 */
export const getOrderAgainAPI = (id: string) => {
	return get<IOrderPreResult>({
		url: `/member/order/repurchase/${id}`
	})
}

/**
 * 获取微信支付参数
 * @param orderId 订单id
 * @returns
 */
export const getWeiXinPayParamsAPI = (orderId: string) => {
	return get({
		url: '/pay/wxPay/miniPay',
		data: {
			orderId
		}
	})
}

/**
 * 模拟微信支付
 * @param orderId 订单id
 * @returns
 */
export const getOrderMockPayAPI = (orderId: string) => {
	return get({
		url: '/pay/mock',
		data: {
			orderId
		}
	})
}

/**
 * 确认收货
 * @param id
 * @returns
 */
export const putOrderConfirmOrderDeliveryAPI = (id: string) => {
	return put({
		url: `/member/order/${id}/receipt`
	})
}

/**
 * 模拟发货
 * @param id
 * @returns
 */
export const getOrderMockShipmentAPI = (id: string) => {
	return get({
		url: `/member/order/consignment/${id}`
	})
}

/**
 * 获取订单物流
 * @param id
 * @returns
 */
export const getOrderLogisticsAPI = (id: string) => {
	return get<IOrderLogisticsResult>({
		url: `/member/order/${id}/logistics`
	})
}

/**
 * 获取订单列表
 * @param data
 * @returns
 */
export const getOrderListAPI = (data: IGlobalPageParams & { orderState?: number }) => {
	return get<IGlobalPageResult<IOrderList>>({
		url: '/member/order',
		data
	})
}
