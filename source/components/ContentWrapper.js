// Content Wrapper component
// -> restrict child content to a standard width
// 		and (optionally) center it on wider screens

module.exports = (content, {
	width = 'default',
	centered = true,
	className = ''
} = {}) => {
	const widthClasses = {
		'default': '',
		'wide': 'wide'
	}
	const centeredClass = centered === true ? 'centered' : ''

	return `
		<div class="
			c-content-width ${widthClasses[width] || ''} ${centeredClass}
			${className}
		">
			${content}
		</div>
	`
}
