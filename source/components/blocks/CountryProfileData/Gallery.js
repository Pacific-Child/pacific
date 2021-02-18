// Profile data gallery
// -> display data in a grid
const ContentWrapper = require('../ContentWrapper.js')
const Gallery = require('../Gallery.js')
const Markdown = require('../Markdown.js')
const Passage = require('../Passage.js')
const SectionWrapper = require('../SectionWrapper.js')

module.exports = (content, { title, description } = {}) => {
	return SectionWrapper(`
		<h2 class="u-type-align-center u-padding-bottom">${title}</h2>
		${ContentWrapper(`
				${description
					? Passage(Markdown(description))
					: ''
				}
				${Gallery(content, { flex: true })}
			`,
			{ width: 'wide' }
		)}`
	)
}