module.exports = (dato, root, i18n) => {
const { home, pages, siteConfiguration } = dato

	// global site config
	root.createDataFile('source/data/site.json', 'json', {
		organization: siteConfiguration.organizationName,
		title: siteConfiguration.siteTitle,
		header: {
			logo: siteConfiguration.logo.toMap(),
			nav: siteConfiguration.mainMenu.toMap()
		},
		footer: {
			newsletterSignup: siteConfiguration.newsletterSignupBlurb,
			copyright: siteConfiguration.copyrightNotice
		}
	})

	// homepage
	root.createDataFile('source/data/home.json', 'json', {
		cover: {
			logo: home.logo,
			introduction: home.introduction,
			callToAction: {
				label: home.callToActionLabel,
				link: home.callToActionLink
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
}
