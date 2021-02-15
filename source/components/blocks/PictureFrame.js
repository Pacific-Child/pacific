// Picture frame
// -> wrap some content in a Polaroid-esque 'frame'

module.exports = (content, { className = '' } = {}) => {
	return `
		<figure class="
			u-display-inline-block 
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
