// Content Wrapper component
// -> restrict child content to a standard width
// 		and (optionally) center it on wider screens

module.exports = (content, {
	width = 'default',
	centered = true,
	className = '',
	tag = 'div'
} = {}) => {
	const widthClasses = {
		default: '',
		narrow: 'narrow',
		wide: 'wide',
		xwide: 'xwide'
	}
	const centeredClass = centered === true ? 'centered' : ''

	return `
		<${tag} class="
			c-content-width ${widthClasses[width] || ''} ${centeredClass}
			${className}
		">
			${content}
		</${tag}>
	`
}
