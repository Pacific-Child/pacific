// Update list section
// -> display a stack of Update posts in cards
const Markdown = require('../Markdown.js')
const Passage = require('../blocks/Passage.js')
const UpdateCard = require('../blocks/UpdateCard.js')

module.exports = ({
	title,
	introduction,
	updates
}) => {
	return `
		<section class="u-border-top u-padding-y-wide u-padding-x-outside u-margin-y-flow-wide">
			<header class="u-margin-y-flow">
				<h2 class="u-type-align-center">
					${title}
				</h2>
				${introduction ? Passage(Markdown(introduction)) : ''}
			</header>


			<ul class="
				c-content-width wide centered
				u-list-undecorated u-padding-y-flow
			">
				${updates.length > 0
					? updates.map(update => `
							<li>
								${UpdateCard({
									image: update.image,
									title: update.title,
									summary: update.summary,
									date: update.date,
									source: update.source
								})}
							</li>
						`).join('')
					: ''
				}
			</ul>
		</section>
	`
}
