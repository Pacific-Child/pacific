// Albatross Document section
// -> displays a list of documents with links to Albatross douments
const SectionWrapper = require('../blocks/SectionWrapper.js')
const DocumentDownloadList = require('../sections/DocumentDownloadList.js')

module.exports = ({
	leftTitle,
	leftLinks,
	rightTitle,
	rightLinks,
	theme
}, { resourcesIndex } = {}) => {
	return SectionWrapper(`
		<div class="c-content-width wide centered | u-border-radius u-padding-wide u-padding-bottom u-shadow">
			<div class="c-gallery c-gutter">
				<div class="c-gallery-item c-gutter-item">
					<h3 class="u-padding-bottom-narrow">${leftTitle}</h3>
					${leftLinks ? DocumentDownloadList(leftLinks, resourcesIndex.endpoint, { docIcon: true, sepBorder: true }) : ''}
				</div>
				<div class="c-gallery-item c-gutter-item">
					<h3 class="u-padding-bottom-narrow">${rightTitle}</h3>
					${rightLinks ? DocumentDownloadList(rightLinks, resourcesIndex.endpoint, { docIcon: true, sepBorder: true }) : ''}
				</div>
			</div>
		</div>
	`, {
		sectionType: 'documentDownload',
		className: 'u-padding-y-xlarge u-no-border'
	})
}
