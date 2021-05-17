// Page Content component
// -> renders out the page sections using matched 'section' components
// -> ie if there's a section called event_list, it will render the EventList.js shortcode component
// Props:
// section: OBJECT, containing the props of section components, e.g. title, introduction, etc.
const componentNames = {
	blurb_card_stack: require('./sections/BlurbCardStack.js'),
	nurturing_care_diagram: require('./sections/NurturingCareTabs.js'),
	blurb_grid: require('./sections/BlurbGrid.js'),
	blurb_section: require('./sections/BlurbSection.js'),
	blurb_timeline: require('./sections/BlurbTimeline.js'),
	countries_list: require('./sections/CountriesList.js'),
	event_list: require('./sections/EventList.js'),
	resource_list: require('./sections/ResourceList.js'),
	update_list: require('./sections/UpdateList.js'),
	video_section: require('./sections/VideoSection.js'),
	document_download: require('./sections/DocumentDownload.js')
}

module.exports = (sections, resourcesIndex) => {
	return sections.map(section => {
		const component = componentNames[section.itemType]
		return section.itemType !== 'resource_list'
			? component({ ...section }, { resourcesIndex })
			: component({ ...section }, { resourcesIndex })
	}).join('')
}
