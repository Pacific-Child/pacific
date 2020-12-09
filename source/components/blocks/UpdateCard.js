// Update Card block
// -> a listing for an Update (blog) post
const Passage = require('./Passage.js')

module.exports = ({
	image = false,
	title,
	subtitle = false,
	summary,
	date,
	source
} = {}) => {
	return `
		<article class="u-border | u-padding u-margin-y-flow">
			<div class="c-bookend horizontal@small align-top reverse | c-gutter">
				${image
					? `
						<div
							class="c-bookend-item left | c-gutter-item"
							style="max-width: 12rem;"
						>
							<img src="https://placehold.it/800x800" alt="${title}">
						</div>
					`
					: ''
				}
				<div class="c-bookend-item right fill | c-gutter-item">
					<h3>${title}</h3>
					${Passage(summary)}
					<footer class="c-bookend horizontal">
						<time class="c-bookend-item left">${date}</time>
						<cite class="c-bookend-item right"><a href="#">${source}</a></cite>
					</footer>
				</div>
			</div>
		</article>
	`
}
