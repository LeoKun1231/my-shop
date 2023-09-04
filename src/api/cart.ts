import type { ICartAddResult, ICartAddBody } from '@/types/cart'

/**
 * 添加购物车
 */
export const postAddCartAPI = (data: ICartAddBody) => {
	return post<ICartAddResult>({
		url: '/member/cart',
		data
	})
}
