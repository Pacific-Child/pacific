const inputDir = 'source'
const componentsDir = `./${inputDir}/components`

const markdownIt = require('markdown-it')

module.exports = (config) => {

	// custom markdown settings
	config.setLibrary('md', markdownIt({
		typographer: true,
		html: true
	}))

	// Eleventy shortcode components pattern:
	// https://github.com/adamduncan/eleventy-shortcomps
	// config.addPairedShortcode('Markdown', Markdown)

	// integrate Sass pipeline
	config.setUseGitIgnore(false)
	config.addWatchTarget("./.tmp/main.css")
	config.addPassthroughCopy({ "./.tmp/main.css": "./stylesheets/main.css" })

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
