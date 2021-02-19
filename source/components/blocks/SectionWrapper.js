// Section
// -> a full-width, bordered container for a section of content

module.exports = (content, {
	className = '',
	tag = 'section',
	paddingClasses = 'u-padding-y-xwide u-padding-x-outside'
} = {}) => {
	return `
		<${tag} class="
			u-border-top
			${paddingClasses}
			${className}
		">
			${content}
		</${tag}>
	`
}
