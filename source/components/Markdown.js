const markdownIt = require('markdown-it')

const markdownOptions = {
	typographer: true,
	html: false
}

// https://github.com/11ty/eleventy/issues/685
module.exports = (content, inline = false) => {
  return inline
    ? markdownIt(markdownOptions).renderInline(content)
    : `
    	<div class="t-content">
    		${markdownIt(markdownOptions).render(content)}
  		</div>
		`
}
