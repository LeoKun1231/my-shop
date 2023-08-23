/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-10 12:10:48
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-11 15:02:27
 * @FilePath: \hello-uniapp\src\env.d.ts
 * @Description:
 */
/// <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
