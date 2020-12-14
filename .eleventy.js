const inputDir = 'source'
const outputDir = 'build'
const componentsDir = `./${inputDir}/components`

// plugins and libs
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster')
const markdownIt = require('markdown-it')
const minifier = require('@sherby/eleventy-plugin-files-minifier')

// components
const MainFooter = require(`${componentsDir}/MainFooter.js`)
const MainNav = require(`${componentsDir}/MainNav.js`)
const Cover = require(`${componentsDir}/Cover.js`)
const PageContent = require(`${componentsDir}/PageContent.js`)

// blocks
// -> components use to render CMS "block" content
const ContentWrapper = require(`${componentsDir}/blocks/ContentWrapper.js`)
const Gallery = require(`${componentsDir}/blocks/Gallery.js`)
const Markdown = require(`${componentsDir}/blocks/Markdown.js`)
const Passage = require(`${componentsDir}/blocks/Passage.js`)
const ResourceCard = require(`${componentsDir}/blocks/ResourceCard.js`)
const UpdateCard = require(`${componentsDir}/blocks/UpdateCard.js`)
const SectionWrapper = require(`${componentsDir}/blocks/SectionWrapper.js`)

// sections
// -> components used to render CMS "section" content
const BlurbCardStack = require(`${componentsDir}/sections/BlurbCardStack.js`)
const BlurbGrid = require(`${componentsDir}/sections/BlurbGrid.js`)
const BlurbSection = require(`${componentsDir}/sections/BlurbSection.js`)
const BlurbTimeline = require(`${componentsDir}/sections/BlurbTimeline.js`)
const CountriesList = require(`${componentsDir}/sections/CountriesList.js`)
const EventList = require(`${componentsDir}/sections/EventList.js`)
const ResourceList = require(`${componentsDir}/sections/ResourceList.js`)
const UpdateList = require(`${componentsDir}/sections/UpdateList.js`)

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
	config.addShortcode('MainFooter', MainFooter)
	config.addShortcode('MainNav', MainNav)
	config.addShortcode('PageContent', PageContent)

	// blocks & sections
	config.addPairedShortcode('Cover', Cover)
	config.addPairedShortcode('Gallery', Gallery)
	config.addPairedShortcode('Passage', Passage)
	config.addPairedShortcode('SectionWrapper', SectionWrapper)
	config.addShortcode('BlurbCardStack', BlurbCardStack)
	config.addShortcode('BlurbGrid', BlurbGrid)
	config.addShortcode('BlurbSection', BlurbSection)
	config.addShortcode('BlurbTimeline', BlurbTimeline)
	config.addShortcode('CountriesList', CountriesList)
	config.addShortcode('EventList', EventList)
	config.addShortcode('ResourceCard', ResourceCard)
	config.addShortcode('ResourceList', ResourceList)
	config.addShortcode('UpdateCard', UpdateCard)
	config.addShortcode('UpdateList', UpdateList)

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
			data: 'data'
		},
		passthroughFileCopy: true
	}
}
