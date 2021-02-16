// Countries List section
// -> displays a list of countries with flags in cards
const ContentWrapper = require('../blocks/ContentWrapper.js')
const CountriesMap = require('../blocks/CountriesMap/index.js')
const PictureFrame = require('../blocks/PictureFrame.js')
const SectionWrapper = require('../blocks/SectionWrapper.js')

module.exports = ({
	title,
	countries = []
}) => {
	return countries.length > 0
		? SectionWrapper(`
				<h2 class="u-type-align-center">${title}</h2>
				${ContentWrapper(
					PictureFrame(CountriesMap(countries), { display: 'block' }),
					{ width: 'xwide' }
				)}
			`, { className: 'u-margin-y-flow-wide' })
		: ''
}
