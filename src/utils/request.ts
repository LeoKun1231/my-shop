/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-11 13:23:01
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-08 10:57:51
 * @FilePath: \hello-uniapp\src\utils\request.ts
 * @Description:网络请求封装
 */
import type { Data } from '@/types/global'

const RequestInterceptor: UniApp.InterceptorOptions = {
	invoke(options: UniApp.RequestOptions) {
		// 1.添加基础路径
		if (!options.url.startsWith('http')) {
			options.url = import.meta.env.VITE_BASE_URL + options.url
		}
		// 2.处理token 以及添加请求头标识
		const userStore = useUserStore()
		const token = userStore.user?.token
		//添加token
		if (token) {
			options.header = {
				...options.header,
				Authorization: token
			}
		}
		//添加请求头标识
		options.header = {
			...options.header,
			'source-client': 'miniapp'
		}
		// 3.设置超时时间
		options.timeout = 10000 //10s
	}
}

uni.addInterceptor('request', RequestInterceptor)
uni.addInterceptor('uploadFile', RequestInterceptor)

/**
 * @description:网络请请求
 * @param {object} UniApp.RequestOptions
 * @return {Promise}
 */
const request = <T>(options: UniApp.RequestOptions) => {
	return new Promise<Data<T>>((resolve, reject) => {
		uni.request({
			...options,
			success(res) {
				if (res.statusCode >= 200 && res.statusCode <= 300) {
					resolve(res.data as Data<T>)
				} else if (res.statusCode == 401) {
					//退出登录
					reject(res)
				} else {
					uni.showToast({
						icon: 'none',
						title: (res.data as Data<T>).msg || '网络错误，请重试'
					})
					reject(res)
				}
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: '网络错误，请重试'
				})
				reject(err)
			}
		})
	})
}

/**
 * @description:get 网络请请求
 * @param {object} UniApp.RequestOptions
 * @return {Promise}
 */
export const get = <T>(options: UniApp.RequestOptions) => {
	return request<T>({
		...options,
		method: 'GET'
	})
}

/**
 * @description:post 网络请请求
 * @param {object} UniApp.RequestOptions
 * @return {Promise}
 */
export const post = <T>(options: UniApp.RequestOptions) => {
	return request<T>({
		...options,
		method: 'POST'
	})
}

/**
 * @description:put 网络请请求
 * @param {object} UniApp.RequestOptions
 * @return {Promise}
 */
export const put = <T>(options: UniApp.RequestOptions) => {
	return request<T>({
		...options,
		method: 'PUT'
	})
}

/**
 * @description:delete 网络请请求
 * @param {object} UniApp.RequestOptions
 * @return {Promise}
 */
export const deleteRequest = <T>(options: UniApp.RequestOptions) => {
	return request<T>({
		...options,
		method: 'DELETE'
	})
}
