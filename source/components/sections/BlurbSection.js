// Blurb section
// -> display a blurb as a full-width, stackable section
const ContentWrapper = require('../blocks/ContentWrapper.js')
const Markdown = require('../blocks/Markdown.js')
const Passage = require('../blocks/Passage.js')
const SectionWrapper = require('../blocks/SectionWrapper.js')

module.exports = ({ blurb }) => {
	return SectionWrapper(`
		<h2 class="u-padding-bottom | u-type-align-center">${blurb.title}</h2>
		${blurb.image
			? ContentWrapper(`
					<img src="${blurb.image.url}" alt="${blurb.image.alt}">
				`, { className: 'u-type-align-center' })
			: ''
		}
		${blurb.description ? Passage(Markdown(blurb.description)) : ''}
	`)
}
