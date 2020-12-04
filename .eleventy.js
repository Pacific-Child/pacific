const inputDir = 'source'
const outputDir = 'build'
const componentsDir = `./${inputDir}/components`

const markdownIt = require('markdown-it')
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster')
const minifier = require('@sherby/eleventy-plugin-files-minifier')

// components
const Markdown = require(`${componentsDir}/Markdown.js`)
const ContentWrapper = require(`${componentsDir}/ContentWrapper.js`)
const MainNav = require(`${componentsDir}/MainNav.js`)

// blocks
// -> components use to render CMS "block" content
const Passage = require(`${componentsDir}/blocks/Passage.js`)
const Gallery = require(`${componentsDir}/blocks/Gallery.js`)
const UpdateCard = require(`${componentsDir}/blocks/UpdateCard.js`)

// sections
// -> components used to render CMS "section" content
const Cover = require(`${componentsDir}/sections/Cover.js`)
const Section = require(`${componentsDir}/sections/Section.js`)

module.exports = (config) => {
	// custom markdown settings
	config.setLibrary('md', markdownIt({
		typographer: true,
		html: true
	}))

	// plugins
  config.addPlugin(cacheBuster({
  	outputDirectory: outputDir
  }))
	config.addPlugin(minifier)

	// Eleventy shortcode components pattern:
	// https://github.com/adamduncan/eleventy-shortcomps
  // components
	config.addPairedShortcode('ContentWrapper', ContentWrapper)
	config.addPairedShortcode('Markdown', Markdown)
	config.addShortcode('MainNav', MainNav)

	// blocks & sections
	config.addShortcode('UpdateCard', UpdateCard)
	config.addPairedShortcode('Cover', Cover)
	config.addPairedShortcode('Gallery', Gallery)
	config.addPairedShortcode('Passage', Passage)
	config.addPairedShortcode('Section', Section)

	// integrate Sass pipeline
	// -> see Package.json scripts
	// -> Sass compiles to a .tmp folder, then Eleventy grabs it
	config.setUseGitIgnore(false)
	config.addWatchTarget('./.tmp/main.css')
	config.addPassthroughCopy({ './.tmp/main.css': './stylesheets/main.css' })
	config.addPassthroughCopy({ './.tmp/main.css.map': './stylesheets/main.css.map' })

	// copy images and uploads over
	config.addPassthroughCopy({ './source/assets/images': './images' })
	config.addPassthroughCopy({ './source/assets/uploads': './uploads' })

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
