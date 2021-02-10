// Blurb timeline
// -> arrange a series of blurbs in a sequence, clickable a la tabs
const SectionWrapper = require('../blocks/SectionWrapper.js')
const Passage = require('../blocks/Passage.js')
const Markdown = require('../blocks/Markdown.js')

const Tab = ({ title, id }) => {
	return `
		<li>
			<a
				class="b-timeline-item | u-type-heading u-type-scale-delta u-type-link-undecorated"
				:class="{ 'current': tab === '${id}' }"
				@click.prevent="tab = '${id}'"
				href="#${id}"
			>
				<!-- hide the label on small screens -->
				<span class="u-hide-visually u-show-visually-above@small">${title}</span>
			</a>
		</li>
	`
}

const Blurb = ({ title, description, image }) => {
	return `
		<article class="c-bookend horizontal@small | c-gutter">
			${image
				? `<div class="c-bookend-item left | c-gutter-item">
						<div style="max-width: 20rem;">
							<img src="https://placehold.it/800x600" alt="Image">
						</div>
					</div>`
				: ''
			}
			<div class="c-bookend-item right fill | c-gutter-item">
				<div class="c-content-width centered">
					<h3 class="u-padding-bottom-narrow">${title}</h3>
					${Passage(Markdown(description))}
				</div>
			</div>
		</article>
	`
}

module.exports = ({
	title,
	introduction = false,
	blurbs = [],
	breakpoint = 'medium'
}) => {
	return SectionWrapper(`
		<header class="u-padding-bottom-xwide">
			<h2 class="u-type-align-center | u-padding-bottom">
				Stages of Early Childhood Development
			</h2>
			${introduction ? Passage(Markdown(introduction)) : ''}
		</header>

		<div 
			class="c-content-width xwide centered | u-shadow | u-border-radius-bottom"
			x-data="{ tab: '${blurbs[0].id}' }"
		>
			<nav class="
				u-padding-bottom-wide
				u-margin-fix-collapse-top
			">
				<ol class="b-timeline | u-show@js | u-margin-x-flow u-padding-x-outside">
					${blurbs.map((blurb) => Tab({ ...blurb })).join('')}
				</ol>
			</nav>
			<ul class="c-content-width wide centered | u-list-undecorated">
				${blurbs.map((blurb) => `
					<li
						class="u-no-padding-top u-padding-x-outside u-padding-bottom-wide | u-hide-overflow"
						id="${blurb.id}"
						x-show="tab === '${blurb.id}'"
					>
						${Blurb({ ...blurb })}
					</li>
				`).join('')}
			</ul>
		</div>
	`)
}
