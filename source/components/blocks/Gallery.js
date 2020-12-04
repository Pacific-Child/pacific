// Gallery block component
// -> display a list of items in a grid
// -> use with GalleryItem components

module.exports = (content, {
	size = 'default',
	flex = false,
	className = ''
} = {}) => {
	const sizes = ['small', 'large']

	return `
		<ul class="
			c-gallery ${size !== 'default' ? size : ''} ${flex ? 'flex' : ''}
			${className}
		">
			${content}
		</ul>
	`
}
