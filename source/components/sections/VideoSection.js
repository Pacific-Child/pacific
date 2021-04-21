// Video section
// -> display a Blurb with a video
const Markdown = require('../blocks/Markdown.js')
const Passage = require('../blocks/Passage.js')

module.exports = ({
	title,
	description,
	videoFile
}) => {
	return `
		<section class="u-border-top u-padding-y-wide u-padding-x-outside u-margin-y-flow-wide">
			<div class="c-content-width wide centered">
				<div class="${title ? 'c-gallery' : ''}">
					${title
						? `
							<header class="u-margin-y-flow | c-gallery-item" style="order: 2">
								<h2 class="u-type-align-center">
									${title}
								</h2>
								${description ? Passage(Markdown(description)) : ''}
							</header>
							`
						: ''
					}
					<div class="c-aspect video ${title ? 'c-gallery-item' : ''}" style="order: 1">
						<div class="c-aspect-content">
							<iframe
								width="100%"
								height="100%"
								src="https://www.youtube.com/embed/${videoFile.providerUid}"
								frameborder="0"
								allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							>
							</iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	`
}
