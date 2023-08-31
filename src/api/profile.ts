import type { IProfile, IPutProfile, IPutProfileResult } from '@/types/profile'

/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-31 12:40:05
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-31 16:51:23
 * @FilePath: \hello-uniapp\src\api\profile.ts
 * @Description:
 */

/**
 * 获取用户资料
 * @returns
 */
export const getUserProfileAPI = () => {
	return get<IProfile>({
		url: '/member/profile'
	})
}

/**
 * 修改用户资料
 * @param data
 * @returns
 */
export const putUserProfileAPI = (data: IPutProfile) => {
	return put<IPutProfileResult>({
		url: '/member/profile',
		data
	})
}
