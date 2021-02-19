// Resource card block
// -> a small card displaying info about a resource
const dateFNS = require('date-fns')

// eslint-disable-quotes
const resourceTypeStyles = {
	Resource: {
		color: 'highlight',
		icon: `
			<svg xmlns="http://www.w3.org/2000/svg" class="b-icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2" />
			</svg>
		`
	},
	'Data collection': {
		color: 'accent',
		icon: `
			<svg xmlns="http://www.w3.org/2000/svg" class="b-icon" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
			</svg>
		`
	},
	Dataset: {
		color: 'primary',
		icon: `
			<svg xmlns="http://www.w3.org/2000/svg" class="b-icon" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
			  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
			  <line x1="9" y1="17" x2="9" y2="12" />
			  <line x1="12" y1="17" x2="12" y2="16" />
			  <line x1="15" y1="17" x2="15" y2="14" />
			</svg>
		`
	}
}
// eslint-enable-quotes

module.exports = ({
	title,
	documentUrl,
	resourceType,
	dataSourceName,
	updatedAt
}) => {
	return `
		<li>
			<div class="
				u-display-flex-column
				u-position-flex-fill
				u-shadow
				u-border-radius-bottom
				u-border-top thick 
				u-color-border-${resourceTypeStyles[resourceType] ? resourceTypeStyles[resourceType].color : 'secondary'}
				u-padding-narrow u-padding-y-flow-narrow
			">
				<p class="u-type-heading u-type-scale-epsilon">
					${resourceTypeStyles[resourceType] ? resourceTypeStyles[resourceType].icon : ''}
					${resourceType}
				</p>
				<h3><a href="${documentUrl}">${title}</a></h3>
				${dataSourceName
					? `<p class="u-type-heading u-type-font-display u-type-weight-light">${dataSourceName}</p>`
					: ''
				}
				<div class="u-margin-top-auto">
					<a class="b-button has-icon right" href="${documentUrl}">
						See more
						<svg xmlns="http://www.w3.org/2000/svg" class="b-icon b-button-icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <polyline points="9 6 15 12 9 18" />
						</svg>
					</a>
					<p class="
						u-border-top
						u-padding-top-narrow u-margin-top-narrow
						u-type-font-display u-type-weight-light u-type-scale-epsilon
						u-color-fg-secondary
					">
						Updated: 
						<strong>
							<time datetime="${updatedAt}">
								${dateFNS.format(new Date(updatedAt), 'd LLLL, yyyy')}
							</time>
						</strong>
					</p>
				</div>
			</div>
		</li>
	`
}
