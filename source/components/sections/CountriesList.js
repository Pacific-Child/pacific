// Countries List section
// -> displays a list of countries with flags in cards
const SectionWrapper = require('../blocks/SectionWrapper.js')
const ContentWrapper = require('../blocks/ContentWrapper.js')

const Placeholder = '<p>Countries list to come from albatross</p>'

module.exports = ({
	title,
	countries = []
}) => {
	return `
		${SectionWrapper(`
			<h2 class="u-type-align-center">
				${title}
			</h2>
			${countries.length > 0
				? ContentWrapper(Placeholder, { width: 'wide' })
				: ContentWrapper(Placeholder, { width: 'wide' })
			}
		`, { className: 'u-margin-y-flow-wide' })}
	`
}
