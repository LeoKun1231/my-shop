import { defineStore } from 'pinia'

export const useUserStore = defineStore(
	'user',
	() => {
		const users = reactive({
			name: '小明',
			id: 1,
			friends: [
				{
					name: '小红',
					id: 2
				}
			]
		})

		const add = () => {
			users.friends.push({
				id: 3,
				name: '小白'
			})
		}

		return {
			users,
			add
		}
	},
	{
		persist: true
	}
)
