import feather from 'feather-icons'

export function svgIcon(name, width, height, color) {
	const icon = feather.icons[name]
	if (!icon) return ''
	return icon.toSvg({ width, height, color })
}

export const addEventOnElements = (elements, eventType, callback) => {
	for (const element of elements)
		element.addEventListener(eventType, callback)
}
