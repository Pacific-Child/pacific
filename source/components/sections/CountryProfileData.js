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

function getDataPointValue (albatrossCountryData, returnType, csvColumnName, csvColumnNameSecondary) {
	if (!albatrossCountryData) {
		return
	}
	const result = albatrossCountryData.find(obj => {
		return obj.dataPointName === csvColumnName
	})
	if (returnType === 'range') {
		const resultSecondary = albatrossCountryData.find(obj => {
			return obj.dataPointName === csvColumnNameSecondary
		})
		if ((result.value === null && resultSecondary.value === null) || (result.value === -1 && resultSecondary.value === -1)) {
			return '<span class="u-color-fg-secondary">No data</span>'
		}
		if (result.value === 0 && resultSecondary.value === 0) {
			return 'No paid leave'
		}
		if (result.value === 0 && resultSecondary.value !== 0) {
			return `&lt;${resultSecondary.value} weeks`
		}
		if (result.value !== 0 && resultSecondary.value === 0) {
			return `&gt;${result.value} weeks`
		}
		if (result.value !== 0 && resultSecondary.value !== 0) {
			return `${result.value}&dash;${resultSecondary.value} weeks`
		}
	}
	if (result.value === null || result.value === -1) {
		return '<span class="u-color-fg-secondary">No data</span>'
	}
	if (returnType === 'number') {
		return result.value.toLocaleString('en-US', { minimumFractionDigits: 0 })
	}
	if (returnType === 'raw') {
		return result.value
	}
	if (returnType === 'percent') {
		return result.value ? `${Math.floor(result.value * 100)}%` : null
	}
	if (returnType === 'bool') {
		return result.value === 1 ? 'Yes' : 'No'
	}
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
function DemographicSectionAlbatross (country, albatrossCountryData) {
	const section = getSectionContent('demographic', country)

	return Section(
		DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelPopulation,
					number: getDataPointValue(albatrossCountryData, 'number', 'pop_total', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelAnnualBirths,
					number: getDataPointValue(albatrossCountryData, 'number', 'births_annual', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelChildrenUnderFive,
					number: getDataPointValue(albatrossCountryData, 'number', 'pop_under_five', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelUnderFiveMortality,
					number: getDataPointValue(albatrossCountryData, 'raw', 'mortality_under_five', null),
					context: section.indicatorContextUnderFiveMortality
				})}
			</li>
		`),
		{ ...section }
	)
}

// ECD Indices section
function ECDIndicesSectionAlbatross (country, albatrossCountryData) {
	const section = getSectionContent('ecdIndices', country)

	return Section(DataStack([
		DataStackItem({
			label: section.indicatorLabelEcdi,
			number: getDataPointValue(albatrossCountryData, 'raw', 'ecdi', null),
			description: section.indicatorDescriptionEcdi
		}),
		DataStackItem({
			label: section.indicatorLabelLifetimeCostOfGrowthDeficit,
			number: getDataPointValue(albatrossCountryData, 'percent', 'cost_growth_lifetime', null),
			description: section.indicatorDescriptionLifetimeCostOfGrowthDeficit
		}),
		DataStackItem({
			label: section.indicatorLabelHumanCapitalIndex,
			number: getDataPointValue(albatrossCountryData, 'raw', 'hci', null),
			description: section.indicatorDescriptionHumanCapitalIndex
		})
	].join('')), { ...section, className: 'u-hide-overflow' })
}

// Threats to ECD section
function ThreatsToECDSectionAlbatross (country, albatrossCountryData) {
	const section = getSectionContent('threatsToECD', country)

	return Section(
		DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelMaternalMortality,
					number: getDataPointValue(albatrossCountryData, 'number', 'mortality_maternal', null),
					context: section.indicatorContextMaternalMortality
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelLowBirthweight,
					number: getDataPointValue(albatrossCountryData, 'percent', 'birth_weight_low', null),
					context: section.indicatorContextLowBirthweight
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelUnderFiveStunting,
					number: getDataPointValue(albatrossCountryData, 'percent', 'stunting_under_five', null),
					context: section.indicatorContextUnderFiveStunting
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelChildPoverty,
					number: getDataPointValue(albatrossCountryData, 'percent', 'poverty_child', null),
					context: section.indicatorContextChildPoverty
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelViolentDiscipline,
					number: getDataPointValue(albatrossCountryData, 'percent', 'discipline_violent', null),
					context: section.indicatorContextViolentDiscipline
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelPretermBirths,
					number: getDataPointValue(albatrossCountryData, 'percent', 'births_preterm', null),
					context: section.indicatorContextPretermBirths
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelYoungMothers,
					number: getDataPointValue(albatrossCountryData, 'percent', 'births_young_mothers', null),
					context: section.indicatorContextYoungMothers
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelInadequateSupervision,
					number: getDataPointValue(albatrossCountryData, 'percent', 'supervision_inadequate', null),
					context: section.indicatorContextInadequateSupervision
				})}
			</li>
		`),
		{ ...section }
	)
}

