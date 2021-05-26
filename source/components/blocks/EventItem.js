// Event item block
// -> an event item
const Passage = require('./Passage.js')
const Markdown = require('./Markdown.js')
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dateFNS = require('date-fns')

function datePath (date, template = 'yyyy/MM/dd') {
	return dateFNS.format(new Date(date), template)
}

function dateFull (value) {
	const d = new Date(value)
	return `${d.getDate()} ${month[d.getMonth()]}, ${d.getFullYear()}`
}

module.exports = (event) => {
	return `
		<li class="u-shadow | u-border-radius | u-display-block | u-padding">
			<h3 class="u-padding-bottom-narrow">
				<a href="/events/${datePath(event.date)}/">
					<h2>${event.title}</h2>
				</a>
			</h3>
			<div class="c-bookend horizontal@small reverse | c-gutter narrow">
				${event.photo
					? `<div
							class="c-bookend-item left | c-gutter-item"
							style="max-width: 16rem;"
						>
							<img src="${event.photo.url}" alt="${event.photo.alt}">
						</div>`
					: ''
				}
				<div class="c-bookend-item right fill | c-gutter-item">
					<time datetime="${event.date}">${dateFull(event.date)}</time>
					${Passage(Markdown(event.summary), { centered: false })}
				</div>
			</div>
			<div class="u-padding-top-narrow">
				<a
					class="b-button has-icon right"
					href="/events/${datePath(event.date)}/"
				>
					Meeting details
					<svg xmlns="http://www.w3.org/2000/svg" class="b-icon b-button-icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <polyline points="9 6 15 12 9 18" />
					</svg>
				</a>
			</div>
		</li>
	`
}
