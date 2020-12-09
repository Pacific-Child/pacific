// Cover section component
// -> a full-bleed header for a page that introduces the content below

module.exports = (content, {
	contentWidth = 'xwide'
} = {}) => {
	return `
		<header class="u-padding-y-wide u-padding-x-outside">
			<div class="
				c-content-width ${contentWidth || ''} centered
				u-margin-y-flow
			">
				${content}
			</div>
		</header>
	`
}
