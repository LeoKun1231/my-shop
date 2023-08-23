<!--
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-10 12:10:48
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-20 15:42:04
 * @FilePath: \hello-uniapp\src\App.vue
 * @Description: 
-->
<script setup lang="ts">
onLaunch(() => {
	console.log('App Launch')
})
onShow(() => {
	console.log('App Show')
})
onHide(() => {
	console.log('App Hide')
})
</script>
<style lang="scss">
image {
	vertical-align: middle;
}

app-scroll-view,
scroll-view {
	box-sizing: border-box;
	flex: 1;
	height: 100%;
	overflow: hidden;
}
</style>
