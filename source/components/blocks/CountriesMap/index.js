// Countries map
// -> display an SVG map with clickable, labeled areas for each PRC country

const countries = require('./countries.js')

function Country ({ groupPosition, label, url, circle, map }) {
	return `
		<g class="map-island" transform="translate(${groupPosition.x} ${groupPosition.y})">
			<a href="/countries/${url}">
				<text 
					class="u-type-font-display u-type-weight-light" 
					font-size="34" letter-spacing="-1.032"
					fill="currentColor"
				>${label}</text>
				<circle 
					stroke="#fff" stroke-width="3"
					fill="currentColor"
					cx="${circle.x}" cy="${circle.y}" r="${circle.radius}""
				/>
				<g class="u-color-fg-primary">${map}</g>
			</a>
		</g>
	`
}

module.exports = () => {
	return `
		<svg 
			class="map u-theme-wash"
			viewBox="0 0 1600 1124"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			<!-- BG elements -->
			<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="162" y="912">Australia</tspan></text>
			<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="1368" y="105">Hawaii</tspan></text>
			<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="779" y="1027">New Zealand</tspan></text>

			<!-- Islands -->
			${countries.map(country => Country(country)).join('')}
		</svg>
	`
}
