module.exports = ({
	home,
	pages,
	countryProfiles: countries,
	siteConfiguration: site,
	contactForm,
	resourcesIndex,
	countryProfilesIndex
}, root, i18n) => {

	// global site config
	root.createDataFile('source/data/dato/site.json', 'json', {
		organization: site.organizationName,
		title: site.siteTitle,
		meta_description: site.metaDescription,
		header: {
			logo: {
				url: site.logo.url(),
				alt: site.logo.alt,
				title: site.logo.title
			},
			header_organization_name: site.headerOrganizationName,
			nav: site.mainMenu.toMap(2)
		},
		footer: {
			footer_organization_name: site.footerOrganizationName,
			newsletterLabel: site.newsletterLabel,
			newsletterInputPlaceholder: site.newsletterInputPlaceholder || "",
			newsletterBlurb: site.newsletterBlurb || "",
			newsletterButton: site.newsletterButton,
			copyright: site.copyrightNotice
		}
	})

	// homepage
	// use the site header logo if none is specified for the homepage
	const homeLogo = home.logo || site.logo

	root.createDataFile('source/data/dato/home.json', 'json', {
		cover: {
			logo: {
				url: homeLogo.url(),
				alt: homeLogo.alt,
				title: homeLogo.title
			},
			introduction: home.introduction,
			callToAction: {
				label: home.callToActionLabel,
				link: home.callToActionLink.toMap(1)
			}
		},
		sections: home.sections.toMap()
	})

	// interior pages
	root.directory('source/data/dato/pages', (pagesDir) => {
		// interior pages
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

	// countries
	// -> convert country profile data into a big array of objects
	const countryList = countries.reduce((result, country) => {
		result.push({
			name: country.countryName,
			slug: country.slug,
			flag: country.flag,
			introduction: country.introduction,
			summary: country.hoverDescription,
			resources: country.resources.toMap()
		})
		return result
	}, []).sort((a, b) => {
		// sort the countries alphabetically by name
		const nameA = a.name.replace('The ', '')
		const nameB = b.name.replace('The ', '')

		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}
		return 0
	})
	root.createDataFile('source/data/dato/countries.json', 'json', countryList)

	// contact page
	root.createDataFile('source/data/dato/contactForm.json', 'json', {
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
	root.createDataFile('source/data/dato/resourcesIndex.json', 'json', {
		endpoint: resourcesIndex.endpoint,
		title: resourcesIndex.title,
		label: resourcesIndex.label,
		placeholder: resourcesIndex.placeholder,
		button: resourcesIndex.button,
		instructions: resourcesIndex.instructions,
		noResultsMessage: resourcesIndex.noResultsMessage,
		datasetSuffix: resourcesIndex.datasetSuffix,
		moreTags: resourcesIndex.moreTags,
		updated: resourcesIndex.updated
	})
	
	// countries index
	root.createDataFile('source/data/dato/countryProfilesIndex.json', 'json', {
		title: countryProfilesIndex.title,
		slug: countryProfilesIndex.slug,
		body: countryProfilesIndex.body
	})
}

