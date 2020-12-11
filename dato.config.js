module.exports = (dato, root, i18n) => {
	const home = dato.home

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

	root.directory('source/data/pages', (pagesDir) => {
		// interior pages
		dato.pages.forEach((page) => {
			pagesDir.createDataFile(`${page.slug}.json`, 'json', {
				title: page.title,
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
