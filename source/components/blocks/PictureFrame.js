// Picture frame
// -> wrap some content in a Polaroid-esque 'frame'

module.exports = (content, {
	className = '',
	display = 'inline-block'
} = {}) => {
	return `
		<figure class="
			u-display-${display}
			u-color-bg-bg 
			u-shadow 
			u-border-radius 
			u-padding-narrow u-no-margin
			${className}
		">
			${content}
		</figure>
	`
}
