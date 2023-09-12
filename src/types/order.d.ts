/**
 * 返回信息
 */
export interface IOrderPreResult {
	/**
	 * 商品集合
	 */
	goods: IOrderGood[]
	/**
	 * 结算信息
	 */
	summary: IOrderSummary
	/**
	 * 用户地址列表
	 */
	userAddresses: IOrderUserAddress[]
}

/**
 * 商品信息
 */
export interface IOrderGood {
	/**
	 * 属性文字，例如“颜色:瓷白色 尺寸：8寸”
	 */
	attrsText: string
	/**
	 * 数量
	 */
	count: number
	/**
	 * id
	 */
	id: string
	/**
	 * 商品名称
	 */
	name: string
	/**
	 * 实付单价
	 */
	payPrice: number
	/**
	 * 图片
	 */
	picture: string
	/**
	 * 原单价
	 */
	price: number
	/**
	 * SKUID
	 */
	skuId: string
	/**
	 * 实付价格小计
	 */
	totalPayPrice: number
	/**
	 * 小计总价
	 */
	totalPrice: number
}

/**
 * 结算信息
 */
export interface IOrderSummary {
	/**
	 * 折扣总计
	 */
	discountPrice: number
	/**
	 * 商品件数
	 */
	goodsCount: number
	/**
	 * 邮费
	 */
	postFee: number
	/**
	 * 应付总计
	 */
	totalPayPrice: number
	/**
	 * 价格总计
	 */
	totalPrice: number
}

/**
 * 地址信息
 */
export interface IOrderUserAddress {
	/**
	 * 详细地址
	 */
	address: string
	/**
	 * 城市编码
	 */
	cityCode: string
	/**
	 * 联系方式
	 */
	contact: string
	/**
	 * 所在区/县编码
	 */
	countyCode: string
	/**
	 * 完整行政区
	 */
	fullLocation: string
	/**
	 * id
	 */
	id: string
	/**
	 * 是否为默认，1为是，0为否
	 */
	isDefault: number
	/**
	 * 邮编
	 */
	postalCode: string
	/**
	 * 省份编码
	 */
	provinceCode: string
	/**
	 * 收货人
	 */
	receiver: string
}

export interface IOrderPostParams {
	/**
	 * 所选地址Id
	 */
	addressId: string
	/**
	 * 买家留言
	 */
	buyerMessage: string
	/**
	 * 配送时间类型，1为不限，2为工作日，3为双休或假日
	 */
	deliveryTimeType: number
	/**
	 * 商品集合
	 */
	goods: IOrderPostGood[]
	/**
	 * 支付渠道：支付渠道，1支付宝、2微信--支付方式为在线支付时，传值，为货到付款时，不传值
	 */
	payChannel: number
	/**
	 * 支付方式，1为在线支付，2为货到付款
	 */
	payType: number
}

/**
 * 商品信息
 */
export interface IOrderPostGood {
	/**
	 * 数量
	 */
	count: number
	/**
	 * skuId
	 */
	skuId: string
}

/**
 * 返回信息
 */
export interface IOrderDetailResult {
	/**
	 * 预计到货时间
	 */
	arrivalEstimatedTime: string
	/**
	 * 交易关闭时间
	 */
	closeTime: string
	/**
	 * 发货时间
	 */
	consignTime: string
	/**
	 * 倒计时--剩余的秒数 -1 表示已经超时，正数表示倒计时未结束
	 */
	countdown: number
	/**
	 * 下单时间
	 */
	createTime: string
	/**
	 * 配送时间类型，1为不限，2为工作日，3为双休或假日
	 */
	deliveryTimeType: number
	/**
	 * 交易完成时间
	 */
	endTime: string
	/**
	 * 完成评价时间
	 */
	evaluationTime: string
	/**
	 * 订单编号
	 */
	id: string
	/**
	 * 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消
	 */
	orderState: number
	/**
	 * 支付渠道，1支付宝、2微信
	 */
	payChannel: number
	/**
	 * 付款截止时间：剩余的秒数，前台转换成分钟：秒数
	 */
	payLatestTime: number
	/**
	 * 实付金额
	 */
	payMoney: string
	/**
	 * 付款时间
	 */
	payTime: string
	/**
	 * 支付方式，1为在线支付，2为货到付款
	 */
	payType: number
	/**
	 * 邮费
	 */
	postFee: string
	/**
	 * 收货人地址
	 */
	receiverAddress: string
	/**
	 * 收货人
	 */
	receiverContact: string
	/**
	 * 收货人手机
	 */
	receiverMobile: string
	/**
	 * 商品集合
	 */
	skus: IOrderSku[]
	/**
	 * 金额合计
	 */
	totalMoney: string
	/**
	 * 数量合计
	 */
	totalNum: string
}

