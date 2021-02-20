// Blurb section
// -> display a blurb as a full-width, stackable section
const ContentWrapper = require('../blocks/ContentWrapper.js')
const Markdown = require('../blocks/Markdown.js')
const Passage = require('../blocks/Passage.js')
const SectionWrapper = require('../blocks/SectionWrapper.js')
const Figure = require('../blocks/Figure.js')

// the two-column breakpoint for each image width
const breakpoints = [
	{
		imageWidth: 'narrow',
		breakpoint: 'medium'
	},
	{
		imageWidth: 'medium',
		breakpoint: 'large'
	},
	{
		imageWidth: 'wide',
		breakpoint: null
	}
]

// get the breakpoint for a given image width
function getBreakpoint (imageWidth) {
	return breakpoints.find((item) => item.imageWidth === imageWidth).breakpoint
}

// single-column version of the layout
function SingleColumnLayout ({ title, description, image, imageWidth } = {}) {
	return `
		<h2 class="u-type-align-center">${title}</h2>
		${image
			? ContentWrapper(Figure(image.url, {
					alt: image.alt,
					caption: image.caption,
					credit: image.credit
				}), {
					width: imageWidth,
					className: 'u-type-align-center'
				})
			: ''
		}
		${description ? Passage(Markdown(description)) : ''}
	`
}

// two-column version of the layout
function TwoColumnLayout ({ title, description, image, imageWidth } = {}) {
	const breakpoint = image ? `horizontal@${getBreakpoint(imageWidth)}` : ''

	return ContentWrapper(`
		<h2 class="u-type-align-center | u-padding-bottom">${title}</h2>
		<div class="c-bookend ${breakpoint} align-top | c-gutter wide">
			${image
				? `<div class="c-bookend-item left | c-gutter-item">
						${ContentWrapper(Figure(image.url, {
								alt: image.alt,
								caption: image.caption,
								credit: image.credit
							}), {
								width: imageWidth,
								className: 'u-type-align-center'
							})
						}
					</div>`
				: ''
			}
			<div class="c-bookend-item right fill | c-gutter-item | u-padding-y-flow">
				${description ? Passage(Markdown(description)) : ''}
			</div>
			
		</div>
	`, { width: 'xwide' })
}

module.exports = ({ blurb }) => {
	return SectionWrapper(
		!blurb.image || blurb.imageWidth === 'wide'
			? SingleColumnLayout({ ...blurb })
			: TwoColumnLayout({ ...blurb })
		, {
			className: 'u-padding-y-flow-wide'
		}
	)
}
