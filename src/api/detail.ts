import type { IDetailGoodResult } from '@/types/detail'

/**
 * 获取商品详情
 */
export const getDetailAPI = (id: string) => {
	return get<IDetailGoodResult>({
		url: '/goods',
		data: {
			id
		}
	})
}
