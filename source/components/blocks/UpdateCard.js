// Update Card block
// -> a listing for an Update (blog) post
const Passage = require('./Passage.js')

module.exports = (
{
	image = false,
	title,
	subtitle = false,
	summary,
	date,
	source
}) => {
	return `
		<article class="u-border | u-padding u-margin-y-flow">
			${image ? `
				<div>
					<img src="https://placehold.it/800x800" alt="${title}">
				</div>
			` : ''}
			<div>
				<h3>${title}</h3>
				${Passage(summary)}
			</div>
			<footer class="c-bookend horizontal">
				<time class="c-bookend-item left">${date}</time>
				<cite class="c-bookend-item right"><a href="#">${source}</a></cite>
			</footer>
		</article>
	`
}
