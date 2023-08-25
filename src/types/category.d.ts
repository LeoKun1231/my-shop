/**
 * 一级分类项
 */
export interface ICategoryResult {
	/**
	 * 二级分类集合
	 */
	children: ICategorySecond[]
	/**
	 * 一级分类id
	 */
	id: string
	/**
	 * 一级分类图片集
	 */
	imageBanners: string[]
	/**
	 * 一级分类名称
	 */
	name: string
	/**
	 * 一级分类图片
	 */
	picture: string
}

/**
 * 二级分类项
 */
export interface ICategorySecond {
	brands: null
	categories: null
	/**
	 * 商品集合
	 */
	goods: ICategoryGoods[]
	/**
	 * 二级分类id
	 */
	id: string
	/**
	 * 二级分类名称
	 */
	name: string
	parentId: null
	parentName: null
	/**
	 * 二级分类图片
	 */
	picture: string
	saleProperties: null
}

/**
 * 商品项
 */
export interface ICategoryGood {
	/**
	 * 商品描述
	 */
	desc: string
	discount: null
	/**
	 * 商品id
	 */
	id: string
	/**
	 * 商品名称
	 */
	name: string
	orderNum: number
	/**
	 * 商品图片
	 */
	picture: string
	/**
	 * 商品价格
	 */
	price: string
}
