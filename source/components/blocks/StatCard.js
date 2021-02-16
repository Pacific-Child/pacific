// Stat Card
// -> a little card displaying a statistic

module.exports = ({
	title,
	number,
	unit,
	context,
	className = ''
} = {}) => {
	return `
		<div class="
			u-shadow
			u-padding-narrow u-padding-y-flow-xxnarrow
			u-border-radius
			u-color-bg-bg
			${className}
		">
			<h3 class="u-type-scale-delta u-color-fg-accent">
				${title}
			</h3>
			<p class="u-type-scale-beta u-type-font-display u-type-weight-bold u-type-leading-xtight">
				${number || 'No data'}${unit ? `<sup>${unit}</sup>` : ''}
			</p>
			${context
				? `
						<small class="u-type-scale-delta u-color-fg-secondary u-type-font-display">
							${context}
						</small>
					`
				: ''
			}
		</div>
	`
}
