/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-08-10 15:53:22
 * @LastEditors: Leo l024983409@qq.com
 * @LastEditTime: 2023-08-11 15:41:04
 * @FilePath: \hello-uniapp\.eslintrc.js
 * @Description:
 */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	parser: 'vue-eslint-parser',
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'vue'],
	rules: {
		'no-undef': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/comment-directive': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'vue/valid-attribute-name': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
}
