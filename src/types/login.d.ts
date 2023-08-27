/**
 * 用户信息
 */
export interface ILoginInfo {
	/**
	 * 用户名
	 */
	account: string
	/**
	 * 用户头像
	 */
	avatar: string
	/**
	 * 用户id
	 */
	id: string
	/**
	 * 用户手机号
	 */
	mobile: string
	/**
	 * 用户昵称
	 */
	nickname: null | string
	/**
	 * 用于后续接口调用的token，有效期三天
	 */
	token: string
}
