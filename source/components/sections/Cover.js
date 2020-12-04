// Cover section component
// -> a full-bleed header for a page that introduces the content below

module.exports = (content) => {
	return `
		<header class="u-padding-y-wide u-padding-x-outside">
			${content}
		</header>
	`
}
