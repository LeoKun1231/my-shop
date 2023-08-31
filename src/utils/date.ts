import dayjs from 'dayjs'

/**
 * 日期格式化
 * @param date Date类型的时间D
 * @param formatString 默认格式 YYYY-MM-DD
 * @returns
 */
export function formatDate(date: Date, formatString = 'YYYY-MM-DD') {
	return dayjs(date).format(formatString)
}
