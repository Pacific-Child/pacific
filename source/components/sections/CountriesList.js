// Countries List section
// -> displays a list of countries with flags in cards
const SectionWrapper = require('../blocks/SectionWrapper.js')

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
				? '<p>Countries list to come from albatross</p>'
				: '<p>Countries list to come from albatross</p>'
			}
		`, { className: 'u-margin-y-flow-wide' })}
	`
}
