// Resource card block
// -> a card displaying summary info about a resource
// -> display in a Gallery
// TODO move abdullah's markup into this component from resources.njk
const Passage = require('./Passage.js')
const Markdown = require('./Markdown.js')
const dateFNS = require('date-fns')

module.exports = ({
	title,
	documentUrl,
	resourceType,
	dataSourceName,
	updatedAt
}) => {
	return `
		<li class="u-margin-y-flow-narrow">
			<h3>${title}</h3>
			<a class="b-button u-margin-top" href="${documentUrl}">Read more &rsaquo;</a>
			<p>${resourceType}</p>
			${dataSourceName ? `<p>${dataSourceName}</p>` : ''}
			<p>
				Updated: 
				<time datetime="${updatedAt}">
					${dateFNS.format(new Date(updatedAt), 'd LLLL, yyyy')}
				</time>
			</p>
		</li>
	`
}
