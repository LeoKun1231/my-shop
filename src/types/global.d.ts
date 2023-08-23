export type LoadingStatus = 'more' | 'loading' | 'noMore'
export interface IGlobalPageParams {
	/**
	 * 页码默认值1
	 */
	page?: number
	/**
	 * 页大小默认是10
	 */
	pageSize?: number
}

/**
 * 分页数据
 */
export interface IGlobalPageResult<T> {
	/**
	 * 总条数
	 */
	counts: number
	/**
	 * 当前页数据
	 */
	items: T[]
	/**
	 * 当前页数
	 */
	page: number
	/**
	 * 总页数
	 */
	pages: number
	/**
	 * 每页条数
	 */
	pageSize: number
}

/**
 * 猜你喜欢数据
 */
export interface IGlobalGuessLike {
	/**
	 * 商品描述
	 */
	desc: string
	/**
	 * 商品折扣
	 */
	discount: number
	/**
	 * id
	 */
	id: string
	/**
	 * 商品名称
	 */
	name: string
	/**
	 * 商品已下单数量
	 */
	orderNum: number
	/**
	 * 商品图片
	 */
	picture: string
	/**
	 * 商品价格
	 */
	price: number
}
