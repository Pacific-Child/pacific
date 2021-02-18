// Profile data stack item
// -> use as a child of CountryProfileData/Stack
const Markdown = require('../Markdown.js')
const Passage = require('../Passage.js')
const StatCard = require('../StatCard.js')

module.exports = ({ label, number, context, unit, description }) => {
	return `
		<li class="u-display-block">
			<div class="u-color-bg-well u-border-radius">
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