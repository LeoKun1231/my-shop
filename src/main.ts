import { createSSRApp } from 'vue'

import App from './App.vue'
import registerStore from './store'

import 'uno.css'

export function createApp() {
	const app = createSSRApp(App)
	const { pinia } = registerStore(app)
	return {
		app,
		pinia
	}
}
