// Gallery block component
// -> display a list of items in a grid
// -> use with GalleryItem components

module.exports = (content, {
	size = 'default',
	flex = false,
	className = '',
	tag = 'ul',
	gutter = 'medium'
} = {}) => {
	const sizes = ['small', 'large']

	return `
		<${tag}
			class="
				c-gallery ${size !== 'default' ? size : ''} ${flex ? 'flex' : ''}
				${className}
			"
			style="--gutter: ${
				typeof gutter === 'string'
				? `var(--space-${gutter});`
				: (gutter > 0 ? `${gutter}px` : gutter)
			};"
		>
			${content}
		</${tag}>
	`
}
