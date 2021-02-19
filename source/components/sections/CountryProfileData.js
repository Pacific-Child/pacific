// Demographics data section
const Gallery = require('../blocks/Gallery.js')
const StatCard = require('../blocks/StatCard.js')
const ContentWrapper = require('../blocks/ContentWrapper.js')
const Markdown = require('../blocks/Markdown.js')
const Passage = require('../blocks/Passage.js')
const SectionWrapper = require('../blocks/SectionWrapper.js')

function getSectionContent (uid, country) {
	return country.dataSections.find(s => s.uid === uid)
}

// --- Sub-components for layout in each section ---
// display a list of resources in a data section
function ResourcesGrid (resources, className = '') {
	return `
		<aside class="u-padding-top-wide">
			<h3 class="u-padding-bottom-xxnarrow u-border-bottom">
				Resources
			</h3>
			<div class="u-padding-top | u-hide-overflow">
				<ul class="c-gutter flush | u-list-undecorated">
				${resources.map(({ title, documentUrl }) => {
					return `
						<li class="u-display-inline-block | c-gutter-item">
							<a 
								class="b-button has-icon right | u-position-flex-fill"
								href="${documentUrl}"
							>
								${title}
								<svg xmlns="http://www.w3.org/2000/svg" class="b-icon b-button-icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <polyline points="9 6 15 12 9 18" />
								</svg>
							</a>
						</li>
					`
				}).join('')}
				</ul>
			</div>
		</aside>
	`
}

// A callout/interstitial to warn of empty data
function IndicatorCallout (heading, body) {
	return `
		<aside class="u-color-bg-well | u-border-radius | u-padding u-padding-y-flow-xnarrow">
			<div class="c-bookend horizontal | c-gutter narrow">
				<div class="c-bookend-item left | c-gutter-item | u-type-scale-beta | u-color-fg-highlight">
					<svg xmlns="http://www.w3.org/2000/svg" class="b-icon xlarge" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <path d="M12 9v2m0 4v.01" />
					  <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
					</svg>
				</div>
				<div class="c-bookend-item right fill | c-gutter-item">
					${ContentWrapper(`
						<h3>${heading}</h3>
						${Passage(Markdown(body))}
					`)}
				</div>
			</div>
		</aside>
	`
}

// group data under a heading
function Section (content, { title, description, resources, className } = {}) {
	return SectionWrapper(`
		<h2 class="u-type-align-center | u-padding-bottom">${title}</h2>
		${description ? Passage(Markdown(description)) : ''}
		${ContentWrapper(`
			${content}
			${resources && resources.length > 0 ? ResourcesGrid(resources) : ''}
		`, { width: 'wide' })}
	`, { className })
}

// group data under a subheading (e.g. Healthcare)
function Subsection (content, {
	title,
	description,
	border = true,
	className
} = {}) {
	return `
		<section class="${border ? 'u-border-top | u-margin-top-wide u-padding-top' : ''}">
			<h3 class="u-padding-bottom">${title}</h3>
			${description
				? Passage(Markdown(description), { className: 'u-padding-bottom' })
				: ''
			}
			${ContentWrapper(content, { width: 'wide' })}
		</section>
	`
}

// display data cards in a grid
function DataGallery (content) {
	return Gallery(content, { flex: true })
}

// display data cards in a vertical 'stack' with descriptions
function DataStack (content) {
	return `
		<ul class="u-list-undecorated | u-padding-y-flow">
			${content}
		</ul>
	`
}

function DataStackItem ({ label, number, context, unit, description }) {
	return `
		<li class="u-display-block">
			<div class="u-color-bg-well | u-border-radius">
				<div class="c-bookend horizontal@xsmall align-stretch">
					<div class="c-bookend-item left flex | u-padding-y-flow-xxnarrow">
						${StatCard({
							label,
							number,
							context,
							unit,
							className: 'u-position-flex-fill',
							contentWidth: '12rem'
						})}
					</div>
					<div class="c-bookend-item right fill flex | u-padding-narrow">
						${Passage(Markdown(description), { centered: false })}
					</div>
				</div>
			</div>
		</li>
	`
}

