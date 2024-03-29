// Countries map
// -> display an SVG map with clickable, labeled areas for each PRC country
// -> uses local data for the map graphics, but checks each countries' slug prop against the passed data (from Dato/Albatross)

const countriesMapData = require('./countries.js')

function Country ({ groupPosition, label, slug, circle, map }) {
	return `
		<g class="map-island" transform="translate(${groupPosition.x} ${groupPosition.y})">
			<a href="/countries/${slug}/">
				<text 
					class="u-type-font-display u-type-weight-light" 
					font-size="34" letter-spacing="-1.032"
					fill="currentColor"
				>${label}</text>
				<circle 
					stroke="#fff" stroke-width="3"
					fill="currentColor"
					cx="${circle.x}" cy="${circle.y}" r="${circle.radius}"
					style="filter: url(#circle-shadow);"
				/>
				<g class="u-color-fg-primary">${map}</g>
			</a>
		</g>
	`
}

module.exports = (countriesData) => {
	return `
		<svg 
			class="map u-theme-wash"
			viewBox="0 0 1600 1124"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			<!-- drop shadow filters -->
			<defs>
				<filter id="circle-shadow">
					<feDropShadow
						dx="0"
						dy="2"
						stdDeviation="5"
						flood-color="#19464c"
						flood-opacity="0.4"
					/>
				</filter>
			</defs>

			<!-- BG elements -->
			<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="162" y="912">Australia</tspan></text>
			<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="1368" y="105">Hawaii</tspan></text>
			<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="779" y="1027">New Zealand</tspan></text>

			<!-- Islands -->
			${countriesMapData.reduce((result, country) => {
				if (countriesData.find(data => data.slug === country.slug)) {
					result.push(Country(country))
				}
				return result
			}, []).join('')}
		</svg>
	`
}