// Nurturing care section
function NurturingCareSectionAlbatross (country, albatrossCountryData) {
	const section = getSectionContent('nurturingCare', country)

	return Section([
		// Healthcare
		Subsection(DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelAntenatalCare,
					number: getDataPointValue(albatrossCountryData, 'percent', 'antenatal_care', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelPostnatalVisits,
					number: getDataPointValue(albatrossCountryData, 'percent', 'postnatal_visits', null)
				})}
			</li>
		`), { title: section.subsectionHealthcare, border: false }),

		// Nutrition
		Subsection(DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelEarlyInitiationOfBreastfeeding,
					number: getDataPointValue(albatrossCountryData, 'percent', 'breastfeeding_early', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelExclusiveBreastfeeding,
					number: getDataPointValue(albatrossCountryData, 'percent', 'breastfeeding_exclusive', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelMinimumAcceptableDiet,
					number: getDataPointValue(albatrossCountryData, 'percent', 'diet_minimum', null)
				})}
			</li>
		`), { title: section.subsectionNutrition }),

		// Early learning
		Subsection(DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelAttendanceInEcd,
					number: getDataPointValue(albatrossCountryData, 'percent', 'early_learning_attendance', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelEarlyStimulationAtHome,
					number: getDataPointValue(albatrossCountryData, 'percent', 'early_learning_home', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelChildrenSBooks,
					number: getDataPointValue(albatrossCountryData, 'percent', 'early_learning_books', null)
				})}
			</li>
		`), { title: section.subsectionEarlyLearning }),

		// Security and safety
		Subsection(DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelBirthRegistration,
					number: getDataPointValue(albatrossCountryData, 'percent', 'births_registration', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelPositiveDiscipline,
					number: getDataPointValue(albatrossCountryData, 'percent', 'discipline_positive', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelBasicDrinkingWater,
					number: getDataPointValue(albatrossCountryData, 'percent', 'water_access', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelBasicSanitation,
					number: getDataPointValue(albatrossCountryData, 'percent', 'sanitation_access', null)
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

function EnablingEnvironmentsSectionAlbatross (country, albatrossCountryData) {
	const section = getSectionContent('enablingEnvironments', country)

	return Section(
		DataGallery(`
			<li>
				${StatCard({
					label: section.indicatorLabelPaidMaternityLeave,
					number: getDataPointValue(albatrossCountryData, 'range', 'leave_maternity_lower', 'leave_maternity_upper')
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelPaidPaternityLeave,
					number: getDataPointValue(albatrossCountryData, 'range', 'leave_paternity_lower', 'leave_paternity_upper')
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelChildAndFamilySocialProtection,
					number: getDataPointValue(albatrossCountryData, 'bool', 'social_protection', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelNationalEcdPolicy,
					number: getDataPointValue(albatrossCountryData, 'percent', 'ecd_policy', null)
				})}
			</li>
			<li>
				${StatCard({
					label: section.indicatorLabelEcdCoordinationMechanism,
					number: getDataPointValue(albatrossCountryData, 'percent', 'ecd_coordination', null)
				})}
			</li>
		`),
		{ ...section }
	)
}

// render all the sections... finally
module.exports = (country, data, albatrossData) => {
	const albatrossCountryData = albatrossData[`countries_${country.codeThreeCharacter}`]

	return [
		DemographicSectionAlbatross(country, albatrossCountryData),
		ECDIndicesSectionAlbatross(country, albatrossCountryData),
		ThreatsToECDSectionAlbatross(country, albatrossCountryData),
		NurturingCareSectionAlbatross(country, albatrossCountryData),
		EnablingEnvironmentsSectionAlbatross(country, albatrossCountryData)
	].join('')
}
