/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-10 17:03:10
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-24 21:03:00
 * @FilePath: \hello-uniapp\uno.config.ts
 * @Description:
 */
import type { Preset, SourceCodeTransformer } from 'unocss'
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'
import { presetApplet, presetRemRpx, transformerApplet, transformerAttributify } from 'unocss-applet'

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false
const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

if (isApplet) {
	/**
	 * UnoCSS Applet
	 * @see https://github.com/unocss-applet/unocss-applet
	 */
	presets.push(presetApplet())
	presets.push(presetRemRpx()) // 如果需要使用 rem 转 rpx 单位，需要启用此插件
	transformers.push(transformerAttributify())
	transformers.push(transformerApplet())
} else {
	presets.push(presetUno())
	presets.push(presetAttributify())
	presets.push(presetRemRpx({ mode: 'rpx2rem' }))
}

export default defineConfig({
	presets: [
		// 由 Iconify 提供支持的纯 CSS 图标解决方案
		presetIcons({
			scale: 1.2,
			warn: true
		}),
		...presets
	],
	rules: [
		// 多行省略
		[/^line-clamp-(\d+)$/, ([, value]) => handlerLineClamp(value)]
	],
	/**
	 * 自定义快捷语句
	 * @see https://github.com/unocss/unocss#shortcuts
	 */
	shortcuts: [
		['around', 'flex justify-around items-center'],
		['between', 'flex justify-between items-center'],
		['center', 'flex justify-center items-center'],
		['center-y', 'flex items-center'],
		[
			'btn',
			'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
		],
		[
			'icon-btn',
			'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'
		],
		['b-bottom', 'border-b-1 border-b-solid border-b-[#eee]']
	],
	transformers: [
		transformerDirectives(), // 启用 @apply 功能
		transformerVariantGroup(), // 启用 () 分组功能
		...transformers
	]
})
// 处理多行省略
function handlerLineClamp(value) {
	return {
		overflow: 'hidden',
		display: '-webkit-box',
		'word-break': 'break-all',
		'-webkit-box-orient': 'vertical',
		'-webkit-line-clamp': `${value}`
	}
}
