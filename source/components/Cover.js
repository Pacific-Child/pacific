// Cover section component
// -> a full-bleed header for a page that introduces the content below

module.exports = (content, {
	short = false,
	centered = true,
	className = ''
} = {}) => {
	return `
		<header class="
			c-cover ${short ? 'short' : ''} ${centered ? 'centered' : ''}
			${className}
		">
			${content}
		</header>
	`
}
