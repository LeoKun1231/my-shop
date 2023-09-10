/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-09 10:31:24
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-09 10:31:33
 * @FilePath: \hello-uniapp\src\utils\board.ts
 * @Description:
 */
/**
 * @description 设置系统剪贴板的内容
 * @param data 需要设置的内容
 * @param showToast 配置是否弹出提示，默认弹出提示
 * @constructor
 */
export const SetClipboardData = (data: string, showToast = true) =>
	new Promise((resolve, reject) => {
		uni.setClipboardData({
			data,
			showToast,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})

/**
 * @description 获取系统剪贴板内容
 * @constructor
 */
export const GetClipboardData = () =>
	new Promise((resolve, reject) => {
		uni.getClipboardData({
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
