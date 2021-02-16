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
					<div class="c-bookend horizontal | c-gutter narrow">
						<div class="c-bookend-item left | c-gutter-item">
							<img 
								class="u-border-round | u-display-inline-block" 
								style="width: 2rem;"
								src="${country.flag || 'https://placehold.it/400x400'}"
							>
						</div>
						<h3 class="c-bookend-item right fill | c-gutter-item | u-type-scale-delta | u-type-align-left">
							${country.countryName}
						</h3>
					</div>
				</a>
			</li>
		`).join(''),
		{
			className,
			flex: true
		}
	)
}
