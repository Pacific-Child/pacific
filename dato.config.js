const dateFNS = require('date-fns')

const path = 'source/data/dato/'

function makeDateFilename (date, template = 'yyyy-MM-dd') {
	return dateFNS.format(new Date(date), template)
}

module.exports = ({
	home,
	pages,
	events,
	updates,
	resources,
	countryProfiles: countries,
	siteConfiguration: site,
	contactForm,
	resourcesIndex,
	countryProfilesIndex,
	eventsIndex
}, root, i18n) => {

	// global site config
	root.createDataFile(`${path}/site.json`, 'json', {
		organization: site.organizationName,
		title: site.siteTitle,
		meta_description: site.metaDescription,
		header: {
			header_organization_name: site.headerOrganizationName,
			nav: site.mainMenu.toMap(2)
		},
		footer: {
			footer_organization_name: site.footerOrganizationName,
			newsletterLabel: site.newsletterLabel,
			newsletterInputPlaceholder: site.newsletterInputPlaceholder || "",
			newsletterBlurb: site.newsletterBlurb || "",
			newsletterButton: site.newsletterButton,
			copyright: site.copyrightNotice,
			facebook: site.facebookUrl,
			twitter: site.twitterUrl,
			youtube: site.youtubeUrl
		}
	})

	// homepage
	// use the site header logo if none is specified for the homepage
	const homeLogo = home.logo || site.logo
	root.createDataFile(`${path}/home.json`, 'json', {
		cover: {
			introduction: home.introduction,
			callToAction: {
				label: home.callToActionLabel,
				link: home.callToActionLink.toMap(1)
			}
		},
		showBanner: home.showBanner,
		bannerTitle: home.bannerTitle,
		bannerDescription: home.bannerDescription,
		bannerButtonText: home.bannerButtonText,
		bannerButtonUrl: home.bannerButtonUrl,
		sections: home.sections.toMap()
	})

	// interior pages
	root.directory(`${path}/pages`, (pagesDir) => {
		pages.forEach((page) => {
			pagesDir.createDataFile(`${page.slug}.json`, 'json', {
				title: page.title,
				date: page.createdAt,
				slug: page.slug,
				id: page.id,
				locale: page.locale,
				header: {
					headline: page.headline,
					introduction: page.introduction,
					image: page.image
						? {
							url: page.image.url(),
							alt: page.image.alt,
							credit: page.imageCredit,
							caption: page.imageCaption
						}
						: null,
					callToAction: {
						label: page.callToActionLabel,
						link: page.callToActionLink
					}
				},
				sections: page.sections.toMap()
			})
		})
	})

	// events index
	root.createDataFile(`${path}/eventsIndex.json`, 'json', {
		title: eventsIndex.title,
		slug: eventsIndex.slug,
		introduction: eventsIndex.introduction,
		updateSectionTitle: eventsIndex.updateSectionTitle,
		showUpdateSection: eventsIndex.showUpdateSection,
		ecdEventsTitle: eventsIndex.ecdEventsTitle,
		prc4ecdMeetingsTitle: eventsIndex.prc4ecdMeetingsTitle,
		regionalEcdForumTitle: eventsIndex.regionalEcdForumTitle,
	})

	// events
	root.directory(`${path}/events`, (eventsDir) => {
		events.forEach((event) => {
			eventsDir.createDataFile(`${makeDateFilename(event.date)}.json`, 'json', {
				title: event.title,
				date: event.date,
				summary: event.summary,
				photo: event.photo
					? {
						url: event.photo.url(),
						alt: event.photo.alt
					}
					: null,
				description: event.description,
				outcomes: event.outcomes.toMap(),
				document_title: event.documentTitle,
				document_url: event.documentUrl,
				section: event.section,
			})
		})
	})

	// updates
	root.directory(`${path}/updates`, (updatesDir) => {
		updates.forEach((update) => {
			updatesDir.createDataFile(`${makeDateFilename(update.date)}.json`, 'json', {
				date: update.date,
				title: update.title,
				subtitle: update.subtitle,
				summary: update.summary,
				body: update.body,
				sources: update.sources.toMap()
			})
		})
	})

	// countries index
	root.createDataFile(`${path}/countryProfilesIndex.json`, 'json', {
		title: countryProfilesIndex.title,
		slug: countryProfilesIndex.slug,
		body: countryProfilesIndex.body
	})

	// country profiles
	// -> convert countries data into a big array of objects so it's easier to loop through
	const countryList = countries.reduce((result, country) => {
		result.push({
			name: country.countryName,
			code: country.countryCode,
			codeThreeCharacter: country.countryCodeThreeCharacter,
			slug: country.slug,
			flag: {
				url: country.flag.url()
			},
			introduction: country.introduction,
			summary: country.hoverDescription,
			dataSections: country.dataSections.toMap()
		})
		return result
	}, []).sort((a, b) => {
		// sort the countries alphabetically by name
		const nameA = a.name.replace('The', '').trim().toUpperCase()
		const nameB = b.name.replace('The', '').trim().toUpperCase()

		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}
		return 0
	})
	root.createDataFile(`${path}/countries.json`, 'json', countryList)

	// featured resources
	root.createDataFile(`${path}/resources.json`, 'json', resources.map((resource) => {
		return {
			title: resource.title,
			dataSourceName: resource.dataSourceName,
			documentUrl: resource.documentUrl,
			type: resource.resourceType,
			updatedAt: resource.updatedAt
		}
	}))

	// contact page
	root.createDataFile(`${path}/contactForm.json`, 'json', {
		title: contactForm.title,
		nameField: contactForm.nameField,
		emailField: contactForm.emailField,
		subjectField: contactForm.subjectField,
		messageField: contactForm.messageField,
		submitButton: contactForm.submitButton,
		thankYouTitle: contactForm.thankYouTitle,
		thankYouMessage: contactForm.thankYouMessage
	})

	// resources index
	root.createDataFile(`${path}/resourcesIndex.json`, 'json', {
		endpoint: resourcesIndex.endpoint,
		title: resourcesIndex.title,
		label: resourcesIndex.label,
		placeholder: resourcesIndex.placeholder,
		button: resourcesIndex.button,
		instructions: resourcesIndex.instructions,
		noResultsMessage: resourcesIndex.noResultsMessage,
		datasetSuffix: resourcesIndex.datasetSuffix,
		author: resourcesIndex.author,
		updated: resourcesIndex.updated,
		fileType: resourcesIndex.fileType,
		featuredResources: resourcesIndex.featuredResources.toMap()
	})
}
