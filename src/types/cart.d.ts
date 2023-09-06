/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-04 16:14:54
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-06 13:18:55
 * @FilePath: \hello-uniapp\src\types\cart.d.ts
 * @Description:
 */

/**添加购物车数据 */
export interface ICartAddBody {
	/**
	 * 数量
	 */
	count: number
	/**
	 * SKUID
	 */
	skuId: string
}

/**添加购物车成功返回数据 */
export interface ICartAddResult {
	/**
	 * 属性文字，例如“颜色:瓷白色 尺寸：8寸”
	 */
	attrsText: string
	/**
	 * 数量
	 */
	count: number
	/**
	 * 折扣信息
	 */
	discount: number | null
	/**
	 * SPUID
	 */
	id: string
	/**
	 * 是否收藏
	 */
	isCollect: boolean
	/**
	 * 是否为有效商品
	 */
	isEffective: boolean
	/**
	 * 商品名称
	 */
	name: string
	/**
	 * 当前的价格
	 */
	nowPrice: string
	/**
	 * 商品图片
	 */
	picture: string
	/**
	 * 加入时价格
	 */
	price: string
	/**
	 * 是否选中
	 */
	selected: boolean
	/**
	 * SKUID
	 */
	skuId: string
	/**
	 * 库存
	 */
	stock: number
}

export interface ICartListItem extends ICartAddResult {}
