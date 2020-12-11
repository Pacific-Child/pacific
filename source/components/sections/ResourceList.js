const Gallery = require('../blocks/Gallery.js')
const Passage = require('../blocks/Passage.js')
const ResourceCard = require('../blocks/ResourceCard.js')
const Markdown = require('../Markdown.js')

module.exports = ({
	title,
	introduction = false,
	resources,
	callToAction
}) => {
	return `
		<section class="u-border-top u-padding-y-wide u-padding-x-outside u-margin-y-flow-wide">
			<header class="u-margin-y-flow">
				<h2 class="u-type-align-center">
					${title}
				</h2>
				${Passage(Markdown(introduction))}
			</header>

			${resources.length > 0
				? `<div class="u-border-y u-padding-y-wide">
						${Gallery(
							resources.map(resource => ResourceCard(...resource)).join('')
						)}
					</div>`
				: ''
			}

			${callToAction
				? `<div class="u-type-align-center">
						<a class="b-button" href="#">About ECD &rsaquo;</a>
					</div>`
				: ''
			}
		</section>
	`
}
