import type { IGlobalGuessLike, IGlobalPageParams } from './global'

export interface IHotQuery extends IGlobalPageParams {
	/**
	 * Tab 项的 id，默认查询全部 Tab 项的第 1 页数据
	 */
	subType?: string
}

export interface IHotData {
	/**
	 * 活动图片
	 */
	bannerPicture: string
	/**
	 * id信息
	 */
	id: string
	/**
	 * 子类选项集合
	 */
	subTypes: IHotSubType[]
	/**
	 * 活动标题
	 */
	title: string
}

/**
 * 子类选项
 */
export interface IHotSubType {
	goodsItems: IHotGoodsItems
	/**
	 * 子类选项id
	 */
	id: string
	/**
	 * 子类选项名称
	 */
	title: string
}

export interface IHotGoodsItems {
	/**
	 * 总数量
	 */
	counts: string
	/**
	 * 商品集合
	 */
	items: IHotGoodItem[]
	/**
	 * 页码
	 */
	page: number
	/**
	 * 总页数
	 */
	pages: number
	/**
	 * 页容量
	 */
	pageSize: number
}

/**
 * 商品项
 */
export interface IHotGoodItem extends IGlobalGuessLike {}
