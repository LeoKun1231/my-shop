/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-30 20:18:16
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-03 10:29:01
 * @FilePath: \hello-uniapp\src\types\detail.d.ts
 * @Description:
 */
import type { IAddress } from './address'
import type { IGlobalGuessLike } from './global'

/** 商品信息 */
export interface IDetailGoodResult {
	/** id */
	id: string
	/** 商品名称 */
	name: string
	/** 商品描述 */
	desc: string
	/** 当前价格 */
	price: string
	/** 原价 */
	oldPrice: string
	/** 商品详情: 包含详情属性 + 详情图片 */
	details: Details
	/** 主图图片集合[ 主图图片链接 ] */
	mainPictures: string[]
	/** 同类商品[ 商品信息 ] */
	similarProducts: IGlobalGuessLike[]
	/** sku集合[ sku信息 ] */
	skus: IDetailSkuItem[]
	/** 可选规格集合备注[ 可选规格信息 ] */
	specs: IDetailSpecItem[]
	/** 用户地址列表[ 地址信息 ] */
	userAddresses: IDetailAddressItem[]
}

/** 商品详情: 包含详情属性 + 详情图片 */
export interface Details {
	/** 商品属性集合[ 属性信息 ] */
	properties: IDetailsPropertyItem[]
	/** 商品详情图片集合[ 图片链接 ] */
	pictures: string[]
}

/** 属性信息 */
export interface IDetailsPropertyItem {
	/** 属性名称 */
	name: string
	/** 属性值 */
	value: string
}

/** sku信息 */
export interface IDetailSkuItem {
	/** id */
	id: string
	/** 库存 */
	inventory: number
	/** 原价 */
	oldPrice: string
	/** sku图片 */
	picture: string
	/** 当前价格 */
	price: string
	/** sku编码 */
	skuCode: string
	/** 规格集合[ 规格信息 ] */
	specs: IDetailSkuSpecItem[]
}

/** 规格信息 */
export interface IDetailSkuSpecItem {
	/** 规格名称 */
	name: string
	/** 可选值名称 */
	valueName: string
}

/** 可选规格信息 */
export interface IDetailSpecItem {
	/** 规格名称 */
	name: string
	/** 可选值集合[ 可选值信息 ] */
	values: IDetailSpecValueItem[]
}

/** 可选值信息 */
export interface IDetailSpecValueItem {
	/** 是否可售 */
	available: boolean
	/** 可选值备注 */
	desc: string
	/** 可选值名称 */
	name: string
	/** 可选值图片链接 */
	picture: string
}

/** 地址信息 */
export interface IDetailAddressItem extends IAddress {}
