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
				class="u-padding-bottom-narrow u-display-block u-scale-delta u-type-heading"
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
					<a href="#" x-bind:href="searchPath + searchTerm" class="b-button">${resourcesIndex.button}</a>
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
			? `<div class="u-border-top u-padding-y-wide">
					${Gallery(
						resources.map(resource => ResourceCard(...resource)).join('')
					)}
				</div>`
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
