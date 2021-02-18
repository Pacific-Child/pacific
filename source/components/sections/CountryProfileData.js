// Demographics data section
const Gallery = require('../blocks/CountryProfileData/Gallery.js')
const GalleryItem = require('../blocks/CountryProfileData/GalleryItem.js')
const Stack = require('../blocks/CountryProfileData/Stack.js')
const StackItem = require('../blocks/CountryProfileData/StackItem.js')

function getSection (uid, country) {
	return country.dataSections.find(s => s.uid === uid)
}

function getIndicators (code, data) {
	return data.find(d => d.countryCode === code).indicators['2021']
}

// Demographic section
function DemographicSection (country, indicators) {
	const section = getSection('demographic', country)

	return Gallery([
		GalleryItem({
			label: section.indicatorLabelPopulation,
			number: indicators.population
		}),
		GalleryItem({
			label: section.indicatorLabelAnnualBirths,
			number: indicators.annualBirths
		}),
		GalleryItem({
			label: section.indicatorLabelChildrenUnderFive,
			number: indicators.childrenUnderFive
		}),
		GalleryItem({
			label: section.indicatorLabelUnderFiveMortality,
			number: indicators.underFiveMortality,
			context: section.indicatorContextUnderFiveMortality,
		})
	].join(''), { ...section })
}

// ECD Indices section
// function ECDIndicesSection(country, data) {
// 	const section = getSection('ecdIndices', country)
// 	const indicators = getIndicators(country.code, data)

// 	return Stack([
// 		StackItem({
// 			label: 
// 		}),
// 	].join(''), { ...section })
// }

module.exports = (country, data) => {
	const indicators = data.find(d => d.countryCode === country.code).indicators['2021']
	return [
		DemographicSection(country, indicators)
	].join('')
}
