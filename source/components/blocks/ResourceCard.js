// Resource card block
// -> a card displaying summary info about a resource
// -> display in a Gallery
const Passage = require('../blocks/Passage.js')
const Markdown = require('../Markdown.js')

module.exports = ({
	title,
	description,
	link,
	type,
	source,
	date
}) => {
	return `
		<li class="u-margin-y-flow-narrow">
			<h3>${title}</h3>
			${Passage(Markdown(description))}
			<a class="b-button u-margin-top" href="${link}">Read more &rsaquo;</a>
			<p>${type}</p>
			${source ? `<p>${source}</p>` : ''}
			<p>Updated: <time>${date}</time></p>
		</li>
	`
}
