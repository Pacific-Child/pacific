// Blurb grid
// -> display one or blurbs in a flush grid
const ContentWrapper = require('../blocks/ContentWrapper.js')
const Gallery = require('../blocks/Gallery.js')
const Markdown = require('../blocks/Markdown.js')
const Passage = require('../blocks/Passage.js')

function Blurb ({
	title,
	description,
	image,
	label,
	linkInternalPage
}) {
	return `
		<section class="
			c-gallery-item
			u-padding-x-outside u-padding-y-wide
			u-color-bg-bg
		">
			${ContentWrapper(`
				<h2 class="u-padding-bottom | u-type-scale-gamma">${title}</h2>
				${Passage(Markdown(description))}
				${linkInternalPage
					? `<a
							class="b-button has-icon right | u-margin-top"
							href="/${linkInternalPage.slug}/"
						>
							${label}
							<svg xmlns="http://www.w3.org/2000/svg" class="b-icon b-button-icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							  <polyline points="9 6 15 12 9 18" />
							</svg>
						</a>`
					: ''
				}
			`)}
		</section>
	`
}

module.exports = ({ blurbs }) => {
	return `
		<section class="u-border-top">
			${Gallery(blurbs.map((blurb) => Blurb({ ...blurb })).join(''), {
				tag: 'div',
				gutter: 1,
				className: 'u-color-bg-border'
			})}
		</section>
	`
}
