export const getDate = (dateUnix, timezone) => {
	const date = new Date((dateUnix + timezone) * 1000)
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
	})
}

// export const getDate = (dateUnix, timezone) => {
// 	const date = new Date((dateUnix + timezone) * 1000)
// 	const weekDayName = weekDayNames[date.getUTCDay()]
// 	const monthName = monthNames[date.getUTCMonth()]

// 	return `${weekDayName} ${date.getUTCDate()} ${monthName}`
// }

export const getTime = (timeUnix, timezone) => {
	const date = new Date((timeUnix + timezone) * 1000)
	return date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	})
}

export const mps_to_kmh = (mps) => {
	return mps * 3.6
}

export const aqiText = {
	1: { level: 'Good', message: 'Air quality is considered satisfactory.' },
	2: { level: 'Fair', message: 'Air quality is acceptable.' },
	3: { level: 'Moderate', message: 'Air quality is acceptable.' },
	4: { level: 'Poor', message: 'Air quality is unhealthy.' },
	5: { level: 'Very Poor', message: 'Air quality is very unhealthy.' },
}
export const weekDayNames = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
]
export const monthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]
