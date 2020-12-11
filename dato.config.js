module.exports = (dato, root, i18n) => {
	const home = dato.home
	const contactForm = dato.contactForm

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
}