// --- Sections ---
// Demographic section
function DemographicSection (country, indicators) {
	const section = getSectionContent('demographic', country)

	return Section(
		DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelPopulation,
					number: indicators.population
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelAnnualBirths,
					number: indicators.annualBirths
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelChildrenUnderFive,
					number: indicators.childrenUnderFive
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelUnderFiveMortality,
					number: indicators.underFiveMortality,
					context: section.indicatorContextUnderFiveMortality
				})}
			</li>
		`),
		{ ...section }
	)
}

// ECD Indices section
function ECDIndicesSection (country, indicators) {
	const section = getSectionContent('ecdIndices', country)

	return Section(DataStack([
		DataStackItem({
			label: section.indicatorLabelEcdi,
			number: indicators.ecdi,
			description: section.indicatorDescriptionEcdi
		}),
		DataStackItem({
			label: section.indicatorLabelLifetimeCostOfGrowthDeficit,
			number: indicators.lifetimeCostOfGrowthDeficit,
			description: section.indicatorDescriptionLifetimeCostOfGrowthDeficit
		}),
		DataStackItem({
			label: section.indicatorLabelHumanCapitalIndex,
			number: indicators.humanCapitalIndex,
			description: section.indicatorDescriptionHumanCapitalIndex
		})
	].join('')), { ...section, className: 'u-hide-overflow' })
}

// Threats to ECD section
function ThreatsToECDSection (country, indicators) {
	const section = getSectionContent('threatsToECD', country)

	return Section(
		DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelMaternalMortality,
					number: indicators.maternalMortality,
					context: section.indicatorContextMaternalMortality
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelLowBirthweight,
					number: indicators.lowBirthweight,
					context: section.indicatorContextLowBirthweight
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelUnderFiveStunting,
					number: indicators.underFiveStunting,
					context: section.indicatorContextUnderFiveStunting
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelChildPoverty,
					number: indicators.childPoverty,
					context: section.indicatorContextChildPoverty
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelViolentDiscipline,
					number: indicators.violentDiscipline,
					context: section.indicatorContextViolentDiscipline
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelPretermBirths,
					number: indicators.pretermBirths,
					context: section.indicatorContextPretermBirths
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelYoungMothers,
					number: indicators.pretermBirths,
					context: section.indicatorContextYoungMothers
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelInadequateSupervision,
					number: indicators.inadequateSupervision,
					context: section.indicatorContextInadequateSupervision
				})}
			</li>
		`),
		{ ...section }
	)
}

// Nurturing care section
function NurturingCareSection (country, indicators) {
	const section = getSectionContent('nurturingCare', country)

	return Section([
		// Healthcare
		Subsection(DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelAntenatalCare,
					number: indicators.antenatalCare
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelPostnatalVisits,
					number: indicators.postnatalVisits
				})}
			</li>
		`), { title: section.subsectionHealthcare, border: false }),

		// Nutrition
		Subsection(DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelEarlyInitiationOfBreastfeeding,
					number: indicators.earlyInitiationOfBreastfeeding
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelExclusiveBreastfeeding,
					number: indicators.exclusiveBreastfeeding
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelMinimumAcceptableDiet,
					number: indicators.minimumAcceptableDiet
				})}
			</li>
		`), { title: section.subsectionNutrition }),

		// Early learning
		Subsection(DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelAttendanceInEcd,
					number: indicators.attendanceInECD
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelEarlyStimulationAtHome,
					number: indicators.earlyStimulationAtHome
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelChildrenSBooks,
					number: indicators.childrensBooksAtHome
				})}
			</li>
		`), { title: section.subsectionEarlyLearning }),

		// Security and safety
		Subsection(DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelBirthRegistration,
					number: indicators.birthRegistration
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelPositiveDiscipline,
					number: indicators.positiveDiscipline
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelBasicDrinkingWater,
					number: indicators.basicDrinkingWater
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelBasicSanitation,
					number: indicators.basicSanitation
				})}
			</li>
		`), { title: section.subsectionSecurityAndSafety }),

		// Responsive caregiving
		Subsection(
			IndicatorCallout(
				section.indicatorCalloutHeadingDataNeeded,
				section.indicatorCalloutDescriptionDataNeeded
			),
			{ title: section.indicatorSubsectionResponsiveCaregiving }
		)
	].join(''), { ...section })
}

// Enabling environments section
function EnablingEnvironmentsSection (country, indicators) {
	const section = getSectionContent('enablingEnvironments', country)

	return Section(
		DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelPaidMaternityLeave,
					number: indicators.paidMaternityLeave
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelPaidPaternityLeave,
					number: indicators.paidPaternityLeave
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelChildAndFamilySocialProtection,
					number: indicators.childAndFamilySocialProtection
				})}
			</li>
		`),
		{ ...section }
	)
}

// render all the sections... finally
module.exports = (country, data) => {
	const indicators = data.find(d => d.countryCode === country.code).indicators['2021']

	return [
		DemographicSection(country, indicators),
		ECDIndicesSection(country, indicators),
		ThreatsToECDSection(country, indicators),
		NurturingCareSection(country, indicators),
		EnablingEnvironmentsSection(country, indicators)
	].join('')
}
