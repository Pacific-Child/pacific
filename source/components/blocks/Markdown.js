// Markdown component
// -> render markdown text to html
const markdownIt = require('markdown-it')

const options = {
	typographer: true,
	html: false
}

// https://github.com/11ty/eleventy/issues/685
module.exports = (content, inline = false) => {
	return inline
		? markdownIt(options).renderInline(content)
		: markdownIt(options).render(content)
}
