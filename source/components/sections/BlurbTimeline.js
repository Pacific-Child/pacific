// Blurb timeline
// -> arrange a series of blurbs in a sequence, clickable a la tabs
const SectionWrapper = require('../blocks/SectionWrapper.js')
const Passage = require('../blocks/Passage.js')
const Markdown = require('../blocks/Markdown.js')

const Tab = ({ title, id }) => {
	return `
		<li
			class="b-timeline-item"
			:class="{ 'u-color-fg-highlight': tab === '${id}' }"
		>
			<a
				class="u-type-heading u-type-scale-delta u-type-link-undecorated"
				@click.prevent="tab = '${id}'"
				href="#${id}"
			>
				${title}
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

		<div x-data="{ tab: '${blurbs[0].id}' }">
			<nav class="
				c-content-width xwide centered
				u-padding-bottom-xwide
			">
				<ul class="b-timeline | u-margin-x-flow">
					${blurbs.map((blurb) => Tab({ ...blurb })).join('')}
				</ul>
			</nav>
			<ul class="c-content-width wide centered | u-list-undecorated">
				${blurbs.map((blurb) => `
					<li
						class="u-no-padding-top"
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
