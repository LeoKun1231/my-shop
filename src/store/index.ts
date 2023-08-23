import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import type { App } from 'vue'

export default function registerStore(app: App<Element>) {
	const pinia = createPinia()

	//注册pinia持久化插件
	pinia.use(
		createPersistedState({
			storage: {
				getItem(key) {
					return uni.getStorageSync(key)
				},
				setItem(key, value) {
					uni.setStorageSync(key, value)
				}
			}
		})
	)
	app.use(pinia)
	return { pinia }
}
