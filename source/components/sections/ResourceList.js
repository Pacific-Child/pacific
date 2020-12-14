const Gallery = require('../blocks/Gallery.js')
const Markdown = require('../blocks/Markdown.js')
const Passage = require('../blocks/Passage.js')
const ResourceCard = require('../blocks/ResourceCard.js')
const SectionWrapper = require('../blocks/SectionWrapper.js')

module.exports = ({
	title,
	introduction = false,
	resources,
	callToAction
}) => {
	return SectionWrapper(`
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
	`, { className: 'u-margin-y-flow-wide' })
}
