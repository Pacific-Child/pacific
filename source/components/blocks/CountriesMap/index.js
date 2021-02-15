// Countries map
// -> display an SVG map with clickable, labeled areas for each PRC country

const countries = require('./countries.js')

function Country ({ groupPosition, label, url, circle, map }) {
	return `
		<g class="island" transform="translate(${groupPosition.x} ${groupPosition.y})">
			<a xlink:href="/countries/${url}">
				<text 
					class="u-type-font-display u-type-weight-light" 
					font-size="34" letter-spacing="-1.032"
					fill="currentColor"
				>${label}</text>
				<circle 
					class="u-color-fg-bg"
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
		<figure class="u-no-margin | u-display-block">
			<svg class="u-display-block u-theme-wash" viewBox="0 0 1600 1124" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

				<style>
					.island {
						--duration: 0.25s;
						--translate: -0.2rem;
						color: var(--color-secondary);
						transition: color var(--duration) ease;
						will-change: color;
					}

					.island circle {
						filter: drop-shadow(0 0.02rem 0.5rem var(--color-shadow));
						position: absolute;
						transition: filter var(--duration) ease, 
							transform var(--duration) ease, 
							color var(--duration) ease;
						will-change: filter, transform;
					}

					.island path {
						transition: transform var(--duration) ease;
						will-change: transform;
					}
					
					.island:hover {
						color: var(--color-primary);
					}

					.island:hover a {
						color: var(--color-primary);
					}

					.island:hover circle {
						filter: drop-shadow(0 0.2rem 0.75rem var(--color-shadow));
						transform: translateY(var(--translate));
						color: var(--color-highlight);
					}

					.island:hover path {
						transform: translateY(var(--translate));
					}
				</style>

				<!-- BG elements -->
				<image href="/images/map/map-background@1600w.png"/>
				<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="162" y="912">Australia</tspan></text>
				<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="1368" y="105">Hawaii</tspan></text>
				<text class="u-type-font-display u-type-weight-light u-color-fg-secondary" font-size="34" letter-spacing="-1.032" fill="currentColor" fill-opacity=".5"><tspan x="779" y="1027">New Zealand</tspan></text>

				<!-- Islands -->
				${countries.map(country => Country(country)).join('')}
			</svg>
		</figure>
	`
}
