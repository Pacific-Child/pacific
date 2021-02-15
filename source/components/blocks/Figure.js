// Figure component
// -> displays an image in a "Polaroid" frame, with option caption and credit
const Markdown = require('./Markdown.js')
const PictureFrame = require('./PictureFrame.js')

function Caption (content, { credit } = {}) {
	return `
		<figcaption class="u-padding-top-xnarrow u-padding-y-flow-xnarrow | u-color-fg-secondary | u-type-align-left">
			${credit
				? `
					<cite class="
						u-display-block
						u-type-align-right u-type-scale-epsilon u-type-font-display u-type-style-normal
					">
						${credit}
					</cite>
					`
				: ''
			}
			
			${Markdown(content)}
		</figcaption>
	`
}

module.exports = (url, {
	alt,
	caption,
	credit,
	className = ''
} = {}) => {
	return PictureFrame(`
		<img class="u-display-block | u-border" src="${url}" ${alt ? `alt="${alt}"` : ''}>
		${caption ? Caption(caption, { credit }) : ''}
	`, { className })
}
