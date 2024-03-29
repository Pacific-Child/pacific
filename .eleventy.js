const inputDir = 'source'
const outputDir = 'build'
const componentsDir = `./${inputDir}/components`

const dateFNS = require('date-fns')

// plugins and libs
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster')
const markdownIt = require('markdown-it')
const minifier = require('@sherby/eleventy-plugin-files-minifier')
const yaml = require('js-yaml')

// components
const Cover = require(`${componentsDir}/Cover.js`)
const CoverInterior = require(`${componentsDir}/CoverInterior.js`)
const MainFooter = require(`${componentsDir}/MainFooter.js`)
const MainNav = require(`${componentsDir}/MainNav.js`)
const PageContent = require(`${componentsDir}/PageContent.js`)

// blocks
// -> components used to render bits and pieces of "sections"
const ContentWrapper = require(`${componentsDir}/blocks/ContentWrapper.js`)
const CountriesGrid = require(`${componentsDir}/blocks/CountriesGrid.js`)
const CountriesMap = require(`${componentsDir}/blocks/CountriesMap/index.js`)
const Figure = require(`${componentsDir}/blocks/Figure.js`)
const Gallery = require(`${componentsDir}/blocks/Gallery.js`)
const Markdown = require(`${componentsDir}/blocks/Markdown.js`)
const Passage = require(`${componentsDir}/blocks/Passage.js`)
const PictureFrame = require(`${componentsDir}/blocks/PictureFrame.js`)
const ResourceCard = require(`${componentsDir}/blocks/ResourceCard.js`)
const SectionWrapper = require(`${componentsDir}/blocks/SectionWrapper.js`)
const StatCard = require(`${componentsDir}/blocks/StatCard.js`)
const UpdateCard = require(`${componentsDir}/blocks/UpdateCard.js`)
const EventItem = require(`${componentsDir}/blocks/EventItem.js`)

// sections
// -> components used to render CMS "section" content
const BlurbCardStack = require(`${componentsDir}/sections/BlurbCardStack.js`)
const BlurbGrid = require(`${componentsDir}/sections/BlurbGrid.js`)
const BlurbSection = require(`${componentsDir}/sections/BlurbSection.js`)
const BlurbTimeline = require(`${componentsDir}/sections/BlurbTimeline.js`)
const CountriesList = require(`${componentsDir}/sections/CountriesList.js`)
const CountryProfileData = require(`${componentsDir}/sections/CountryProfileData.js`)
const EventList = require(`${componentsDir}/sections/EventList.js`)
const NurturingCareTabs = require(`${componentsDir}/sections/NurturingCareTabs.js`)
const ResourceList = require(`${componentsDir}/sections/ResourceList.js`)
const UpdateList = require(`${componentsDir}/sections/UpdateList.js`)
const VideoSection = require(`${componentsDir}/sections/VideoSection.js`)
const DocumentDownload = require(`${componentsDir}/sections/DocumentDownload.js`)
const DocumentDownloadList = require(`${componentsDir}/sections/DocumentDownloadList.js`)

module.exports = (config) => {
	// custom data formats
	config.addDataExtension('yml', contents => yaml.load(contents))

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

	// filters
	config.addFilter('toArray', value => Object.values)

	config.addFilter('toArrayReverse', value => Object.values(value).reverse())

	config.addFilter('dateFull', (value) => {
		return dateFNS.format(new Date(value), 'd LLLL, yyyy')
	})

	config.addFilter('datePath', (value) => {
		return dateFNS.format(new Date(value), 'yyyy/MM/dd')
	})

	config.addFilter('length', value => Object.values(value).length)

	config.addFilter('limit', (value, number) => value.slice(0, number))

	config.addFilter('eventFilterSection', (array, section) => {
		return array.filter(event => event.section === section)
	})

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
	config.addPairedShortcode('CoverInterior', CoverInterior)
	config.addPairedShortcode('Gallery', Gallery)
	config.addPairedShortcode('Passage', Passage)
	config.addPairedShortcode('PictureFrame', PictureFrame)
	config.addPairedShortcode('SectionWrapper', SectionWrapper)
	config.addShortcode('BlurbCardStack', BlurbCardStack)
	config.addShortcode('BlurbGrid', BlurbGrid)
	config.addShortcode('BlurbSection', BlurbSection)
	config.addShortcode('BlurbTimeline', BlurbTimeline)
	config.addShortcode('CountriesGrid', CountriesGrid)
	config.addShortcode('CountriesList', CountriesList)
	config.addShortcode('CountriesMap', CountriesMap)
	config.addShortcode('CountryProfileData', CountryProfileData)
	config.addShortcode('EventList', EventList)
	config.addShortcode('Figure', Figure)
	config.addShortcode('NurturingCareTabs', NurturingCareTabs)
	config.addShortcode('ResourceCard', ResourceCard)
	config.addShortcode('ResourceList', ResourceList)
	config.addShortcode('StatCard', StatCard)
	config.addShortcode('UpdateCard', UpdateCard)
	config.addShortcode('UpdateList', UpdateList)
	config.addShortcode('VideoSection', VideoSection)
	config.addShortcode('EventItem', EventItem)

	// integrate Sass pipeline
	// -> see Package.json scripts
	// -> Sass compiles to a .tmp folder, then Eleventy grabs it
	config.setUseGitIgnore(false)
	config.addWatchTarget('./.tmp/main.css')
	config.addPassthroughCopy({ './.tmp/main.css': './stylesheets/main.css' })
	config.addPassthroughCopy({ './.tmp/main.css.map': './stylesheets/main.css.map' })

	// copy images, uploads and fonts over
	config.addPassthroughCopy({ './source/assets/images': './images' })
	config.addPassthroughCopy({ './source/assets/uploads': './uploads' })
	config.addPassthroughCopy({ './source/assets/fonts': './fonts' })

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