/**
 * 商品信息
 */
export interface IOrderSku {
	/**
	 * 属性说明
	 */
	attrsText: string
	/**
	 * 单价
	 */
	curPrice: number
	/**
	 * sku id
	 */
	id: string
	/**
	 * 图片地址
	 */
	image: string
	/**
	 * 商品名称
	 */
	name: string
	/**
	 * 属性集合
	 */
	properties: IOrderSkuProperty[]
	/**
	 * 数量
	 */
	quantity: string
	/**
	 * 实付金额
	 */
	realPay: number
	/**
	 * spu id
	 */
	spuId: string
	/**
	 * 小计
	 */
	totalMoney: number
}

/**
 * 属性信息
 */
export interface IOrderSkuProperty {
	/**
	 * 属性名称，如 颜色
	 */
	propertyMainName: string
	/**
	 * 属性值名称，如 黑色
	 */
	propertyValueName: string
}

/**
 * 查询结果
 */
export interface IOrderLogisticsResult {
	/**
	 * 快递公司
	 */
	company: IOrderCompany
	/**
	 * 商品件数
	 */
	count: number
	/**
	 * 物流日志
	 */
	list: IOrderLogisticsList[]
	/**
	 * 商品图片
	 */
	picture: string
}

/**
 * 快递公司
 */
export interface IOrderCompany {
	/**
	 * 公司名称
	 */
	name: string
	/**
	 * 快递编号
	 */
	number: string
	/**
	 * 联系电话
	 */
	tel: string
}

export interface IOrderLogisticsList {
	/**
	 * 信息ID
	 */
	id: string
	/**
	 * 信息文字
	 */
	text: string
	/**
	 * 时间
	 */
	time: string
}

/**
 * 返回信息
 */
export interface IOrderListResult {
	/**
	 * 总记录数
	 */
	counts: number
	/**
	 * 数据集合
	 */
	items: IOrderList[]
	/**
	 * 当前页码
	 */
	page: string
	/**
	 * 总页数
	 */
	pages: string
	/**
	 * 页尺寸
	 */
	pageSize: string
}

/**
 * 订单信息
 */
export interface IOrderList {
	/**
	 * 倒计时--剩余的秒数 -1 表示已经超时，正数表示倒计时未结束
	 */
	countdown: number
	/**
	 * 下单时间
	 */
	createTime: string
	/**
	 * 订单编号
	 */
	id: string
	/**
	 * 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消
	 */
	orderState: OrderState
	/**
	 * 付款截止时间
	 */
	payLatestTime: string
	/**
	 * 实付金额
	 */
	payMoney: number
	/**
	 * 支付方式，1为在线支付，2为货到付款
	 */
	payType: number
	/**
	 * 邮费
	 */
	postFee: number
	/**
	 * 商品集合
	 */
	skus: IOrderSku[]
	/**
	 * 金额合计
	 */
	totalMoney: number
	/**
	 * 数量合计
	 */
	totalNum: string
}
/** 订单状态枚举 */
enum OrderState {
	/** 待付款 */
	PendingPayment = 1,
	/** 待发货 */
	PendingShipment = 2,
	/** 待收货 */
	PendingDelivery = 3,
	/** 待评价 */
	PendingReview = 4,
	/** 已完成 */
	Completed = 5,
	/** 已取消 */
	Cancelled = 6
}
