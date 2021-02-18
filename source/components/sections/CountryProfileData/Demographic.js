// Demographics data section
const ContentWrapper = require('../../blocks/ContentWrapper.js')
const Gallery = require('../../blocks/Gallery.js')
const Passage = require('../../blocks/Passage.js')
const Markdown = require('../../blocks/Markdown.js')
const SectionWrapper = require('../../blocks/SectionWrapper.js')
const StatCard = require('../../blocks/StatCard.js')

module.exports = (country, data) => {
	const section = country.dataSections.find(s => s.uid === 'demographic')
	const indicators = data.find(d => d.countryCode === country.code).indicators['2021']

	return SectionWrapper(`
		<h2 class="u-type-align-center u-padding-bottom">${section.title}</h2>
		${ContentWrapper(`
				${section.description
					? Passage(Markdown(section.description))
					: ''
				}
				${Gallery(`
					<li>
						${StatCard({
							title: section.indicatorLabelPopulation,
							number: indicators.population
						})}
					</li>
					<li>
						${StatCard({
							title: section.indicatorLabelAnnualBirths,
							number: indicators.annualBirths
						})}
					</li>
					<li>
						${StatCard({
							title: section.indicatorLabelChildrenUnderFive,
							number: indicators.childrenUnderFive
						})}
					</li>
					<li>
						${StatCard({
							title: section.indicatorLabelUnderFiveMortality,
							number: indicators.underFiveMortality,
							context: section.indicatorContextUnderFiveMortality
						})}
					</li>
				`, { flex: true })}
			`,
			{ width: 'wide' }
		)}`
	)
}
