// Section
// -> a full-width, bordered container for a section of content

module.exports = (content, {
	className = '',
	tag = 'section'
} = {}) => {
	return `
		<${tag} class="
			u-border-top
			u-padding-y-wide u-padding-x-outside
			${className}
		">
			${content}
		</${tag}>
	`
}
