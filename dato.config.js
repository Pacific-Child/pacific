module.exports = ({
	home,
	pages,
	siteConfiguration: site
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
			nav: site.mainMenu.toMap(2)
		},
		footer: {
			newsletterSignup: site.newsletterSignupBlurb,
			copyright: site.copyrightNotice
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
