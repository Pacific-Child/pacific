// Gallery block component
// -> display a list of items in a grid
// -> use with GalleryItem components

// format the 'gutter' prop to populate the css variable
// -> see composition/gallery.scss
function gutterStyle (gutter) {
	if (typeof gutter === 'string') {
		return `var(--space-${gutter});`
	}
	return (gutter > 0 ? `${gutter}px` : gutter)
}

module.exports = (content, {
	size = 'default',
	flex = false,
	className = '',
	tag = 'ul',
	gutter = 'medium'
} = {}) => {
	return `
		<${tag}
			class="
				c-gallery ${size !== 'default' ? size : ''} ${flex ? 'flex' : ''}
				${className}
			"
			style="--gutter: ${gutterStyle(gutter)};"
		>
			${content}
		</${tag}>
	`
}
