/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-31 09:44:28
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-31 12:19:17
 * @FilePath: \hello-uniapp\src\utils\upload.ts
 * @Description:
 */
export const uploadSingleImage = <T>() => {
	return new Promise<T>((resolve, reject) => {
		// 调用选择图片接口
		uni.chooseImage({
			// 选择图片的数量
			count: 1,
			// 接口调用成功后的回调函数
			success: (res) => {
				// 获取用户保存的store
				uni.showLoading({
					title: '上传中'
				})
				const userStore = useUserStore()
				// 上传文件
				uni
					.uploadFile({
						url: import.meta.env.VITE_BASE_URL + '/member/profile/avatar',
						filePath: res.tempFilePaths[0],
						header: {
							Authorization: userStore.user?.token
						},
						name: 'file'
					})
					.then((res) => {
						// 解析上传结果
						const result = JSON.parse(res.data)
						// 判断上传结果
						if (res.statusCode === 200) {
							// 隐藏上传动画
							uni.hideLoading()
							// 显示上传成功提示
							uni.showToast({
								title: '上传成功',
								icon: 'none'
							})
							// 执行回调函数
							resolve(result)
						} else {
							// 隐藏上传动画
							uni.hideLoading()
							// 显示上传失败提示
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							})
							// 执行回调函数
							reject(result)
						}
					})
					.catch((err) => {
						console.log(err)
						// 隐藏上传动画
						uni.hideLoading()
						// 显示上传失败提示
						uni.showToast({
							title: '上传失败',
							icon: 'none'
						})
						// 执行回调函数
						reject(err)
					})
			}
		})
	})
}
