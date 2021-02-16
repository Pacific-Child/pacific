const Gallery = require('./Gallery.js')

module.exports = (countries, {
	className = ''
} = {}) => {
	// put the countries list into alphabetical order
	const alphabeticalCountries = countries.sort((a, b) => {
		// remove articles that shouldn't affect order
		const nameA = a.countryName.replace('The', '')
		const nameB = b.countryName.replace('The', '')

		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}
		return 0
	})

	return Gallery(
		alphabeticalCountries.map(country => `
			<li>
				<a 
					class="u-position-flex-fill | u-shadow | u-border-radius | u-padding-narrow"
					href="/countries/${country.slug}/"
					>
					<h3 class="u-type-scale-delta">${country.countryName}</h3>
				</a>
			</li>
		`).join(''),
		{
			className,
			flex: true
		}
	)
}
