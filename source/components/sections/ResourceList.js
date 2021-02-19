const Gallery = require('../blocks/Gallery.js')
const Markdown = require('../blocks/Markdown.js')
const Passage = require('../blocks/Passage.js')
const ResourceCard = require('../blocks/ResourceCard.js')
const SectionWrapper = require('../blocks/SectionWrapper.js')
const ContentWrapper = require('../blocks/ContentWrapper.js')

function Search (resourcesIndex) {
	return `
		<div x-data="{
			searchTerm: '',
			searchPath: '/resources/?searchTerm='
		}">
			<label
				class="u-padding-bottom-narrow u-display-block u-type-scale-delta u-type-heading"
				for="footer-search"
			>
				${resourcesIndex.label}
			</label>
			<div class="c-bookend c-gutter narrow horizontal@xsmall">
				<div class="c-bookend-item c-gutter-item left fill">
					<input
						id="footer-search"
						name="footer-search"
						x-model="searchTerm"
						type="text"
						placeholder="${resourcesIndex.placeholder}"
					>
				</div>
				<div class="c-bookend-item c-gutter-item right">
					<a
						class="b-button large has-icon left" 
						href="#"
						x-bind:href="searchPath + searchTerm"
					>
						<svg class="b-icon b-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <circle cx="10" cy="10" r="7" />
						  <line x1="21" y1="21" x2="15" y2="15" />
						</svg>
						${resourcesIndex.button}
					</a>
				</div>
			</div>
		</div>
	`
}

module.exports = ({
	title,
	introduction = false,
	resources = [],
	callToAction
}, { resourcesIndex } = {}) => {
	return SectionWrapper(`
		<header class="u-margin-y-flow">
			<h2 class="u-type-align-center">
				${title}
			</h2>
			${introduction ? Passage(Markdown(introduction)) : ''}

			<!-- Search bar -->
			${resourcesIndex
				? ContentWrapper(Search(resourcesIndex), { width: 'wide' })
				: ''
			}

		</header>

		${resources.length > 0
			? ContentWrapper(
					Gallery(
						resources.map(resource => ResourceCard(resource)).join(''),
						{ flex: true }
					),
					{ width: 'xwide', className: 'u-border-top u-padding-y-wide' }
				)
			: ''
		}

		${callToAction
			? ContentWrapper(`
					<a class="b-button" href="#">About ECD &rsaquo;</a>
				`, { width: 'wide', className: 'u-type-align-center | u-border-top' })
			: ''
		}
	`, { className: 'u-margin-y-flow-wide' })
}
