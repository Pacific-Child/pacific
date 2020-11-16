const inputDir = 'source'
const outputDir = 'build'
const componentsDir = `./${inputDir}/components`

const markdownIt = require('markdown-it')
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster")
const minifier = require("@sherby/eleventy-plugin-files-minifier")

module.exports = (config) => {

	// custom markdown settings
	config.setLibrary('md', markdownIt({
		typographer: true,
		html: true
	}))

  config.addPlugin(cacheBuster({
  	outputDirectory: outputDir
  }))
	config.addPlugin(minifier)

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
			output: outputDir,
			layouts: 'layouts',
			includes: 'partials',
			data: 'content'
		},
		passthroughFileCopy: true
	}
}
