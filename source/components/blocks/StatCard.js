// Stat Card
// -> a little card displaying a statistic

module.exports = ({
	title,
	number,
	unit,
	context,
	contentWidth = false,
	verticallyJustify = false,
	className = ''
} = {}) => {
	return `
		<div class="
			u-shadow
			u-padding-narrow u-padding-y-flow-xxnarrow
			u-border-radius
			u-color-bg-bg
			u-position-flex-fill
			u-display-flex-column
			${className}
		">
			<div 
				class="u-display-flex-column u-position-flex-fill"
				style="${contentWidth ? `width: ${contentWidth};` : ''}"
			>
				<h3 class="u-type-scale-delta u-color-fg-accent">
					${title}
				</h3>
				<div class="${verticallyJustify ? 'u-margin-top-auto' : ''}">
					<p class="u-type-scale-beta u-type-font-display u-type-weight-bold u-type-leading-xtight | u-padding-top-xnarrow">
						${number || 'No data'}${unit ? `<sup>${unit}</sup>` : ''}
					</p>
					${context
						? `
								<small class="u-type-scale-delta u-type-font-display | u-color-fg-secondary">
									${context}
								</small>
							`
						: ''
					}
				</div>
			</div>
		</div>
	`
}
