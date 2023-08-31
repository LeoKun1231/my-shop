export interface IAvatar {
	avatar: string
}

interface IBaseProfile {
	/**
	 * 昵称
	 */
	nickname: string
	/**
	 * 职业
	 */
	profession: string
	/**
	 * 生日
	 */
	birthday: string
	/**
	 * 性别，男、女、未知
	 */
	gender: Gender
}

/**
 * 返回信息
 */
export interface IProfile extends IBaseProfile {
	/**
	 * 账号名称
	 */
	account: string
	/**
	 * 头像
	 */
	avatar: string

	/**
	 * 省市区的名称：如山东省济南市里历下区
	 */
	fullLocation: string

	/**
	 * 用户Id
	 */
	id: string
}

/**
 * 性别，男、女
 */
export enum Gender {
	女 = '女',
	男 = '男'
}
/**
 * 个人信息-修改：请求体参数
 */
export interface IPutProfile extends IBaseProfile {
	/**
	 * 城市编码
	 */
	cityCode?: string
	/**
	 * 区/县编码
	 */
	countyCode?: string

	/**
	 * 省份编码
	 */
	provinceCode?: string
}

/**
 * 返回信息
 */
export interface IPutProfileResult extends IBaseProfile {
	/**
	 * 头像
	 */
	avatar: string
	/**
	 * 省市区的名称：如山东省济南市里历下区
	 */
	fullLocation: string
	/**
	 * 用户Id
	 */
	id: string
	/**
	 * token
	 */
	token: string
}
