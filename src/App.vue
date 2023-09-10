<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-10 12:10:48
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-10 11:45:36
 * @FilePath: \hello-uniapp\src\App.vue
 * @Description: 
-->
<script setup lang="ts">
onLaunch(() => {
	uni.addInterceptor('navigateTo', {
		//监听跳转
		invoke(e) {
			console.log('******** invoke-navigateTo ********', e.url)
		}
	})
	//2
	uni.addInterceptor('redirectTo', {
		//监听关闭本页面跳转
		invoke(e) {
			console.log('******** redirectTo ********', e.url)
		}
	})
	/**
	 * 3
	 * 拦截uni.switchTab本身没有问题。
	 * 但是在微信小程序端点击tabbar的底层逻辑并不是触发uni.switchTab。
	 * 所以误认为拦截无效，此类场景的解决方案是在tabbar页面的页面生命周期onShow中处理。
	 */
	uni.addInterceptor('switchTab', {
		//监听tabBar跳转
		invoke(e) {
			console.log('******** switchTab ********', e.url)
		}
	})
	//4
	uni.addInterceptor('navigateBack', {
		//监听返回
		invoke(e) {
			console.log('******** navigateBack ********', e.url)
		}
	})
})
onShow(() => {
	console.log('App Show')
})
onHide(() => {
	console.log('App Hide')
})
</script>
<style lang="scss">
@import './styles/main.css';
image {
	vertical-align: middle;
}
:deep(.uni-picker-action-confirm) {
	color: #fbb957 !important;
}

:deep(.uni-modal__btn_primary) {
	color: #fbb957 !important;
}
</style>
