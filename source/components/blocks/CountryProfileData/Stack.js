// Profile data stack
// -> display data in a vertical list
const ContentWrapper = require('../ContentWrapper.js')
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
				<ul class="u-list-undecorated | u-padding-y-flow">
					${content}
				</ul>
			`,
			{ width: 'wide' }
		)}
	`, { className: 'u-hide-overflow' })
}
