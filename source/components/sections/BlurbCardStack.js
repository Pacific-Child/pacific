// Blurb card stack
// -> display a list of blurbs as vertically-stacked cards
const SectionWrapper = require('../blocks/SectionWrapper.js')
const ContentWrapper = require('../blocks/ContentWrapper.js')
const Passage = require('../blocks/Passage.js')
const Markdown = require('../blocks/Markdown.js')

const Card = ({ image, title, description }, index) => {
	return `
		<li>
			<article class="
				c-content-width centered wide
				u-border u-border-radius
				u-padding
			">
				<h3 class="u-padding-top">${title}</h3>
				<div class="
					c-bookend horizontal@small ${index % 2 === 0 ? 'reverse' : ''}
					c-gutter
				">
					${image
								? `<div class="c-bookend-item left | c-gutter-item | u-type-align-center" style="max-width: 16rem;">
									<img
										class="u-display-inline-block u-border-round"
										src="https://placehold.it/600x600"
										alt="icon"
									>
							</div>`
						: ''
					}
					<div class="c-bookend-item right fill | c-gutter-item">
						${Passage(Markdown(description))}
					</div>
				</div>
			</article>
		</li>
	`
}

module.exports = ({
	title,
	image = false,
	introduction = false,
	blurbs
}) => {
	return SectionWrapper(`
		<header>
			<h2 class="u-type-align-center u-padding-bottom-wide">Nurturing care</h2>
			${ContentWrapper(`
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
			`, { width: 'wide' })}
		</header>
		<ul class="u-list-undecorated | u-padding-y-flow u-padding-top-wide">
			${blurbs.map((blurb, index) => Card({ ...blurb }, index)).join('')}
		</ul>
	`)
}
