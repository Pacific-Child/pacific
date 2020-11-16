const inputDir = 'source'
const componentsDir = `./${inputDir}/components`

const markdownIt = require('markdown-it')

module.exports = (config) => {

	// integrate Sass pipeline
	config.setUseGitIgnore(false)
	config.addWatchTarget("./.tmp/main.css")
	config.addPassthroughCopy({ "./.tmp/main.css": "./stylesheets/main.css" })

	// custom markdown settings
	config.setLibrary('md', markdownIt({
		typographer: true,
		html: true
	}))

	// 'component' shortcodes
	// config.addPairedShortcode('Markdown', Markdown)

	// folder config
	return {
		dir: {
			input: inputDir,
			output: 'build',
			layouts: 'layouts',
			includes: 'partials',
			data: 'content'
		},
		passthroughFileCopy: true
	}
}
