/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-10 12:10:48
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-20 09:29:36
 * @FilePath: \hello-uniapp\vite.config.ts
 * @Description:
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: ['vue', 'uni-app'],
			dts: 'src/types/auto-imports.d.ts',
			dirs: ['src/composables/**', 'src/store/**', 'src/api/**', 'src/utils/**', 'src/components/**', 'src/constants/**'],
			vueTemplate: true
		}),
		/**
		 * unplugin-vue-components 按需引入组件
		 * 注意：需注册至 uni 之前，否则不会生效
		 * @see https://github.com/antfu/vite-plugin-components
		 */
		Components({
			dts: 'src/components.d.ts',
			deep: true,
			dirs: ['src/components', 'src/pages/**/components']
		}),

		uni(),
		/**
		 * unocss
		 * @see https://github.com/antfu/unocss
		 * see unocss.config.ts for config
		 */
		Unocss()
	]
})
