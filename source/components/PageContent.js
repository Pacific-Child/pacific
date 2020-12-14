// Page Content component
// -> renders out the page sections using matched 'section' components
// -> ie if there's a section called event_list, it will render the EventList.js shortcode component
// Props:
// section: OBJECT, containing the props of section components, e.g. title, introduction, etc.
const componentNames = {
	blurb_timeline: require('./sections/BlurbTimeline.js'),
	countries_list: require('./sections/CountriesList.js'),
	event_list: require('./sections/EventList.js'),
	resource_list: require('./sections/ResourceList.js'),
	update_list: require('./sections/UpdateList.js')
}

module.exports = (sections) => {
	return sections.map(section => {
		const component = componentNames[section.itemType]
		return component
			? component({ ...section })
			: `<p>Missing: ${section.itemType}</p>`
	}).join('')
}
