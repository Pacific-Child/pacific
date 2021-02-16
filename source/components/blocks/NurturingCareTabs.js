const ContentWrapper = require('./ContentWrapper.js')
const NurturingCareDiagram = require('./NurturingCareDiagram.js')
const Passage = require('./Passage.js')
const SectionWrapper = require('./SectionWrapper.js')

function Tab ({ id, title, description }) {
	return `
		<li 
			class="u-no-padding" 
			x-show="tab === '${id}'" 
			id="${id}"
		>
			${ContentWrapper(`
				<h3 class="u-padding-bottom">${title}</h3>
				${Passage(description)}
			`)}
		</li>
	`
}

module.exports = (icons, tabs) => {
	return SectionWrapper(ContentWrapper(`
		<div class="u-padding-x-outside u-padding-y">
			<div 
				class="c-bookend horizontal@medium | c-gutter wide"
				x-data="{ tab: 'none' }"
			>
				<nav class="c-bookend-item left | c-gutter-item">
					${ContentWrapper(NurturingCareDiagram(icons), { width: 'narrow' })}
				</nav>
				<ul class="c-bookend-item right fill | c-gutter-item | u-list-undecorated">
					${tabs.map(tab => Tab(tab)).join('')}
				</ul>
			</div>
		</div>
	`, {
		tag: 'section',
		width: 'xwide',
		className: 'u-shadow | u-border-radius'
	}))
}
