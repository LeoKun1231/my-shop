import type { ILoginInfo } from '@/types/login'

/**
 * 模拟登录
 * @param phoneNumber 手机号
 * @returns
 */
export const postLoginAPI = (phoneNumber: string) => {
	return post<ILoginInfo>({
		url: '/login/wxMin/simple',
		data: {
			phoneNumber
		}
	})
}
