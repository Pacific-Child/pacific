// Page Content component
// -> renders out the page sections using matched 'section' components
// -> ie if there's a section called event_list, it will render the EventList.js shortcode component
const componentNames = {
	event_list: require('./sections/EventList'),
	resource_list: require('./sections/ResourceList'),
	update_list: require('./sections/UpdateList')
}

module.exports = function(sections) {
	return sections.map(section => {
		const component = componentNames[section.itemType]
		return component
			? component({ ...section })
			: `<p>Missing: ${section.itemType}</p>`
	}).join('')
}

// {% for section in sections %}
// 	{# Meeting #}
// 	{% if section.itemType == 'event_list' %}
// 		{% EventList {
// 			title: section.heading,
// 			introduction: section.intro,
// 			events: section.events
// 		} %}
// 	{% endif %}

// 	{# Countries #}
// 		{% if section.itemType == 'countries_list' %}
// 			<section class="u-border-top u-padding-y-wide u-padding-x-outside u-margin-y-flow-wide">
// 				<h2 class="u-type-align-center">
// 					{{section.title}}
// 				</h2>
// 				<p>Countries list to come</p>
// 			</section>
// 		{% endif %}

// 	{# Resources #}
// 	{% if section.itemType == 'resource_list' %}
// 		{% ResourceList {
// 			title: section.heading,
// 			introduction: section.introduction,
// 			resources: section.resources,
// 			callToAction: section.callToAction
// 		} %}
// 	{% endif %}

// 	{# Updates #}
// 	{% if section.itemType == 'update_list' %}
// 		{% UpdateList {
// 			title: section.title,
// 			introduction: section.introduction,
// 			updates: section.updates
// 		} %}
// 	{% endif %}
// {% endfor %}
