// Blurb card stack
// -> display a list of blurbs as vertically-stacked cards
const SectionWrapper = require('../blocks/SectionWrapper.js')
const ContentWrapper = require('../blocks/ContentWrapper.js')
const Passage = require('../blocks/Passage.js')
const Markdown = require('../blocks/Markdown.js')

const Card = ({ image, title, description }, index) => {
	return `
		<article class="u-border u-border-radius | u-padding">
			<h3 class="u-padding-bottom-narrow">${title}</h3>
			<div class="
				c-bookend horizontal@small ${index % 2 === 0 ? 'reverse' : ''}
				c-gutter
			">
				${image
					? `<div class="c-bookend-item left | c-gutter-item | u-type-align-center" style="max-width: 16rem;">
						<img
							class="u-display-inline-block u-border-round"
							src="${image.url}"
							alt="${image.alt}"
						>
					</div>`
					: ''
				}
				<div class="c-bookend-item right fill | c-gutter-item">
					${Passage(Markdown(description), { centered: false })}
				</div>
			</div>
		</article>
	`
}

module.exports = ({
	title,
	image = false,
	introduction = false,
	blurbs
}) => {
	return SectionWrapper(`
		<header class="u-margin-y-flow">
			<h2 class="u-type-align-center">${title}</h2>
			${image || introduction
				? ContentWrapper(`
						<div class="c-bookend horizontal@small reverse | c-gutter">
							${image
								? `<div
										class="c-bookend-item right | c-gutter-item"
										style="max-width: 20rem;"
									>
										<img
											class="u-border-round"
											src="${image.url}"
											alt="${image.alt}"
										>
									</div>`
								: ''
							}

							${introduction
								? `<div class="c-bookend-item left fill | c-gutter-item">
										${Passage(Markdown(introduction))}
									</div>`
								: ''
							}

						</div>
					`, { width: 'wide' })
				: ''}
		</header>
		${ContentWrapper(
			blurbs.map((blurb, index) => `
				<li>${Card({ ...blurb }, index)}</li>
			`).join(''),
			{
				width: 'wide',
				tag: 'ul',
				className: 'u-list-undecorated | u-margin-y-flow-narrow'
			}
		)}
	`, { className: 'u-margin-y-flow-wide' })
}
