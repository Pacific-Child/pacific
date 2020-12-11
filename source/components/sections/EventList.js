// EventList section
// -> display a list of PRC meetings
const Markdown = require('../Markdown.js')
const Passage = require('../blocks/Passage.js')

module.exports = ({
	title,
	introduction = false,
	events
}) => {
	return `
		<section class="u-border-top | u-padding-y-wide u-padding-x-outside">
			<header class="u-margin-y-flow-narrow">
				<h2 class="u-type-align-center">${title}</h2>
				${introduction ? Passage(introduction) : ''}
			</header>

			<ul class="
				c-content-width wide centered
				u-padding-top-wide
				u-list-undecorated
			">
				${events.map(event => `
					<li class="u-no-margin">
						<article class="u-border u-border-radius u-padding">
							<h3 class="u-padding-bottom"><time>${event.date}</time></h3>
								<div class="c-bookend horizontal@small align-top | c-gutter">
									${event.photo != null
										? `
											<div
												class="c-bookend-item left | c-gutter-item"
												style="max-width: 20rem;"
											>
												<img
													src="${event.photo.responsiveImage.src}"
													srcSet="${event.photo.responsiveImage.srcSet}"
													alt="${event.photo.alt}"
												>
											</div>
										`
										: ''
									}
									<div class="c-bookend-item right fill | c-gutter-item">
										<div class="c-content-width">
											<ol class="u-padding-left">
												${event.outcomes.map(outcome => `
													<li class="c-flow">
														${Markdown(outcome.description)}
													</li>
												`).join('')}
											</ol>
										</div>
									</div>
								</div>
							</div>
						</article>
					</li>
				`)}
			</ul>
		</section>
	`
}
