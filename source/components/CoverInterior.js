// Interior Cover component
// -> composes the Cover into a more opinionated layout for interior pages
// -> includes the seascape bg at the bottom
const Cover = require('./Cover.js')

module.exports = (content, seascape, { centered = false } = {}) => {
	return Cover(`
			${content}

			<!-- seascape graphics -->
			<div class="b-seascape bottom | no-margin | u-position-z-low">
				<div class="b-seascape-bg bottom">
					${seascape.elements.map(element => `
						<picture class="b-seascape-element contain">
							${seascape.sizes.map(size => `
								<source
									srcset="/images/seascape/${size.name}/${element.name}.svg ${size.width}w" 
									media="(min-width: ${size.breakpoint})"
								>
							`).join('')}
							<img 
								src="/images/seascape/small/${element.name}.svg" 
								alt="${element.alt}"
							>
						</picture>
					`).join('')}
				</div>
			</div>
		`, {
		short: true,
		centered,
		className: 'u-padding-x-outside u-padding-y-xxwide u-margin-y-flow | u-color-bg-sky | u-hide-overflow'
	})
}
