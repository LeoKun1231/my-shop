import type { IDetaiiGoodResult } from '@/types/detail'

/**
 * 获取商品详情
 */
export const getDetailAPI = (id: string) => {
	return get<IDetaiiGoodResult>({
		url: '/goods',
		data: {
			id
		}
	})
}
