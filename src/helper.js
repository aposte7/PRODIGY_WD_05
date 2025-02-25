import feather from 'feather-icons'

export function svgIcon(name, width, height, color) {
	const icon = feather.icons[name]
	if (!icon) return ''
	return icon.toSvg({ width, height, color })
}
