/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-10 12:10:48
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-09-06 10:44:44
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
		/**
		 * unocss
		 * @see https://github.com/antfu/unocss
		 * see unocss.config.ts for config
		 */
		Unocss(),
		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: ['vue', 'uni-app', 'pinia'],
			dts: 'src/types/auto-imports.d.ts',
			// dts: true,
			dirs: [
				'src/composables/**',
				'src/store/**',
				'src/api/**',
				'src/utils/**',
				'src/components/**',
				'src/constants/**',
				'src/types/**'
			],
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
			dirs: ['src/components', 'src/pages/**/components', 'src/sub-pages/**/components']
		}),

		uni()
	]
})
