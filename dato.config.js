module.exports = ({
	home,
	pages,
	siteConfiguration: site,
	contactForm,
	resourcesIndex
}, root, i18n) => {

	// global site config
	root.createDataFile('source/data/site.json', 'json', {
		organization: site.organizationName,
		title: site.siteTitle,
		header: {
			logo: {
				url: site.logo.url(),
				alt: site.logo.alt,
				title: site.logo.title
			},
			nav: site.mainMenu.toMap(3)
		},
		footer: {
			newsletterSignup: site.newsletterSignupBlurb,
			copyright: site.copyrightNotice
		}
	})

	// homepage
	// use the site header logo if none is specified for the homepage
	const homeLogo = home.logo || site.logo

	root.createDataFile('source/data/home.json', 'json', {
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
	root.directory('source/data/pages', (pagesDir) => {
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
					callToAction: {
						label: page.callToActionLabel,
						link: page.callToActionLink
					}
				},
				sections: page.sections.toMap()
			})
		})
	})

	// contact page
	root.createDataFile('source/data/contactForm.json', 'json', {
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
	root.createDataFile('source/data/resourcesIndex.json', 'json', {
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
}
