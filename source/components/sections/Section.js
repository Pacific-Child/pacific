// Section
// -> a full-width, stacking 'panel' for a section of content

module.exports = (content, {
	className = ''
} = {}) => {
	return `
		<section class="
			u-border-top
			u-padding-y-wide u-padding-x-outside
			${className}
		">
			${content}
		</section>
	`
}
