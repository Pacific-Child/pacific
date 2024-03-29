// Blurb timeline
// -> arrange a series of blurbs in a sequence, clickable a la tabs
const SectionWrapper = require('../blocks/SectionWrapper.js')
const Passage = require('../blocks/Passage.js')
const Markdown = require('../blocks/Markdown.js')
const ContentWrapper = require('../blocks/ContentWrapper.js')
const Diagram = require('../blocks/NurturingCareDiagram/index.js')

function Tab ({ slug, title, description }) {
	return `
		<li x-show="tab === '${slug}'" id="${slug}">
		${ContentWrapper(`
			<h3 class="u-padding-bottom">${title}</h3>
			${Passage(Markdown(description))}
		`)}
		</li>
	`
}

module.exports = ({
	title,
	introduction = false,
	nurturingCareComponents = [],
	breakpoint = 'medium'
}) => {
	return SectionWrapper(`
		<header class="u-padding-bottom-xwide">
			<h2 class="u-type-align-center | u-padding-bottom">
				${title}
			</h2>
			${introduction ? Passage(Markdown(introduction)) : ''}
		</header>

		<!-- tabs -->
		${ContentWrapper(`
			<div class="u-padding-x-outside u-padding-y">
				<div 
					class="c-bookend horizontal@medium align-top | c-gutter wide"
					x-data="{ tab: 'none' }"
				>
					<nav class="c-bookend-item left | c-gutter-item">
						${ContentWrapper(Diagram(), { width: 'xnarrow' })}
					</nav>
					<ul class="c-bookend-item right fill | c-gutter-item | u-list-undecorated">
						<div class="u-padding-top-wide">
							${nurturingCareComponents.map(tab => Tab(tab)).join('')}
						</div>
					</ul>
				</div>
			</div>
		`, {
			tag: 'section',
			width: 'wide',
			className: 'u-shadow | u-border-radius'
		})}
	`)
}
