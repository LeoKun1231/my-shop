/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-11 13:23:01
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-19 13:07:59
 * @FilePath: \hello-uniapp\src\utils\request.ts
 * @Description:网络请求封装
 */
interface Data<T> {
	code: number
	msg: string
	result: T
}

const RequestInterceptor: UniApp.InterceptorOptions = {
	invoke(options: UniApp.RequestOptions) {
		// 1.添加基础路径
		if (!options.url.startsWith('http')) {
			options.url = import.meta.env.VITE_BASE_URL + options.url
		}
		// 2.处理token 以及添加请求头标识
		const token = ''
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
						// icon: 'error',
						icon: 'none',
						title: '网络错误，请重试'
					})
					reject(res)
				}
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
