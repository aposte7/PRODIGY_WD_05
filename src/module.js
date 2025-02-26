export const getDate = (dateUnix, timezone) => {
	const date = new Date((dateUnix + timezone) * 1000)
	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	})
}

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

export const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export const weekDayNames = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]
