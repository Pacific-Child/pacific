// Countries List section
// -> displays a list of countries with flags in cards
const ContentWrapper = require('../blocks/ContentWrapper.js')
const CountriesGrid = require('../blocks/CountriesGrid.js')
const CountriesMap = require('../blocks/CountriesMap/index.js')
const PictureFrame = require('../blocks/PictureFrame.js')
const SectionWrapper = require('../blocks/SectionWrapper.js')

const breakpoint = 'medium'

function Countries (countries) {
	return [
		CountriesGrid(countries, {
			className: `u-hide-above@${breakpoint}`
		}),
		PictureFrame(
			CountriesMap(countries),
			{
				display: 'block',
				className: `u-hide-below@${breakpoint}`
			}
		)
	].join('')
}

module.exports = ({
	title,
	countries = []
}) => {
	return countries.length > 0
		? SectionWrapper(`
				${title ? `<h2 class="u-type-align-center">${title}</h2>` : ''}
				${ContentWrapper(
					Countries(countries),
					{ width: 'xwide' }
				)}
			`, { className: 'u-margin-y-flow-wide' })
		: ''
}
